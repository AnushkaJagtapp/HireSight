import { useState } from 'react';
import { ArrowRight, CheckCircle2, Target } from 'lucide-react';

const roles = [
  { id: 'fullstack', label: 'Fullstack Engineer', baseline: 64, potential: 92 },
  { id: 'backend', label: 'Backend / Systems', baseline: 62, potential: 94 },
  { id: 'frontend', label: 'Frontend / UI Architect', baseline: 66, potential: 93 },
  { id: 'aiml', label: 'AI / ML Engineer', baseline: 61, potential: 95 },
  { id: 'techlead', label: 'Tech Lead / Staff', baseline: 59, potential: 91 },
  { id: 'pm', label: 'Product Manager', baseline: 65, potential: 90 },
];

const tiers = [
  { id: 'tier1', label: 'FAANG / Tier 1 (Google, Stripe, Meta)', multiplier: '3.6×' },
  { id: 'unicorn', label: 'High-Growth Unicorn (Datadog, Figma)', multiplier: '3.2×' },
  { id: 'startup', label: 'Series A–C Venture Startup', multiplier: '2.8×' },
  { id: 'enterprise', label: 'Global Enterprise / Fortune 500', multiplier: '2.5×' },
];

const blindSpots = [
  {
    id: 'system_design',
    label: 'System Design & Trade-Offs',
    tips: [
      'Pinpoint distributed state bottlenecks in second 30',
      'Frame SLA & capacity math before drawing boxes',
      'Coach Max simulation on node failure recovery',
    ],
  },
  {
    id: 'behavioral',
    label: 'Behavioral & STAR Structuring',
    tips: [
      'Eliminate rambling intros under 30 seconds',
      'State quantifiable business results with metric punchlines',
      'Calibrate conflict resolution to senior ownership rubric',
    ],
  },
  {
    id: 'nerves_fillers',
    label: 'Vocal Nerves & Filler Words',
    tips: [
      'Real-time pacing detector keeps you in the 130–150 wpm zone',
      'Cut subconscious "um, basically, like" fillers by 65%',
      'Audio tone stabilizer boosts vocal presence and confidence',
    ],
  },
  {
    id: 'coding_comm',
    label: 'Live Coding Communication',
    tips: [
      'Voice-while-typing synchronization',
      'Proactively voice edge cases before writing line 1',
      'Explain big-O trade-offs with structured clarity',
    ],
  },
];

export default function ReadinessCalculator({ onStartDemo }) {
  const [selectedRole, setSelectedRole] = useState(roles[0].id);
  const [selectedTier, setSelectedTier] = useState(tiers[0].id);
  const [selectedBlindSpot, setSelectedBlindSpot] = useState(blindSpots[0].id);

  const activeRole = roles.find(r => r.id === selectedRole) || roles[0];
  const activeTier = tiers.find(t => t.id === selectedTier) || tiers[0];
  const activeSpot = blindSpots.find(b => b.id === selectedBlindSpot) || blindSpots[0];

  const scoreGain = activeRole.potential - activeRole.baseline;

  return (
    <section id="readiness" className="py-24 px-4 sm:px-6 lg:px-8 bg-surfaceHigh/40 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="tag mb-4 inline-block">Interactive Diagnostic</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-textMain">
            Calculate your projected HireScore™ readiness.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-textMuted leading-relaxed">
            Answer 3 quick questions to see your baseline score, projected improvement with HireSight AI debriefs, and tailored debrief strategy.
          </p>
        </div>

        {/* Interactive Calculator Body */}
        <div className="bg-white rounded-3xl border border-black/10 shadow-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Input Selection Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Role */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-3">
                1. Select Target Position
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                      selectedRole === r.id
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-surface hover:bg-surfaceHigh text-textMain border-black/[0.08]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Tier */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-3">
                2. Target Company Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {tiers.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTier(t.id)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                      selectedTier === t.id
                        ? 'bg-textMain text-white border-textMain shadow-sm'
                        : 'bg-surface hover:bg-surfaceHigh text-textMain border-black/[0.08]'
                    }`}
                  >
                    <span>{t.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-white/20">
                      {t.multiplier}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Blind Spot */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-3">
                3. Your Biggest Interview Hurdle
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {blindSpots.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBlindSpot(b.id)}
                    className={`p-3.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                      selectedBlindSpot === b.id
                        ? 'bg-purple-50 text-primary border-primary ring-1 ring-primary/30'
                        : 'bg-surface hover:bg-surfaceHigh text-textMain border-black/[0.08]'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Dynamic Calculation Output Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-surface to-purple-50/50 rounded-2xl p-6 sm:p-7 border border-primary/20 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-black/[0.08] pb-4">
                <div>
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                    Diagnostic Prediction
                  </span>
                  <h4 className="font-display font-bold text-lg text-textMain">
                    {activeRole.label}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-textMuted">Projected Uplift</div>
                  <div className="text-sm font-bold text-emerald-600 font-mono">
                    +{scoreGain} pts (+{Math.round((scoreGain / activeRole.baseline) * 100)}%)
                  </div>
                </div>
              </div>

              {/* Dynamic Score Ring Comparison */}
              <div className="py-6 flex items-center justify-around gap-4">
                {/* Baseline */}
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="#e4e4e7" strokeWidth="3.5" />
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="#a1a1aa"
                        strokeWidth="3.5"
                        strokeDasharray="100.5"
                        strokeDashoffset={100.5 - (activeRole.baseline / 100) * 100.5}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute font-display font-bold text-base text-textMuted">
                      {activeRole.baseline}
                    </span>
                  </div>
                  <span className="block text-xs font-semibold text-textMuted mt-2">
                    Current Baseline
                  </span>
                  <span className="text-[10px] text-textMuted">Without debrief</span>
                </div>

                <div className="text-2xl font-bold text-primary font-mono">→</div>

                {/* Projected */}
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="#ede9fe" strokeWidth="4" />
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="#6d28d9"
                        strokeWidth="4"
                        strokeDasharray="100.5"
                        strokeDashoffset={100.5 - (activeRole.potential / 100) * 100.5}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute font-display font-bold text-lg text-primary">
                      {activeRole.potential}
                    </span>
                  </div>
                  <span className="block text-xs font-bold text-primary mt-2">
                    Target HireScore™
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Offer Guarantee Zone</span>
                </div>
              </div>

              {/* Tailored 3-Point Action Plan */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold text-textMain flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-primary" />
                  Your 3-Point Debrief Focus:
                </div>
                <div className="space-y-2">
                  {activeSpot.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-textMain bg-white p-2.5 rounded-xl border border-black/5 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct CTA Button */}
            <div className="pt-4 border-t border-black/[0.06]">
              <button
                onClick={() => onStartDemo('/roadmap')}
                className="w-full btn-primary py-3.5 text-xs font-bold flex items-center justify-center gap-2 group shadow-md"
              >
                <span>Unlock Your Full 30/60/90 Day Roadmap</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="text-[10px] text-center text-textMuted mt-2">
                Calibrated to {activeTier.multiplier} offer multiplier for {activeTier.label}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
