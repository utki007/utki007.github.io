import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Copy, Check } from 'lucide-react'

const CONTACT_OPTIONS = [
  {
    label: 'Personal',
    value: 'utkarshnarain007@gmail.com',
    href: 'mailto:utkarshnarain007@gmail.com',
    icon: Mail,
    description: 'Send an email',
    copyable: true,
  },
  {
    label: 'Northwestern',
    value: 'utkarshnarain2026@u.northwestern.edu',
    href: 'mailto:utkarshnarain2026@u.northwestern.edu',
    icon: Mail,
    description: 'University email',
    copyable: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/utkarsh-narain',
    href: 'https://www.linkedin.com/in/utkarsh-narain',
    icon: Linkedin,
    description: 'View profile or message',
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/utki007',
    href: 'https://github.com/utki007',
    icon: Github,
    description: 'View repos and contributions',
    external: true,
  },
]

export default function ContactPage() {
  const [copiedId, setCopiedId] = useState(null)

  const copyEmail = (e, value, label) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(value).then(() => {
      setCopiedId(label)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold gradient-text mb-3">Get in touch</h1>
          <p className="text-slate-400">
            Open to opportunities and collaborations. Choose how you’d like to connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONTACT_OPTIONS.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-start gap-4 p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-accent/50 hover:bg-slate-800/80 transition-all duration-200 group"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <span className="p-2.5 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors shrink-0">
                <item.icon className="w-6 h-6 text-accent" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-slate-400 text-sm font-medium">{item.label}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-slate-100 font-medium truncate hover:text-accent transition-colors"
                    title={item.value}
                  >
                    {item.value}
                  </a>
                  {item.copyable && (
                    <button
                      type="button"
                      onClick={(e) => copyEmail(e, item.value, item.label)}
                      className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-accent hover:bg-slate-700/50 transition-colors"
                      title="Copy email"
                      aria-label="Copy email"
                    >
                      {copiedId === item.label ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
                <p className="text-slate-500 text-xs mt-1">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-slate-500 text-sm mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Prefer email for longer messages; LinkedIn works well for a quick hello.
        </motion.p>
      </div>
    </div>
  )
}
