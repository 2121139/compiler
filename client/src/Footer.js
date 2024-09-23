import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Ensure you create this CSS file for footer styles

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Online Code Compiler. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/contact"><b>Contact Us</b></Link>
        <a href="https://www.linkedin.com/in/amanpreet-kaur-708707235?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">Amanpreet Kaur</a>
        <a href="https://www.linkedin.com/in/Gagank9" target="_blank" rel="noopener noreferrer">Gagandeep Kaur</a>
      </div>
    </footer>
  );
}

export default Footer;
