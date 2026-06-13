import { personalInfo, highlights } from "./data/portfolioData";

export default function MainPage() {
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
          transform: skewX(15deg); /* unskew text */
        }

        .p5-title {
          font-family: 'Persona5Main';
          font-size: 64px;
          letter-spacing: 2px;
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
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .p5-highlight-card {
          display: flex;
          background: #1a1a1a;
          border: 2px solid #732424;
          text-decoration: none;
          color: white;
          transition: transform 0.2s, border-color 0.2s;
          clip-path: polygon(2% 0, 100% 0, 98% 100%, 0 98%);
        }

        .p5-highlight-card:hover {
          transform: scale(1.02) rotate(-1deg);
          border-color: #d92323;
        }

        .p5-highlight-card img {
          width: 80px;
          height: 80px;
          object-fit: cover;
        }

        .p5-highlight-info {
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .p5-date {
          font-size: 12px;
          color: #d92323;
          font-weight: bold;
          font-family: 'Persona5Main';
          letter-spacing: 1px;
        }

        .p5-highlight-info p {
          font-size: 14px;
          margin: 0;
          line-height: 1.3;
          font-weight: bold;
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

      <div className="p5-content-box">
        <h3>HIGHLIGHTS</h3>
        <div className="p5-highlights-grid">
          {highlights.map(hl => (
            <a key={hl.id} href={hl.link} className="p5-highlight-card" target="_blank" rel="noopener noreferrer">
              <img src={hl.image} alt="highlight" />
              <div className="p5-highlight-info">
                <span className="p5-date">{hl.date}</span>
                <p>{hl.description}</p>
              </div>
            </a>
          ))}
        </div>
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
    </div>
  );
}
