'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { FILTERS, KITCHENS, type Kitchen } from '@/lib/foods-data';

type Props = {
  open: boolean;
  pin: string;
  area: string;
  onClose: () => void;
};

function filterKitchens(filterId: string, q: string): Kitchen[] {
  const flt = FILTERS.find((f) => f.id === filterId);
  const query = q.trim().toLowerCase();
  return KITCHENS.filter((k) => {
    if (flt?.match && !flt.match(k)) return false;
    if (query && !(k.name + ' ' + k.cui + ' ' + k.tags.join(' ')).toLowerCase().includes(query)) {
      return false;
    }
    return true;
  });
}

function countForFilter(id: string) {
  const flt = FILTERS.find((f) => f.id === id);
  if (!flt?.match) return KITCHENS.length;
  return KITCHENS.filter(flt.match).length;
}

export default function KitchensOverlay({ open, pin, area, onClose }: Props) {
  const [filterId, setFilterId] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (open) {
      setFilterId('all');
      setSearch('');
    }
  }, [open]);

  useEffect(() => {
    const root = document.querySelector('.prototype-site');
    if (!root) return;
    if (open) {
      root.classList.add('kit-open');
      document.body.style.overflow = 'hidden';
    } else {
      root.classList.remove('kit-open');
      document.body.style.overflow = '';
    }
    return () => {
      root.classList.remove('kit-open');
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const list = useMemo(() => filterKitchens(filterId, search), [filterId, search]);

  const cuisineCount = useMemo(() => {
    const uniq: Record<string, 1> = {};
    KITCHENS.forEach((k) => k.tags.forEach((t) => { uniq[t] = 1; }));
    return Object.keys(uniq).length;
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      const input = document.getElementById('pin-input') as HTMLInputElement | null;
      input?.focus();
      input?.select();
    }, 60);
  }, [onClose]);

  if (!open) return null;

  const areaLabel = area ? ` · ${area}` : '';

  return (
    <div className="kit show" id="kit-screen" aria-hidden={false}>
      <div className="kit-top">
        <button type="button" className="kit-brand" onClick={handleClose}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.5" cy="13.5" r="8" fill="#0E1116" />
            <circle cx="17" cy="8" r="3" fill="#C24A2A" />
          </svg>
          <span>tasteiq</span>
          <span className="nav-suffix">Foods</span>
        </button>
        <button type="button" className="kit-pin" onClick={handleClose} title="Change PIN code">
          <span className="kit-pin-l">Deliver to</span>
          <span className="kit-pin-v">{pin}</span>
          <span className="kit-pin-area">{areaLabel}</span>
          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2 4 L6 8 L10 4"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="kit-top-spacer" />
        <label className="kit-search">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
            <path d="M15.5 15.5 L20 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <input
            id="kit-q"
            type="text"
            placeholder="Search kitchens, cuisines, dishes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      <div className="kit-body">
        <div className="kit-headline">
          <span className="kit-meta">
            <b>{KITCHENS.length}</b> kitchens · <b>{cuisineCount}</b> cuisines · breakfast from{' '}
            <b>7:30 am</b> · lunch <b>11:30 am</b> · dinner <b>7 pm</b>
          </span>
          <h2 className="kit-h">
            Kitchens delivering to <em>{pin}{areaLabel}</em>.
          </h2>
          <p className="kit-sub">
            Browse menus for breakfast, lunch or dinner. Start a subscription or order one-off — swap any dish, any
            day.
          </p>
        </div>

        <div className="kit-filters" id="kit-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`kit-chip${filterId === f.id ? ' on' : ''}`}
              onClick={() => setFilterId(f.id)}
            >
              {f.label} <span className="kit-chip-c">{countForFilter(f.id)}</span>
            </button>
          ))}
        </div>

        <div className="kit-grid" id="kit-grid">
          {list.length === 0 ? (
            <div className="kit-empty">
              No kitchens match that. <b>Try clearing the filter.</b>
            </div>
          ) : (
            list.map((k) => (
              <article key={k.name} className="kit-card">
                <div className="kit-card-top">
                  <div className="kit-logo" style={{ background: k.color }}>
                    {k.logo}
                  </div>
                  <div className="kit-card-info">
                    <div className="kit-card-name">{k.name}</div>
                    <div className="kit-card-cui">{k.cui}</div>
                    <div className="kit-tags">
                      {k.isVeg && <span className="kit-tag veg">Veg</span>}
                      {k.isNew && <span className="kit-tag new">New</span>}
                      {k.tags
                        .slice(0, 2)
                        .filter((t) => t !== 'Veg' && t !== 'Non-veg')
                        .map((t) => (
                          <span key={t} className="kit-tag">
                            {t}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="kit-card-row">
                  <span>
                    <span className="star">★</span> {k.rating}
                  </span>
                  <span className="dot">·</span>
                  <span>{k.reviews} reviews</span>
                  <span className="dot">·</span>
                  <span>{k.km} km</span>
                </div>
                <div className="kit-card-foot">
                  <div className="kit-card-foot-l">
                    <span className="kit-card-pricel">Today</span>
                    <span className="kit-card-price">₹{k.price}</span>
                  </div>
                  <button type="button" className="kit-card-cta">
                    Subscribe
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path
                        d="M3 9 L9 3 M9 3 H4.5 M9 3 V7.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
