import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { playSelectSound } from "./utils/audio.js";
import imgMain from "./assets/p5-protagonist-main.png";
import imgExperience from "./assets/p5-protagonist-experience.png";
import imgProjects from "./assets/p5-protagonist-projects.png";
import imgPublications from "./assets/p5-protagonist-publications.png";
import { useScrollDirection } from './utils/useScrollDirection';
import P5Button from "./P5Button";

const ITEMS = [
  { id: "main",         label: "MAIN",          page: "/",            fontSize: 90, offsetX: 0,  offsetY: 0,  skew: -6,  skewY: 8  },
  { id: "experience",   label: "EXPERIENCE",    page: "/experience",  fontSize: 70, offsetX: 30, offsetY: 20,  skew: -11, skewY: -6 },
  { id: "publications", label: "PUBLICATIONS",  page: "/publications",fontSize: 60, offsetX: 40, offsetY: 25,  skew: -3,  skewY: 5   },
  { id: "projects",     label: "PROJECTS",      page: "/projects",    fontSize: 80, offsetX: 20,  offsetY: 15,  skew: 0, skewY: -4  },
];

const CLIP_SHAPES = [
  () => "polygon(2% 10%, 98% 0%, 100% 85%, 95% 100%, 0% 92%)",
  () => "polygon(0% 0%, 95% 8%, 100% 95%, 85% 100%, 5% 90%)",
  () => "polygon(5% 5%, 100% 0%, 92% 100%, 80% 100%, 0% 85%)",
  () => "polygon(0% 15%, 90% 0%, 100% 90%, 92% 100%, 8% 95%)",
];

const IMAGES = [imgMain, imgExperience, imgPublications, imgProjects];

