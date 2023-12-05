import React from 'react';
import './Footer.css'; // Ensure the CSS file is linked

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} AutoLedger. All rights reserved.</p>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="github-link">
          GitHub
        </a>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </div>
  );
};

export default Footer;
