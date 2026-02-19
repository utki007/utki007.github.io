import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, FileText } from 'lucide-react'

const RESUME_PDF = '/Utkarsh Narain.pdf'

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-8 pb-28 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">Resume</h1>
          <p className="text-slate-400 text-sm">View below or download a copy</p>
        </motion.header>

        {/* Actions bar */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 rounded-xl border border-slate-700/50 bg-slate-800/30"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-accent text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Back to home
          </Link>
          <a
            href={RESUME_PDF}
            download="Utkarsh-Narain-Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 border border-accent/40 text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" aria-hidden />
            Download PDF
          </a>
        </motion.div>

        {/* Document viewer */}
        <motion.div
          className="rounded-xl border border-slate-700/50 bg-slate-900/50 overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{ minHeight: 'calc(100vh - 14rem)' }}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-700/50 bg-slate-800/50">
            <FileText className="w-4 h-4 text-accent shrink-0" aria-hidden />
            <span className="text-slate-400 text-sm font-medium">Preview</span>
          </div>
          <iframe
            src={`${RESUME_PDF}#view=FitH`}
            title="Utkarsh Narain — Resume"
            className="w-full border-0 bg-white"
            style={{ height: 'calc(100vh - 12rem)', minHeight: 560 }}
          />
        </motion.div>
      </div>
    </div>
  )
}
