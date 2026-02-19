import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ScanFace, ExternalLink, Cpu, Camera, ArrowLeft, Layers } from 'lucide-react'

export default function FaceDetectionDemoPage() {
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
            href="https://github.com/utki007/Face-Detection-And-Recognition"
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
              <ScanFace className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">Face Detection & Recognition</h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed mb-5">
              A Python pipeline for face detection and recognition using OpenCV. Haar Cascade for detection, LBPH for recognition.
              Built in Dec 2018 as an education project at Vellore Institute of Technology (VIT Vellore).
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-slate-500 text-sm">
              <span><strong className="text-accent">Haar Cascade</strong> — detection</span>
              <span><strong className="text-accent">LBPH</strong> — recognition</span>
            </div>
          </div>
        </motion.header>

        {/* Pipeline */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 sm:p-8"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Overview</p>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-100 mb-4">
            <Layers className="w-5 h-5 text-accent" />
            Two-Stage Pipeline
          </h2>
          <ol className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <li>
              <strong className="text-accentLight">1. Detection</strong> — Haar Cascade locates face regions using <code className="px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-200">cv2.CascadeClassifier</code>.
            </li>
            <li>
              <strong className="text-accentLight">2. Recognition</strong> — LBPH identifies each detected face using <code className="px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-200">cv2.face.LBPHFaceRecognizer</code>, outputting an ID and confidence value.
            </li>
          </ol>
          <p className="text-slate-400 text-sm mt-4">
            Data flow: Camera → Grayscale → Haar Cascade detects faces → LBPH predicts ID per face → Map ID to name via users.json → Display with label.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {['Haar Cascade', 'LBPH', 'OpenCV', 'Grayscale'].map((tag) => (
              <span key={tag} className="px-3.5 py-2 rounded-lg bg-slate-700/60 text-slate-300 text-sm font-medium border border-slate-600/40">
                {tag}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Algorithms */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 sm:p-8"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Technical</p>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-100 mb-4">
            <Cpu className="w-5 h-5 text-accent" />
            Algorithms
          </h2>
          <div className="space-y-5 text-slate-300 text-sm leading-relaxed">
            <div>
              <h3 className="font-medium text-slate-200 mb-2">Haar Cascade</h3>
              <p>
                Pre-trained XML classifier. <code className="text-slate-200">detectMultiScale</code> slides a window over the image at different scales and applies a cascade of tests to reject non-face regions. Returns bounding boxes <code className="text-slate-200">(x, y, w, h)</code> for each face.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-200 mb-2">LBPH (Local Binary Pattern Histogram)</h3>
              <p>
                Splits each face into cells, computes Local Binary Pattern per cell, builds histograms, and concatenates into one feature vector per face. At prediction: compares query to stored vectors, returns closest ID and distance. Lower distance = better match.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Features & Quick start */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 sm:p-8"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Usage</p>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-100 mb-4">
            <Camera className="w-5 h-5 text-accent" />
            Features
          </h2>
          <ul className="space-y-2.5 text-slate-300 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-accent">•</span> Enroll faces — collect training images from camera, train LBPH
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">•</span> Live face recognition — real-time identification from webcam
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">•</span> CLI menu — 3 options: Enroll, Recognize, Exit
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">•</span> ID→name mapping via <code className="px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-200">config/users.json</code>
            </li>
          </ul>
          <p className="text-slate-400 text-sm mt-5">
            <strong className="text-slate-300">Quick start:</strong> <code className="px-1.5 py-0.5 rounded bg-slate-700/60">pip install -r requirements.txt</code> → <code className="px-1.5 py-0.5 rounded bg-slate-700/60">python main.py</code>
          </p>
        </motion.section>
      </div>
    </div>
  )
}
