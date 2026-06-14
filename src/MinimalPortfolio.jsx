import React, { useState, useEffect } from 'react';
import { personalInfo, highlights, experiences, projects, publications } from './data/portfolioData';
import p5Logo from './assets/logo.webp';
import profilePic from './assets/profile-picture.webp';
import { useScrollDirection } from './utils/useScrollDirection';
import { playSelectSound } from './utils/audio';


export default function MinimalPortfolio({ onActivateP5 }) {
  const [theme, setTheme] = useState('dark');
  const [selectedItem, setSelectedItem] = useState(null);
  const isScrollVisible = useScrollDirection();

  const groupedExperiences = experiences.reduce((acc, curr, idx) => {
    const existing = acc.find(e => e.company === curr.company);
    const roleData = { ...curr, originalIdx: idx };
    if (existing) {
      existing.roles.push(roleData);
    } else {
      acc.push({ company: curr.company, roles: [roleData] });
    }
    return acc;
  }, []);

  useEffect(() => {
    document.body.className = `minimal-theme-${theme}`;
    return () => {
      document.body.className = '';
    };
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <div className="minimal-container">
      <button className={`minimal-btn fixed-theme-btn ${!isScrollVisible ? 'nav-hidden' : ''}`} onClick={toggleTheme}>
        {theme === 'light' ? 'DARK MODE' : 'LIGHT MODE'}
      </button>

      <div className={`easter-egg-container ${!isScrollVisible ? 'nav-hidden' : ''}`}>
        <button className="easter-egg-btn" onClick={onActivateP5} onMouseEnter={playSelectSound}>
          <img src={p5Logo} alt="P5 Logo" />
        </button>
      </div>

      <header className="minimal-header">
        <div className="header-content-wrapper">
          <div className="header-image">
            <img src={profilePic} alt="Profile" />
          </div>
          <div className="header-text">
            <h1>{personalInfo.name}</h1>
            <h2>{personalInfo.title}</h2>
          </div>
        </div>
        <p className="minimal-bio">{personalInfo.about}</p>
        <div className="minimal-socials">
          {Object.entries(personalInfo.socials).map(([key, link]) => (
            <a key={key} href={link} target="_blank" rel="noopener noreferrer">
              {key}
            </a>
          ))}
        </div>
      </header>

      <section className="minimal-section">
        <h3>RECENT HIGHLIGHTS</h3>
        <div className="minimal-scroll-container">
          {highlights.map((hl, idx) => (
            <div key={idx} className="minimal-card minimal-scroll-card">
              {hl.image && <img src={hl.image} alt="Highlight" className="minimal-card-image" />}
              <div className="minimal-card-header">
                <span>{hl.date}</span>
              </div>
              <p>{hl.description}</p>
              {hl.link && <a href={hl.link} target="_blank" rel="noopener noreferrer">VIEW MORE</a>}
            </div>
          ))}
        </div>
      </section>

      <section className="minimal-section">
        <h3>EDUCATION</h3>
        <div className="minimal-list">
          {personalInfo.educationList?.map((edu, idx) => (
            <div key={idx} className="minimal-card">
              <div className="minimal-card-header">
                <h4>{edu.degree} @ {edu.school}</h4>
                <span>{edu.date}</span>
              </div>
              {edu.major && <p style={{ margin: '0 0 0.5rem 0' }}><strong>Major:</strong> {edu.major}</p>}
              {edu.minor && <p style={{ margin: '0 0 1.5rem 0' }}><strong>Minor:</strong> {edu.minor}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="minimal-section">
        <h3>EXPERIENCE</h3>
        <div className="minimal-list">
          {groupedExperiences.map((group, gIdx) => (
            <div key={gIdx} className="minimal-exp-group">
              <div className="minimal-exp-company">{group.company}</div>
              <div className="minimal-exp-roles">
                {group.roles.map((role, rIdx) => (
                  <div 
                    key={rIdx} 
                    className="minimal-card clickable"
                    onClick={() => setSelectedItem(role)}
                  >
                    <div className="minimal-card-header">
                      <h4>{role.role}</h4>
                      <span>{role.dateRange}</span>
                    </div>
                    <p className="truncated-desc">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="minimal-section">
        <h3>PUBLICATIONS</h3>
        <div className="minimal-grid">
          {publications.map((pub, idx) => (
            <div key={idx} className="minimal-card clickable" onClick={() => setSelectedItem(pub)}>
              {pub.image && <img src={pub.image} alt={pub.title} className="minimal-card-image" />}
              <h4>{pub.title}</h4>
              <p className="truncated-desc">{pub.description}</p>
              {pub.link && <a href={pub.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>READ PAPER</a>}
            </div>
          ))}
        </div>
      </section>

      <section className="minimal-section">
        <h3>PROJECTS</h3>
        <div className="minimal-grid">
          {projects.map((proj, idx) => (
            <div key={idx} className="minimal-card clickable" onClick={() => setSelectedItem(proj)}>
              {proj.image && <img src={proj.image} alt={proj.title} className="minimal-card-image" />}
              <h4>{proj.title}</h4>
              <p className="truncated-desc">{proj.description}</p>
              {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>VIEW PROJECT</a>}
            </div>
          ))}
        </div>
      </section>

      {/* Modal Overlay */}
      <div 
        className={`minimal-modal-overlay ${selectedItem ? 'open' : ''}`}
        onClick={() => setSelectedItem(null)}
      >
        {selectedItem && (
          <div className="minimal-modal-content" onClick={e => e.stopPropagation()}>
            <button className="minimal-modal-close" onClick={() => setSelectedItem(null)}>X</button>
            {selectedItem.image && <img className="minimal-modal-image" src={selectedItem.image} alt={selectedItem.title || selectedItem.role} />}
            <h2 className="minimal-modal-title">{selectedItem.title || selectedItem.role}</h2>
            <div className="minimal-modal-subtitle">
              {selectedItem.company ? `@ ${selectedItem.company}` : selectedItem.school ? `@ ${selectedItem.school}` : ''}
            </div>
            <div className="minimal-modal-date">{selectedItem.date || selectedItem.dateRange}</div>
            {selectedItem.publisher && <div className="minimal-modal-publisher">{selectedItem.publisher}</div>}
            <div className="minimal-modal-desc">{selectedItem.description}</div>
            {selectedItem.highlights && selectedItem.highlights.length > 0 && (
              <ul className="minimal-modal-highlights">
                {selectedItem.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            )}
            {selectedItem.link && (
              <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="minimal-modal-link" onClick={e => e.stopPropagation()}>
                VIEW MORE
              </a>
            )}
          </div>
        )}
      </div>


      <style>{`
        body.minimal-theme-light {
          --bg-color: #f9f9f9;
          --text-color: #111111;
          --border-color: #e0e0e0;
          --hover-color: #ffffff;
          --secondary-text: #666666;
        }
        body.minimal-theme-dark {
          --bg-color: #111111;
          --text-color: #f9f9f9;
          --border-color: #333333;
          --hover-color: #1a1a1a;
          --secondary-text: #aaaaaa;
        }
        
        .minimal-container {
          background-color: var(--bg-color);
          color: var(--text-color);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          padding: 2rem 10%;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        .fixed-theme-btn {
          position: fixed;
          top: 30px;
          left: 30px;
          z-index: 1000;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s, background 0.2s ease, color 0.2s ease;
        }
        .fixed-theme-btn.nav-hidden {
          transform: translateY(-150%);
          opacity: 0;
          pointer-events: none;
        }
        
        .minimal-btn {
          background: none;
          border: 1px solid var(--text-color);
          color: var(--text-color);
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        
        .minimal-btn:hover {
          background: var(--text-color);
          color: var(--bg-color);
        }
        
        .easter-egg-container {
          position: fixed;
          top: 30px;
          right: 30px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s;
        }
        .easter-egg-container.nav-hidden {
          transform: translateY(-150%);
          opacity: 0;
          pointer-events: none;
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }

        @keyframes heartbeat {
          0% { transform: scale(1); filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.3)); }
          14% { transform: scale(1.1); filter: drop-shadow(4px 8px 15px rgba(217, 35, 35, 0.6)); }
          28% { transform: scale(1); filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.3)); }
          42% { transform: scale(1.1); filter: drop-shadow(4px 8px 15px rgba(217, 35, 35, 0.6)); }
          70% { transform: scale(1); filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.3)); }
        }
        
        .easter-egg-btn {
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          width: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 3s ease-in-out infinite;
        }
        
        .easter-egg-btn img {
          width: 100%;
          animation: heartbeat 2s infinite;
          transform-origin: center;
          transition: transform 0.1s ease, filter 0.1s ease;
        }

        .easter-egg-btn:hover img {
          animation: none;
          transform: scale(1.2) rotate(-5deg);
          filter: drop-shadow(4px 8px 20px rgba(217, 35, 35, 0.9));
        }
        
        .minimal-header {
          margin-top: 4rem;
          margin-bottom: 5rem;
          max-width: 1000px;
        }

        .header-content-wrapper {
          display: flex;
          align-items: center;
          gap: 4rem;
        }

        .header-text {
          flex: 1;
        }

        .header-image {
          flex: 0 0 250px;
        }

        .header-image img {
          width: 100%;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          border-radius: 50%;
          border: 1px solid var(--border-color);
        }

        @media (max-width: 768px) {
          .header-content-wrapper {
            flex-direction: row;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .header-image {
            flex: 0 0 100px;
            width: 100px;
          }
        }
        
        .minimal-header h1 {
          font-size: 3.5rem;
          margin: 0 0 0.5rem 0;
          font-weight: 800;
          letter-spacing: -2px;
        }
        
        .minimal-header h2 {
          font-size: 1.5rem;
          font-weight: 400;
          margin: 0;
          color: var(--secondary-text);
        }
        
        .minimal-bio {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-top: 1.5rem;
          margin-bottom: 2rem;
          color: var(--secondary-text);
        }

        .minimal-socials {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .minimal-socials a {
          color: var(--text-color);
          text-decoration: none;
          text-transform: uppercase;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 1px;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }

        .minimal-socials a:hover {
          border-color: var(--text-color);
        }
        
        .minimal-section {
          margin-bottom: 5rem;
        }
        
        .minimal-section h3 {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
          margin-bottom: 2rem;
          color: var(--secondary-text);
        }
        
        .minimal-list, .minimal-grid {
          display: grid;
          gap: 2rem;
        }
        
        .minimal-grid {
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }

        .minimal-scroll-container {
          display: flex;
          overflow-x: auto;
          gap: 2rem;
          padding-bottom: 1.5rem;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .minimal-scroll-container::-webkit-scrollbar {
          height: 6px;
        }
        
        .minimal-scroll-container::-webkit-scrollbar-track {
          background: var(--bg-color);
        }
        
        .minimal-scroll-container::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 4px;
        }

        .minimal-scroll-container::-webkit-scrollbar-thumb:hover {
          background: var(--secondary-text);
        }

        .minimal-scroll-card {
          flex: 0 0 350px;
          scroll-snap-align: start;
        }
        
        .minimal-card {
          padding: 2rem;
          border: 1px solid var(--border-color);
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
          background-color: var(--hover-color);
          display: flex;
          flex-direction: column;
        }
        
        .minimal-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .minimal-theme-dark .minimal-card:hover {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .minimal-card-image {
          width: 100%;
          height: 200px;
          object-fit: contain;
          margin-bottom: 1.5rem;
          border-radius: 4px;
        }
        
        .minimal-card-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .minimal-card h4 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .minimal-card span {
          font-size: 0.9rem;
          color: var(--secondary-text);
        }
        
        .minimal-card p {
          margin: 0 0 1.5rem 0;
          font-size: 1rem;
          line-height: 1.6;
          color: var(--secondary-text);
        }
        
        .minimal-card a {
          display: inline-block;
          color: var(--text-color);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid var(--text-color);
          padding-bottom: 2px;
          transition: opacity 0.2s;
          align-self: flex-start;
        }

        .minimal-card a:hover {
          opacity: 0.6;
        }

        .minimal-card.clickable {
          cursor: pointer;
        }

        .truncated-desc {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-height: 4.8em;
        }

        .minimal-exp-group {
          margin-bottom: 2rem;
          border-left: 2px solid var(--border-color);
          padding-left: 1.5rem;
        }

        .minimal-exp-company {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-color);
        }

        .minimal-exp-roles {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Modal Styles */
        .minimal-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
          backdrop-filter: blur(5px);
        }
        .minimal-modal-overlay.open {
          opacity: 1;
          pointer-events: all;
        }
        .minimal-modal-content {
          background: var(--bg-color);
          border: 1px solid var(--border-color);
          padding: 3rem;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          width: 90%;
          position: relative;
          color: var(--text-color);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .minimal-theme-dark .minimal-modal-content {
          box-shadow: 0 20px 40px rgba(0,0,0,0.8);
        }
        .minimal-modal-close {
          position: absolute;
          top: 15px;
          right: 20px;
          background: transparent;
          border: none;
          color: var(--secondary-text);
          font-size: 1.5rem;
          cursor: pointer;
          transition: color 0.2s;
        }
        .minimal-modal-close:hover {
          color: var(--text-color);
        }
        .minimal-modal-image {
          width: 100%;
          height: auto;
          max-height: 300px;
          object-fit: cover;
          margin-bottom: 1.5rem;
          border-radius: 4px;
        }
        .minimal-modal-title {
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
          font-weight: 700;
        }
        .minimal-modal-subtitle {
          font-size: 1.2rem;
          color: var(--secondary-text);
          margin-bottom: 0.5rem;
        }
        .minimal-modal-date {
          font-size: 1rem;
          color: var(--secondary-text);
          margin-bottom: 1.5rem;
          font-style: italic;
        }
        .minimal-modal-publisher {
          font-size: 1rem;
          color: var(--secondary-text);
          margin-bottom: 1.5rem;
        }
        .minimal-modal-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-color);
          margin-bottom: 2rem;
        }
        .minimal-modal-highlights {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-color);
          margin-bottom: 2rem;
          padding-left: 1.5rem;
        }
        .minimal-modal-highlights li {
          margin-bottom: 0.5rem;
        }
        .minimal-modal-link {
          display: inline-block;
          color: var(--text-color);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid var(--text-color);
          padding-bottom: 2px;
          transition: opacity 0.2s;
        }
        .minimal-modal-link:hover {
          opacity: 0.6;
        }

        /* ===== MOBILE RESPONSIVE ===== */
        @media (max-width: 768px) {
          .minimal-container {
            padding: 1.5rem 5%;
          }
          .fixed-theme-btn {
            top: 15px;
            left: 15px;
            font-size: 0.75rem !important;
            padding: 0.4rem 0.8rem;
          }
          .easter-egg-container {
            top: 12px;
            right: 12px;
          }
          .easter-egg-btn {
            width: 80px;
          }
          .minimal-header {
            margin-top: 5rem;
            margin-bottom: 3rem;
          }
          .header-content-wrapper {
            gap: 2rem;
          }
          .minimal-header h1 {
            font-size: 2.5rem;
            letter-spacing: -1px;
          }
          .minimal-header h2 {
            font-size: 1.2rem;
          }
          .minimal-bio {
            font-size: 1rem;
          }
          .minimal-socials {
            flex-wrap: wrap;
          }
          .minimal-grid {
            grid-template-columns: 1fr;
          }
          .minimal-scroll-card {
            flex: 0 0 280px;
          }
          .minimal-section {
            margin-bottom: 3rem;
          }
          .minimal-card {
            padding: 1.5rem;
          }
          .minimal-card-image {
            height: 160px;
          }
          .minimal-modal-content {
            padding: 2rem;
          }
          .minimal-modal-title {
            font-size: 1.5rem;
          }
          .minimal-exp-group {
            margin-bottom: 1.5rem;
            padding-left: 1rem;
          }
          .minimal-exp-company {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .minimal-container {
            padding: 1rem 4%;
          }
          .minimal-header {
            margin-top: 4.5rem;
            margin-bottom: 2rem;
          }
          .header-image {
            flex: 0 0 80px;
            width: 80px;
          }
          .minimal-header h1 {
            font-size: 2rem;
          }
          .minimal-header h2 {
            font-size: 1rem;
          }
          .minimal-bio {
            font-size: 0.9rem;
          }
          .minimal-socials {
            gap: 1rem;
          }
          .minimal-socials a {
            font-size: 0.8rem;
          }
          .minimal-scroll-card {
            flex: 0 0 250px;
          }
          .minimal-list, .minimal-grid {
            gap: 1.5rem;
          }
          .minimal-card {
            padding: 1.2rem;
          }
          .minimal-card-image {
            height: 140px;
          }
          .minimal-section h3 {
            font-size: 0.85rem;
            letter-spacing: 2px;
          }
        }
      `}</style>
    </div>
  );
}
