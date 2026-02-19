import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ScanFace, ExternalLink, Cpu, Camera, ArrowLeft, Layers } from 'lucide-react'

export default function FaceDetectionDemoPage() {
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
            <ScanFace className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">Face Detection & Recognition</h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            A Python pipeline for face detection and recognition using OpenCV. Haar Cascade for detection, LBPH for recognition.
            Built in 2019 as an education project at Vellore Institute of Technology (VIT Vellore).
          </p>
          <div className="flex justify-center gap-8 text-slate-500 text-sm">
            <span><strong className="text-accent">Haar Cascade</strong> — detection</span>
            <span><strong className="text-accent">LBPH</strong> — recognition</span>
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 rounded-xl border border-slate-700/50 bg-slate-800/50 p-6"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-100 mb-4">
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
          <div className="flex flex-wrap gap-2 mt-4">
            {['Haar Cascade', 'LBPH', 'OpenCV', 'Grayscale'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-lg bg-slate-700/50 text-slate-300 text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12 rounded-xl border border-slate-700/50 bg-slate-800/50 p-6"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-100 mb-4">
            <Cpu className="w-5 h-5 text-accent" />
            Algorithms
          </h2>
          <div className="space-y-4 text-slate-300 text-sm">
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

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 rounded-xl border border-slate-700/50 bg-slate-800/50 p-6"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-100 mb-4">
            <Camera className="w-5 h-5 text-accent" />
            Features
          </h2>
          <ul className="space-y-2 text-slate-300 text-sm">
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
          <p className="text-slate-400 text-sm mt-4">
            <strong className="text-slate-300">Quick start:</strong> <code className="px-1.5 py-0.5 rounded bg-slate-700/60">pip install -r requirements.txt</code> → <code className="px-1.5 py-0.5 rounded bg-slate-700/60">python main.py</code>
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <a
            href="https://github.com/utki007/Face-Detection-Recognition"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 border border-accent/40 font-medium transition-colors"
          >
            View on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}
