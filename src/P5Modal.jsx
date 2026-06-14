import React from 'react';
import P5Button from './P5Button';
import { playSelectSound } from './utils/audio';

export default function P5Modal({ isOpen, onClose, data, wide = false, linkText = "VIEW >" }) {
  if (!isOpen || !data) return null;

  return (
    <div className="p5-modal-overlay open" onClick={onClose}>
      <div className={`p5-modal-content ${wide ? 'wide' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="p5-modal-close-wrapper">
          <P5Button className="p5-modal-close-btn" onClick={onClose} variant="red">
            X
          </P5Button>
        </div>
        {data.image && (
          <img src={data.image} alt={data.title} className="p5-modal-image" />
        )}
        <h2 className="p5-title" style={{ fontSize: '40px', marginBottom: '10px' }}>{data.title}</h2>
        <div className="p5-modal-date">{data.date}</div>
        {data.publisher && (
          <div className="p5-project-publisher">{data.publisher}</div>
        )}
        <div className="p5-modal-desc">{data.description}</div>
        {data.link && (
          <P5Button href={data.link} className="p5-project-link-btn" variant="dark">
            {linkText}
          </P5Button>
        )}
      </div>
    </div>
  );
}
