"use client";

import { useState } from "react";
import { Card, Chip, Button } from "@heroui/react";
import { Check, X, Zap, Users, Briefcase, Sparkle, Sparkles } from "lucide-react";
import Link from "next/link";

const seekerPlans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    badge: null,
    features: [
      "Up to 3 applications/month",
      "Up to 10 saved jobs",
      "Basic profile",
      "Email alerts",
    ],
    cta: "Get Started",
    href: "/register",
    highlighted: false,
    
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    badge: "Popular",
    features: [
      "Up to 30 applications/month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
    cta: "Upgrade to Pro",
    href: "/register",
    highlighted: true,
   
  },
  {
    name: "Premium",
    price: "$39",
    period: "/mo",
    badge: null,
    features: [
      "Unlimited applications",
      "Unlimited saved jobs",
      "Profile boost",
      "Early access to new jobs",
      "Priority support",
    ],
    cta: "Go Premium",
    href: "/register",
    highlighted: false,
   
  },
];

const recruiterPlans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    badge: null,
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard visibility",
    ],
    noFeatures: ["Analytics", "Email support"],
    cta: "Get Started",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/mo",
    badge: "Popular",
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
    cta: "Upgrade to Growth",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$149",
    period: "/mo",
    badge: null,
    features: [
      "Up to 50 active job posts",
      "Advanced analytics",
      "Featured listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
    cta: "Go Enterprise",
    href: "/register",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes. All plans support upgrade or downgrade at any time with prorated billing — you only pay for what you use.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "All paid plans come with a 14-day money-back guarantee. If you're not satisfied, we'll refund your payment, no questions asked.",
  },
  {
    q: "How is payment processed?",
    a: "Payments are securely processed via Stripe. We support all major credit and debit cards.",
  },
  {
    q: "Can new companies post jobs for free?",
    a: "Yes. New companies can post up to 3 active jobs for free — ideal for their first year of hiring — and upgrade to Growth or Enterprise as their hiring scales.",
  },
  {
    q: "What happens if I exceed my limit?",
    a: "You'll be prompted to upgrade your plan. You won't lose any existing data — just upgrade and continue where you left off.",
  },
  {
    q: "Can I hold both a seeker and recruiter plan?",
    a: "No. Seeker and recruiter plans are mutually exclusive — you can only hold one type at a time. If you'd like to switch roles, you'll need to cancel your current plan first.",
  },
];

function PlanCard({ plan, icon: Icon }) {
  return (
    <Card className={`relative flex flex-col ${plan.highlighted ? "bg-purple-500/10 border-purple-500/30" : "bg-white/[0.03] border-purple-500/10"}`}>
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Chip size="sm" className="bg-purple-600 text-white border-0 shadow-lg shadow-purple-500/30">
            {plan.badge}
          </Chip>
        </div>
      )}
      <Card.Header className="pb-0">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${plan.highlighted ? "bg-purple-500/20" : "bg-white/5"}`}>
            <Icon size={16} className="text-purple-400" />
          </div>
          <Card.Title className="text-white font-semibold">{plan.name}</Card.Title>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold text-white">{plan.price}</span>
          {plan.period && <span className="text-white/40 text-sm mb-1">{plan.period}</span>}
        </div>
      </Card.Header>

      <Card.Content className="flex-1 pt-4 space-y-2">
        {plan.features.map((f) => (
          <div key={f} className="flex items-center gap-2 text-sm text-white/70">
            <Check size={14} className="text-green-400 shrink-0" />
            {f}
          </div>
        ))}
        {plan.noFeatures?.map((f) => (
          <div key={f} className="flex items-center gap-2 text-sm text-white/30">
            <X size={14} className="text-white/20 shrink-0" />
            {f}
          </div>
        ))}
      </Card.Content>

      <Card.Footer>
            <form className=" w-full " action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link"  className={`w-full p-2 font-medium rounded-xl transition-all ${
              plan.highlighted
                ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                : "bg-white/5 hover:bg-white/10 text-white/70 border border-white/10"
            }`}>
          Checkout
        </button>
      </section>
    </form>
       
      </Card.Footer>
    </Card>
  );
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("seeker");

  return (
    <div className="min-h-screen bg-[#0F1117] px-6 py-20 mt-10">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <Chip className="bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Simple Pricing
          </Chip>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Plans for every <span className="text-purple-400">stage</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Whether you&apos;re looking for your next opportunity or building a team, we have a plan that fits.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center rounded-2xl border border-purple-500/10 bg-white/[0.03] p-1 mt-4">
            <button
              onClick={() => setActiveTab("seeker")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "seeker"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Users size={15} />
              Job Seeker
            </button>
            <button
              onClick={() => setActiveTab("recruiter")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "recruiter"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Briefcase size={15} />
              Recruiter
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
              {activeTab === "seeker" ? <Users size={18} className="text-purple-400" /> : <Briefcase size={18} className="text-purple-400" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {activeTab === "seeker" ? "Job Seeker Plans" : "Recruiter Plans"}
              </h2>
              <p className="text-white/40 text-sm">
                {activeTab === "seeker" ? "Find your dream job faster." : "Hire the best talent at scale."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(activeTab === "seeker" ? seekerPlans : recruiterPlans).map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                icon={activeTab === "seeker" ? Users : Briefcase}
              />
            ))}
          </div>
        </div>

        {/* Note */}
        <Card className="bg-purple-500/5 border-purple-500/20">
          <Card.Content className="flex items-start gap-3">
            <Zap size={18} className="text-purple-400 shrink-0 mt-0.5" />
            <p className="text-white/60 text-sm leading-relaxed">
              New companies can post up to <span className="text-white font-medium">3 active jobs for free</span> — ideal for their first year of hiring — and upgrade to Growth or Enterprise as their hiring scales. All paid plans include a <span className="text-white font-medium">14-day money-back guarantee</span> and support upgrade/downgrade at any time with prorated billing.
            </p>
          </Card.Content>
        </Card>

        {/* FAQ */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-white/40 text-sm">Everything you need to know about our plans.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq) => (
              <Card key={faq.q} className="bg-white/[0.03] border-purple-500/10">
                <Card.Header>
                  <Card.Title className="text-white font-medium text-base">{faq.q}</Card.Title>
                </Card.Header>
                <Card.Content className="pt-0">
                  <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}