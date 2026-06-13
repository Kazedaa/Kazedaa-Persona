import { useState } from 'react';

export default function P5Button({ children, onClick, href, className = "", style = {}, variant = "dark" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setAnimKey(k => k + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const Component = href ? "a" : "button";
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  const clipShape = "polygon(2% 10%, 98% 0%, 100% 85%, 95% 100%, 0% 92%)";
  const bgMain = variant === "red" ? "#d92323" : "rgba(13, 13, 13, 0.95)";
  const bgBorder = variant === "red" ? "#000000" : "#ffffff";
  const textBrightStroke = "rgba(255, 255, 255, 0.9)";

  return (
    <Component
      className={`p5-btn-wrap ${className}`}
      style={style}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <style>{`
        .p5-btn-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
          cursor: pointer;
          background: transparent;
          border: none;
          text-decoration: none;
          padding: 8px 16px;
          transform: skewX(-10deg);
          outline: none;
        }
        
        .p5-btn-base-poly-border {
          position: absolute;
          top: -3px; left: -3px; right: -3px; bottom: -3px;
          background: ${bgBorder};
          z-index: -2;
          pointer-events: none;
          clip-path: ${clipShape};
          transition: transform 0.2s;
        }
        
        .p5-btn-base-poly {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: ${bgMain};
          z-index: -1;
          pointer-events: none;
          clip-path: ${clipShape};
          transition: transform 0.2s;
        }

        @keyframes p5-btn-shadow-pop {
          0%   { transform: translateX(-5px) scaleX(0) scaleY(1); }
          55%  { transform: translateX(-10px) scaleX(1.1) scaleY(1.1); }
          75%  { transform: translateX(-5px) scaleX(0.96) scaleY(0.97); }
          100% { transform: translateX(0) scaleX(1) scaleY(1); }
        }

        @keyframes p5-btn-wiggle-poly {
          0%   { clip-path: polygon(0% 12%, 100% 0%, 98% 88%, 0% 98%); }
          25%  { clip-path: polygon(2% 8%, 98% 2%, 100% 90%, 2% 95%); }
          50%  { clip-path: polygon(0% 10%, 95% 0%, 100% 85%, 5% 100%); }
          75%  { clip-path: polygon(4% 15%, 100% 5%, 96% 95%, 0% 90%); }
          100% { clip-path: polygon(0% 12%, 100% 0%, 98% 88%, 0% 98%); }
        }

        .p5-btn-shadow-tri {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255,255,255,0.85);
          z-index: 1;
          pointer-events: none;
          transform: scaleX(0);
          transform-origin: left center;
          clip-path: ${clipShape};
        }
        .p5-btn-shadow-tri.pop {
          animation: p5-btn-shadow-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .p5-btn-highlight {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: #d92323;
          z-index: 2;
          pointer-events: none;
          transform: scaleX(0);
          transform-origin: left center;
          clip-path: ${clipShape};
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1);
        }
        .p5-btn-wrap:hover .p5-btn-highlight {
          transform: scaleX(1);
          animation: p5-btn-wiggle-poly 0.66s ease-in-out infinite;
        }

        .p5-btn-label-wrap {
          position: relative;
          z-index: 3;
          font-family: 'Persona5Main';
          font-size: inherit;
          letter-spacing: -1px;
          white-space: nowrap;
        }

        .p5-btn-label-dark {
          color: white;
          paint-order: stroke fill;
          -webkit-text-stroke: 1.5px black;
        }
        .p5-btn-wrap:hover .p5-btn-label-dark { color: #ffffff; }

        .p5-btn-label-bright {
          color: #1a1a1a;
          -webkit-text-stroke: 1.5px ${textBrightStroke};
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0;
          clip-path: ${clipShape};
          transition: opacity 0.12s ease;
        }
        .p5-btn-wrap:hover .p5-btn-label-bright { opacity: 1; }
      `}</style>
      
      <div className="p5-btn-base-poly-border" />
      <div className="p5-btn-base-poly" />
      <div key={isHovered ? `pop-${animKey}` : 'idle'} className={`p5-btn-shadow-tri${isHovered ? ' pop' : ''}`} />
      <div className="p5-btn-highlight" />
      
      <div className="p5-btn-label-wrap">
        <span className="p5-btn-label-dark">{children}</span>
        <span className="p5-btn-label-bright" aria-hidden="true">{children}</span>
      </div>
    </Component>
  );
}
