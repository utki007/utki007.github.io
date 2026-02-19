import { motion } from 'framer-motion'
import { Play, BarChart3 } from 'lucide-react'

// Placeholder section for projects, hover video effects, or Chart.js integration.
const PLACEHOLDERS = [
  { title: 'Healthcare Platform', desc: 'Scale for 11M+ patients. Add 5-sec video or thumbnail here.', icon: Play },
  { title: 'Discord Automation', desc: '195k+ users. Bots & moderation.', icon: Play },
  { title: 'Data Migration', desc: '220k+ accounts, $0-cost automation.', icon: Play },
]

export default function ProjectsPlaceholder() {
  return (
    <section id="projects" className="pt-8 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          AI Lab & Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDERS.map((project, i) => (
            <motion.div
              key={project.title}
              className="group bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,112,243,0.2)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* Placeholder: replace with <video> or thumbnail for hover 5-sec snippet */}
              <div className="aspect-video bg-slate-700/50 flex items-center justify-center text-slate-500 group-hover:text-accent transition-colors">
                <project.icon className="w-12 h-12" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-accentLight">{project.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Placeholder: Chart.js or other interactive chart can be mounted here */}
        <motion.div
          className="mt-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 flex items-center justify-center gap-3 text-slate-500">
            <BarChart3 className="w-8 h-8" />
            <span className="text-sm">Optional: Chart.js or custom chart placeholder</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
