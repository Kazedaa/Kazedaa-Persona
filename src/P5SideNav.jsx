import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { playSelectSound } from "./utils/audio.js";

const ITEMS = [
  { id: "main",         label: "MAIN",          page: "/",            fontSize: 48, offsetX: 0,  offsetY: 0,  skew: -6,  skewY: 8  },
  { id: "experience",   label: "EXPERIENCE",    page: "/experience",  fontSize: 36, offsetX: 12, offsetY: 20,  skew: -11, skewY: -6 },
  { id: "projects",     label: "PROJECTS",      page: "/projects",    fontSize: 40, offsetX: 8,  offsetY: 15,  skew: 0, skewY: -4  },
  { id: "publications", label: "PUBLICATIONS",  page: "/publications",fontSize: 32, offsetX: 16, offsetY: 25,  skew: -3,  skewY: 5   },
];

const CLIP_SHAPES = [
  () => "polygon(0% 44%, 24% 6%, 82% 0%, 100% 36%, 82% 100%, 18% 94%)",
  () => "polygon(0% 44%, 24% 6%, 82% 0%, 100% 36%, 82% 100%, 18% 94%)",
  () => "polygon(0% 44%, 24% 6%, 82% 0%, 100% 36%, 82% 100%, 18% 94%)",
  () => "polygon(0% 44%, 24% 6%, 82% 0%, 100% 36%, 82% 100%, 18% 94%)",
];

export default function P5SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
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
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1000;
          background: #d92323;
          color: white;
          border: 3px solid #000;
          padding: 10px 20px;
          font-family: 'Persona5Main';
          font-size: 32px;
          cursor: pointer;
          transform: skewX(-10deg);
          transition: transform 0.2s, background 0.2s;
          box-shadow: 4px 4px 0px rgba(0,0,0,0.8);
          letter-spacing: 2px;
        }
        .p5-sidenav-trigger:hover {
          transform: skewX(-10deg) scale(1.05);
          background: #ff3333;
        }

        .p5-sidenav-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          z-index: 998;
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
          width: 450px;
          max-width: 100vw;
          background: url('/assets/p5-bg-pattern.png') #0d0d0d;
          z-index: 999;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex;
          flex-direction: column;
          padding: 100px 40px 40px 40px;
          border-right: 5px solid #d92323;
          box-shadow: 10px 0 20px rgba(0,0,0,0.5);
          overflow-y: auto;
        }
        .p5-sidenav-drawer.open {
          transform: translateX(0);
        }

        .p5-sidenav-drawer .p5-menu {
          position: relative;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 30px;
          pointer-events: all;
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
      `}</style>

      {/* Button to toggle navigation */}
      <button 
        className="p5-sidenav-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? "CLOSE" : "MENU"}
      </button>

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
            const estW = item.label.length * item.fontSize * 0.6 + 80;
            const estH = item.fontSize * 0.94;
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
                    <span className="p5-label-base p5-label-dark" style={{ fontSize: item.fontSize }}>
                      {item.label}
                    </span>
                    <span
                      className="p5-label-base p5-label-bright"
                      style={{
                        fontSize: item.fontSize,
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
    </>
  );
}
