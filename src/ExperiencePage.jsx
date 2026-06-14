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
          display: block;
          padding: 15px 40px;
          transform: skewX(-15deg);
          box-shadow: 8px 8px 0px rgba(0,0,0,0.8);
          border: 3px solid black;
          margin-left: 20px;
          width: calc(100% - 30px);
          max-width: 1200px;
          box-sizing: border-box;
        }

        .p5-header-skew > * {
          transform: skewX(15deg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
        }

        .p5-title {
          font-family: 'Persona5Main';
          font-size: clamp(22px, 6vw, 72px);
          letter-spacing: -2px;
          word-spacing: 8px;
          line-height: 1;
          -webkit-text-stroke: 2px black;
        }

        .p5-timeline {
          display: flex;
          flex-direction: column;
          gap: 30px;
          max-width: 1200px;
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
          word-spacing: 12px;
        }

        .p5-date-range {
          font-family: 'Persona5Main';
          font-size: 24px;
          color: #d92323;
          letter-spacing: -5px;
          word-spacing: 12px;
        }

        .p5-role {
          font-family: 'Persona5Main';
          font-weight: bold;
          font-size: 20px;
          color: #d92323;
          margin-bottom: 10px;
          letter-spacing: -5px;
          word-spacing: 12px;
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

        /* ===== MOBILE RESPONSIVE ===== */
        @media (max-width: 768px) {
          .p5-page-wrapper {
            padding: 70px 20px 30px 20px;
            gap: 25px;
          }
          .p5-header-skew {
            padding: 10px 24px;
            margin-left: 10px;
            width: calc(100% - 15px);
          }
          .p5-company {
            font-size: 28px;
          }
          .p5-date-range {
            font-size: 18px;
          }
          .p5-experience-box {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .p5-page-wrapper {
            padding: 60px 12px 20px 12px;
            gap: 20px;
          }
          .p5-title {
            font-size: 7vw;
          }
          .p5-header-skew {
            padding: 8px 16px;
            margin-left: 5px;
            width: calc(100% - 10px);
          }
          .p5-company {
            font-size: 22px;
          }
          .p5-date-range {
            font-size: 16px;
          }
          .p5-experience-box {
            padding: 15px;
          }
          .p5-exp-desc {
            font-size: 14px;
          }
          .p5-exp-bullets li {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="p5-header-skew">
        <div>
          <h1 className="p5-title">EXPERIENCE</h1>
        </div>
      </div>

      <div className="p5-timeline">
        {experiences.map((exp, idx) => (
          <div key={idx} className="p5-experience-box">
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
