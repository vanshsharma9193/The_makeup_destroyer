import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../data/products';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      setResults([]);
      return;
    }

    const matches = ProductService.getAll().filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 5);

    setResults(matches);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className={`search-modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        <span className="search-modal-close" onClick={onClose}>
          &times;
        </span>

        <div className="search-box-giant">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lipsticks, foundations, palettes, brushes..."
            autoComplete="off"
          />
          <i className="fas fa-search"></i>
        </div>

        <div className="search-results-list">
          {query.trim().length < 2 ? (
            <p className="search-placeholder-text">
              Type at least 2 characters to explore luxury collections...
            </p>
          ) : results.length === 0 ? (
            <p className="search-no-results">
              No cosmetics found matching "{query}". Explore our{' '}
              <Link to="/shop" onClick={onClose}>
                Full Catalog
              </Link>
            </p>
          ) : (
            results.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="search-result-item"
                onClick={onClose}
              >
                <img src={p.image} alt={p.name} />
                <div className="search-result-info">
                  <span className="search-res-cat">{p.category}</span>
                  <h4 className="search-res-name">{p.name}</h4>
                  <span className="search-res-price">
                    {ProductService.formatCurrency(p.price)}
                  </span>
                </div>
                <i className="fas fa-chevron-right search-res-arrow"></i>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

