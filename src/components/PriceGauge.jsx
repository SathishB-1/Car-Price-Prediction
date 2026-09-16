import React, { useEffect, useState } from 'react';
import { IndianRupee, Sparkles, TrendingUp, Award, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PriceGauge({ price, company, model, year, kmsDriven, fuel }) {
  const [displayPrice, setDisplayPrice] = useState(0);

  useEffect(() => {
    if (!price) return;
    
    // Smooth counter animation
    let start = 0;
    const duration = 800; // ms
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = (price - start) / steps;
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= price) {
        setDisplayPrice(price);
        clearInterval(timer);
      } else {
        setDisplayPrice(Math.round(current));
      }
    }, stepTime);

    // Trigger subtle confetti celebration for valuation
    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#6366F1', '#10B981', '#F59E0B']
      });
    } catch (e) {
      // Ignore if canvas confetti not ready
    }

    return () => clearInterval(timer);
  }, [price]);

  // Calculate estimated resale range (+/- 8% variance window)
  const minPrice = Math.round(price * 0.92);
  const maxPrice = Math.round(price * 1.08);

  // Calculate depreciation score rating
  const age = 2025 - year;
  let conditionRating = 'Prime Condition';
  let ratingColor = '#10B981';
  if (age > 10 || kmsDriven > 120000) {
    conditionRating = 'Moderate Usage';
    ratingColor = '#F59E0B';
  } else if (age > 15 || kmsDriven > 200000) {
    conditionRating = 'High Mileage / Classic';
    ratingColor = '#EC4899';
  }

  return (
    <div className="glass-card price-gauge-card">
      <div className="card-header-badge">
        <Sparkles size={16} className="text-primary-glow" />
        <span>Estimated Resale Valuation</span>
      </div>

      <div className="car-summary">
        <h3>{company !== 'other' ? company : ''} {model !== 'other' ? model : 'Car Model'}</h3>
        <p className="summary-specs">{year} • {kmsDriven.toLocaleString()} km • {fuel}</p>
      </div>

      <div className="price-main-box">
        <div className="currency-symbol">₹</div>
        <div className="price-number">
          {displayPrice.toLocaleString()}
        </div>
      </div>

      <div className="price-range-box">
        <div className="range-item">
          <span className="range-label">Expected Range</span>
          <span className="range-value">₹{minPrice.toLocaleString()} – ₹{maxPrice.toLocaleString()}</span>
        </div>
        <div className="range-item">
          <span className="range-label">Valuation Rating</span>
          <span className="rating-pill" style={{ backgroundColor: `${ratingColor}20`, color: ratingColor, borderColor: `${ratingColor}40` }}>
            {conditionRating}
          </span>
        </div>
      </div>

      <div className="model-confidence">
        <div className="confidence-header">
          <Award size={16} color="#10B981" />
          <span>Linear Regression Target Encoded Model (R² ≈ 0.56)</span>
        </div>
        <p className="confidence-desc">
          Calculated using historical transaction data from over 800+ verified car sales.
        </p>
      </div>

      <style>{`
        .price-gauge-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(30, 41, 67, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%);
          border: 1px solid rgba(99, 102, 241, 0.25);
        }

        .card-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #818CF8;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.825rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .car-summary h3 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 4px;
        }

        .summary-specs {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 24px;
        }

        .price-main-box {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          margin: 10px 0 24px 0;
        }

        .currency-symbol {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 700;
          color: #818CF8;
          line-height: 1.2;
        }

        .price-number {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }

        .price-range-box {
          width: 100%;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-md);
          padding: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .range-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .range-label {
          font-size: 0.775rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .range-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .rating-pill {
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid;
        }

        .model-confidence {
          width: 100%;
          background: rgba(16, 185, 129, 0.05);
          border: 1px solid rgba(16, 185, 129, 0.15);
          border-radius: var(--radius-sm);
          padding: 14px;
          text-align: left;
        }

        .confidence-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #10B981;
          margin-bottom: 4px;
        }

        .confidence-desc {
          font-size: 0.775rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
