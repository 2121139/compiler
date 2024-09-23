import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to the Online Code Compiler</h1>
          <p className="hero-subtitle">
            Code, Compile, and Execute in Multiple Languages
          </p>
          <div className="cta-buttons">
            <Link to="/register">
              <button className="button primary-button">Get Started</button>
            </Link>
            <Link to="/login">
              <button className="button secondary-button">Login</button>
            </Link>
          </div>
        </div>
      </header>

      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Us</h2>
            <p className="about-description">
              At Online Code Compiler, our mission is to empower developers and
              learners by providing an advanced and user-friendly platform for
              coding. We offer support for multiple programming languages,
              real-time compilation, error checking, and a history of
              submissions. Our goal is to make coding more accessible and
              efficient, helping users focus on what they do best—writing code.
              We are committed to continuous improvement and strive to offer the
              best coding experience possible.
            </p>
          </div>
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.8YVp0Xjpna31oVdLv3DfQQHaC8&pid=Api&P=0&h=180"
            alt="About Us"
            className="about-image"
          />
        </div>
      </section>

      <section className="tutorials-section">
        <h2 className="section-title">Learn Programming</h2>
        <div className="tutorials-cards-container">
          <div className="card tutorial-card">
            <img
              src="https://img.icons8.com/color/96/000000/python.png"
              alt="Python"
              className="card-icon"
            />
            <h3 className="card-title">Learn Python</h3>
            <p>Master Python programming with our comprehensive tutorials.</p>
            <Link to="/tutorials/python">
              <button className="button primary-button">Start Learning</button>
            </Link>
          </div>
          <div className="card tutorial-card">
            <img
              src="https://img.icons8.com/color/96/000000/c-plus-plus-logo.png"
              alt="C++"
              className="card-icon"
            />
            <h3 className="card-title">Learn C++</h3>
            <p>Dive into C++ programming from basic to advanced topics.</p>
            <Link to="/tutorials/cpp">
              <button className="button primary-button">Start Learning</button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Online Code Compiler. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/contact">
            <b>Developers</b>
          </Link>
          <a
            href="https://www.linkedin.com/in/amanpreet-kaur-708707235?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Amanpreet Kaur
          </a>
          <a
            href="https://www.linkedin.com/in/Gagank9"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gagandeep Kaur
          </a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
