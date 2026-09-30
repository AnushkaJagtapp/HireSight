import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

const faqs = [
  {
    category: 'Analysis',
    q: 'How does HireSight analyze my interview recordings?',
    a: 'HireSight extracts second-by-second audio, speech cadence, and transcript data. Our AI model evaluates answer structure against the STAR framework (Situation, Task, Action, Result), measures technical depth, flags vocal filler words (like "um", "basically", "you know"), and detects tone/confidence drops when answering difficult technical questions.',
  },
  {
    category: 'Security',
    q: 'Are my audio and video recordings private and secure?',
    a: 'Yes, 100%. Your interview recordings and transcripts are encrypted in transit and at rest using AES-256. We never use your confidential interview data to train public models, and you have one-click deletion of all recordings and generated reports at any time.',
  },
  {
    category: 'Integrations',
    q: 'Does HireSight work with Zoom, Google Meet, and Microsoft Teams?',
    a: 'Yes. You can paste a public cloud recording link (Zoom/Teams), upload any recorded MP4, MOV, WebM, or MP3/WAV file directly, or use our in-browser live voice recorder to practice mock interviews in real time.',
  },
  {
    category: 'Scoring',
    q: 'How is the HireScore™ calculated and calibrated?',
    a: 'The HireScore™ is a composite metric (0 to 100) benchmarked against thousands of verified successful interviews at top tier tech companies (Google, Stripe, Meta, Amazon). It weighs Answer Quality (40%), Speech Delivery & Tone (30%), Technical Consistency (20%), and Filler Word Control (10%).',
  },
  {
    category: 'Coaching',
    q: 'How does AI Coach Max help me prepare for upcoming rounds?',
    a: 'Coach Max remembers your exact interview strengths, past weaknesses, and target job descriptions. You can roleplay tough technical follow-ups, practice handling curveball behavioral questions, and get instant feedback on your phrasing before talking to the actual recruiter.',
  },
  {
    category: 'Pricing',
    q: 'Is there a free trial to test HireSight?',
    a: 'Yes! You can explore the full interactive demo, run an audit on your first interview recording, and get a personalized 30/60/90 day roadmap completely free with no credit card required.',
  },
];

export default function InteractiveFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Analysis', 'Security', 'Integrations', 'Scoring', 'Coaching'];

  const filteredFaqs = faqs.filter(f => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch =
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-surface border-t border-black/[0.06]">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="tag inline-block">Frequently Asked Questions</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-textMain">
            Got questions? We have answers.
          </h2>
          <p className="text-base text-textMuted max-w-xl mx-auto">
            Everything you need to know about interview audio debriefs, privacy, and the HireSight AI engine.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-textMuted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. Zoom, privacy, HireScore, Coach Max)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-black/10 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
                  selectedCategory === c
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-textMuted hover:text-textMain border border-black/[0.07]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-black/5 text-textMuted text-sm">
              No matching questions found for &quot;{searchQuery}&quot;. Try another keyword.
            </div>
          ) : (
            filteredFaqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden transition-all shadow-xs hover:border-black/15"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-textMain"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface text-primary border border-primary/20 shrink-0">
                        {faq.category}
                      </span>
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-textMuted transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-textMuted leading-relaxed border-t border-black/[0.04]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
