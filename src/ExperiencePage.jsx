import { experiences } from "./data/portfolioData";

export default function ExperiencePage() {
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

        .p5-timeline {
          display: flex;
          flex-direction: column;
          gap: 30px;
          max-width: 900px;
        }

        .p5-experience-box {
          background: rgba(13, 13, 13, 0.85);
          border: 3px solid white;
          padding: 30px;
          position: relative;
          box-shadow: 6px 6px 0px #732424;
          clip-path: polygon(1% 0, 100% 1%, 99% 100%, 0 99%);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .p5-experience-box:hover {
          transform: scale(1.01) translateX(10px);
          box-shadow: 6px 6px 0px #d92323;
        }

        .p5-exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 2px solid #d92323;
          padding-bottom: 10px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .p5-company {
          font-family: 'Persona5Main';
          font-size: 40px;
          color: #ffffff;
          -webkit-text-stroke: 1px black;
          letter-spacing: -1px;
          word-spacing: 5px;
        }

        .p5-date-range {
          font-family: 'Persona5Main';
          font-size: 24px;
          color: #d92323;
          letter-spacing: -1px;
          word-spacing: 4px;
        }

        .p5-role {
          font-family: sans-serif;
          font-weight: bold;
          font-size: 20px;
          color: #d92323;
          margin-bottom: 10px;
        }

        .p5-exp-desc {
          font-family: sans-serif;
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 15px;
        }

        .p5-exp-bullets {
          list-style: none;
          padding: 0;
        }

        .p5-exp-bullets li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 8px;
          font-family: sans-serif;
          font-size: 15px;
          line-height: 1.4;
        }

        .p5-exp-bullets li::before {
          content: '★';
          position: absolute;
          left: 0;
          color: #d92323;
          font-size: 12px;
          top: 2px;
        }
      `}</style>

      <div className="p5-header-skew">
        <div>
          <h1 className="p5-title">EXPERIENCE</h1>
        </div>
      </div>

      <div className="p5-timeline">
        {experiences.map(exp => (
          <div key={exp.id} className="p5-experience-box">
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
