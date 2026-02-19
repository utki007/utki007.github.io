import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, FolderGit, Briefcase, GraduationCap, Layers, Award, Mail } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/experience', label: 'Experience', icon: Briefcase },
  { to: '/projects', label: 'Projects', icon: FolderGit },
  { to: '/education', label: 'Education', icon: GraduationCap },
  { to: '/skills', label: 'Skills', icon: Layers },
  { to: '/certifications', label: 'Certifications', icon: Award },
  { to: '/contact', label: 'Contact', icon: Mail },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-dark/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <NavLink
            to="/"
            className="text-lg font-semibold text-slate-100 hover:text-accent transition-colors shrink-0"
          >
            Utkarsh Narain
          </NavLink>

          {/* Desktop links - hidden on smaller screens and kiosks */}
          <div className="hidden lg:flex items-center gap-1 flex-wrap justify-end">
            {LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>

          {/* Mobile / kiosk hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-200 ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-200 ${
                mobileOpen ? 'opacity-0 scale-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-200 ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-slate-800/50"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {LINKS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-accent bg-accent/10'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
