import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function BeforeAfterComparison({ onStartDemo }) {
  const [activeTab, setActiveTab] = useState('with'); // 'without' or 'with' or 'split'
  
  const withoutPoints = [
    { text: 'Ghosted after round 3 with generic automated rejection emails', icon: XCircle },
    { text: 'Unconscious filler words ("um, like, basically") diluting technical credibility', icon: XCircle },
    { text: 'Rambling 4-minute answers without clear STAR business punchlines', icon: XCircle },
    { text: 'Repeating the identical interview blind spots across 10+ company loops', icon: XCircle },
    { text: 'Low offer conversion rate (~18%) and leaving money on the table', icon: XCircle },
  ];

  const withPoints = [
    { text: 'Second-by-second audio & video debrief in under 60 seconds', icon: CheckCircle2 },
    { text: 'Filler words pinpointed and cut by 68% with real-time speech pacing pacing', icon: CheckCircle2 },
    { text: 'Crisp, punchy STAR structuring calibrated against FAANG rubrics', icon: CheckCircle2 },
    { text: 'Personalized 30/60/90 day roadmap focused exclusively on your gaps', icon: CheckCircle2 },
    { text: '3.4× higher offer rate with multiple competing six-figure offers', icon: CheckCircle2 },
  ];

  return (
    <section id="comparison" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="tag mb-4 inline-block">The HireSight Advantage</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-textMain">
            The difference between another rejection and multiple offers.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-textMuted leading-relaxed">
            Candidates who use HireSight don&apos;t just hope for the best — they walk into their next interview knowing their exact speech cadence, technical depth, and story punchlines.
          </p>
        </div>

        {/* Dynamic Mode Switcher */}
        <div className="flex justify-center">
          <div className="bg-surfaceHigh p-1.5 rounded-2xl flex items-center gap-1 border border-black/[0.08] shadow-inner">
            <button
              onClick={() => setActiveTab('without')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'without'
                  ? 'bg-rose-50 text-rose-700 shadow-sm border border-rose-200'
                  : 'text-textMuted hover:text-textMain'
              }`}
            >
              Without HireSight
            </button>
            <button
              onClick={() => setActiveTab('split')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'split'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-textMuted hover:text-textMain'
              }`}
            >
              Side-by-Side Comparison
            </button>
            <button
              onClick={() => setActiveTab('with')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'with'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200'
                  : 'text-textMuted hover:text-textMain'
              }`}
            >
              With HireSight AI
            </button>
          </div>
        </div>

        {/* Side-by-Side Grid or Single Tab View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Traditional Way */}
          <div
            className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between ${
              activeTab === 'with'
                ? 'opacity-40 grayscale-[50%] bg-surface/50 border-black/[0.06]'
                : 'bg-rose-50/30 border-rose-200 shadow-lg'
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-100/70 px-2.5 py-1 rounded-full">
                    Traditional Prep
                  </span>
                  <h3 className="font-display font-bold text-2xl text-textMain mt-2">
                    Interviewing Blind
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-lg">
                  ❌
                </div>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-white/80 rounded-2xl border border-rose-100">
                <div>
                  <div className="text-xs text-textMuted">Average Rejection Wait</div>
                  <div className="font-display text-xl font-bold text-rose-600">3–4 Weeks</div>
                </div>
                <div>
                  <div className="text-xs text-textMuted">Actionable Feedback</div>
                  <div className="font-display text-xl font-bold text-rose-600">0% (Black Box)</div>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-3.5">
                {withoutPoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-textMuted">
                    <item.icon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-rose-100/70 text-xs text-rose-700 font-medium">
              Candidates typically repeat the same 3 structural mistakes across all interviews.
            </div>
          </div>

          {/* Card 2: With HireSight AI */}
          <div
            className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
              activeTab === 'without'
                ? 'opacity-40 grayscale-[50%] bg-surface/50 border-black/[0.06]'
                : 'bg-gradient-to-b from-white to-purple-50/40 border-primary/30 shadow-2xl ring-1 ring-primary/20'
            }`}
          >
            {/* Top Glow Ribbon */}
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-primary via-purple-500 to-accent" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                    HireSight Method
                  </span>
                  <h3 className="font-display font-bold text-2xl text-textMain mt-2 flex items-center gap-2">
                    Interviewing with Intelligence <Sparkles className="w-5 h-5 text-accent" />
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg shadow-sm">
                  ✨
                </div>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-white rounded-2xl border border-primary/15 shadow-sm">
                <div>
                  <div className="text-xs text-textMuted">Debrief Turnaround</div>
                  <div className="font-display text-xl font-bold text-primary">60 Seconds</div>
                </div>
                <div>
                  <div className="text-xs text-textMuted">Offer Rate Increase</div>
                  <div className="font-display text-xl font-bold text-emerald-600">3.4× Higher</div>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-3.5">
                {withPoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-textMain font-medium">
                    <item.icon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-primary/15">
              <button
                onClick={() => onStartDemo('/dashboard')}
                className="w-full btn-primary text-sm py-3.5 flex items-center justify-center gap-2 group"
              >
                <span>Experience the HireSight Difference</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
