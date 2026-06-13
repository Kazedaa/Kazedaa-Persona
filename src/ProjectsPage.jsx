import { useState } from "react";
import { projects } from "./data/portfolioData";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

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

        .p5-projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 40px;
          max-width: 1200px;
        }

        .p5-project-card {
          background: rgba(13, 13, 13, 0.9);
          border: 3px solid white;
          color: white;
          position: relative;
          box-shadow: 6px 6px 0px #732424;
          clip-path: polygon(0 0, 100% 2%, 98% 100%, 2% 98%);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .p5-project-card:hover {
          transform: scale(1.03) rotate(1deg);
          box-shadow: 8px 8px 0px #d92323;
        }

        .p5-project-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 3px solid #d92323;
          filter: grayscale(80%) contrast(120%);
          transition: filter 0.3s;
        }

        .p5-project-card:hover .p5-project-img {
          filter: grayscale(0%) contrast(100%);
        }

        .p5-project-info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .p5-project-title {
          font-family: 'Persona5Main';
          font-size: 32px;
          color: #ffffff;
          margin-bottom: 5px;
          -webkit-text-stroke: 1px black;
          letter-spacing: -1px;
          word-spacing: 5px;
        }

        .p5-project-date {
          font-family: 'Persona5Main';
          font-size: 18px;
          color: #d92323;
          margin-bottom: 15px;
          letter-spacing: -1px;
          word-spacing: 4px;
        }

        .p5-project-desc {
          font-family: sans-serif;
          font-size: 15px;
          line-height: 1.5;
          margin-bottom: 20px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .p5-project-link-btn {
          align-self: flex-start;
          background: white;
          color: black;
          font-family: 'Persona5Main';
          font-size: 20px;
          letter-spacing: -1px;
          padding: 5px 15px;
          border: 2px solid black;
          transform: skewX(-10deg);
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }

        .p5-project-link-btn:hover {
          background: #d92323;
          color: white;
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
          max-width: 700px;
          max-height: 90vh;
          overflow-y: auto;
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
          max-height: 350px;
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
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 25px;
        }
      `}</style>

      <div className="p5-header-skew">
        <div>
          <h1 className="p5-title">PROJECTS</h1>
        </div>
      </div>

      <div className="p5-projects-grid">
        {projects.map(proj => (
          <div key={proj.id} className="p5-project-card" onClick={() => setSelectedProject(proj)}>
            <img src={proj.image} alt={proj.title} className="p5-project-img" />
            <div className="p5-project-info">
              <div className="p5-project-title">{proj.title}</div>
              <div className="p5-project-date">{proj.date}</div>
              <p className="p5-project-desc">{proj.description}</p>
                <a 
                  href={proj.link || "#"} 
                  className="p5-project-link-btn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  VIEW &gt;
                </a>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Modal */}
      <div 
        className={`p5-modal-overlay ${selectedProject ? 'open' : ''}`}
        onClick={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <div className="p5-modal-content" onClick={e => e.stopPropagation()}>
            <button className="p5-modal-close" onClick={() => setSelectedProject(null)}>X</button>
            <img className="p5-modal-image" src={selectedProject.image} alt={selectedProject.title} />
            <div className="p5-project-title" style={{ fontSize: '40px' }}>{selectedProject.title}</div>
            <div className="p5-modal-date">{selectedProject.date}</div>
            <div className="p5-modal-desc">{selectedProject.description}</div>
              <a href={selectedProject.link || "#"} target="_blank" rel="noopener noreferrer" className="p5-project-link-btn">
                VIEW PROJECT &gt;
              </a>
          </div>
        )}
      </div>

    </div>
  );
}
