import { Link } from 'react-router-dom'
import { Mail, Linkedin, Github, FileText, Download } from 'lucide-react'

const RESUME_URL = '/Utkarsh Narain.pdf'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-700/50 bg-dark/95 backdrop-blur-sm py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          {/* Name & Copyright — hidden on small screens */}
          <div className="hidden sm:block">
            <p className="font-semibold text-slate-100">Utkarsh Narain</p>
            <p className="text-slate-500 text-sm mt-0.5">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Mobile / kiosk: single Contact button */}
          <div className="flex justify-center sm:hidden">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 border border-accent/40 font-medium text-sm transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden />
              Contact
            </Link>
          </div>

          {/* Desktop: Contact & Resume */}
          <div className="hidden sm:flex flex-col sm:items-end gap-3">
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:utkarshnarain007@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-accent text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/utkarsh-narain"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-accent text-sm transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/utki007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-accent text-sm transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/resume"
                className="flex items-center gap-2 text-accent hover:text-accentLight text-sm font-medium transition-colors"
              >
                <FileText className="w-4 h-4" />
                View resume
              </Link>
              <a
                href={RESUME_URL}
                download="Utkarsh-Narain-Resume.pdf"
                className="flex items-center gap-2 text-slate-400 hover:text-accent text-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
