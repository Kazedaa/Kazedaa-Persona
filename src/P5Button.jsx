import { useState } from 'react';
import { playSelectSound } from './utils/audio';
import './P5Button.css';

export default function P5Button({ children, onClick, href, className = "", style = {}, variant = "dark" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const handleMouseEnter = () => {
    playSelectSound();
    setIsHovered(true);
    setAnimKey(k => k + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchEnd = () => {
    // Delay removing the hover state so the animation plays out fully on tap
    setTimeout(() => {
      setIsHovered(false);
    }, 400);
  };

  const Component = href ? "a" : "button";
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  const clipShape = "polygon(2% 10%, 98% 0%, 100% 85%, 95% 100%, 0% 92%)";
  const bgMain = variant === "red" ? "#d92323" : "rgba(13, 13, 13, 0.95)";
  const bgBorder = variant === "red" ? "#000000" : "#ffffff";
  const textBrightStroke = "rgba(255, 255, 255, 0.9)";

  return (
    <Component
      className={`p5-btn-wrap ${className} ${isHovered ? 'is-hovered' : ''}`}
      style={style}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      {...props}
    >
      <div className="p5-btn-base-poly-border" style={{ background: bgBorder }} />
      <div className="p5-btn-base-poly" style={{ background: bgMain }} />
      <div key={isHovered ? `pop-${animKey}` : 'idle'} className={`p5-btn-shadow-tri${isHovered ? ' pop' : ''}`} />
      <div className="p5-btn-highlight" />
      
      <div className="p5-btn-label-wrap">
        <span className="p5-btn-label-dark">{children}</span>
        <span className="p5-btn-label-bright" aria-hidden="true" style={{ WebkitTextStroke: `1.5px ${textBrightStroke}` }}>{children}</span>
      </div>
    </Component>
  );
}
