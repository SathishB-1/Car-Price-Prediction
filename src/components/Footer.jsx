import React from 'react';
import { Car, Github, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-container" id="about">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <Car size={20} />
            <span>AutoValuate AI</span>
          </div>
          <p className="footer-tagline">
            Automated used car resale valuation model built with Scikit-Learn, Linear Regression & Target Encoding.
          </p>
        </div>

        <div className="footer-info">
          <div className="info-block">
            <h4>Dataset Specifications</h4>
            <ul>
              <li>Source: Quikr Car Sales Dataset</li>
              <li>Filter: Price &lt; ₹10,00,000 | KMs &lt; 3,00,000</li>
              <li>Encoding: Mean Target Categorical Encoding</li>
            </ul>
          </div>

          <div className="info-block">
            <h4>Deployment & Tech Stack</h4>
            <ul>
              <li>Frontend: React 19 + Vite</li>
              <li>Serverless API: Python on Vercel</li>
              <li>Host: Vercel Global Edge Network</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Developed with passion by <strong>Sathish B</strong></p>
        <div className="footer-links">
          <a 
            href="https://github.com/SathishB-1/Car-Price-Prediction" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            <Github size={16} />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>

      <style>{`
        .footer-container {
          margin-top: 80px;
          border-top: 1px solid var(--border-glass);
          background: rgba(11, 15, 25, 0.95);
          padding: 48px 24px 24px 24px;
        }

        .footer-content {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 48px;
          margin-bottom: 40px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.2rem;
          color: white;
        }

        .footer-tagline {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .footer-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .info-block h4 {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          color: white;
          margin-bottom: 12px;
        }

        .info-block ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-block li {
          font-size: 0.825rem;
          color: var(--text-muted);
        }

        .footer-bottom {
          max-width: 1280px;
          margin: 0 auto;
          border-top: 1px solid var(--border-glass);
          padding-top: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .github-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #818CF8;
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition);
        }

        .github-link:hover {
          color: white;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
          .footer-info {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
