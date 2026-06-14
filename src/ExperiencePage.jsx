import { experiences } from "./data/portfolioData";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './P5Shared.css';
import './ExperiencePage.css';

export default function ExperiencePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const id = location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <div className="p5-page-wrapper">


      <div className="p5-header-skew">
        <div>
          <h1 className="p5-title">EXPERIENCE</h1>
        </div>
      </div>

      <div className="p5-timeline">
        {experiences.map((exp, idx) => (
          <div key={idx} id={`exp-${idx}`} className="p5-experience-box">
            <div className="p5-exp-header">
              <div className="p5-company">{exp.company}</div>
              <div className="p5-date-range">{exp.dateRange}</div>
            </div>
            <div className="p5-role">{exp.role}</div>
            <p className="p5-exp-desc">{exp.description}</p>
            <ul className="p5-exp-bullets">
              {exp.highlights.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
