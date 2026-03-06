/**
 * Pricing Page
 *
 * Displays subscription plans with feature comparison and upgrade options.
 * Plans:
 * - Free: 4 hours video processing, 1 channel
 * - Semi-Annual ($25.99): Unlimited processing, 10 channels, 6 months
 * - Annual ($49.99): Unlimited processing, 20 channels, 12 months
 */

import { Check, Zap, Crown, Sparkles } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "4 hours of video processing",
        "1 YouTube channel",
        "Basic viral detection",
        "Standard quality exports",
        "Community support",
      ],
      limitations: ["Limited to 240 minutes total", "Single channel only"],
      cta: "Get Started",
      href: "/account/signup",
      popular: false,
      color: "gray",
    },
    {
      name: "Semi-Annual",
      price: "$25.99",
      period: "6 months",
      features: [
        "Unlimited video processing",
        "Up to 10 YouTube channels",
        "Advanced viral detection",
        "HD quality exports (1080p)",
        "Priority processing queue",
        "Email support",
      ],
      cta: "Upgrade Now",
      href: "/account/upgrade?plan=semi_annual",
      popular: true,
      color: "orange",
      badge: "Best Value",
    },
    {
      name: "Annual",
      price: "$49.99",
      period: "12 months",
      features: [
        "Unlimited video processing",
        "Up to 20 YouTube channels",
        "AI-powered viral detection",
        "4K quality exports",
        "Instant processing priority",
        "Custom clip lengths",
        "24/7 priority support",
        "API access (coming soon)",
      ],
      cta: "Go Premium",
      href: "/account/upgrade?plan=annual",
      popular: false,
      color: "purple",
      badge: "Pro",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-purple-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
      {/* Header */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles size={16} />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 font-jetbrains-mono">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-jetbrains-mono">
            Start free, upgrade when you're ready. All plans include our
            AI-powered viral detection engine.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 transition-all hover:scale-105 ${
                plan.popular
                  ? "border-orange-500 shadow-2xl shadow-orange-500/20"
                  : "border-gray-200 dark:border-gray-700 shadow-lg"
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div
                    className={`px-4 py-1 rounded-full text-xs font-bold text-white ${
                      plan.color === "orange"
                        ? "bg-orange-500"
                        : "bg-purple-500"
                    }`}
                  >
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-jetbrains-mono">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-5xl font-black text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                    /{plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div
                      className={`mt-0.5 ${
                        plan.color === "orange"
                          ? "text-orange-500"
                          : plan.color === "purple"
                            ? "text-purple-500"
                            : "text-gray-400"
                      }`}
                    >
                      <Check size={20} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-jetbrains-mono">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={plan.href}
                className={`block w-full py-4 rounded-xl font-bold text-center transition-all ${
                  plan.popular
                    ? "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30"
                    : plan.color === "purple"
                      ? "bg-purple-500 text-white hover:bg-purple-600"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* FAQ / Additional Info */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-jetbrains-mono">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 text-left">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-jetbrains-mono">
                What happens when I hit the 4-hour limit on the free plan?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-jetbrains-mono">
                You'll need to upgrade to a paid plan to continue processing
                videos. Your existing clips remain accessible.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-jetbrains-mono">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-jetbrains-mono">
                Yes! Your subscription is valid until the end of your billing
                period (6 or 12 months).
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-jetbrains-mono">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-jetbrains-mono">
                We accept all major credit cards, PayPal, and cryptocurrency
                (coming soon).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
