import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { personalInfo, highlights, groupedExperiences } from "./data/portfolioData";
import profilePic from './assets/profile-picture.webp';
import P5Button from "./P5Button";
import P5Modal from "./P5Modal";
import { playSelectSound } from './utils/audio';
import './P5Shared.css';
import './MainPage.css';

export default function MainPage() {
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="p5-page-wrapper">


      <div className="p5-hero-section">
        <div className="p5-profile-img-container">
          <img src={profilePic} alt="Profile" className="p5-profile-img" />
        </div>
        <div className="p5-hero-content">
          <div className="p5-header-skew">
            <div>
              <h1 className="p5-title">{personalInfo.name}</h1>
              <h2 className="p5-subtitle">{personalInfo.education}</h2>
            </div>
          </div>
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
              <div className="p5-edu-date" style={{ marginBottom: '10px' }}>{edu.date}</div>
              {edu.major && <div style={{ fontFamily: 'sans-serif', fontSize: '18px', color: 'white', marginBottom: '5px' }}><strong>Major:</strong> {edu.major}</div>}
              {edu.minor && <div style={{ fontFamily: 'sans-serif', fontSize: '18px', color: 'white', marginBottom: '10px' }}><strong>Minor:</strong> {edu.minor}</div>}
            </div>
          ))}
        </div>
      )}

      <div className="p5-content-box">
        <h3>HIGHLIGHTS</h3>
        <div className="p5-highlights-grid">
          {highlights.map((hl, idx) => (
            <div key={idx} className="p5-highlight-card-wrapper" onClick={() => setSelectedHighlight(hl)} onMouseEnter={playSelectSound}>
              <div className="p5-highlight-card">
                <img src={hl.image} alt="highlight" />
                <div className="p5-highlight-info">
                  <span className="p5-date">{hl.date}</span>
                  <p>{hl.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p5-content-box">
        <h3>EXPERIENCE</h3>
        {groupedExperiences.map((group, gIdx) => (
          <div key={gIdx} className="p5-exp-group">
            <div className="p5-exp-company-name">{group.company}</div>
            <div className="p5-exp-roles-tree">
              {group.roles.map((role, rIdx) => (
                <div 
                  key={rIdx} 
                  className="p5-exp-role-node" 
                  onClick={() => navigate(`/experience#exp-${role.originalIdx}`)}
                  onMouseEnter={playSelectSound}
                >
                  <div className="p5-exp-role-title">{role.role}</div>
                  <div className="p5-exp-role-date">{role.dateRange}</div>
                  <p className="p5-exp-desc">{role.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p5-content-box">
        <h3>SOCIALS</h3>
        <div className="p5-socials-links">
          {Object.entries(personalInfo.socials).map(([key, link]) => (
            <P5Button key={key} href={link} className="p5-social-link" variant="dark">
              <span style={{letterSpacing: '-4px', wordSpacing: '6px'}}>{key.toUpperCase()}</span>
            </P5Button>
          ))}
        </div>
      </div>

      <P5Modal 
        isOpen={!!selectedHighlight} 
        onClose={() => setSelectedHighlight(null)} 
        data={selectedHighlight} 
        linkText="VIEW MORE >"
      />

    </div>
  );
}
