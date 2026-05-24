'use client';

import { useEffect, useRef, useState } from 'react';
import {
  PRODUCT_SCREENS,
  ProductScreen,
  type ProductScreenId,
} from '@/components/prototype/ProductDashboard';

const ACCENT = '#B5482B';
/** Fixed desktop canvas — scaled down on narrow viewports */
export const SCREEN_DESKTOP_WIDTH = 1100;
export const SCREEN_DESKTOP_HEIGHT = 640;

export default function ScreenExplorer() {
  const [screen, setScreen] = useState<ProductScreenId>('dashboard');
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const updateScale = () => {
      const available = node.clientWidth;
      setScale(Math.min(1, available / SCREEN_DESKTOP_WIDTH));
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(node);
    window.addEventListener('resize', updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  const scaledHeight = Math.round(SCREEN_DESKTOP_HEIGHT * scale);

  return (
    <div>
      <div className="screens-tabs" role="tablist">
        {PRODUCT_SCREENS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={screen === s.id}
            className={`screens-tab${screen === s.id ? ' on' : ''}`}
            onClick={() => setScreen(s.id)}
          >
            <span className="screens-tab-l">{s.label}</span>
            <span className="screens-tab-s">{s.blurb}</span>
          </button>
        ))}
      </div>
      <div
        ref={stageRef}
        className="screens-stage"
        data-screen-label={`Screen · ${screen}`}
        style={{ height: scaledHeight }}
      >
        <div
          className="screens-stage-viewport"
          style={{
            width: SCREEN_DESKTOP_WIDTH,
            height: SCREEN_DESKTOP_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          <ProductScreen screen={screen} accent={ACCENT} />
        </div>
      </div>
    </div>
  );
}
