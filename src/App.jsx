import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import CarSelector from './components/CarSelector';
import PriceGauge from './components/PriceGauge';
import FeatureBreakdown from './components/FeatureBreakdown';
import Footer from './components/Footer';
import carData from './data/car_model_data.json';
import { Zap, ShieldCheck, BarChart3, HelpCircle, CheckCircle } from 'lucide-react';

export default function App() {
  const [company, setCompany] = useState('Maruti');
  const [model, setModel] = useState('Maruti Suzuki Swift');
  const [year, setYear] = useState(2017);
  const [kmsDriven, setKmsDriven] = useState(45000);
  const [fuel, setFuel] = useState('Petrol');

  // Calculate prediction locally (client-side engine using model weights)
  const predictedPrice = useMemo(() => {
    try {
      const nameEnc = carData.name_map[model] ?? carData.name_default;
      const compEnc = carData.company_map[company] ?? carData.company_default;
      const fuelEnc = carData.fuel_map[fuel] ?? carData.fuel_default;

      const coef = carData.coef;
      const intercept = carData.intercept;

      const pred = (year * coef[0]) + 
                   (kmsDriven * coef[1]) + 
                   (nameEnc * coef[2]) + 
                   (compEnc * coef[3]) + 
                   (fuelEnc * coef[4]) + 
                   intercept;

      return Math.max(15000, Math.round(pred));
    } catch (err) {
      return 250000;
    }
  }, [company, model, year, kmsDriven, fuel]);

  return (
    <div className="app-main">
      <Navbar />

      <main className="main-content" id="predictor">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-badge">
            <Zap size={14} className="text-gold" />
            <span>Target Encoded Machine Learning Model</span>
          </div>

          <h1 className="hero-title">
            Smart Used Car <br className="mobile-break" />
            <span className="gradient-text">Resale Price Evaluator</span>
          </h1>

          <p className="hero-subtitle">
            Get instant, accurate resale market estimates based on historical sale trends, mileage, model year, and brand target encodings.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Top Brands</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-label">Car Models</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">800+</span>
              <span className="stat-label">Training Records</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">⚡ 0s</span>
              <span className="stat-label">Instant API</span>
            </div>
          </div>
        </section>

        {/* Prediction Playground */}
        <section className="predictor-grid">
          <CarSelector 
            carData={carData}
            company={company}
            setCompany={setCompany}
            model={model}
            setModel={setModel}
            year={year}
            setYear={setYear}
            kmsDriven={kmsDriven}
            setKmsDriven={setKmsDriven}
            fuel={fuel}
            setFuel={setFuel}
          />

          <PriceGauge 
            price={predictedPrice}
            company={company}
            model={model}
            year={year}
            kmsDriven={kmsDriven}
            fuel={fuel}
          />
        </section>

        {/* Valuation Breakdown */}
        <FeatureBreakdown 
          year={year}
          kmsDriven={kmsDriven}
          company={company}
          fuel={fuel}
        />

        {/* FAQ & Model Specs */}
        <section className="faq-section">
          <div className="faq-header">
            <HelpCircle size={24} className="text-indigo" />
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-grid">
            <div className="glass-card faq-card">
              <h4>How does the model calculate the car price?</h4>
              <p>
                The model uses linear regression trained on target-encoded categorical features (brand, car model, fuel type) and numerical parameters (manufacturing year, odometer kilometers).
              </p>
            </div>

            <div className="glass-card faq-card">
              <h4>Is this application ready for Vercel deployment?</h4>
              <p>
                Yes! The project contains standard Vercel configurations (<code>vercel.json</code>) with dual execution support: Python Vercel serverless functions in <code>/api/predict.py</code> and client-side instant prediction engines.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .app-main {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 24px;
          width: 100%;
        }

        .hero-section {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 48px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.25);
          color: #FBBF24;
          padding: 6px 16px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .hero-title {
          font-family: var(--font-heading);
          font-size: 3.25rem;
          font-weight: 800;
          line-height: 1.15;
          color: white;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          max-width: 680px;
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-full);
          padding: 12px 32px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.1rem;
          color: white;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .stat-divider {
          width: 1px;
          height: 24px;
          background: var(--border-glass);
        }

        .predictor-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }

        .faq-section {
          margin-top: 64px;
        }

        .faq-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .faq-header h2 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .faq-card {
          padding: 24px;
        }

        .faq-card h4 {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }

        .faq-card p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 992px) {
          .predictor-grid {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 2.4rem;
          }
          .hero-stats {
            flex-wrap: wrap;
            justify-content: center;
            border-radius: var(--radius-md);
            padding: 16px;
          }
          .faq-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
