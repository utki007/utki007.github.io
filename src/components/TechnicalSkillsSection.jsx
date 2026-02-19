import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, FolderGit, Award, ChevronDown, Sparkles, Code, Database, Wrench } from 'lucide-react'
import { EXPERIENCE, EDUCATION, PROJECTS, CERTIFICATIONS } from '../data'

// Derive skills from experience, education, projects, certifications
function aggregateSkills() {
  const skillMap = new Map() // skill -> { count, sources: { experience, education, projects, certifications } }

  const addSkill = (skill, source, label) => {
    const normalized = skill.trim()
    if (!normalized) return
    if (!skillMap.has(normalized)) {
      skillMap.set(normalized, { count: 0, sources: { experience: [], education: [], projects: [], certifications: [] } })
    }
    const entry = skillMap.get(normalized)
    const arr = entry.sources[source]
    if (!arr.includes(label)) {
      arr.push(label)
      entry.count++
    }
  }

  ;(Array.isArray(EXPERIENCE) ? EXPERIENCE : []).forEach((e) => {
    (e?.skills || []).forEach((s) => addSkill(s, 'experience', `${e.company} – ${e.role}`))
  })
  ;(Array.isArray(EDUCATION) ? EDUCATION : []).forEach((e) => {
    (e?.skills || []).forEach((s) => addSkill(s, 'education', e.school))
  })
  ;(Array.isArray(PROJECTS) ? PROJECTS : []).forEach((p) => {
    (p?.skills || []).forEach((s) => addSkill(s, 'projects', p.title))
  })
  ;(Array.isArray(CERTIFICATIONS) ? CERTIFICATIONS : []).forEach((c) => {
    (c?.skills || []).forEach((s) => addSkill(s, 'certifications', c.name))
  })

  return skillMap
}

// Group skills by category for intuitive display
const CATEGORIES = [
  { key: 'languages', label: 'Languages & Core', icon: Code, skills: ['C++', 'Java', 'JavaScript', 'Python', 'HTML', 'CSS', 'SQL'] },
  { key: 'ml-ai', label: 'Machine Learning & AI', icon: Sparkles, skills: ['Machine Learning', 'Deep Learning', 'Generative AI', 'NLP', 'Computer Vision', 'Image Captioning', 'Attention', 'CNN', 'Artificial Intelligence', 'Soft Computing'] },
  { key: 'fullstack', label: 'Full-Stack & Web', icon: Code, skills: ['AngularJS', 'SpringBoot', 'MongoDB', 'Django', 'Bootstrap', 'Full-Stack', 'Responsive Design', 'Media Queries', 'Web Technology', 'Node.js'] },
  { key: 'data', label: 'Data & Analytics', icon: Database, skills: ['Power BI', 'Excel', 'Business Intelligence', 'Tableau', 'Data Analysis', 'Data Validation', 'Data Warehousing', 'Data Mining', 'Data Cleaning', 'Data Structures'] },
  { key: 'tools', label: 'Tools & Practices', icon: Wrench, skills: ['Agile', 'Clean Code', 'Design Patterns', 'Algorithms', 'OOP', 'Memory Management', 'Pointers', 'Automation', 'Discord API', 'Moderation', 'Google Cloud'] },
]

