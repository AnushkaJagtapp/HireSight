import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, BarChart3, Map, MessageSquare, Trophy, Briefcase, ArrowRight, Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';

const featureTabs = [
  {
    id: 'debrief',
    icon: Brain,
    title: 'Second-by-Second Debrief',
    tagline: 'Deep Speech & Answer Intelligence',
    description: 'Drop any audio, video, or Zoom recording. Our AI identifies the exact second you lost recruiter engagement, flags filler words, and checks STAR structure.',
    path: '/results',
    ctaText: 'View Sample Report',
    preview: {
      type: 'debrief',
      badge: '99.4% Precision',
      stats: [
        { label: 'Public Speaking', val: '27/30' },
        { label: 'Answer Quality', val: '38/40' },
        { label: 'Consistency', val: '19/20' },
      ],
      points: [
        'Timestamped filler word transcript ("um", "like", "basically")',
        'Vocal cadence and nervous speed spikes detection',
        'STAR framework structure compliance checklist',
      ],
    },
  },
  {
    id: 'profile',
    icon: BarChart3,
    title: 'GitHub & Profile Auditor',
    tagline: 'Resume vs Codebase Gap Analysis',
    description: 'We audit your GitHub commit history, LinkedIn, and resume against target Job Descriptions to surface hidden disconnects before recruiters spot them.',
    path: '/profile',
    ctaText: 'Audit Your Profile',
    preview: {
      type: 'profile',
      badge: 'Syncs GitHub & LinkedIn',
      stats: [
        { label: 'Resume Match', val: '86%' },
        { label: 'GitHub Proof', val: '92%' },
        { label: 'Gaps Found', val: '2 critical' },
      ],
      points: [
        'Surfaces repositories that prove claimed resume skills',
        'Detects buzzwords missing verifiable commit evidence',
        'Generates automated STAR bullets for recent projects',
      ],
    },
  },
  {
    id: 'roadmap',
    icon: Map,
    title: '30/60/90 Day Custom Roadmap',
    tagline: 'Tailored Practice Regimen',
    description: 'No generic checklists. We craft a personalized day-by-day practice sprint built exclusively from your demonstrated weak spots in real interviews.',
    path: '/roadmap',
    ctaText: 'Explore Sample Roadmap',
    preview: {
      type: 'roadmap',
      badge: 'Dynamic Milestone Tracker',
      stats: [
        { label: 'Day 1–30', val: 'Delivery Fix' },
        { label: 'Day 31–60', val: 'System Design' },
        { label: 'Day 61–90', val: 'Offer Mastery' },
      ],
      points: [
        'Daily 15-minute voice rehearsals with AI feedback',
        'Curated system design architectures to memorize',
        'Salary negotiation playbooks for final round offers',
      ],
    },
  },
  {
    id: 'coach',
    icon: MessageSquare,
    title: 'AI Coach Max',
    tagline: '24/7 AI Career Coach',
    description: 'Chat anytime with Coach Max, an AI mentor who has read your full interview history, knows your target roles, and roleplays tough follow-up recruiter probes.',
    path: '/coach',
    ctaText: 'Chat with Max',
    preview: {
      type: 'coach',
      badge: 'Context-Aware AI',
      stats: [
        { label: 'Interviews Learned', val: 'All of yours' },
        { label: 'Follow-Up Probes', val: 'FAANG-level' },
        { label: 'Tone Calibration', val: 'Real-time' },
      ],
      points: [
        'Asks the exact follow-up questions recruiters ask',
        'Reviews alternative ways to phrase difficult career pivots',
        'Builds custom answer cheat sheets before your interview',
      ],
    },
  },
  {
    id: 'progress',
    icon: Trophy,
    title: 'Gamified HireScore & XP',
    tagline: 'Level Up Your Interview Stamina',
    description: 'Turn stressful job hunting into a rewarding game. Earn XP, unlock competency badges, and watch your HireScore climb from Candidate to Elite.',
    path: '/progress',
    ctaText: 'View Skill Progression',
    preview: {
      type: 'progress',
      badge: 'XP & Leveling Engine',
      stats: [
        { label: 'Current Level', val: 'Level 4' },
        { label: 'XP Multiplier', val: '2.5×' },
        { label: 'Streak', val: '14 Days' },
      ],
      points: [
        'Milestone badges: "Zero Filler Master", "System Design Wizard"',
        'Weekly confidence velocity and offer readiness curves',
        'Compare your HireScore with verified FAANG offer holders',
      ],
    },
  },
  {
    id: 'jobs',
    icon: Briefcase,
    title: 'Intelligence Job Matching',
    tagline: 'Matched on Proven Strengths',
    description: 'Get matched with high-paying companies actively hiring for the specific architectural and behavioral strengths proven in your HireSight debriefs.',
    path: '/jobs',
    ctaText: 'Browse Matched Roles',
    preview: {
      type: 'jobs',
      badge: 'Verified Skill Match',
      stats: [
        { label: 'Matches Found', val: '24 Roles' },
        { label: 'Avg Salary', val: '$215,000' },
        { label: 'Match Confidence', val: '94%' },
      ],
      points: [
        'Skip initial phone screens with verified HireScore certificates',
        'Direct hiring manager introductions for top tier candidates',
        'Salary transparency and equity valuation calculator',
      ],
    },
  },
];

