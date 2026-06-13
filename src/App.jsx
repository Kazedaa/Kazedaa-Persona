import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PageTransition from './PageTransition'

import MainPage from './MainPage'
import ExperiencePage from './ExperiencePage'
import ProjectsPage from './ProjectsPage'
import PublicationsPage from './PublicationsPage'
import P5SideNav from './P5SideNav'
import mainVideo from './assets/main1.mp4'
import './App.css'

const BGM_STATE_KEY = 'p5-bgm-enabled'
const BGM_VOLUME_KEY = 'p5-bgm-volume'
const DEFAULT_VOLUME = 0.45
const FADE_MS = 450

function BackgroundMusic() {
  const audioRef = useRef(null)
  const fadeRafRef = useRef(null)
  const autoStartRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(() => {
    const saved = Number(localStorage.getItem(BGM_VOLUME_KEY))
    if (Number.isFinite(saved)) return Math.min(1, Math.max(0, saved))
    return DEFAULT_VOLUME
  })

  const stopFade = () => {
    if (fadeRafRef.current) {
      cancelAnimationFrame(fadeRafRef.current)
      fadeRafRef.current = null
    }
  }

  const fadeTo = (target, done) => {
    const audio = audioRef.current
    if (!audio) return

    stopFade()
    const start = audio.volume
    const diff = target - start
    const begin = performance.now()

    const tick = (now) => {
      const p = Math.min(1, (now - begin) / FADE_MS)
      audio.volume = start + diff * p
      if (p < 1) {
        fadeRafRef.current = requestAnimationFrame(tick)
        return
      }
      fadeRafRef.current = null
      if (done) done()
    }

    fadeRafRef.current = requestAnimationFrame(tick)
  }

  const startMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    stopFade()
    audio.volume = 0

    try {
      await audio.play()
      fadeTo(volume)
      setIsPlaying(true)
      autoStartRef.current = false
    } catch {
      setIsPlaying(false)
    }
  }

  const stopMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    fadeTo(0, () => {
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)
    })
  }

  const toggleMusic = async () => {
    if (isPlaying) {
      stopMusic()
      return
    }
    await startMusic()
  }

  const onVolumeChange = (e) => {
    const next = Number(e.target.value)
    setVolume(next)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) audio.volume = volume
    localStorage.setItem(BGM_VOLUME_KEY, String(volume))
  }, [volume, isPlaying])

  useEffect(() => {
    localStorage.setItem(BGM_STATE_KEY, isPlaying ? '1' : '0')
  }, [isPlaying])

  useEffect(() => {
    const shouldAutoStart = localStorage.getItem(BGM_STATE_KEY) === '1'
    if (!shouldAutoStart) return

    autoStartRef.current = true
    const tryAutoplay = async () => {
      if (!autoStartRef.current) return
      await startMusic()
    }

    const unlock = async () => {
      if (!autoStartRef.current) return
      await tryAutoplay()
    }

    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  useEffect(() => () => stopFade(), [])

  return (
    <div className="bgm-panel">
      <audio ref={audioRef} loop preload="none" src="/audio/background.mp3" />
      <button
        className={`bgm-toggle${isPlaying ? ' on' : ''}`}
        type="button"
        onClick={(e) => {
          toggleMusic()
          e.currentTarget.blur()
        }}
        aria-label={isPlaying ? 'Disable background music' : 'Enable background music'}
      >
        {isPlaying ? 'BGM ON' : 'BGM OFF'}
      </button>

      <div className="bgm-slider-wrap" aria-label="Background music volume">
        <span className="bgm-slider-label">VOL</span>
        <input
          className="bgm-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
          onKeyDown={(e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
              e.preventDefault()
            }
          }}
        />
        <span className="bgm-slider-value">{Math.round(volume * 100)}</span>
      </div>
    </div>
  )
}

function SiteBackgroundVideo() {
  return (
    <video
      className="site-bg-video"
      src={mainVideo}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MainPage /></PageTransition>
        } />
        <Route path="/experience" element={
          <PageTransition variant="about"><ExperiencePage /></PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition><ProjectsPage /></PageTransition>
        } />
        <Route path="/publications" element={
          <PageTransition variant="socials"><PublicationsPage /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <SiteBackgroundVideo />
      <P5SideNav />
      <div className="site-content-layer">
        <AnimatedRoutes />
      </div>
      <BackgroundMusic />
    </>
  )
}