export default function P5SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const isScrollVisible = useScrollDirection();
  const location = useLocation();
  const navigate = useNavigate();
  const [winWidth, setWinWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  useEffect(() => {
    const onResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const fontScale = winWidth <= 480 ? 0.45 : winWidth <= 768 ? 0.6 : 1;

  const activeIdx = Math.max(0, ITEMS.findIndex(i => i.page === location.pathname));
  const [active, setActive] = useState(activeIdx);
  const isFirstRenderAudio = useRef(true);
  const [animKey, setAnimKey] = useState(0);

  const activate = (idx) => {
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  useEffect(() => {
    setActive(activeIdx);
  }, [activeIdx]);

  useEffect(() => {
    if (isFirstRenderAudio.current) {
      isFirstRenderAudio.current = false;
      return;
    }
    if (isOpen) {
        playSelectSound();
    }
  }, [active, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "ArrowUp")   activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1));
      if (e.key === "Enter") {
        navigate(ITEMS[active].page);
        setIsOpen(false);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, isOpen, navigate]);

  return (
    <>
      <style>{`
        .p5-sidenav-trigger {
          position: fixed !important;
          top: 20px;
          left: 20px;
          z-index: 1000;
          font-size: 32px;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s !important;
        }
        .p5-sidenav-trigger.nav-hidden {
          transform: translateX(-150%) !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        .p5-sidenav-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          z-index: 997;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(4px);
        }
        .p5-sidenav-overlay.open {
          opacity: 1;
          pointer-events: all;
        }

        .p5-sidenav-drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 50vw;
          min-width: 600px;
          max-width: 100vw;
          z-index: 999;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 80px;
          pointer-events: none;
        }
        .p5-sidenav-drawer.open {
          transform: translateX(0);
          pointer-events: auto;
        }

        .p5-sidenav-image-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 60vw;
          z-index: 998;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          filter: drop-shadow(-12px 0px 0px #d92323);
        }
        .p5-sidenav-image-drawer.open {
          transform: translateX(0);
        }
        .p5-sidenav-image-drawer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 40% center;
          clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
        }

        .p5-sidenav-drawer .p5-menu {
          position: relative;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 30px;
        }

        .p5-sidenav-drawer .p5-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          line-height: 1;
          text-decoration: none;
          opacity: 0;
          transform: translateX(-36px);
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .p5-sidenav-drawer.open .p5-row {
          opacity: 1;
          transform: translateX(0);
        }

        .p5-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 120%; height: 200%;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, transparent 70%);
          filter: blur(18px);
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .p5-row.active .p5-glow { opacity: 1; }

        .p5-skew-wrap {
          position: relative;
          display: flex;
          align-items: center;
          isolation: isolate;
        }
        
        .p5-base-poly-border {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: #ffffff;
          z-index: -2;
          pointer-events: none;
          transform: translateY(-50%) translateX(-25px);
          transition: transform 0.2s;
        }
        
        .p5-base-poly {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: rgba(13, 13, 13, 0.95);
          z-index: -1;
          pointer-events: none;
          transform: translateY(-50%) translateX(-20px);
          transition: transform 0.2s;
        }

        @keyframes p5-shadow-pop {
          0%   { transform: translateY(-40%) translateX(-12px) scaleX(0) scaleY(1); }
          55%  { transform: translateY(-46%) translateX(-15px) scaleX(1.22) scaleY(1.18); }
          75%  { transform: translateY(-39%) translateX(-11px) scaleX(0.96) scaleY(0.97); }
          100% { transform: translateY(-40%) translateX(-12px) scaleX(1) scaleY(1); }
        }

        @keyframes p5-wiggle-poly {
          0%   { clip-path: polygon(0% 56%, 16% 0%, 76% 7%, 100% 24%, 94% 100%, 8% 88%); }
          25%  { clip-path: polygon(0% 62%, 12% 6%, 84% 0%, 100% 34%, 88% 100%, 2% 94%); }
          50%  { clip-path: polygon(0% 40%, 28% 10%, 72% 0%, 100% 44%, 98% 92%, 14% 100%); }
          75%  { clip-path: polygon(0% 52%, 22% 0%, 80% 12%, 100% 28%, 90% 100%, 6% 82%); }
          100% { clip-path: polygon(0% 56%, 16% 0%, 76% 7%, 100% 24%, 94% 100%, 8% 88%); }
        }

        .p5-shadow-tri {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: rgba(255,255,255,0.85);
          z-index: 1;
          pointer-events: none;
          transform: translateY(-40%) translateX(-12px) scaleX(0);
          transition: transform 0.18s ease;
        }
        .p5-shadow-tri.pop {
          animation: p5-shadow-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .p5-highlight {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: #d92323; /* Changed highlight color to red */
          z-index: 2;
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }
        .p5-row.active .p5-highlight {
          animation: p5-wiggle-poly 0.66s ease-in-out infinite;
        }

        .p5-label-wrap {
          position: relative;
          z-index: 3;
        }

        .p5-label-base {
          font-family: 'Persona5Main';
          font-style: italic;
          letter-spacing: 0.6px;
          line-height: 0.85;
          display: block;
          white-space: nowrap;
          user-select: none;
          color: #ffffff;
          -webkit-text-stroke: 10px rgba(0, 0, 0, 0.8);
          paint-order: stroke fill;
        }

        .p5-label-dark {
          color: #f6f3f3;
          transition: color 0.12s ease;
        }
        .p5-row.active .p5-label-dark { color: #ffffff; }
        .p5-row:hover:not(.active) .p5-label-dark { color: #ffffff; }

        .p5-label-bright {
          color: #1a1a1a;
          -webkit-text-stroke: 10px rgba(255, 255, 255, 0.9);
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.12s ease;
        }
        .p5-row.active .p5-label-bright { opacity: 1; }

        /* ===== MOBILE RESPONSIVE ===== */
        @media (max-width: 768px) {
          .p5-sidenav-trigger {
            font-size: 22px !important;
            top: 12px !important;
            left: 12px !important;
          }
          .p5-sidenav-drawer {
            width: 100vw;
            min-width: unset;
            padding: 30px 20px;
          }
          .p5-sidenav-drawer .p5-menu {
            gap: 28px;
          }
          .p5-sidenav-drawer .p5-row {
            margin-left: 0 !important;
            margin-top: 8px !important;
          }
          /* Image sits behind the menu as a full-screen background */
          .p5-sidenav-image-drawer {
            width: 100vw;
            z-index: 997;
            opacity: 0.85;
            filter: none;
          }
          .p5-sidenav-image-drawer img {
            clip-path: none;
            object-position: center center;
          }
          .p5-label-base {
            -webkit-text-stroke: 5px rgba(0, 0, 0, 0.8) !important;
          }
          .p5-label-bright {
            -webkit-text-stroke: 5px rgba(255, 255, 255, 0.9) !important;
          }
          .p5-sidenav-overlay.open {
            background: rgba(0, 0, 0, 0.7);
          }
        }

        @media (max-width: 480px) {
          .p5-sidenav-drawer {
            padding: 20px 12px;
          }
          .p5-sidenav-drawer .p5-menu {
            gap: 22px;
          }
        }
      `}</style>

      {/* Button to toggle navigation */}
      <P5Button 
        className={`p5-sidenav-trigger ${!isScrollVisible && !isOpen ? 'nav-hidden' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        variant="dark"
      >
        {isOpen ? "CLOSE" : "MENU"}
      </P5Button>

      {/* Overlay to close menu when clicking outside */}
      <div 
        className={`p5-sidenav-overlay ${isOpen ? "open" : ""}`} 
        onClick={() => setIsOpen(false)}
      />

      {/* The side drawer */}
      <div className={`p5-sidenav-drawer ${isOpen ? "open" : ""}`}>
        <nav className="p5-menu">
           {ITEMS.map((item, i) => {
            const isActive = active === i;
            const dist = Math.abs(i - active);
            const opacity = isActive ? 1 : Math.max(0.5, 1 - dist * 0.2);
            const scaledFontSize = item.fontSize * fontScale;
            const estW = item.label.length * scaledFontSize * 0.8 + 200 * fontScale;
            const estH = scaledFontSize * 1.3;
            const clipFn = CLIP_SHAPES[i] ?? CLIP_SHAPES[0];

            return (
              <a
                key={item.id}
                href={item.page}
                className={`p5-row ${isActive ? "active" : ""}`}
                style={{
                  marginLeft: item.offsetX,
                  marginTop: item.offsetY,
                  transitionDelay: isOpen ? `${i * 80}ms` : "0ms",
                }}
                onClick={(e) => { 
                  e.preventDefault(); 
                  navigate(item.page);
                  setIsOpen(false);
                }}
                onMouseEnter={() => activate(i)}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="p5-glow" />
                <div
                  className="p5-skew-wrap"
                  style={{ transform: `skewX(${item.skew}deg) skewY(${item.skewY}deg)` }}
                >
                  <div
                    className="p5-base-poly-border"
                    style={{
                      width: estW + 50,
                      height: estH + 50,
                      clipPath: clipFn(estW + 50, estH + 50),
                    }}
                  />
                  <div
                    className="p5-base-poly"
                    style={{
                      width: estW + 40,
                      height: estH + 40,
                      clipPath: clipFn(estW + 40, estH + 40),
                    }}
                  />
                  <div
                    key={isActive ? `pop-${i}-${animKey}` : `idle-${i}`}
                    className={`p5-shadow-tri${isActive ? ' pop' : ''}`}
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                    }}
                  />
                  <div
                    className="p5-highlight"
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                      transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
                    }}
                  />
                  <div className="p5-label-wrap" style={{ opacity }}>
                    <span className="p5-label-base p5-label-dark" style={{ fontSize: scaledFontSize }}>
                      {item.label}
                    </span>
                    <span
                      className="p5-label-base p5-label-bright"
                      style={{
                        fontSize: scaledFontSize,
                        clipPath: clipFn(estW, estH),
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </nav>
      </div>

      {/* The right image drawer */}
      <div className={`p5-sidenav-image-drawer ${isOpen ? "open" : ""}`}>
        <img src={IMAGES[active]} alt="Joker" />
      </div>
    </>
  );
}
