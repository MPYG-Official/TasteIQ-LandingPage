import Link from 'next/link';
import { FNB_MODULE_GROUPS } from '@/lib/product-data';
import ModIcon from './ModIcon';

export default function ModulesSection() {
  return (
    <section className="mods" id="modules">
      <div className="wrap">
        <div className="sec-head mods-sec-head">
          <span className="sec-eye">
            <span className="sec-eye-dot" />
            What&apos;s inside
          </span>
          <h2 className="sec-h mods-sec-h">
            <span className="mods-count">F&amp;B modules.</span> One software.{' '}
            <em>One subscription that is zero.</em>
          </h2>
          <p className="sec-sub mods-sec-sub">
            Most restaurants stitch together 4–6 different apps — POS, KOT printer, channel manager,
            accounting and loyalty. TasteIQ F&amp;B replaces them for food service; pair with{' '}
            <Link href="/hotels" className="mods-sec-link">
              TasteIQ Hotels
            </Link>{' '}
            when you have rooms.
          </p>
        </div>

        {FNB_MODULE_GROUPS.map((group) => (
          <div key={group.id} className="mods-group">
            <div className="mods-group-h">{group.title}</div>
            <div className="mods-grid">
              {group.modules.map((mod) => (
                <article key={mod.id} className="mod-card">
                  <span className="mod-icon-chip" aria-hidden="true">
                    <ModIcon id={mod.id} />
                  </span>
                  <div className="mod-body">
                    <h3 className="mod-h">{mod.title}</h3>
                    <p className="mod-d">{mod.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
