import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Sparkles, ArrowRight, Volume2, Mic, Award } from 'lucide-react';

const scenarios = [
  {
    id: 'stripe-sys',
    company: 'Stripe',
    role: 'Staff Infrastructure Engineer',
    question: 'How do you prevent duplicate charges in a distributed payment system experiencing network partitions?',
    score: 91,
    grade: 'A',
    metrics: {
      answerQuality: 37,
      answerMax: 40,
      delivery: 26,
      deliveryMax: 30,
      consistency: 19,
      consistencyMax: 20,
      fillerScore: 9,
      fillerMax: 10,
    },
    fillers: ['basically (2x)', 'kind of (1x)'],
    transcriptSnippet: [
      { text: 'To ensure idempotent charge processing, ', type: 'normal' },
      { text: 'we issue client-generated idempotency keys ', type: 'tech' },
      { text: 'persisted into a high-availability Redis cluster with atomic setnx operations. ', type: 'highlight' },
      { text: 'Now, um, basically, ', type: 'filler' },
      { text: 'if a network partition occurs while awaiting downstream processor confirmation, ', type: 'normal' },
      { text: 'we return HTTP 409 Conflict with a cached request token, ensuring zero double debits across 4.2M daily transactions.', type: 'highlight' },
    ],
    weakness: 'Brief hesitation at 02:14 before clarifying database transaction isolation levels.',
    maxAdvice: {
      recruitersHeard: 'Candidate was hesitant about serializable vs read-committed isolation under high concurrency.',
      betterScript: '"Under partition, our DB connection pool defaults to snapshot isolation with optimistic concurrency checking via row versioning."',
    },
  },
  {
    id: 'google-behav',
    company: 'Google',
    role: 'Senior Software Engineer (L5)',
    question: 'Tell me about a time you strongly disagreed with a Staff Engineer on technical direction.',
    score: 87,
    grade: 'A-',
    metrics: {
      answerQuality: 35,
      answerMax: 40,
      delivery: 25,
      deliveryMax: 30,
      consistency: 18,
      consistencyMax: 20,
      fillerScore: 9,
      fillerMax: 10,
    },
    fillers: ['like (3x)', 'you know (1x)'],
    transcriptSnippet: [
      { text: 'During our migration to gRPC, our staff engineer wanted a single monolithic protobuf schema. ', type: 'normal' },
      { text: 'I felt this would create huge deployment bottlenecks for our 8 microservices. ', type: 'normal' },
      { text: 'Instead of debating opinion, ', type: 'highlight' },
      { text: 'I ran a 48-hour canary benchmark with distributed tracing ', type: 'tech' },
      { text: 'which proved independent schema versioning reduced deploy rollback incidents by 41%. ', type: 'highlight' },
      { text: 'He conceded, and we adopted domain-specific schemas.', type: 'highlight' },
    ],
    weakness: 'Rambled for 50 seconds setting up team background before stating the actual conflict.',
    maxAdvice: {
      recruitersHeard: 'Too much time spent on team gossip before arriving at the actionable disagreement.',
      betterScript: '"State the exact technical tradeoff in sentence 1: \'We disagreed on single monolithic protobufs vs federated domain schemas for our 8 microservices.\'"',
    },
  },
  {
    id: 'meta-arch',
    company: 'Meta',
    role: 'Production Engineer (E5)',
    question: 'How do you handle thundering herd and cache stampedes across a global memcached layer?',
    score: 94,
    grade: 'A+',
    metrics: {
      answerQuality: 39,
      answerMax: 40,
      delivery: 28,
      deliveryMax: 30,
      consistency: 19,
      consistencyMax: 20,
      fillerScore: 8,
      fillerMax: 10,
    },
    fillers: ['uh (1x)', 'actually (2x)'],
    transcriptSnippet: [
      { text: 'To guard against cache stampede when hot keys expire, ', type: 'normal' },
      { text: 'we combine deterministic probabilistic early expiration (XFetch algorithm) ', type: 'tech' },
      { text: 'with mutual exclusion mutex leases. ', type: 'highlight' },
      { text: 'Only one worker thread recomputes the expensive query from Cassandra, ', type: 'tech' },
      { text: 'while concurrent callers receive slightly stale data for up to 350ms, ', type: 'highlight' },
      { text: 'completely flattening traffic spikes and maintaining 99.999% availability.', type: 'highlight' },
    ],
    weakness: 'Spoke at 165 wpm in the first minute before settling into a confident rhythm.',
    maxAdvice: {
      recruitersHeard: 'Exceptional deep technical clarity; candidate demonstrated real production battle testing.',
      betterScript: '"Breathe and slow your opening tempo. Your technical substance is elite; let your delivery match your intellect."',
    },
  },
];

