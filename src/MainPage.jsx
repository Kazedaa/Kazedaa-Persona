import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { personalInfo, highlights, experiences } from "./data/portfolioData";

export default function MainPage() {
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="p5-page-wrapper">
      <style>{`
        .p5-page-wrapper {
          padding: 80px 40px 40px 100px;
          color: white;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .p5-header-skew {
          background: #d92323;
          display: inline-block;
          padding: 15px 40px;
          transform: skewX(-15deg);
          box-shadow: 8px 8px 0px rgba(0,0,0,0.8);
          border: 3px solid black;
          margin-left: 20px;
          align-self: flex-start;
        }

        .p5-header-skew > * {
          transform: skewX(15deg);
        }

        .p5-title {
          font-family: 'Persona5Main';
          font-size: 64px;
          letter-spacing: -2px;
          word-spacing: 8px;
          line-height: 1;
          -webkit-text-stroke: 2px black;
        }

        .p5-subtitle {
          font-family: sans-serif;
          font-weight: bold;
          font-size: 20px;
          letter-spacing: 1px;
          margin-top: 5px;
          color: black;
          text-transform: uppercase;
        }

        .p5-content-box {
          background: rgba(13, 13, 13, 0.85);
          border: 3px solid white;
          padding: 30px;
          position: relative;
          box-shadow: 6px 6px 0px rgba(217, 35, 35, 0.8);
          clip-path: polygon(0 0, 100% 5px, 98% 100%, 2% 98%);
          max-width: 900px;
        }

        .p5-content-box h3 {
          font-family: 'Persona5Main';
          font-size: 40px;
          letter-spacing: -2px;
          word-spacing: 6px;
          color: #d92323;
          margin-bottom: 15px;
          -webkit-text-stroke: 1px white;
        }

        .p5-content-box p {
          font-family: sans-serif;
          font-size: 18px;
          line-height: 1.6;
        }

        .p5-highlights-grid {
          display: flex;
          overflow-x: auto;
          gap: 20px;
          margin-top: 20px;
          padding-bottom: 20px;
        }

        .p5-highlights-grid::-webkit-scrollbar {
          height: 10px;
        }
        .p5-highlights-grid::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.5);
          border: 1px solid #732424;
        }
        .p5-highlights-grid::-webkit-scrollbar-thumb {
          background: #d92323;
        }

        .p5-highlight-card {
          flex: 0 0 350px;
          display: flex;
          background: #1a1a1a;
          border: 2px solid #732424;
          cursor: pointer;
          color: white;
          transition: transform 0.2s, border-color 0.2s;
          clip-path: polygon(2% 0, 100% 0, 98% 100%, 0 98%);
        }

        .p5-highlight-card:hover {
          transform: scale(1.02) rotate(-1deg);
          border-color: #d92323;
        }

        .p5-highlight-card img {
          width: 120px;
          height: 120px;
          object-fit: cover;
        }

        .p5-highlight-info {
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .p5-date {
          font-size: 14px;
          color: #d92323;
          font-weight: bold;
          font-family: 'Persona5Main';
          letter-spacing: 0px;
          word-spacing: 4px;
        }

        .p5-highlight-info p {
          font-size: 15px;
          margin: 0;
          line-height: 1.3;
          font-weight: bold;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .p5-socials-links {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .p5-social-link {
          background: white;
          color: black;
          font-family: 'Persona5Main';
          font-size: 24px;
          letter-spacing: -1px;
          padding: 5px 15px;
          text-decoration: none;
          border: 2px solid black;
          box-shadow: 3px 3px 0px #d92323;
          transform: skewX(-10deg);
          transition: transform 0.2s, background 0.2s;
        }

        .p5-social-link:hover {
          transform: skewX(-10deg) translateY(-3px);
          background: #d92323;
          color: white;
        }

        /* Experience Summary */
        .p5-exp-summary {
          cursor: pointer;
          margin-bottom: 20px;
          padding: 15px;
          border: 2px solid transparent;
          transition: border-color 0.2s, background 0.2s;
        }
        .p5-exp-summary:hover {
          background: rgba(217, 35, 35, 0.1);
          border-color: #d92323;
        }
        .p5-exp-company {
          font-family: 'Persona5Main';
          font-size: 32px;
          letter-spacing: -2px;
          word-spacing: 6px;
          color: white;
        }
        .p5-exp-role {
          color: #d92323;
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 18px;
        }

        /* Education */
        .p5-edu-item {
          margin-bottom: 20px;
        }
        .p5-edu-degree {
          font-family: 'Persona5Main';
          font-size: 32px;
          letter-spacing: -2px;
          word-spacing: 6px;
          color: white;
        }
        .p5-edu-school {
          color: #d92323;
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 2px;
        }
        .p5-edu-date {
          font-size: 14px;
          color: #aaa;
        }

        /* Modal Styles */
        .p5-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(5px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }
        .p5-modal-overlay.open {
          opacity: 1;
          pointer-events: all;
        }
        .p5-modal-content {
          background: rgba(13, 13, 13, 0.95);
          border: 3px solid white;
          padding: 40px;
          max-width: 600px;
          width: 90%;
          position: relative;
          box-shadow: 10px 10px 0px #d92323;
          clip-path: polygon(0 0, 100% 2%, 98% 100%, 2% 98%);
          color: white;
        }
        .p5-modal-close {
          position: absolute;
          top: 15px;
          right: 20px;
          background: transparent;
          border: none;
          color: #d92323;
          font-family: 'Persona5Main';
          font-size: 30px;
          cursor: pointer;
        }
        .p5-modal-image {
          width: 100%;
          height: auto;
          max-height: 300px;
          object-fit: cover;
          border: 2px solid #732424;
          margin-bottom: 20px;
        }
        .p5-modal-date {
          color: #d92323;
          font-family: 'Persona5Main';
          font-size: 24px;
          letter-spacing: -1px;
          word-spacing: 5px;
          margin-bottom: 10px;
        }
        .p5-modal-desc {
          font-family: sans-serif;
          font-size: 18px;
          line-height: 1.5;
          margin-bottom: 25px;
        }
        .p5-modal-link {
          display: inline-block;
          background: white;
          color: black;
          font-family: 'Persona5Main';
          font-size: 24px;
          letter-spacing: -1px;
          padding: 8px 20px;
          text-decoration: none;
          border: 2px solid black;
          box-shadow: 4px 4px 0px #d92323;
          transform: skewX(-10deg);
          transition: transform 0.2s, background 0.2s;
        }
        .p5-modal-link:hover {
          transform: skewX(-10deg) translateY(-3px);
          background: #d92323;
          color: white;
        }
      `}</style>

      <div className="p5-header-skew">
        <div>
          <h1 className="p5-title">{personalInfo.name}</h1>
          <h2 className="p5-subtitle">{personalInfo.education}</h2>
        </div>
      </div>

      <div className="p5-content-box">
        <h3>ABOUT ME</h3>
        <p>{personalInfo.about}</p>
      </div>

      {personalInfo.educationList && personalInfo.educationList.length > 0 && (
        <div className="p5-content-box">
          <h3>EDUCATION</h3>
          {personalInfo.educationList.map((edu, idx) => (
            <div key={idx} className="p5-edu-item">
              <div className="p5-edu-degree">{edu.degree}</div>
              <div className="p5-edu-school">{edu.school}</div>
              <div className="p5-edu-date">{edu.date}</div>
            </div>
          ))}
        </div>
      )}

      <div className="p5-content-box" style={{ maxWidth: '1100px' }}>
        <h3>HIGHLIGHTS</h3>
        <div className="p5-highlights-grid">
          {highlights.map(hl => (
            <div key={hl.id} className="p5-highlight-card" onClick={() => setSelectedHighlight(hl)}>
              <img src={hl.image} alt="highlight" />
              <div className="p5-highlight-info">
                <span className="p5-date">{hl.date}</span>
                <p>{hl.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p5-content-box">
        <h3>EXPERIENCE</h3>
        {experiences.map(exp => (
          <div key={exp.id} className="p5-exp-summary" onClick={() => navigate('/experience')}>
            <div className="p5-exp-company">{exp.company}</div>
            <div className="p5-exp-role">{exp.role} ({exp.dateRange})</div>
            <p className="p5-exp-desc">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="p5-content-box">
        <h3>SOCIALS</h3>
        <div className="p5-socials-links">
          {Object.entries(personalInfo.socials).map(([key, link]) => (
            <a key={key} href={link} className="p5-social-link" target="_blank" rel="noopener noreferrer">
              {key.toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      {/* Highlights Modal */}
      <div 
        className={`p5-modal-overlay ${selectedHighlight ? 'open' : ''}`}
        onClick={() => setSelectedHighlight(null)}
      >
        {selectedHighlight && (
          <div className="p5-modal-content" onClick={e => e.stopPropagation()}>
            <button className="p5-modal-close" onClick={() => setSelectedHighlight(null)}>X</button>
            <img className="p5-modal-image" src={selectedHighlight.image} alt="Highlight" />
            <div className="p5-modal-date">{selectedHighlight.date}</div>
            <div className="p5-modal-desc">{selectedHighlight.description}</div>
            <a href={selectedHighlight.link} target="_blank" rel="noopener noreferrer" className="p5-modal-link">
              VIEW MORE &gt;
            </a>
          </div>
        )}
      </div>

    </div>
  );
}
