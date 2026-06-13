import { useState } from "react";
import { publications } from "./data/portfolioData";
import P5Button from "./P5Button";

export default function PublicationsPage() {
  const [selectedPub, setSelectedPub] = useState(null);

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

        .p5-project-card-wrapper {
          cursor: pointer;
          position: relative;
          height: 100%;
          transition: transform 0.2s;
          z-index: 1;
        }

        .p5-project-card-wrapper:hover {
          transform: scale(1.03);
          z-index: 10;
        }

        .p5-project-card {
          background: rgba(13, 13, 13, 0.9);
          border: 3px solid white;
          color: white;
          position: relative;
          box-shadow: 6px 6px 0px #732424;
          clip-path: polygon(2% 0, 100% 2%, 98% 100%, 0 98%);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .p5-project-card-wrapper:hover .p5-project-card {
          transform: rotate(-1deg);
          box-shadow: 8px 8px 0px #d92323;
        }

        .p5-project-img {
          width: 100%;
          height: 200px;
          object-fit: contain;
          border-bottom: 3px solid #d92323;
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
          letter-spacing: -8px;
          word-spacing: 12px;
        }

        .p5-project-date {
          font-family: 'Persona5Main';
          font-size: 18px;
          color: #d92323;
          margin-bottom: 5px;
          letter-spacing: -1px;
          word-spacing: 4px;
        }
        
        .p5-project-publisher {
          font-family: sans-serif;
          font-size: 14px;
          color: #aaa;
          font-style: italic;
          margin-bottom: 15px;
        }

        .p5-project-desc {
          font-family: sans-serif;
          font-size: 15px;
          line-height: 1.5;
          margin-bottom: 20px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-height: 4.5em;
        }

        .p5-project-link-btn {
          align-self: flex-start;
          font-size: 20px;
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
          object-fit: contain;
          border: 2px solid #732424;
          margin-bottom: 20px;
        }
        .p5-modal-date {
          color: #d92323;
          font-family: 'Persona5Main';
          font-size: 24px;
          letter-spacing: -1px;
          word-spacing: 5px;
          margin-bottom: 5px;
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
          <h1 className="p5-title">PUBLICATIONS</h1>
        </div>
      </div>

      <div className="p5-projects-grid">
        {publications.map((pub, idx) => (
          <div key={idx} className="p5-project-card-wrapper" onClick={() => setSelectedPub(pub)}>
            <div className="p5-project-card">
              <img src={pub.image} alt={pub.title} className="p5-project-img" />
              <div className="p5-project-info">
                <div className="p5-project-title">{pub.title}</div>
                <div className="p5-project-date">{pub.date}</div>
                {pub.publisher && <div className="p5-project-publisher">{pub.publisher}</div>}
                <p className="p5-project-desc">{pub.description}</p>
                <P5Button 
                  href={pub.link || "#"} 
                  className="p5-project-link-btn" 
                  onClick={(e) => e.stopPropagation()}
                  variant="dark"
                >
                  READ &gt;
                </P5Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Publications Modal */}
      <div 
        className={`p5-modal-overlay ${selectedPub ? 'open' : ''}`}
        onClick={() => setSelectedPub(null)}
      >
        {selectedPub && (
          <div className="p5-modal-content" onClick={e => e.stopPropagation()}>
            <button className="p5-modal-close" onClick={() => setSelectedPub(null)}>X</button>
            <img className="p5-modal-image" src={selectedPub.image} alt={selectedPub.title} />
            <div className="p5-project-title" style={{ fontSize: '40px' }}>{selectedPub.title}</div>
            <div className="p5-modal-date">{selectedPub.date}</div>
            {selectedPub.publisher && <div className="p5-project-publisher" style={{ fontSize: '16px' }}>{selectedPub.publisher}</div>}
            <div className="p5-modal-desc">{selectedPub.description}</div>
              <P5Button href={selectedPub.link || "#"} className="p5-project-link-btn" variant="dark">
                READ PAPER &gt;
              </P5Button>
          </div>
        )}
      </div>

    </div>
  );
}
