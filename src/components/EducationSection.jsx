import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, BookOpen, FolderGit, ChevronDown, Award, ExternalLink } from 'lucide-react'
import { EDUCATION } from '../data'

function SchoolLogo({ logoUrl, school, className }) {
  const [error, setError] = useState(false)
  if (!logoUrl || error) {
    return (
      <span className={`flex items-center justify-center rounded-xl bg-accent/15 shrink-0 ${className}`} aria-hidden>
        <GraduationCap className="w-5 h-5 text-accent" />
      </span>
    )
  }
  return (
    <img
      src={logoUrl}
      alt={`${school} logo`}
      className={`rounded-lg object-contain shrink-0 ${className}`}
      onError={() => setError(true)}
    />
  )
}

function EducationCard({ item, index }) {
  const [showDetails, setShowDetails] = useState(false)
  const hasCoursework = item.coursework?.length > 0
  const hasProjects = item.projects?.length > 0
  const hasDetails = hasCoursework || hasProjects

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="relative rounded-xl border border-slate-700/50 bg-slate-800/50 overflow-hidden hover:border-accent/30 transition-all duration-300 group"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/60 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
      <div className="p-5 sm:p-6 pl-6 sm:pl-7 pb-4 sm:pb-5">
        {/* Header: same layout as Experience — logo + school/degree left, location + time right */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 min-w-0">
            <SchoolLogo
              logoUrl={item.logoUrl}
              school={item.school}
              className="w-12 h-12 p-1 transition-colors"
            />
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-slate-100 tracking-tight">{item.school}</h3>
              <p className="text-accentLight font-semibold text-sm mt-1">{item.degree}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-slate-400 text-sm shrink-0 sm:ml-4">
            <span className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/80">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0" aria-hidden />
              <span>{item.period}</span>
            </span>
            <span className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/80">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0" aria-hidden />
              {item.location}
            </span>
          </div>
        </div>

        {/* GPA (left) and Coursework & Projects (right) on one line */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
            <Award className="w-4 h-4 text-accent shrink-0" aria-hidden />
            <span className="text-slate-400 text-sm">GPA</span>
            <span className="text-accent font-semibold text-sm tabular-nums">{item.gpa}</span>
          </span>
          {hasDetails && (
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 text-slate-400 hover:text-accent text-sm font-medium transition-colors"
              aria-expanded={showDetails}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              Coursework & Projects
              <ChevronDown
                className={`w-4 h-4 shrink-0 ml-1 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        </div>

        {/* Dropdown content — no divider, flows as extension */}
        {hasDetails && (
          <div className="mt-4">
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 space-y-4">
                    {hasCoursework && (
                      <div>
                        <h4 className="flex items-center gap-2 text-slate-400 font-medium text-sm mb-2">
                          <BookOpen className="w-4 h-4 shrink-0" />
                          Coursework
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.coursework.map((c) => (
                            <span
                              key={c}
                              className="px-3.5 py-1.5 rounded-full bg-accent/15 text-slate-200 text-sm font-medium border border-accent/30"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {hasProjects && (
                      <div>
                        <h4 className="flex items-center gap-2 text-slate-400 font-medium text-sm mb-2">
                          <FolderGit className="w-4 h-4 shrink-0" />
                          Projects
                        </h4>
                        <ul className="list-disc pl-5 text-slate-300 text-[15px] leading-relaxed space-y-3">
                          {item.projects.map((p) => {
                            const name = typeof p === 'object' ? p.name : p
                            const link = typeof p === 'object' ? p.link : null
                            return (
                              <li key={name} className="pl-1">
                                {link ? (
                                  <Link
                                    to={link}
                                    className="inline-flex items-center gap-1.5 text-accent hover:text-accentLight transition-colors"
                                  >
                                    {name}
                                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                  </Link>
                                ) : (
                                  name
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.article>
  )
}

export default function EducationSection() {
  return (
    <section id="education" className="pt-8 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Education
        </motion.h2>
        <div className="space-y-6">
          {EDUCATION.map((item, i) => (
            <EducationCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