const sourceConfig = {
  experience: { icon: Briefcase, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: 'Work' },
  education: { icon: GraduationCap, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', label: 'Education' },
  projects: { icon: FolderGit, color: 'bg-violet-500/20 text-violet-400 border-violet-500/30', label: 'Projects' },
  certifications: { icon: Award, color: 'bg-sky-500/20 text-sky-400 border-sky-500/30', label: 'Certifications' },
}

export default function TechnicalSkillsSection() {
  const [view, setView] = useState('category') // 'category' | 'source'
  const [expandedSkill, setExpandedSkill] = useState(null)

  const skillMap = aggregateSkills()

  // Build categorized skills
  const assigned = new Set()
  const categorizedSkills = [
    ...CATEGORIES.map((cat) => {
      const items = cat.skills
        .filter((s) => skillMap.has(s))
        .map((s) => {
          assigned.add(s)
          return { name: s, data: skillMap.get(s) }
        })
        .sort((a, b) => b.data.count - a.data.count)
      return { ...cat, items }
    }).filter((cat) => cat.items.length > 0),
    {
      key: 'other',
      label: 'Other',
      icon: Wrench,
      items: [...skillMap.entries()]
        .filter(([s]) => !assigned.has(s))
        .map(([name, data]) => ({ name, data }))
        .sort((a, b) => b.data.count - a.data.count),
    },
  ].filter((cat) => cat.items.length > 0)

  // Build by-source view
  const bySource = {
    experience: [...skillMap.entries()]
      .filter(([, d]) => d.sources.experience.length > 0)
      .map(([name, data]) => ({ name, data }))
      .sort((a, b) => b.data.count - a.data.count),
    education: [...skillMap.entries()]
      .filter(([, d]) => d.sources.education.length > 0)
      .map(([name, data]) => ({ name, data }))
      .sort((a, b) => b.data.count - a.data.count),
    projects: [...skillMap.entries()]
      .filter(([, d]) => d.sources.projects.length > 0)
      .map(([name, data]) => ({ name, data }))
      .sort((a, b) => b.data.count - a.data.count),
    certifications: [...skillMap.entries()]
      .filter(([, d]) => d.sources.certifications.length > 0)
      .map(([name, data]) => ({ name, data }))
      .sort((a, b) => b.data.count - a.data.count),
  }

  return (
    <section id="skills" className="pt-8 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold gradient-text mb-3">Technical Skills</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Skills derived from my work experience, education, certifications, and personal projects.
          </p>
        </motion.div>

        {/* View toggle */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <button
            type="button"
            onClick={() => setView('category')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'category'
                ? 'bg-accent/20 text-accent border border-accent/40'
                : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-slate-700/50'
            }`}
          >
            By Category
          </button>
          <button
            type="button"
            onClick={() => setView('source')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'source'
                ? 'bg-accent/20 text-accent border border-accent/40'
                : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-slate-700/50'
            }`}
          >
            By Source
          </button>
        </motion.div>

        <div className="space-y-6">
          {view === 'category' ? (
            <div key="category" className="space-y-6">
              {categorizedSkills.map((cat, i) => {
                const CatIcon = cat.icon
                return (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 sm:p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="p-2 rounded-lg bg-accent/20">
                      <CatIcon className="w-5 h-5 text-accent" />
                    </span>
                    <h3 className="text-lg font-semibold text-slate-100">{cat.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map(({ name, data }) => {
                      const isExpanded = expandedSkill === name
                      return (
                        <div key={name} className="relative">
                          <button
                            type="button"
                            onClick={() => setExpandedSkill(isExpanded ? null : name)}
                            className="group flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 text-slate-200 text-sm font-medium transition-colors border border-transparent hover:border-accent/30"
                          >
                            {name}
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            />
                          </button>
                          {isExpanded && (
                              <div
                                className="absolute top-full left-0 mt-1 z-10 min-w-[240px] rounded-lg border border-slate-600 bg-slate-800 p-3 shadow-xl"
                              >
                                <p className="text-slate-400 text-xs mb-2">Used in:</p>
                                <ul className="space-y-1.5 text-sm">
                                  {(data?.sources?.experience || []).map((l) => (
                                    <li key={l} className="flex items-center gap-2 text-emerald-400">
                                      <Briefcase className="w-3.5 h-3.5 shrink-0" />
                                      {l}
                                    </li>
                                  ))}
                                  {(data?.sources?.education || []).map((l) => (
                                    <li key={l} className="flex items-center gap-2 text-amber-400">
                                      <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                                      {l}
                                    </li>
                                  ))}
                                  {(data?.sources?.projects || []).map((l) => (
                                    <li key={l} className="flex items-center gap-2 text-violet-400">
                                      <FolderGit className="w-3.5 h-3.5 shrink-0" />
                                      {l}
                                    </li>
                                  ))}
                                  {(data?.sources?.certifications || []).map((l) => (
                                    <li key={l} className="flex items-center gap-2 text-sky-400">
                                      <Award className="w-3.5 h-3.5 shrink-0" />
                                      {l}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
                )
              })}
            </div>
          ) : (
            <div key="source" className="space-y-6">
              {Object.entries(bySource).map(([source, items], i) => {
                if (items.length === 0) return null
                const config = sourceConfig[source] || sourceConfig.experience
                const Icon = config?.icon || Briefcase
                return (
                  <motion.div
                    key={source}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 sm:p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`p-2 rounded-lg ${config?.color || 'bg-accent/20'}`}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <h3 className="text-lg font-semibold text-slate-100">{config?.label || source}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map(({ name, data }) => {
                        const isExpanded = expandedSkill === name
                        return (
                          <div key={name} className="relative">
                            <button
                              type="button"
                              onClick={() => setExpandedSkill(isExpanded ? null : name)}
                              className="group flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 text-slate-200 text-sm font-medium transition-colors border border-transparent hover:border-accent/30"
                            >
                              {name}
                              <ChevronDown
                                className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                              />
                            </button>
                            {isExpanded && data && (
                              <div className="absolute top-full left-0 mt-1 z-10 min-w-[240px] rounded-lg border border-slate-600 bg-slate-800 p-3 shadow-xl">
                                <p className="text-slate-400 text-xs mb-2">Used in:</p>
                                <ul className="space-y-1.5 text-sm">
                                  {(data.sources?.experience || []).map((l) => (
                                    <li key={l} className="flex items-center gap-2 text-emerald-400">
                                      <Briefcase className="w-3.5 h-3.5 shrink-0" />
                                      {l}
                                    </li>
                                  ))}
                                  {(data.sources?.education || []).map((l) => (
                                    <li key={l} className="flex items-center gap-2 text-amber-400">
                                      <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                                      {l}
                                    </li>
                                  ))}
                                  {(data.sources?.projects || []).map((l) => (
                                    <li key={l} className="flex items-center gap-2 text-violet-400">
                                      <FolderGit className="w-3.5 h-3.5 shrink-0" />
                                      {l}
                                    </li>
                                  ))}
                                  {(data.sources?.certifications || []).map((l) => (
                                    <li key={l} className="flex items-center gap-2 text-sky-400">
                                      <Award className="w-3.5 h-3.5 shrink-0" />
                                      {l}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
