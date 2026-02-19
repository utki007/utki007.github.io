import { motion } from 'framer-motion'

const HIGHLIGHTS = [
  'Business Analysis',
  'Data Engineering',
  'Software Development',
  'DevOps',
]

export default function Hero({ onExploreClick }) {
  const handleExplore = () => {
    onExploreClick?.()
  }

  return (
    <section
      id="hero"
      className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center justify-center px-4 py-10 sm:py-16 overflow-hidden"
    >
      <div className="relative z-10 max-w-3xl mx-auto text-center w-full min-w-0">
        <motion.p
          className="text-accent font-medium text-sm uppercase tracking-wider mb-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          AI Engineer & Full-Stack Software Architect
        </motion.p>
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-100"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
        >
          Utkarsh Narain
        </motion.h1>
        <motion.p
          className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4 max-w-2xl mx-auto break-words"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          Experienced in <span className="text-slate-300">Business Analysis</span>,{' '}
          <span className="text-slate-300">Data Engineering</span>,{' '}
          <span className="text-slate-300">Software Development</span>, and{' '}
          <span className="text-slate-300">DevOps</span>, I’ve worked at Virtusa using Python, Power BI, Java,
          and AngularJS to deliver high-quality solutions. I’ve optimized code, analyzed data, and developed
          a popular Discord bot with <span className="text-accentLight font-medium">300K+ users</span> across{' '}
          <span className="text-accentLight font-medium">1,000+ servers</span>. Recognized for excellence in
          project delivery and client satisfaction, I’m passionate about using technology to drive results and
          improve user experiences.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {HIGHLIGHTS.map((h) => (
            <span
              key={h}
              className="px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 text-slate-300 text-sm"
            >
              {h}
            </span>
          ))}
        </motion.div>
        <motion.button
          type="button"
          onClick={handleExplore}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:border-accent/60 hover:text-accent hover:bg-slate-800/40 text-sm font-medium transition-colors duration-200"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
        >
          View my experience
        </motion.button>
      </div>
    </section>
  )
}
