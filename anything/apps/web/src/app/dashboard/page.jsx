"use client";

import { TrendingUp, Monitor, Video, Clock, Zap, Crown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useUser from "@/utils/useUser";

export default function OverviewPage() {
  const { data: user } = useUser();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const { data: planInfo } = useQuery({
    queryKey: ["user-plan"],
    queryFn: async () => {
      const res = await fetch("/api/user/plan");
      if (!res.ok) throw new Error("Failed to fetch plan info");
      return res.json();
    },
  });

  const cards = [
    {
      name: "Active Channels",
      value: stats?.channelsCount || 0,
      icon: <Monitor size={20} className="text-blue-500" />,
      trend: "+2 this week",
    },
    {
      name: "Total Clips",
      value: stats?.clipsCount || 0,
      icon: <Video size={20} className="text-orange-500" />,
      trend: "+12 this week",
    },
    {
      name: "Viral Score Avg",
      value: stats?.avgScore || "0.0",
      icon: <TrendingUp size={20} className="text-green-500" />,
      trend: "Top 10%",
    },
    {
      name: "Processing Time",
      value: stats?.avgProcessTime || "0m",
      icon: <Clock size={20} className="text-purple-500" />,
      trend: "-5% vs last week",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
          Welcome back{user?.name ? `, ${user.name}` : ""}! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-jetbrains-mono mt-1">
          Here's what's happening with your clips.
        </p>
      </div>

      {/* Plan Status Card */}
      {planInfo && (
        <div
          className={`p-6 rounded-2xl border-2 ${
            planInfo.plan === "free"
              ? "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-700"
              : planInfo.plan === "unlimited"
                ? "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-300 dark:border-purple-700"
                : "bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-300 dark:border-orange-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {planInfo.isAdmin ? (
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <Crown className="text-white" size={24} />
                </div>
              ) : (
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    planInfo.plan === "free" ? "bg-gray-300" : "bg-orange-500"
                  }`}
                >
                  <Zap className="text-white" size={24} />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-jetbrains-mono capitalize">
                  {planInfo.isAdmin
                    ? "Admin Account"
                    : `${planInfo.plan.replace("_", " ")} Plan`}
                </h3>
                {planInfo.isAdmin ? (
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-jetbrains-mono">
                    Unlimited access to all features
                  </p>
                ) : planInfo.plan === "free" ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                    {planInfo.videoMinutesUsed} / {planInfo.videoMinutesLimit}{" "}
                    minutes used (
                    {Math.round(
                      (planInfo.videoMinutesUsed / planInfo.videoMinutesLimit) *
                        100,
                    )}
                    %)
                  </p>
                ) : (
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-jetbrains-mono">
                    Unlimited processing • Expires{" "}
                    {new Date(planInfo.planExpiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            {!planInfo.isAdmin && planInfo.plan === "free" && (
              <a
                href="/pricing"
                className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
              >
                Upgrade
              </a>
            )}
          </div>

          {/* Progress Bar for Free Users */}
          {!planInfo.isAdmin && planInfo.plan === "free" && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-orange-500 h-3 rounded-full transition-all"
                  style={{
                    width: `${Math.min((planInfo.videoMinutesUsed / planInfo.videoMinutesLimit) * 100, 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-jetbrains-mono">
                {planInfo.videoMinutesLimit - planInfo.videoMinutesUsed} minutes
                remaining
              </p>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.name}
            className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {card.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-400 font-jetbrains-mono uppercase">
                {card.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
              {card.value}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-jetbrains-mono mt-1">
              {card.name}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono mb-6">
            Recent Clips
          </h3>
          <div className="space-y-4">
            {stats?.recentClips?.length > 0 ? (
              stats.recentClips.map((clip) => (
                <div
                  key={clip.id}
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-all cursor-pointer"
                >
                  <div className="w-16 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <Video size={16} className="text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate font-jetbrains-mono">
                      {clip.title}
                    </p>
                    <p className="text-[10px] text-gray-500 font-jetbrains-mono">
                      {clip.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-orange-500 font-jetbrains-mono">
                      {clip.score}
                    </p>
                    <p className="text-[9px] text-gray-400 font-jetbrains-mono uppercase">
                      Score
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-gray-500 font-jetbrains-mono">
                  No clips generated yet.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono mb-6">
            System Health
          </h3>
          <div className="space-y-6">
            {[
              { name: "RSS Monitor", status: "Active", lastRun: "2m ago" },
              { name: "Whisper Worker", status: "Idle", lastRun: "15m ago" },
              { name: "FFmpeg Processor", status: "Active", lastRun: "Now" },
            ].map((worker) => (
              <div
                key={worker.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 font-jetbrains-mono">
                    {worker.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono uppercase">
                    {worker.status}
                  </p>
                  <p className="text-[10px] text-gray-400 font-jetbrains-mono">
                    {worker.lastRun}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
