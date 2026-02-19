import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Bot,
  Zap,
  ArrowLeft,
  Users,
  Gift,
  Shield,
  Lock,
  ExternalLink,
  ChevronDown,
} from 'lucide-react'

const FEATURE_GROUPS = [
  {
    title: 'Moderation & Security',
    icon: Shield,
    summary: 'Quarantine, Dank Pool protection, audit logs',
    items: [
      { label: 'Quarantine System', desc: 'Quarantine users with configurable roles and whitelists' },
      { label: 'Dank Pool Security', desc: 'Protects server donation pools; auto-removes unauthorized role grants, quarantines violators' },
      { label: 'Audit Log Monitoring', desc: 'Detects and blocks unauthorized role grants' },
    ],
  },
  {
    title: 'Server & Channel Management',
    icon: Lock,
    summary: 'Lockdown, slowmode, lock/unlock channels',
    items: [
      { label: 'Lockdown Protocols', desc: 'Custom lockdown profiles across channels' },
      { label: 'Channel Tools', desc: 'Slowmode, lock/unlock, viewlock, sync permissions, dump members' },
    ],
  },
  {
    title: 'Grinder Management',
    icon: Users,
    summary: 'Appoint grinders, payment tracking, role automation',
    items: [
      { label: 'Grinder Lifecycle', desc: 'Appoint, dismiss, tiered profiles' },
      { label: 'Payment Tracking', desc: 'Automatic detection via Dank Memer donations' },
      { label: 'Role Automation', desc: 'Trial → Grinder promotion based on payment history' },
      { label: 'Grinder Commands', desc: 'appoint, bank, list, log-donation, set, summary' },
      { label: 'Reminders', desc: 'Daily payment reminders via DM' },
    ],
  },
  {
    title: 'Giveaways & Payouts',
    icon: Gift,
    summary: 'Create giveaways, payout queue, auto-queue winners',
    items: [
      { label: 'Giveaways', desc: 'Dank Memer (coins/items) or custom prizes; role/level requirements' },
      { label: 'Payout Queue', desc: 'Create, claim, track payouts; express batch processing' },
      { label: 'Auto Payout Queue', desc: 'Dank giveaways auto-queue winners for payout' },
    ],
  },
  {
    title: 'Engagement & Utilities',
    icon: Zap,
    summary: 'AFK, timers, voice, adventure stats, Mafia logs',
    items: [
      { label: 'AFK', desc: 'Set status, auto-reply when mentioned, DM summary on return' },
      { label: 'Timers', desc: 'Create timers (e.g. 1h30m2s), members join via button, auto-ping when done' },
      { label: 'Voice Channels', desc: 'Join-to-Create private voice channels; auto-delete empty' },
      { label: 'Adventure Stats', desc: 'Parse Dank Memer rewards; daily leaderboard images' },
      { label: 'Mafia Logs', desc: 'Game transcripts (HTML), night-by-night tracking' },
      { label: 'Perks System', desc: 'Role/channel perks, auto-react, highlight triggers' },
    ],
  },
]

function FeatureCard({ group, index, isExpanded, onToggle }) {
  const Icon = group.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      className="group/card relative rounded-xl border border-slate-700/50 bg-slate-800/60 overflow-hidden hover:border-slate-600/60 transition-colors"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/50 opacity-0 group-hover/card:opacity-100 transition-opacity" aria-hidden />
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="p-2.5 rounded-xl bg-accent/20 shrink-0">
            <Icon className="w-5 h-5 text-accent" />
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-100">{group.title}</h3>
            <p className="text-slate-500 text-sm truncate">{group.summary}</p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-slate-700/50">
              <ul className="pt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.label} className="text-slate-400 text-sm leading-relaxed">
                    <span className="font-medium text-slate-300">{item.label}</span>
                    <span> — {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function DiscordBotDemoPage() {
  const [expandedId, setExpandedId] = useState(null)
  const [barSticky, setBarSticky] = useState(false)
  const sentinelRef = useRef(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setBarSticky(!e.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen pt-8 pb-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div ref={sentinelRef} className="h-px w-full" aria-hidden />
        {/* Nav bar */}
        <motion.div
          className={`sticky top-14 sm:top-16 z-40 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm ${barSticky ? 'bg-slate-800/95' : 'bg-slate-800/40'}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-accent text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Back to Projects
          </Link>
          <a
            href="https://github.com/utki007/ace"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 border border-accent/40 text-sm font-medium transition-colors"
          >
            View on GitHub
            <ExternalLink className="w-3.5 h-3.5" aria-hidden />
          </a>
        </motion.div>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40 px-6 py-10 sm:px-10 sm:py-12 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" aria-hidden />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/20 border border-accent/20 mb-5">
              <Bot className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">NAT</h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed mb-6">
              Discord bot for <span className="text-slate-300">Dank Memer</span> server pools and community management.
              Moderation, grinders, giveaways, payouts — built with Python and MongoDB.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-slate-500 text-sm">
              <span><strong className="text-accent">300K+</strong> users</span>
              <span><strong className="text-accent">1,000+</strong> servers</span>
            </div>
          </div>
        </motion.header>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 sm:p-8"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Overview</p>
          <h2 className="text-xl font-semibold text-slate-100 mb-1">Features</h2>
          <p className="text-slate-500 text-sm mb-6">Click a card to expand details</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {FEATURE_GROUPS.map((group, i) => (
              <FeatureCard
                key={group.title}
                group={group}
                index={i}
                isExpanded={expandedId === group.title}
                onToggle={() => setExpandedId(expandedId === group.title ? null : group.title)}
              />
            ))}
          </div>
        </motion.section>

        {/* Tech */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 sm:p-8"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Stack</p>
          <h2 className="text-xl font-semibold text-slate-100 mb-4">Tech & Integrations</h2>
          <div className="flex flex-wrap gap-2">
            {['Python', 'MongoDB', 'discord.py', 'Dank Memer', 'Cricket Guru', 'Mafia Bot'].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-2 rounded-lg bg-slate-700/60 text-slate-300 text-sm font-medium border border-slate-600/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
