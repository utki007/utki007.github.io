import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import HighlightedText from './HighlightedText'
import { EXPERIENCE } from '../data'

function CompanyLogo({ domain, company, logoUrl, className }) {
  const [error, setError] = useState(false)
  // Prefer custom logo from public/logos/; fallback to DuckDuckGo favicon API
  const src = logoUrl || (domain ? `https://icons.duckduckgo.com/ip3/${domain}.ico` : null)

  if (!src || error) {
    return (
      <span className={`flex items-center justify-center rounded-xl bg-accent/15 shrink-0 ${className}`} aria-hidden>
        <Briefcase className="w-5 h-5 text-accent" />
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={`${company} logo`}
      className={`rounded-lg object-contain shrink-0 ${className}`}
      onError={() => setError(true)}
    />
  )
}

export default function WorkExperienceSection() {
  return (
    <section id="experience" className="pt-8 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Work Experience
        </motion.h2>
        <div className="space-y-6">
          {EXPERIENCE.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="relative rounded-xl border border-slate-700/50 bg-slate-800/50 overflow-hidden hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/60 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="p-5 sm:p-6 pl-6 sm:pl-7">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <CompanyLogo
                      domain={item.logoDomain}
                      company={item.company}
                      logoUrl={item.logoUrl}
                      className="w-12 h-12 p-1 transition-colors"
                    />
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-slate-100 tracking-tight">{item.company}</h3>
                      <p className="text-accentLight font-semibold text-sm mt-1">{item.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-slate-400 text-sm shrink-0 sm:ml-4">
                    <span className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/80">
                      <Calendar className="w-4 h-4 text-slate-500 shrink-0" aria-hidden />
                      <span>{item.period} · {item.duration}</span>
                    </span>
                    <span className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/80">
                      <MapPin className="w-4 h-4 text-slate-500 shrink-0" aria-hidden />
                      {item.location}
                    </span>
                  </div>
                </div>
                <ul className="list-disc pl-5 text-slate-300 text-[15px] leading-relaxed space-y-3">
                  {item.bullets.map((b) => (
                    <li key={b.text} className="pl-1">
                      <HighlightedText text={b.text} highlights={b.highlights} />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
