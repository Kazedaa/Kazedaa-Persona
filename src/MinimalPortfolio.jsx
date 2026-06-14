import React, { useState, useEffect } from 'react';
import { personalInfo, highlights, groupedExperiences, projects, publications } from './data/portfolioData';
import p5Logo from './assets/logo.webp';
import profilePic from './assets/profile-picture.webp';
import { useScrollDirection } from './utils/useScrollDirection';
import { playSelectSound } from './utils/audio';
import './MinimalPortfolio.css';


export default function MinimalPortfolio({ onActivateP5 }) {
  const [theme, setTheme] = useState('dark');
  const [selectedItem, setSelectedItem] = useState(null);
  const isScrollVisible = useScrollDirection();

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


    </div>
  );
}
