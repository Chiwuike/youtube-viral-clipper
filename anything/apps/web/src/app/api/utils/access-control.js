/**
 * Access Control & Authorization Utilities
 *
 * Provides role-based access control (RBAC) and subscription limit enforcement.
 *
 * Features:
 * - Admin bypass for all checks
 * - Video time limit enforcement (4 hours for free tier)
 * - Plan expiration checks
 * - Usage tracking
 */

import sql from "./sql";

/**
 * Plan Limits Configuration
 */
export const PLAN_LIMITS = {
  free: {
    videoMinutes: 240, // 4 hours = 240 minutes
    channels: 1,
    price: 0,
  },
  semi_annual: {
    videoMinutes: Infinity,
    channels: 10,
    price: 25.99,
    durationMonths: 6,
  },
  annual: {
    videoMinutes: Infinity,
    channels: 20,
    price: 49.99,
    durationMonths: 12,
  },
  unlimited: {
    videoMinutes: Infinity,
    channels: Infinity,
    price: 0, // Admin only
  },
};

/**
 * Check if user has admin privileges
 */
export async function isAdmin(userId) {
  if (!userId) return false;

  const [user] = await sql`
    SELECT role FROM auth_users WHERE id = ${userId} LIMIT 1
  `;

  return user?.role === "admin";
}

/**
 * Get user's current plan and usage
 */
export async function getUserPlanInfo(userId) {
  const [user] = await sql`
    SELECT 
      role,
      plan,
      plan_expires_at,
      video_minutes_used,
      email
    FROM auth_users 
    WHERE id = ${userId} 
    LIMIT 1
  `;

  if (!user) {
    throw new Error("User not found");
  }

  const isAdminUser = user.role === "admin";
  const planConfig = PLAN_LIMITS[user.plan] || PLAN_LIMITS.free;

  // Check if plan has expired (except admin/free)
  let isExpired = false;
  if (user.plan_expires_at && user.plan !== "free" && !isAdminUser) {
    isExpired = new Date(user.plan_expires_at) < new Date();
  }

  return {
    userId,
    email: user.email,
    role: user.role,
    plan: isExpired ? "free" : user.plan,
    isAdmin: isAdminUser,
    videoMinutesUsed: user.video_minutes_used || 0,
    videoMinutesLimit: planConfig.videoMinutes,
    channelsLimit: planConfig.channels,
    planExpiresAt: user.plan_expires_at,
    isExpired,
  };
}

/**
 * Check if user can process a video of given duration
 */
export async function canProcessVideo(userId, videoMinutes) {
  const planInfo = await getUserPlanInfo(userId);

  // Admins can process unlimited videos
  if (planInfo.isAdmin) {
    return { allowed: true, reason: "admin_access" };
  }

  // Check if user has remaining quota
  const remainingMinutes =
    planInfo.videoMinutesLimit - planInfo.videoMinutesUsed;

  if (remainingMinutes < videoMinutes) {
    return {
      allowed: false,
      reason: "quota_exceeded",
      used: planInfo.videoMinutesUsed,
      limit: planInfo.videoMinutesLimit,
      needed: videoMinutes,
    };
  }

  return { allowed: true, remainingMinutes };
}

/**
 * Track video processing usage
 */
export async function trackVideoUsage(userId, videoMinutes) {
  const planInfo = await getUserPlanInfo(userId);

  // Don't track for admins
  if (planInfo.isAdmin) {
    return { tracked: false, reason: "admin_bypass" };
  }

  await sql`
    UPDATE auth_users 
    SET video_minutes_used = video_minutes_used + ${videoMinutes}
    WHERE id = ${userId}
  `;

  return {
    tracked: true,
    newTotal: planInfo.videoMinutesUsed + videoMinutes,
  };
}

/**
 * Check if user can add more channels
 */
export async function canAddChannel(userId) {
  const planInfo = await getUserPlanInfo(userId);

  // Admins can add unlimited channels
  if (planInfo.isAdmin) {
    return { allowed: true, reason: "admin_access" };
  }

  // Count user's current channels
  const [result] = await sql`
    SELECT COUNT(*) as count 
    FROM channels 
    WHERE user_id = ${userId}
  `;

  const currentChannels = parseInt(result.count);

  if (currentChannels >= planInfo.channelsLimit) {
    return {
      allowed: false,
      reason: "channel_limit_reached",
      current: currentChannels,
      limit: planInfo.channelsLimit,
    };
  }

  return { allowed: true, remaining: planInfo.channelsLimit - currentChannels };
}

/**
 * Upgrade user's plan
 */
export async function upgradePlan(userId, newPlan) {
  const planConfig = PLAN_LIMITS[newPlan];

  if (!planConfig) {
    throw new Error("Invalid plan");
  }

  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + planConfig.durationMonths);

  await sql`
    UPDATE auth_users 
    SET 
      plan = ${newPlan},
      plan_expires_at = ${expiresAt.toISOString()}
    WHERE id = ${userId}
  `;

  return {
    plan: newPlan,
    expiresAt,
  };
}
