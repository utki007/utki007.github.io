import { motion } from 'framer-motion'
import { Sparkles, Database, Layers } from 'lucide-react'

const STACK = [
  {
    title: 'GenAI',
    icon: Sparkles,
    description: 'LLMs, RAG, agents, fine-tuning, and production ML pipelines.',
    tags: ['Transformers', 'LangChain', 'Vector DBs'],
    className: 'md:col-span-2',
  },
  {
    title: 'Data Engineering',
    icon: Database,
    description: 'Pipelines, warehouses, and automation at scale.',
    tags: ['SQL', 'Python', 'ETL'],
    className: '',
  },
  {
    title: 'Full-Stack',
    icon: Layers,
    description: 'Web apps, APIs, and cloud deployment.',
    tags: ['React', 'Node', 'Cloud'],
    className: '',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function BentoGrid() {
  return (
    <section id="stack" className="pt-8 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          The Stack
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {STACK.map((card) => (
            <motion.div
              key={card.title}
              variants={item}
              className={`${card.className} bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,112,243,0.2)]`}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-accent/20">
                  <card.icon className="w-6 h-6 text-accent" />
                </span>
                <h3 className="text-xl font-semibold">{card.title}</h3>
              </div>
              <p className="text-slate-400 text-sm">{card.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
