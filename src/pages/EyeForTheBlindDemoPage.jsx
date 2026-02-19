import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, ExternalLink, Cpu, Sparkles, ArrowLeft, Volume2, VolumeX, Loader2 } from 'lucide-react'

const SAMPLE_OUTPUTS = [
  {
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
    caption: 'A dog running through a field of grass.',
  },
  {
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80',
    caption: 'A child playing with a red ball outdoors.',
  },
  {
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&q=80',
    caption: 'A person looking at the night sky with stars.',
  },
]

function CaptionCard({ sample, index }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speechError, setSpeechError] = useState(null)

  const speak = useCallback(() => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }
    setSpeechError(null)
    const utterance = new SpeechSynthesisUtterance(sample.caption)
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => {
      setIsPlaying(false)
      setSpeechError('Audio not available')
    }
    window.speechSynthesis.speak(utterance)
  }, [sample.caption, isPlaying])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
      className="group rounded-xl border border-slate-700/50 bg-slate-800/50 overflow-hidden hover:border-accent/40 transition-colors"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-800">
        <img
          src={sample.image}
          alt=""
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={speak}
          className="absolute bottom-3 right-3 p-3 rounded-full bg-dark/90 hover:bg-accent/90 text-slate-100 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
          title="Listen to description"
          aria-label={`Listen: ${sample.caption}`}
        >
          {isPlaying ? (
            <VolumeX className="w-5 h-5" onClick={() => window.speechSynthesis?.cancel()} />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="p-4">
        <p className="text-slate-300 text-sm mb-2">&ldquo;{sample.caption}&rdquo;</p>
        <button
          type="button"
          onClick={speak}
          className="flex items-center gap-2 text-accent hover:text-accentLight text-xs font-medium transition-colors"
        >
          {isPlaying ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Listening…
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              Listen to description
            </>
          )}
        </button>
        {speechError && (
          <p className="text-amber-400/80 text-xs mt-1">{speechError}</p>
        )}
      </div>
    </motion.div>
  )
}

export default function EyeForTheBlindDemoPage() {
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
            <Eye className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">Eye for the Blind</h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            Image captioning model that describes photos in plain language. 
            Click <span className="text-accent font-medium">Listen</span> on any image to hear its description.
          </p>
        </motion.div>

        {/* Try it - Sample outputs first for intuitive flow */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-100 mb-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Try it
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Click &quot;Listen to description&quot; to hear each image described — simulating how the model helps visually impaired users.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_OUTPUTS.map((sample, i) => (
              <CaptionCard key={i} sample={sample} index={i} />
            ))}
          </div>
        </motion.section>

        {/* How it works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 rounded-xl border border-slate-700/50 bg-slate-800/50 p-6"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-100 mb-4">
            <Cpu className="w-5 h-5 text-accent" />
            How it works
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            A <strong className="text-accentLight">CNN encoder</strong> extracts visual features from the image. 
            An <strong className="text-accentLight">RNN decoder</strong> with <strong className="text-accentLight">attention</strong> 
            generates the caption word-by-word. The caption is then converted to speech so users can hear the description. 
            Trained on the Flickr8K dataset.
          </p>
          <div className="flex flex-wrap gap-2">
            {['CNN Encoder', 'RNN Decoder', 'Attention', 'Flickr8K', 'Text-to-Speech'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-slate-700/50 text-slate-300 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <a
            href="https://github.com/utki007/eye-for-the-blind"
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
