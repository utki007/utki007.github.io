import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, BookOpen, FolderGit, ChevronDown } from 'lucide-react'
import { EDUCATION } from '../data'

const DEGREE_LABELS = {
  'Master of Science': 'Master\'s',
  'Post Graduate Diploma': 'PG Diploma',
  'Bachelor of Technology': 'Bachelor\'s',
}

function getDegreeLabel(degree) {
  for (const [key, label] of Object.entries(DEGREE_LABELS)) {
    if (degree?.includes(key)) return label
  }
  return null
}

function EducationCard({ item, index }) {
  const [showCoursework, setShowCoursework] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const hasCoursework = item.coursework?.length > 0
  const hasProjects = item.projects?.length > 0
  const degreeLabel = getDegreeLabel(item.degree)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative rounded-xl border border-slate-700/50 bg-slate-800/50 overflow-hidden hover:border-accent/30 transition-all duration-300 group"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/60 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
      <div className="p-5 sm:p-6 pl-6 sm:pl-7">
        {/* Header: School, degree badge, meta */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="p-2 rounded-lg bg-accent/20 shrink-0">
                <GraduationCap className="w-5 h-5 text-accent" />
              </span>
              <h3 className="text-lg font-bold text-slate-100">{item.school}</h3>
              {degreeLabel && (
                <span className="px-2.5 py-0.5 rounded-md bg-slate-700/80 text-slate-300 text-xs font-medium">
                  {degreeLabel}
                </span>
              )}
            </div>
            <p className="text-accentLight font-medium text-sm mt-2">{item.degree}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-slate-500 text-sm">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden />
                {item.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 shrink-0" aria-hidden />
                {item.period}
              </span>
            </div>
          </div>
          <div className="shrink-0">
            <span className="inline-flex px-3 py-2 rounded-lg bg-accent/15 text-accent font-semibold text-sm border border-accent/20">
              GPA {item.gpa}
            </span>
          </div>
        </div>

        {/* Expandable sections */}
        {(hasCoursework || hasProjects) && (
          <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3">
            {hasCoursework && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowCoursework(!showCoursework)}
                  className="flex items-center gap-2 text-slate-400 hover:text-accent text-sm font-medium transition-colors w-full text-left"
                  aria-expanded={showCoursework}
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  Coursework ({item.coursework.length})
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 ml-1 transition-transform ${showCoursework ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {showCoursework && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-2 pt-3">
                        {item.coursework.map((c) => (
                          <span
                            key={c}
                            className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-300 text-sm border border-slate-600/50"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            {hasProjects && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowProjects(!showProjects)}
                  className="flex items-center gap-2 text-slate-400 hover:text-accent text-sm font-medium transition-colors w-full text-left"
                  aria-expanded={showProjects}
                >
                  <FolderGit className="w-4 h-4 shrink-0" />
                  Projects ({item.projects.length})
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 ml-1 transition-transform ${showProjects ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {showProjects && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <ul className="list-disc list-inside text-slate-400 text-sm space-y-1 pt-3 pl-1">
                        {item.projects.map((p) => (
                          <li key={p} className="text-slate-300">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}

export default function EducationSection() {
  return (
    <section id="education" className="pt-8 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold gradient-text mb-3">Education</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Academic background in AI, Data Science, and Computer Science. Most recent first.
          </p>
        </motion.div>
        <div className="space-y-6">
          {EDUCATION.map((item, i) => (
            <EducationCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
