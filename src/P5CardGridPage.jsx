import { useState } from "react";
import P5Button from "./P5Button";
import P5Modal from "./P5Modal";
import { playSelectSound } from './utils/audio';
import './P5Shared.css';
import './P5Cards.css';

export default function P5CardGridPage({ title, items, cardLinkText = "VIEW >", modalLinkText = "VIEW PROJECT >" }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="p5-page-wrapper">

      <div className="p5-header-skew">
        <div>
          <h1 className="p5-title">{title}</h1>
        </div>
      </div>

      <div className="p5-projects-grid">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="p5-project-card-wrapper"
            onClick={() => {
              playSelectSound();
              setSelectedItem(item);
            }}
            onMouseEnter={playSelectSound}
          >
            <div className="p5-project-card">
              {item.image && (
                <img src={item.image} alt={item.title} className="p5-project-img" />
              )}
              <div className="p5-project-info">
                <div className="p5-project-title">{item.title}</div>
                <div className="p5-project-date">{item.date}</div>
                {item.publisher && (
                  <div className="p5-project-publisher">{item.publisher}</div>
                )}
                <p className="p5-project-desc">{item.description}</p>
                <P5Button 
                  href={item.link || "#"} 
                  className="p5-project-link-btn" 
                  onClick={(e) => e.stopPropagation()}
                  variant="dark"
                >
                  {cardLinkText}
                </P5Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <P5Modal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        data={selectedItem}
        wide={true}
        linkText={modalLinkText}
      />

    </div>
  );
}
