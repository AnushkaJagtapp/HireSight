import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Sparkles, Volume2, CheckCircle2, AlertTriangle, TrendingUp, Zap } from 'lucide-react';

const timelineEvents = [
  {
    time: '01:14',
    seconds: 74,
    type: 'success',
    title: 'Strong Scope Definition',
    subtitle: 'Clear boundaries set for Stripe payments API scale',
    score: 94,
    tag: 'STAR Framing',
    quote: '"Before jumping into schema, let\'s clarify if we need multi-region active-active or active-passive consistency for idempotent transfers."',
    tip: 'Recruiter marked this as senior engineer instincts.',
  },
  {
    time: '04:22',
    seconds: 262,
    type: 'warning',
    title: 'Filler Words & Passive Voice',
    subtitle: '6 filler words ("like, basically, um") in 45s',
    score: 62,
    tag: 'Delivery Dip',
    quote: '"So basically, um, we kind of like had Redis, but I think maybe someone else configured the eviction policy..."',
    tip: 'Coach Max: Own your decisions with active verbs. Say: "I selected Redis cluster with volatile-lru eviction."',
  },
  {
    time: '08:45',
    seconds: 525,
    type: 'success',
    title: 'Flawless Concurrency Trade-Off',
    subtitle: 'Distributed lock leases & idempotency keys',
    score: 96,
    tag: 'Technical Depth',
    quote: '"We mitigated race conditions with a distributed lock using Redlock with 200ms leases, combined with DB unique constraints."',
    tip: 'Confidence spiked to 98%. Recruiter noted high technical rigor.',
  },
  {
    time: '12:10',
    seconds: 730,
    type: 'highlight',
    title: 'Recruiter Engagement Peak',
    subtitle: 'Proactive failure recovery discussion',
    score: 92,
    tag: 'System Design',
    quote: '"If the payment webhook fails after 5 retries, we push to a dead-letter queue with alerting instead of dropping state."',
    tip: 'Answer matched Stripe L5 staff scoring rubric.',
  },
];

// 24 simulated audio bar heights
const initialBars = [
  35, 55, 78, 42, 60, 92, 70, 48, 85, 96, 62, 38, 75, 88, 54, 98, 67, 43, 82, 91, 58, 72, 84, 45
];

