import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, Play, Star } from 'lucide-react';

import HeroDebriefPreview from '../components/home/HeroDebriefPreview';
import InteractiveDebriefSimulator from '../components/home/InteractiveDebriefSimulator';
import BeforeAfterComparison from '../components/home/BeforeAfterComparison';
import ReadinessCalculator from '../components/home/ReadinessCalculator';
import DynamicFeatureShowcase from '../components/home/DynamicFeatureShowcase';
import SocialProofTicker from '../components/home/SocialProofTicker';
import InteractiveFaq from '../components/home/InteractiveFaq';

const cyclingCompanies = [
  { name: 'Stripe', role: '$245k Staff Offer', color: '#6366f1' },
  { name: 'Google', role: 'L5 Systems Engineer', color: '#3b82f6' },
  { name: 'Meta', role: 'E5 Infrastructure', color: '#8b5cf6' },
  { name: 'OpenAI', role: 'AI Platform Architect', color: '#10b981' },
  { name: 'Datadog', role: 'Lead Backend Eng', color: '#f59e0b' },
];

const stats = [
  { val: '3.4×', label: 'Higher offer rate for candidates', change: '+240% vs uncoached' },
  { val: '89%', label: 'Report instant clarity on gaps', change: 'After 1 debrief cycle' },
  { val: '60s', label: 'Average full debrief turnaround', change: 'Instant second-by-second' },
  { val: '50K+', label: 'Interviews analyzed globally', change: 'FAANG & Unicorn rubrics' },
];

const candidateAvatars = [
  { initials: 'AC', bg: 'bg-indigo-600' },
  { initials: 'ER', bg: 'bg-purple-600' },
  { initials: 'JL', bg: 'bg-emerald-600' },
  { initials: 'MV', bg: 'bg-amber-600' },
  { initials: 'SK', bg: 'bg-rose-600' },
];

