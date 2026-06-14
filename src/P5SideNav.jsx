import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { playSelectSound } from "./utils/audio.js";
import imgMain from "./assets/p5-protagonist-main.webp";
import imgExperience from "./assets/p5-protagonist-experience.webp";
import imgProjects from "./assets/p5-protagonist-projects.webp";
import imgPublications from "./assets/p5-protagonist-publications.webp";
import { useScrollDirection } from './utils/useScrollDirection';
import P5Button from "./P5Button";
import './P5SideNav.css';

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