export default function HeroDebriefPreview({ onLaunchDemo }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [playbackSec, setPlaybackSec] = useState(74);
  const [barHeights, setBarHeights] = useState(initialBars);

  // Animate audio waveform when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBarHeights(prev =>
        prev.map(h => {
          const delta = (Math.random() * 40 - 20);
          return Math.max(18, Math.min(100, Math.round(h + delta)));
        })
      );
      setPlaybackSec(prev => (prev >= 800 ? 60 : prev + 1));
    }, 180);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeEvent = timelineEvents[activeEventIndex];

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Ambient background glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-purple-500/15 to-accent/20 rounded-3xl blur-2xl opacity-75 -z-10 animate-pulse-soft" />

      {/* Floating Micro-Badge Top-Right: Live HireScore */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute -top-5 -right-3 sm:-right-5 z-20 bg-white/95 dark:bg-black/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-primary/20 flex items-center gap-3 animate-float-slow"
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="none" stroke="#f4f4f5" strokeWidth="3" />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="#6d28d9"
              strokeWidth="3.5"
              strokeDasharray="100.5"
              strokeDashoffset={100.5 - (89 / 100) * 100.5}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute font-display font-bold text-xs text-primary">89</span>
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-textMuted flex items-center gap-1">
            <Zap className="w-3 h-3 text-accent fill-accent" /> HireScore™
          </div>
          <div className="text-xs font-semibold text-textMain">Top 4% Candidate</div>
        </div>
      </motion.div>

      {/* Floating Micro-Badge Bottom-Left: AI Coach Max */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="hidden sm:flex absolute -bottom-5 -left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-primary/25 items-center gap-3 animate-float-reverse"
      >
        <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-sm font-bold">
          🤖
        </div>
        <div className="text-left">
          <div className="text-[11px] font-bold text-primary flex items-center gap-1">
            Coach Max <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Active</span>
          </div>
          <div className="text-xs text-textMain font-medium">&quot;Architecture recovery boosted score +18%&quot;</div>
        </div>
      </motion.div>

      {/* Main Glassmorphic Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-black/10 shadow-2xl space-y-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              AC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-textMain">Alex Chen</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Senior Fullstack
                </span>
              </div>
              <p className="text-xs text-textMuted flex items-center gap-1">
                Target: <span className="font-semibold text-textMain">Stripe</span> · Systems & Scale (Round 3)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live Debrief
            </span>
          </div>
        </div>

        {/* Audio Waveform & Player Console */}
        <div className="bg-surface rounded-xl p-3.5 border border-black/[0.06] space-y-3">
          <div className="flex items-center justify-between text-xs text-textMuted">
            <div className="flex items-center gap-1.5 font-medium">
              <Volume2 className="w-3.5 h-3.5 text-primary" />
              <span>Audio Sentiment & Speech Cadence Analysis</span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-textMain">
              {formatTime(playbackSec)} / 18:30
            </span>
          </div>

          {/* Equalizer Frequency Bars */}
          <div className="h-16 flex items-end justify-between gap-1 px-1 py-1 bg-white rounded-lg border border-black/[0.05] overflow-hidden">
            {barHeights.map((h, i) => {
              const isEventFlag = i === 3 || i === 8 || i === 15 || i === 20;
              const isNearCursor = Math.abs(i - Math.floor((playbackSec / 800) * 24)) < 2;
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col justify-end items-center h-full group cursor-pointer"
                  onClick={() => {
                    const mappedEvent = timelineEvents[i % timelineEvents.length];
                    setActiveEventIndex(i % timelineEvents.length);
                    setPlaybackSec(mappedEvent.seconds);
                  }}
                >
                  <div
                    className={`w-full rounded-t transition-all duration-150 ${
                      isNearCursor
                        ? 'bg-accent'
                        : isEventFlag
                        ? 'bg-primary'
                        : 'bg-primary/35'
                    }`}
                    style={{ height: `${isPlaying ? h : Math.max(15, h * 0.4)}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Playback Controls & Timeline Scrubber */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-lg bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-all shadow-sm"
              title={isPlaying ? 'Pause simulation' : 'Play simulation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
            <button
              onClick={() => {
                setPlaybackSec(74);
                setActiveEventIndex(0);
              }}
              className="p-1.5 text-textMuted hover:text-textMain rounded-lg transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Event Markers Tabs */}
            <div className="flex-1 flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
              {timelineEvents.map((evt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveEventIndex(idx);
                    setPlaybackSec(evt.seconds);
                  }}
                  className={`text-[11px] font-mono font-medium px-2.5 py-1 rounded-md transition-all whitespace-nowrap flex items-center gap-1 ${
                    activeEventIndex === idx
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white hover:bg-black/5 text-textMuted border border-black/5'
                  }`}
                >
                  {evt.type === 'success' && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />}
                  {evt.type === 'warning' && <AlertTriangle className="w-2.5 h-2.5 text-amber-400" />}
                  {evt.type === 'highlight' && <Sparkles className="w-2.5 h-2.5 text-accent" />}
                  {evt.time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Event Inspector (Changes on timeline click) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEventIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl p-3.5 border transition-all ${
              activeEvent.type === 'warning'
                ? 'bg-amber-50/60 border-amber-200'
                : 'bg-purple-50/50 border-primary/20'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeEvent.type === 'warning'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  {activeEvent.tag}
                </span>
                <span className="font-display font-semibold text-xs text-textMain">
                  {activeEvent.title}
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-xs font-bold text-textMain">
                <TrendingUp className="w-3 h-3 text-primary" />
                Score: {activeEvent.score}%
              </div>
            </div>

            <p className="text-xs text-textMuted italic mb-2 line-clamp-2">
              {activeEvent.quote}
            </p>

            <div className="flex items-center gap-1.5 text-[11px] font-medium text-textMain bg-white/80 rounded-lg p-2 border border-black/5">
              <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{activeEvent.tip}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Metric Quick-Pills */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="bg-surface p-2.5 rounded-xl border border-black/5">
            <div className="text-[10px] text-textMuted font-medium uppercase">Answer Quality</div>
            <div className="font-display font-bold text-sm text-textMain mt-0.5">38 / 40</div>
            <div className="text-[10px] text-emerald-600 font-semibold">+14% vs avg</div>
          </div>
          <div className="bg-surface p-2.5 rounded-xl border border-black/5">
            <div className="text-[10px] text-textMuted font-medium uppercase">Filler Words</div>
            <div className="font-display font-bold text-sm text-textMain mt-0.5">1.2 / min</div>
            <div className="text-[10px] text-emerald-600 font-semibold">-68% reduced</div>
          </div>
          <div className="bg-surface p-2.5 rounded-xl border border-black/5">
            <div className="text-[10px] text-textMuted font-medium uppercase">Delivery Pace</div>
            <div className="font-display font-bold text-sm text-textMain mt-0.5">138 wpm</div>
            <div className="text-[10px] text-primary font-semibold">Optimal Zone</div>
          </div>
        </div>

        {/* Live CTA button */}
        <button
          onClick={onLaunchDemo}
          className="w-full py-2.5 rounded-xl bg-textMain hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          Analyze My Interview Recording Live
        </button>
      </div>
    </div>
  );
}
