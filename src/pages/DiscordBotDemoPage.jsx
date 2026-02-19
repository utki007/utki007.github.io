import { useState } from 'react'
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
  Github,
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="rounded-xl border border-slate-700/50 bg-slate-800/50 overflow-hidden hover:border-slate-600/60 transition-colors"
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-4 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="p-2 rounded-lg bg-accent/20 shrink-0">
            <Icon className="w-5 h-5 text-accent" />
          </span>
          <div>
            <h3 className="font-semibold text-slate-100">{group.title}</h3>
            <p className="text-slate-500 text-sm">{group.summary}</p>
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
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-slate-700/50">
              <ul className="pt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item.label} className="text-slate-400 text-sm">
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

  return (
    <div className="min-h-screen pt-8 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-accent text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 mb-4">
            <Bot className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">NAT</h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            Discord bot for <span className="text-slate-300">Dank Memer</span> server pools and community management.
            Moderation, grinders, giveaways, payouts — built with Python and MongoDB.
          </p>
          <div className="flex justify-center gap-8 text-slate-500 text-sm">
            <span><strong className="text-accent">300K+</strong> users</span>
            <span><strong className="text-accent">1,000+</strong> servers</span>
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-lg font-semibold text-slate-100 mb-2">Features</h2>
          <p className="text-slate-500 text-sm mb-6">Click a card to expand details</p>
          <div className="grid gap-4 sm:grid-cols-2">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 mb-10"
        >
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Tech & Integrations</h3>
          <div className="flex flex-wrap gap-2">
            {['Python', 'MongoDB', 'discord.py', 'Dank Memer', 'Cricket Guru', 'Mafia Bot'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-300 text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <a
            href="https://docs.natbot.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 border border-accent/40 font-medium transition-colors"
          >
            Documentation
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/utki007/ace"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-600/60 text-slate-300 hover:bg-slate-800/80 hover:text-slate-100 font-medium transition-colors"
          >
            <Github className="w-4 h-4" />
            Source Code (ace)
          </a>
          <a
            href="https://discord.gg/C44Hgr9nDQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-600/60 text-slate-300 hover:bg-slate-800/80 hover:text-slate-100 font-medium transition-colors"
          >
            Support Server
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}
