import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Bot, Eye, Hand, FolderGit, Calendar, MapPin, Users, ExternalLink, Play } from 'lucide-react'
import HighlightedText from './HighlightedText'
import { PROJECTS } from '../data'

const PROJECT_ICONS = { 'discord-bot': Bot, 'eye-for-blind': Eye, 'gesture-recognition': Hand }

export default function PersonalProjectSection() {
  return (
    <section id="projects" className="pt-8 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <div className="space-y-6">
          {PROJECTS.map((project, i) => {
            const ProjectIcon = PROJECT_ICONS[project.id] || FolderGit
            return (
            <motion.article
              key={project.id}
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
                    <span className="p-2.5 rounded-xl bg-accent/15 shrink-0 group-hover:bg-accent/25 transition-colors" aria-hidden>
                      <ProjectIcon className="w-5 h-5 text-accent" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-slate-100 tracking-tight">{project.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-slate-400 text-sm">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-slate-500" aria-hidden />
                          {project.teamSize}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-slate-500" aria-hidden />
                          {project.duration}
                        </span>
                        {project.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-500" aria-hidden />
                            {project.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {(project.demoPath || project.url) && (
                  <div className="flex items-center gap-2 shrink-0">
                    {project.demoPath && (
                      <NavLink
                        to={project.demoPath}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 text-sm font-medium transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        View Demo
                      </NavLink>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-accent hover:bg-slate-800/50 text-sm font-medium transition-colors"
                      >
                        GitHub
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  )}
                </div>
                <p className="text-slate-300 text-[15px] leading-relaxed">
                  <HighlightedText text={project.description} highlights={project.highlights} />
                </p>
              </div>
            </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
