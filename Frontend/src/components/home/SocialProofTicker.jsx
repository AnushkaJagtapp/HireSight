import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';

const companies = [
  { name: 'Google', symbol: 'Google' },
  { name: 'Stripe', symbol: 'Stripe' },
  { name: 'Meta', symbol: 'Meta' },
  { name: 'Amazon', symbol: 'Amazon' },
  { name: 'Microsoft', symbol: 'Microsoft' },
  { name: 'Apple', symbol: 'Apple' },
  { name: 'Netflix', symbol: 'Netflix' },
  { name: 'OpenAI', symbol: 'OpenAI' },
  { name: 'Datadog', symbol: 'Datadog' },
  { name: 'Uber', symbol: 'Uber' },
];

const liveActivityEvents = [
  '⚡ Candidate in Seattle scored 94/100 on Meta E5 Systems Debrief',
  '🔥 Priya in SF cut filler words by 72% and signed $280k Stripe offer',
  '✨ 1,842 interview minutes analyzed across 32 countries in past 24h',
  '🎯 David in NYC boosted Answer Quality from 58% to 92% in 2 weeks',
  '🚀 Sophia in Austin landed Tech Lead role at Datadog after 4 mock debriefs',
];

const testimonials = [
  {
    roleCategory: 'swe',
    name: 'Marcus Vance',
    role: 'Senior Backend Engineer',
    company: 'Now at Stripe ($275k)',
    beforeScore: 61,
    afterScore: 92,
    avatar: 'MV',
    quote:
      'I failed 4 consecutive system design interviews and had no clue why. HireSight showed me that I spent 7 minutes on minor Redis caching details while skipping the entire consistency tradeoff. Fixed it in 3 days with Coach Max and got the offer.',
  },
  {
    roleCategory: 'lead',
    name: 'Elena Rostova',
    role: 'Staff Infrastructure Lead',
    company: 'Now at Google (L6)',
    beforeScore: 67,
    afterScore: 95,
    avatar: 'ER',
    quote:
      'The speech cadence analysis caught that I had 5.2 filler words per minute whenever I felt uncertain about distributed consensus. Once I replaced "um" with intentional silence, my HireScore jumped to 95 and my interviewer gave a strong hire rating.',
  },
  {
    roleCategory: 'pm',
    name: 'Jordan Lee',
    role: 'Senior Technical PM',
    company: 'Now at Meta ($310k)',
    beforeScore: 59,
    afterScore: 90,
    avatar: 'JL',
    quote:
      'The STAR structure verification is worth 100x the price alone. HireSight literally highlighted in yellow every time I forgot to give a numeric business metric at the end of a conflict resolution story.',
  },
];

export default function SocialProofTicker({ onStartDemo }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTestimonials =
    selectedFilter === 'all'
      ? testimonials
      : testimonials.filter(t => t.roleCategory === selectedFilter);

  return (
    <section className="py-20 bg-textMain text-white overflow-hidden relative">
      {/* Background glow meshes */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Live Activity Ticker Banner */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md overflow-hidden">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider shrink-0 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Activity
            </span>
            <div className="overflow-hidden flex-1 relative h-6 flex items-center">
              <div className="animate-marquee whitespace-nowrap flex items-center gap-10 text-xs sm:text-sm text-zinc-300 font-mono">
                {liveActivityEvents.concat(liveActivityEvents).map((evt, i) => (
                  <span key={i} className="inline-flex items-center gap-2">
                    <span>{evt}</span>
                    <span className="text-zinc-600">●</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Company Logo Infinite Marquee */}
        <div className="space-y-6 text-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-zinc-400">
            Candidates Debriefed & Hired At Leading Tech Companies
          </p>
          <div className="relative overflow-hidden py-4">
            <div className="animate-marquee flex items-center gap-12 sm:gap-16 opacity-80 hover:opacity-100 transition-opacity">
              {companies.concat(companies).map((c, i) => (
                <div
                  key={i}
                  className="font-display font-bold text-xl sm:text-2xl text-zinc-300 hover:text-white transition-colors cursor-default tracking-tight flex items-center gap-2"
                >
                  <span className="text-primary font-mono text-lg">/</span>
                  {c.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Header & Category Filter */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Real Turnaround Stories
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-white mt-2">
                From repeated rejections to dream offers.
              </h3>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'All Roles' },
                { id: 'swe', label: 'Software Engineers' },
                { id: 'lead', label: 'Tech Leads' },
                { id: 'pm', label: 'Product' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    selectedFilter === f.id
                      ? 'bg-white text-textMain shadow'
                      : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTestimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between hover:border-primary/40 transition-colors"
              >
                <div className="space-y-4">
                  {/* Star Rating & Verified Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-accent">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-accent" />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Verified Offer
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
                  {/* HireScore Delta */}
                  <div className="flex items-center justify-between text-xs bg-white/5 px-3 py-2 rounded-xl">
                    <span className="text-zinc-400">HireScore™ Progress:</span>
                    <span className="font-mono font-bold text-white flex items-center gap-1.5">
                      <span className="text-zinc-400">{t.beforeScore}</span>
                      <span className="text-accent">→</span>
                      <span className="text-emerald-400">{t.afterScore}/100</span>
                      <span className="text-[10px] text-emerald-400 font-normal">
                        (+{t.afterScore - t.beforeScore})
                      </span>
                    </span>
                  </div>

                  {/* Candidate Bio */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center font-bold text-xs text-white">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-white">{t.name}</div>
                      <div className="text-[11px] text-accent font-medium">{t.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="pt-4 text-center">
            <button
              onClick={() => onStartDemo('/dashboard')}
              className="btn-primary text-sm px-8 py-3.5 inline-flex items-center gap-2 shadow-xl hover:scale-[1.02] transition-transform"
            >
              <span>Start Your Debrief & Join Top Candidates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