export default function DynamicFeatureShowcase({ onStartDemo }) {
  const [activeTabId, setActiveTabId] = useState('debrief');
  const activeTab = featureTabs.find(t => t.id === activeTabId) || featureTabs[0];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="tag mb-4 inline-block">Complete AI Intelligence Suite</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-textMain">
            Everything you need to turn interviews into multiple offers.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-textMuted leading-relaxed">
            From second-by-second audio forensics to personalized roadmap sprints and 24/7 AI coaching — click any module below to preview the platform in action.
          </p>
        </div>

        {/* Interactive Feature Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-surfaceHigh/60 p-2 rounded-2xl border border-black/[0.06]">
          {featureTabs.map(tab => {
            const isSelected = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl text-xs font-semibold transition-all text-center ${
                  isSelected
                    ? 'bg-white text-primary shadow-md border border-primary/20 scale-[1.02]'
                    : 'text-textMuted hover:text-textMain hover:bg-white/50'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-textMuted'}`} />
                <span className="line-clamp-1">{tab.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Detail Stage Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-gradient-to-br from-surface to-white rounded-3xl border border-black/10 shadow-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            {/* Left: Feature Narrative (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeTab.tagline}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-textMain tracking-tight">
                {activeTab.title}
              </h3>

              <p className="text-base text-textMuted leading-relaxed">
                {activeTab.description}
              </p>

              <div className="space-y-3 pt-2">
                {activeTab.preview.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-textMain">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onStartDemo(activeTab.path)}
                  className="btn-primary text-sm px-6 py-3 flex items-center gap-2 group"
                >
                  <span>{activeTab.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => onStartDemo('/dashboard')}
                  className="btn-ghost text-sm px-5 py-3"
                >
                  Upload Recording
                </button>
              </div>
            </div>

            {/* Right: Dynamic Interactive Mockup Visual (6 cols) */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl border border-black/[0.08] shadow-2xl p-6 space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-black/[0.06] pb-3.5">
                  <div className="flex items-center gap-2">
                    <activeTab.icon className="w-4 h-4 text-primary" />
                    <span className="font-display font-bold text-sm text-textMain">
                      {activeTab.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {activeTab.preview.badge}
                  </span>
                </div>

                {/* 3 Key Stats Box */}
                <div className="grid grid-cols-3 gap-2.5">
                  {activeTab.preview.stats.map((st, i) => (
                    <div key={i} className="bg-surface p-3 rounded-xl border border-black/[0.05] text-center">
                      <div className="text-[10px] uppercase font-bold text-textMuted">{st.label}</div>
                      <div className="font-display font-bold text-base sm:text-lg text-primary mt-0.5">
                        {st.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated Content Box based on Tab */}
                {activeTab.id === 'debrief' && (
                  <div className="space-y-2 bg-surface p-3.5 rounded-xl border border-black/[0.05] text-xs">
                    <div className="flex justify-between text-textMuted font-mono text-[11px]">
                      <span>02:14 - Hesitation Flagged</span>
                      <span className="text-amber-600 font-bold">4 filler words</span>
                    </div>
                    <p className="italic text-textMain">
                      &quot;I basically used Redis because, like, that&apos;s what the previous tech lead set up.&quot;
                    </p>
                    <div className="p-2 bg-white rounded-lg border border-primary/20 text-primary font-semibold text-[11px]">
                      AI Rewrite: &quot;I maintained our Redis cluster with volatile-lru eviction for low-latency session caching.&quot;
                    </div>
                  </div>
                )}

                {activeTab.id === 'profile' && (
                  <div className="space-y-2 bg-surface p-3.5 rounded-xl border border-black/[0.05] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-textMain">Audited: github.com/candidate</span>
                      <span className="text-emerald-600 font-bold">Verified</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded bg-white border border-black/5 font-mono text-[10px]">
                        Go / Distributed Systems (8 repos)
                      </span>
                      <span className="px-2 py-1 rounded bg-white border border-black/5 font-mono text-[10px]">
                        PostgreSQL (23 commits)
                      </span>
                    </div>
                    <p className="text-textMuted text-[11px]">
                      Resume claims Kafka expertise; no public Kafka repos found. Coach Max suggests adding a benchmark demo repo.
                    </p>
                  </div>
                )}

                {activeTab.id === 'roadmap' && (
                  <div className="space-y-2 bg-surface p-3.5 rounded-xl border border-black/[0.05] text-xs">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Week 2 Milestone: STAR Delivery Overhaul</span>
                      <span className="text-primary">In Progress</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '65%' }} />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-textMuted">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Completed 3 mock rehearsals with Coach Max</span>
                    </div>
                  </div>
                )}

                {activeTab.id === 'coach' && (
                  <div className="space-y-2 bg-surface p-3.5 rounded-xl border border-black/[0.05] text-xs">
                    <div className="flex items-center gap-2 text-primary font-bold">
                      <span>Coach Max:</span>
                    </div>
                    <p className="text-textMain">
                      &quot;You did great explaining your distributed cache at Stripe, but you hesitated when asked about single point of failure. How would you handle Sentinel failover?&quot;
                    </p>
                    <div className="bg-white p-2 rounded-lg border border-black/5 text-textMuted font-mono text-[11px]">
                      Type your answer to practice...
                    </div>
                  </div>
                )}

                {activeTab.id === 'progress' && (
                  <div className="space-y-2 bg-surface p-3.5 rounded-xl border border-black/[0.05] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-textMain">Level 4: Staff Candidate</span>
                      <span className="font-mono text-primary font-bold">1,850 / 2,500 XP</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill bg-accent" style={{ width: '74%' }} />
                    </div>
                    <div className="flex gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-primary font-bold text-[10px]">
                        🏅 0-Filler Streak (5 Days)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold text-[10px]">
                        ⚡ System Design Guru
                      </span>
                    </div>
                  </div>
                )}

                {activeTab.id === 'jobs' && (
                  <div className="space-y-2 bg-surface p-3.5 rounded-xl border border-black/[0.05] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-textMain">Staff Distributed Systems Engineer</span>
                      <span className="font-bold text-emerald-600">$240k - $310k</span>
                    </div>
                    <div className="text-[11px] text-textMuted">Stripe · San Francisco / Remote</div>
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800 font-medium text-[11px] border border-emerald-200">
                      Match Reason: Your verified HireScore in Concurrency (96%) exceeds role threshold (90%).
                    </div>
                  </div>
                )}

                {/* Direct quick interactive link */}
                <button
                  onClick={() => onStartDemo(activeTab.path)}
                  className="w-full py-2.5 rounded-xl bg-surface hover:bg-surfaceHigh text-textMain text-xs font-semibold border border-black/[0.08] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open {activeTab.title} Interactive Demo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