export default function InteractiveDebriefSimulator({ onStartDemo }) {
  const [selectedScenarioId, setSelectedScenarioId] = useState('stripe-sys');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const currentScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-surface border-y border-black/[0.06]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Interactive AI Debrief Playground
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-textMain">
            See the exact debrief recruiters never give you.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-textMuted leading-relaxed">
            Select a live interview recording scenario below to explore second-by-second speech sentiment, filler word detection, and AI Coach Max’s instant rewrites.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {scenarios.map(s => {
            const isSelected = s.id === selectedScenarioId;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedScenarioId(s.id);
                  setIsPlayingAudio(false);
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-textMain text-white shadow-lg scale-[1.02]'
                    : 'bg-white text-textMuted hover:text-textMain border border-black/[0.08] hover:border-black/20'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: isSelected ? '#f5c518' : '#a1a1aa' }} />
                <span>{s.company}</span>
                <span className="text-xs font-normal opacity-75">· {s.role.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Live Simulator Interactive Console */}
        <div className="bg-white rounded-2xl border border-black/10 shadow-xl overflow-hidden">
          {/* Top Console Bar */}
          <div className="px-6 py-4 bg-surfaceHigh/60 border-b border-black/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-textMain">
                  {currentScenario.company} Interview Debrief
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  Grade {currentScenario.grade}
                </span>
              </div>
              <p className="text-xs text-textMuted mt-0.5">
                Target Role: {currentScenario.role}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Overall HireScore Ring */}
              <div className="flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-xl border border-black/[0.07] shadow-sm">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-textMuted">HireScore™</div>
                  <div className="text-xs font-bold text-textMain">Passed Rubric</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-display font-bold text-sm shadow">
                  {currentScenario.score}
                </div>
              </div>

              {/* Play Audio Simulation Button */}
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isPlayingAudio
                    ? 'bg-accent text-textMain font-bold shadow'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlayingAudio ? 'Listening...' : 'Simulate Audio'}
              </button>
            </div>
          </div>

          {/* Question Banner */}
          <div className="px-6 py-3.5 bg-amber-50/40 border-b border-amber-200/40 flex items-start gap-3 text-xs sm:text-sm">
            <span className="font-bold text-amber-800 shrink-0">Recruiter Prompt:</span>
            <span className="text-textMain font-medium italic">&quot;{currentScenario.question}&quot;</span>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Interactive Transcript with Color Highlights (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-semibold text-sm text-textMain flex items-center gap-2">
                  <Mic className="w-4 h-4 text-primary" /> Synchronized AI Speech Transcript
                </h4>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1 text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> High Impact
                  </span>
                  <span className="inline-flex items-center gap-1 text-amber-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Filler/Hesitation
                  </span>
                  <span className="inline-flex items-center gap-1 text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary" /> Technical Depth
                  </span>
                </div>
              </div>

              {/* Transcript Body */}
              <div className="p-4 rounded-xl bg-surface border border-black/[0.06] text-sm leading-relaxed min-h-[140px]">
                {currentScenario.transcriptSnippet.map((segment, idx) => {
                  if (segment.type === 'highlight') {
                    return (
                      <span
                        key={idx}
                        className="bg-emerald-100/70 text-emerald-950 font-medium px-1 rounded mx-0.5 border-b border-emerald-400"
                        title="High-impact STAR quantification"
                      >
                        {segment.text}
                      </span>
                    );
                  }
                  if (segment.type === 'filler') {
                    return (
                      <span
                        key={idx}
                        className="bg-amber-100 text-amber-900 font-semibold px-1 rounded mx-0.5 border-b-2 border-amber-500"
                        title="Filler word detected"
                      >
                        {segment.text}
                      </span>
                    );
                  }
                  if (segment.type === 'tech') {
                    return (
                      <span
                        key={idx}
                        className="text-primary font-semibold underline decoration-primary/40 underline-offset-2"
                        title="Key technical competency"
                      >
                        {segment.text}
                      </span>
                    );
                  }
                  return <span key={idx}>{segment.text}</span>;
                })}
              </div>

              {/* Dynamic Soundwave Visualizer if Playing */}
              {isPlayingAudio && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-primary/5 rounded-xl border border-primary/20 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Volume2 className="w-4 h-4 animate-bounce" />
                    <span>Analyzing pitch variance, cadence jitter & vocal stamina...</span>
                  </div>
                  <div className="flex items-end gap-1 h-5">
                    {[40, 90, 60, 100, 75, 45, 80, 95, 60, 85].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 bg-primary rounded-full animate-pulse"
                        style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Coach Max Script Rewrite Card */}
              <div className="rounded-xl border border-primary/20 bg-purple-50/50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-bold">
                      Max
                    </div>
                    <div>
                      <div className="text-xs font-bold text-textMain">AI Coach Max Breakdown</div>
                      <div className="text-[10px] text-primary font-semibold">Interview Intelligence Engine</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-medium text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full">
                    Detected Weakness
                  </div>
                </div>

                <p className="text-xs text-textMuted">
                  {currentScenario.weakness}
                </p>

                <div className="space-y-2 pt-2 border-t border-primary/10">
                  <div className="text-[11px] font-semibold text-textMuted uppercase tracking-wider">
                    Recommended Script Fix:
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-primary/15 text-xs text-textMain font-mono leading-relaxed shadow-sm">
                    {currentScenario.maxAdvice.betterScript}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Category Scores (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="font-display font-semibold text-sm text-textMain flex items-center gap-2">
                <Award className="w-4 h-4 text-accent fill-accent" /> Category Scoring Breakdown
              </h4>

              <div className="space-y-3 bg-surface p-4 rounded-xl border border-black/[0.06]">
                {/* Answer Quality */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-textMain">Answer Quality & STAR</span>
                    <span className="font-bold text-primary">
                      {currentScenario.metrics.answerQuality} / {currentScenario.metrics.answerMax}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(currentScenario.metrics.answerQuality / currentScenario.metrics.answerMax) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Delivery & Public Speaking */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-textMain">Tone & Speech Cadence</span>
                    <span className="font-bold text-primary">
                      {currentScenario.metrics.delivery} / {currentScenario.metrics.deliveryMax}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill bg-cyan-600"
                      style={{
                        width: `${(currentScenario.metrics.delivery / currentScenario.metrics.deliveryMax) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Consistency */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-textMain">Technical Depth & Accuracy</span>
                    <span className="font-bold text-primary">
                      {currentScenario.metrics.consistency} / {currentScenario.metrics.consistencyMax}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill bg-amber-500"
                      style={{
                        width: `${(currentScenario.metrics.consistency / currentScenario.metrics.consistencyMax) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Filler Words */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-textMain">Filler Word Control</span>
                    <span className="font-bold text-primary">
                      {currentScenario.metrics.fillerScore} / {currentScenario.metrics.fillerMax}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill bg-emerald-500"
                      style={{
                        width: `${(currentScenario.metrics.fillerScore / currentScenario.metrics.fillerMax) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Detected Filler Word Counter */}
              <div className="p-3.5 bg-white rounded-xl border border-black/[0.06] shadow-sm">
                <div className="text-xs font-semibold text-textMain mb-2 flex items-center justify-between">
                  <span>Detected Fillers in Sample</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Below 2.5/min target</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentScenario.fillers.map((f, i) => (
                    <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Launch Full Demo CTA */}
              <div className="pt-2">
                <button
                  onClick={() => onStartDemo('/dashboard')}
                  className="w-full btn-primary text-sm py-3 flex items-center justify-center gap-2 group"
                >
                  <span>Debrief Your Own Interview</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-[11px] text-center text-textMuted mt-2">
                  Works with Zoom, Teams, Google Meet, or MP3/MP4 uploads
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
