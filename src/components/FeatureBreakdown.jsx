import React from 'react';
import { TrendingDown, Gauge, Award, Fuel, Info, CheckCircle2 } from 'lucide-react';

export default function FeatureBreakdown({ year, kmsDriven, company, fuel }) {
  const currentYear = 2025;
  const age = Math.max(0, currentYear - year);
  
  // Estimate annualized depreciation rate
  const annualDepreciation = age > 0 ? (age * 6.5).toFixed(1) : 0;
  
  // Calculate average annual mileage
  const avgKmPerYear = age > 0 ? Math.round(kmsDriven / age) : kmsDriven;

  return (
    <div className="feature-breakdown-section" id="features">
      <div className="section-header">
        <h2 className="section-title">Valuation Breakdown & Feature Dynamics</h2>
        <p className="section-subtitle">
          How machine learning target encodings evaluate your car details
        </p>
      </div>

      <div className="grid-cards">
        <div className="glass-card feature-card">
          <div className="card-top">
            <div className="icon-wrapper icon-purple">
              <TrendingDown size={22} />
            </div>
            <span className="impact-tag tag-negative">-{annualDepreciation}% Age Factor</span>
          </div>
          <h3>Vehicle Age & Wear</h3>
          <p className="card-desc">
            Model year <strong>{year}</strong> ({age} {age === 1 ? 'year' : 'years'} old). Each year of age contributes to expected depreciation under Linear Regression.
          </p>
          <div className="metric-footer">
            <span>Age Impact:</span>
            <span className="metric-val">₹{Math.round(age * 20057).toLocaleString()}</span>
          </div>
        </div>

        <div className="glass-card feature-card">
          <div className="card-top">
            <div className="icon-wrapper icon-cyan">
              <Gauge size={22} />
            </div>
            <span className="impact-tag tag-neutral">{avgKmPerYear.toLocaleString()} km/yr</span>
          </div>
          <h3>Mileage Utilization</h3>
          <p className="card-desc">
            Total odometer reading: <strong>{kmsDriven.toLocaleString()} km</strong>. Typical driver averages 12,000 km annually.
          </p>
          <div className="metric-footer">
            <span>Distance Impact:</span>
            <span className="metric-val">-₹{Math.round(kmsDriven * 0.327).toLocaleString()}</span>
          </div>
        </div>

        <div className="glass-card feature-card">
          <div className="card-top">
            <div className="icon-wrapper icon-green">
              <Award size={22} />
            </div>
            <span className="impact-tag tag-positive">Target Encoded</span>
          </div>
          <h3>Brand Equity Rating</h3>
          <p className="card-desc">
            Brand: <strong>{company}</strong>. Converts categorical manufacturer prestige into mean dataset price value.
          </p>
          <div className="metric-footer">
            <span>Prestige Level:</span>
            <span className="metric-val tag-green">High Demand</span>
          </div>
        </div>

        <div className="glass-card feature-card">
          <div className="card-top">
            <div className="icon-wrapper icon-gold">
              <Fuel size={22} />
            </div>
            <span className="impact-tag tag-positive">{fuel} Variant</span>
          </div>
          <h3>Fuel & Market Segment</h3>
          <p className="card-desc">
            {fuel} engine type. Reflects market preferences, fuel efficiency expectations, and resale popularity.
          </p>
          <div className="metric-footer">
            <span>Market Fit:</span>
            <span className="metric-val">Optimal</span>
          </div>
        </div>
      </div>

      <style>{`
        .feature-breakdown-section {
          margin-top: 48px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .section-title {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          margin-bottom: 6px;
        }

        .section-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .grid-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }

        .feature-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-purple {
          background: rgba(99, 102, 241, 0.15);
          color: #818CF8;
        }

        .icon-cyan {
          background: rgba(6, 182, 212, 0.15);
          color: #38BDF8;
        }

        .icon-green {
          background: rgba(16, 185, 129, 0.15);
          color: #34D399;
        }

        .icon-gold {
          background: rgba(245, 158, 11, 0.15);
          color: #FBBF24;
        }

        .impact-tag {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        .tag-negative {
          background: rgba(239, 68, 68, 0.15);
          color: #F87171;
        }

        .tag-neutral {
          background: rgba(148, 163, 184, 0.15);
          color: #CBD5E1;
        }

        .tag-positive {
          background: rgba(16, 185, 129, 0.15);
          color: #34D399;
        }

        .feature-card h3 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
        }

        .card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          flex-grow: 1;
          line-height: 1.5;
        }

        .metric-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-glass);
          padding-top: 12px;
          font-size: 0.825rem;
          color: var(--text-muted);
        }

        .metric-val {
          font-weight: 600;
          color: var(--text-primary);
        }

        .tag-green {
          color: #34D399;
        }
      `}</style>
    </div>
  );
}
