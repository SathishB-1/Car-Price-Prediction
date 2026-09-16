import React from 'react';
import { Car, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="brand">
          <div className="brand-icon">
            <Car size={26} className="icon-car" />
          </div>
          <div className="brand-text">
            <span className="brand-name">AutoValuate <span className="brand-ai">AI</span></span>
            <span className="brand-tag">ML Car Valuation Platform</span>
          </div>
        </div>

        <nav className="nav-links">
          <div className="pulse-badge">
            <div className="pulse-dot"></div>
            <span>Vercel Serverless Ready</span>
          </div>
          <a href="#predictor" className="nav-item">Predictor</a>
          <a href="#features" className="nav-item">Model Specs</a>
          <a href="#about" className="nav-item">Dataset Info</a>
        </nav>
      </div>

      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(11, 15, 25, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px 24px;
        }

        .navbar-content {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.25rem;
          color: white;
          letter-spacing: -0.02em;
        }

        .brand-ai {
          background: linear-gradient(135deg, #38BDF8, #818CF8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-item {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: var(--transition);
        }

        .nav-item:hover {
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .nav-links .nav-item {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