const Home = ({ onLogin }) => {
  const navigate = useNavigate();
  const [cycleIndex, setCycleIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Cycle company targets every 2.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCycleIndex(prev => (prev + 1) % cyclingCompanies.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Track scroll for sticky navbar blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const startDemo = (path = '/dashboard') => {
    if (onLogin) {
      onLogin({
        name: 'Alex Chen',
        email: 'alex.chen@hiresight.ai',
        role: 'Senior Fullstack Engineer',
        company: 'Stripe Candidate',
      });
    }
    navigate(path);
  };

  const currentCycle = cyclingCompanies[cycleIndex];

  return (
    <div className="min-h-screen bg-background text-textMain overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Top Floating Dynamic Navigation Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'h-16 bg-white/90 backdrop-blur-xl border-b border-black/[0.08] shadow-sm'
            : 'h-20 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-base font-bold bg-primary shadow-md shadow-primary/30">
              H
            </div>
            <span className="text-textMain">
              Hire<span className="text-primary">Sight</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              v2.4 Live
            </span>
          </Link>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-textMuted">
            <a href="#demo" className="hover:text-textMain transition-colors">
              AI Playground
            </a>
            <a href="#features" className="hover:text-textMain transition-colors">
              Platform Features
            </a>
            <a href="#comparison" className="hover:text-textMain transition-colors">
              Why HireSight
            </a>
            <a href="#readiness" className="hover:text-textMain transition-colors">
              Readiness Calculator
            </a>
            <a href="#faq" className="hover:text-textMain transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => startDemo('/dashboard')}
              className="hidden sm:flex text-sm px-4 py-2 rounded-xl text-textMain font-medium hover:bg-surfaceHigh transition-colors items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Live Demo</span>
            </button>
            <Link
              to="/login"
              className="btn-primary text-sm px-4 sm:px-5 py-2 sm:py-2.5 shadow-md flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section — Dynamic 2-Column Responsive Layout */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 gradient-mesh overflow-hidden">
        {/* Subtle Decorative Ambient Elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Headline & Interactive Value Prop (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Top Glowing Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-primary/20 shadow-xs backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-xs font-bold text-primary">
                NEW: Second-by-Second Audio & Video Debrief 3.0
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-textMain leading-[1.08]">
              Know exactly where you lost the{' '}
              <span className="gold-underline text-primary">opportunity.</span>
            </h1>

            {/* Dynamic Rotating Sub-Headline Cycler */}
            <div className="h-10 sm:h-12 flex items-center gap-2 text-base sm:text-xl font-medium text-textMuted">
              <span>Turn failed interviews into offers at</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentCycle.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 text-primary font-bold border border-primary/20 text-sm sm:text-base font-mono shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {currentCycle.name} · {currentCycle.role}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Explanatory Body */}
            <p className="text-base sm:text-lg text-textMuted max-w-xl leading-relaxed">
              Upload any interview recording. Our AI pinpoints tone dips, nervous filler words, and answer structuring flaws second-by-second — giving you the exact script to ace the next round.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => startDemo('/dashboard')}
                className="btn-primary text-base px-7 py-3.5 flex items-center justify-center gap-2.5 shadow-xl group"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#demo"
                className="btn-ghost text-base px-6 py-3.5 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-primary" />
                <span>Test Live Debrief Below</span>
              </a>
            </div>

            {/* Social Trust & Avatars */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-textMuted border-t border-black/[0.06]">
              {/* Avatars Cluster */}
              <div className="flex items-center -space-x-2">
                {candidateAvatars.map((av, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full ${av.bg} text-white flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-xs`}
                  >
                    {av.initials}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-textMain">4.9/5 Rating</span>
                <span>· 12,000+ candidates debriefed</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Hero Live Debrief Card (6 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <HeroDebriefPreview onLaunchDemo={() => startDemo('/dashboard')} />
          </motion.div>
        </div>
      </section>

      {/* Dynamic Animated Stats Section */}
      <section className="py-16 px-4 bg-textMain text-white relative">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm"
            >
              <p className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-1">
                {s.val}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-zinc-300">
                {s.label}
              </p>
              <p className="text-[11px] text-accent mt-1 font-mono">
                {s.change}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Infinite Logo Marquee & Live Activity Ticker */}
      <SocialProofTicker onStartDemo={startDemo} />

      {/* Interactive AI Debrief Playground */}
      <InteractiveDebriefSimulator onStartDemo={startDemo} />

      {/* Interactive Before vs After Comparison */}
      <BeforeAfterComparison onStartDemo={startDemo} />

      {/* Dynamic HireScore Readiness Calculator */}
      <ReadinessCalculator onStartDemo={startDemo} />

      {/* Dynamic Tabbed Feature Showcase */}
      <DynamicFeatureShowcase onStartDemo={startDemo} />

      {/* Interactive FAQ Accordion */}
      <InteractiveFaq />

      {/* Final High-Converting Call to Action Section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 text-center bg-textMain text-white relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/30 to-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-accent border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for your next round?</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Stop repeating the same mistakes in the dark.
          </h2>

          <p className="text-base sm:text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Upload your first interview recording now. In 60 seconds, you’ll have a second-by-second breakdown and a personalized roadmap to turn your next interview into a signed offer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => startDemo('/dashboard')}
              className="w-full sm:w-auto btn-primary text-base sm:text-lg px-9 py-4 inline-flex items-center justify-center gap-2.5 shadow-2xl hover:scale-105 transition-transform"
            >
              <span>Launch Free Interview Debrief</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-colors text-base"
            >
              Sign Up Free
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free forever tier
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Enterprise-grade AES-256 encryption
            </span>
          </div>
        </div>
      </section>

      {/* Polished Dynamic Footer */}
      <footer className="py-12 px-6 bg-white border-t border-black/[0.08] text-sm text-textMuted">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-display font-bold text-base text-textMain">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-primary">
              H
            </div>
            <span>Hire<span className="text-primary">Sight</span></span>
            <span className="text-xs font-normal text-textMuted ml-2">© 2026 HireSight Intelligence</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium">
            <a href="#demo" className="hover:text-textMain transition-colors">AI Playground</a>
            <a href="#features" className="hover:text-textMain transition-colors">Features</a>
            <a href="#readiness" className="hover:text-textMain transition-colors">Readiness Quiz</a>
            <a href="#faq" className="hover:text-textMain transition-colors">Security & FAQ</a>
            <button onClick={() => startDemo('/dashboard')} className="text-primary hover:underline font-semibold">
              Live Demo
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-textMuted font-mono">All Systems Operational · v2.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
