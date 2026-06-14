import React, { useState } from 'react';
import P5Button from './P5Button';
import { personalInfo } from './data/portfolioData';
import './ContactModal.css';

export default function ContactModal({ isOpen, onClose }) {
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  if (!isOpen) {
    if (status !== 'idle') {
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
    }
    return null;
  }

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const targetEmail = personalInfo.socials.email.replace('mailto:', '');

    try {
      await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...formData,
            _subject: "New Contact Form Submission from Portfolio"
        })
      });
      
      setStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to send message. Please try again later.");
      setStatus('idle');
    }
  };

  return (
    <div className="p5-modal-overlay open" onClick={onClose}>
      <div className="p5-modal-content p5-contact-modal" onClick={e => e.stopPropagation()}>
        <div className="p5-modal-close-wrapper">
          <P5Button className="p5-modal-close-btn" onClick={onClose} variant="red">
            X
          </P5Button>
        </div>
        
        <h2 className="p5-title" style={{ fontSize: '45px', marginBottom: '10px' }}>CONTACT ME</h2>
        
        {status === 'success' ? (
          <div className="p5-contact-success">
            <h3 style={{fontFamily: 'Persona5Main', fontSize: '30px', color: '#d92323'}}>MESSAGE SENT!</h3>
            <p>I'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form className="p5-contact-form" onSubmit={handleSubmit}>
            <div className="p5-input-group">
              <label className="p5-input-label">NAME</label>
              <input type="text" name="name" required className="p5-input" placeholder="Your Name" value={formData.name} onChange={handleChange} />
            </div>
            
            <div className="p5-input-group">
              <label className="p5-input-label">EMAIL</label>
              <input type="email" name="email" required className="p5-input" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
            </div>
            
            <div className="p5-input-group">
              <label className="p5-input-label">MESSAGE</label>
              <textarea name="message" required className="p5-textarea" placeholder="What's on your mind?" value={formData.message} onChange={handleChange}></textarea>
            </div>
            
            <P5Button 
              type="submit" 
              className="p5-contact-submit" 
              variant="dark"
              style={{ alignSelf: 'flex-start' }}
            >
              <span style={{letterSpacing: '-2px', wordSpacing: '4px'}}>
                {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE >'}
              </span>
            </P5Button>
          </form>
        )}
      </div>
    </div>
  );
}
