import { publications } from "./data/portfolioData";

export default function PublicationsPage() {
  return (
    <div className="p5-page-wrapper">
      <style>{`
        .p5-page-wrapper {
          padding: 80px 40px 40px 100px;
          color: white;
          width: 100%;
          height: 100vh;
          overflow-y: auto;
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
          text-decoration: none;
          color: white;
          position: relative;
          box-shadow: 6px 6px 0px #732424;
          clip-path: polygon(2% 0, 100% 2%, 98% 100%, 0 98%);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
        }

        .p5-project-card:hover {
          transform: scale(1.03) rotate(-1deg);
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
        }
      `}</style>

      <div className="p5-header-skew">
        <div>
          <h1 className="p5-title">PUBLICATIONS</h1>
        </div>
      </div>

      <div className="p5-projects-grid">
        {publications.map(pub => (
          <a key={pub.id} href={pub.link} className="p5-project-card" target="_blank" rel="noopener noreferrer">
            <img src={pub.image} alt={pub.title} className="p5-project-img" />
            <div className="p5-project-info">
              <div className="p5-project-title">{pub.title}</div>
              <div className="p5-project-date">{pub.date}</div>
              {pub.publisher && <div className="p5-project-publisher">{pub.publisher}</div>}
              <p className="p5-project-desc">{pub.description}</p>
              <div className="p5-project-link-btn">READ &gt;</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
