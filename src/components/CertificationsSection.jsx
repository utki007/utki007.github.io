import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { CERTIFICATIONS } from '../data'

export default function CertificationsSection() {
  return (
    <section id="certifications" className="pt-8 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Certifications
        </motion.h2>
        <div className="space-y-4">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-3 p-5 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors"
            >
              <span className="p-2 rounded-lg bg-accent/20 shrink-0">
                <Award className="w-5 h-5 text-accent" />
              </span>
              <div>
                <p className="text-slate-200 font-medium">{cert.name}</p>
                <p className="text-slate-500 text-sm mt-1">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
