import React from 'react';
import { Car, Calendar, Gauge, Fuel, Check, RefreshCw } from 'lucide-react';

export default function CarSelector({ 
  carData, 
  company, 
  setCompany, 
  model, 
  setModel, 
  year, 
  setYear, 
  kmsDriven, 
  setKmsDriven, 
  fuel, 
  setFuel 
}) {
  const { top_companies, company_models, top_names, fuel_types } = carData;

  // Available models for the currently selected company
  const availableModels = company !== 'other' && company_models[company] 
    ? company_models[company] 
    : top_names;

  const handleCompanyChange = (newCompany) => {
    setCompany(newCompany);
    // Auto reset model if current model isn't under new company
    if (newCompany !== 'other' && company_models[newCompany]) {
      if (!company_models[newCompany].includes(model)) {
        setModel(company_models[newCompany][0] || 'other');
      }
    }
  };

  const kmPresets = [10000, 30000, 50000, 80000, 120000, 180000];

  return (
    <div className="glass-card car-selector-card">
      <div className="selector-title">
        <Car className="title-icon" size={20} />
        <h2>Vehicle Configuration</h2>
      </div>

      <div className="form-group">
        <label className="input-label">
          <span>Brand / Manufacturer</span>
          <span className="selected-tag">{company}</span>
        </label>
        
        <select 
          className="custom-select" 
          value={company} 
          onChange={(e) => handleCompanyChange(e.target.value)}
        >
          <option value="other">Other Brand</option>
          {top_companies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Quick Brand Badges */}
        <div className="brand-pills">
          {['Maruti', 'Hyundai', 'Honda', 'Toyota', 'Mahindra', 'Ford', 'Tata'].map((brand) => (
            <button
              key={brand}
              type="button"
              className={`brand-pill ${company === brand ? 'active' : ''}`}
              onClick={() => handleCompanyChange(brand)}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="input-label">
          <span>Car Model Name</span>
          <span className="selected-tag">{model}</span>
        </label>
        <select 
          className="custom-select" 
          value={model} 
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="other">Other / Standard Model</option>
          {availableModels.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <div className="slider-header">
          <label className="input-label">
            <Calendar size={16} className="text-secondary" />
            <span>Manufacturing Year</span>
          </label>
          <span className="year-highlight">{year}</span>
        </div>
        <input 
          type="range" 
          min="1995" 
          max="2025" 
          step="1"
          value={year} 
          onChange={(e) => setYear(parseInt(e.target.value))} 
        />
        <div className="slider-ticks">
          <span>1995</span>
          <span>2005</span>
          <span>2015</span>
          <span>2025</span>
        </div>
      </div>

      <div className="form-group">
        <div className="slider-header">
          <label className="input-label">
            <Gauge size={16} className="text-secondary" />
            <span>Kilometers Driven</span>
          </label>
          <span className="km-highlight">{kmsDriven.toLocaleString()} km</span>
        </div>
        <input 
          type="range" 
          min="1000" 
          max="300000" 
          step="1000"
          value={kmsDriven} 
          onChange={(e) => setKmsDriven(parseInt(e.target.value))} 
        />
        
        {/* Km Quick Presets */}
        <div className="km-presets">
          {kmPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              className={`km-chip ${kmsDriven === preset ? 'active' : ''}`}
              onClick={() => setKmsDriven(preset)}
            >
              {(preset / 1000)}k km
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="input-label">
          <Fuel size={16} className="text-secondary" />
          <span>Fuel Type</span>
        </label>
        <div className="fuel-tabs">
          {fuel_types.map((ft) => (
            <button
              key={ft}
              type="button"
              className={`fuel-tab ${fuel === ft ? 'active' : ''}`}
              onClick={() => setFuel(ft)}
            >
              {fuel === ft && <Check size={14} />}
              {ft}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .car-selector-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .selector-title {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 16px;
        }

        .title-icon {
          color: #818CF8;
        }

        .selector-title h2 {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          gap: 8px;
        }

        .selected-tag {
          font-size: 0.75rem;
          color: #818CF8;
          background: rgba(99, 102, 241, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .custom-select {
          background: rgba(15, 23, 42, 0.8);
          color: white;
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition);
          cursor: pointer;
        }

        .custom-select:focus {
          border-color: #6366F1;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
        }

        .brand-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .brand-pill {
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-secondary);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-full);
          padding: 4px 12px;
          font-size: 0.775rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .brand-pill:hover, .brand-pill.active {
          background: rgba(99, 102, 241, 0.2);
          color: #818CF8;
          border-color: rgba(99, 102, 241, 0.4);
        }

        .slider-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .year-highlight, .km-highlight {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.1rem;
          color: #38BDF8;
        }

        .slider-ticks {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .km-presets {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 6px;
        }

        .km-chip {
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-secondary);
          border: 1px solid var(--border-glass);
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .km-chip:hover, .km-chip.active {
          background: rgba(16, 185, 129, 0.15);
          color: #10B981;
          border-color: rgba(16, 185, 129, 0.3);
        }

        .fuel-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .fuel-tab {
          background: rgba(15, 23, 42, 0.6);
          color: var(--text-secondary);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-sm);
          padding: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: var(--transition);
        }

        .fuel-tab:hover, .fuel-tab.active {
          background: rgba(99, 102, 241, 0.2);
          color: white;
          border-color: #6366F1;
        }
      `}</style>
    </div>
  );
}
