import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, ExternalLink, Cpu, Sparkles, ArrowLeft, Volume2, VolumeX } from 'lucide-react'

// Images and captions from Images/ + captions.txt; generated from product_demo.py (BLIP)
const DEMO_SAMPLES = [
  { image: '/eye-for-the-blind/1000268201_693b08cb0e.jpg', generated: 'A little girl in a pink dress.' },
  { image: '/eye-for-the-blind/1001773457_577c3a7d70.jpg', generated: 'Two dogs playing on the road.' },
  { image: '/eye-for-the-blind/1002674143_1b742ab4b8.jpg', generated: 'A child sitting in the grass.' },
  { image: '/eye-for-the-blind/1007129816_e794419615.jpg', generated: 'Man wearing a hat.' },
]

function CaptionCard({ sample, index }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speechError, setSpeechError] = useState(null)

  const speak = useCallback((text) => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }
    setSpeechError(null)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => {
      setIsPlaying(false)
      setSpeechError('Audio not available')
    }
    window.speechSynthesis.speak(utterance)
  }, [isPlaying])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
      className="group/card relative flex flex-col h-full rounded-2xl border border-slate-700/50 bg-slate-800/50 overflow-hidden shadow-lg shadow-black/20 hover:border-slate-600/70 hover:shadow-xl hover:shadow-black/25 transition-all duration-300"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/60 opacity-0 group-hover/card:opacity-100 transition-opacity rounded-l-2xl" aria-hidden />
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        <img
          src={sample.image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" aria-hidden />
        <button
          type="button"
          onClick={() => speak(sample.generated)}
          className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/95 backdrop-blur-sm border border-slate-600/50 text-slate-100 hover:bg-accent/90 hover:border-accent/50 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-slate-800"
          title="Listen to generated caption"
          aria-label={`Listen: ${sample.generated}`}
        >
          {isPlaying ? (
            <VolumeX className="w-4 h-4" onClick={(e) => { e.stopPropagation(); window.speechSynthesis?.cancel(); }} />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
          <span className="text-xs font-medium">{isPlaying ? 'Stop' : 'Listen'}</span>
        </button>
      </div>
        <div className="flex flex-col flex-1 min-h-0 p-5">
        <div className="rounded-lg bg-accent/10 border border-accent/20 px-3 py-2.5">
          <p className="text-[10px] uppercase tracking-wider text-accent font-semibold mb-1">Caption</p>
          <p className="text-slate-200 text-sm leading-relaxed font-medium">{sample.generated}</p>
        </div>
        {speechError && (
          <p className="text-amber-400/90 text-xs mt-2">{speechError}</p>
        )}
      </div>
    </motion.div>
  )
}

export default function EyeForTheBlindDemoPage() {
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
            href="https://github.com/utki007/eye-for-the-blind"
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
              <Eye className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">Eye for the Blind</h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
              This page showcases the project: a deep learning model that describes images in natural language and speaks captions aloud. Designed for accessibility — helping blind and visually impaired users understand photos through audio.
            </p>
          </div>
        </motion.header>

        {/* Try it */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 sm:p-8"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Sample outputs</p>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-100 mb-1">
            <Sparkles className="w-5 h-5 text-accent" />
            Example captions
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Model-generated descriptions with text-to-speech. Click Listen on any image.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {DEMO_SAMPLES.map((sample, i) => (
              <CaptionCard key={i} sample={sample} index={i} />
            ))}
          </div>
        </motion.section>

        {/* How it works */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 sm:p-8"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Overview</p>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-100 mb-4">
            <Cpu className="w-5 h-5 text-accent" />
            How it works
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            A <strong className="text-accentLight">CNN encoder</strong> extracts visual features from the image.
            An <strong className="text-accentLight">RNN decoder</strong> with <strong className="text-accentLight">attention</strong>
            generates the caption word-by-word. The caption is then converted to speech so users can hear the description.
            Trained on the Flickr8K dataset.
          </p>
          <div className="flex flex-wrap gap-2">
            {['CNN Encoder', 'RNN Decoder', 'Attention', 'Flickr8K', 'Text-to-Speech'].map((tag) => (
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
