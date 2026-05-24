'use client';

// Faithful recreations of the TasteIQ product screens (from Protoype-UI/dashboard.jsx).

export type ProductScreenId = 'dashboard' | 'billing' | 'kitchen' | 'tables';

export const PRODUCT_SCREENS: { id: ProductScreenId; label: string; blurb: string }[] = [
  { id: 'dashboard', label: 'Dashboard', blurb: 'Daily sales, trending items, peak hours' },
  { id: 'billing', label: 'Billing (POS)', blurb: 'Categories, items, customer + GST in one screen' },
  { id: 'kitchen', label: 'Kitchen', blurb: 'KOT board with fire / prep / ready states' },
  { id: 'tables', label: 'Table Billing', blurb: 'Floor map, table state, billing in seconds' },
];

const ACCENT_DEFAULT = '#C24A2A';

const SIDEBAR = [
  { id: "dashboard", label: "Dashboard", icon: "home", group: null },
  { group: "Restaurant", icon: "fork",
    items: [
      { id: "billing", label: "Billing", icon: "bill" },
      { id: "tables", label: "Table Billing", icon: "grid" },
      { id: "orders", label: "Orders", icon: "stack" },
      { id: "subs", label: "Subscription Orders", icon: "loop" },
      { id: "menu", label: "Menu", icon: "chef" },
      { id: "kitchen", label: "Kitchen", icon: "pot" },
    ]
  },
  { group: "Front Desk", icon: "desk",
    items: [
      { id: "reservations", label: "Reservations", icon: "calendar" },
      { id: "housekeeping", label: "Housekeeping", icon: "clip" },
      { id: "folios", label: "Guest Folios", icon: "wallet" },
    ]
  },
  { group: "Events & Banquets", icon: "spark",
    items: [
      { id: "events", label: "Events" },
      { id: "halls", label: "Banquet Halls" },
    ]
  },
  { id: "channel", label: "Channel Manager", icon: "globe", group: null },
  { id: "customers", label: "Customers", icon: "user", group: null },
  { id: "staff", label: "Staff", icon: "scan", group: null },
];

// ─── Icons (minimal line set) ─────────────────────────────────────────────

function Ic({ k, size = 16 }: { k: string; size?: number }) {
  const s = size;
  const sw = 1.5;
  const p = {
    width: s,
    height: s,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (k) {
    case "home": return <svg {...p}><path d="M3 11 12 4l9 7M5 10v10h4v-6h6v6h4V10"/></svg>;
    case "fork": return <svg {...p}><path d="M8 3v8a2 2 0 0 0 4 0V3M10 11v10M16 3v6c0 1.5 1 2 2 2v10"/></svg>;
    case "bill": return <svg {...p}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h4"/></svg>;
    case "grid": return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case "stack": return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case "loop": return <svg {...p}><path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M18 4v3h-3M6 20v-3h3"/></svg>;
    case "chef": return <svg {...p}><path d="M7 14a4 4 0 1 1 1-7 5 5 0 0 1 8 0 4 4 0 1 1 1 7v6H7v-6z"/></svg>;
    case "pot": return <svg {...p}><path d="M4 9h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 9h20M9 6c0-1 1-2 2-2M13 6c0-1 1-2 2-2"/></svg>;
    case "desk": return <svg {...p}><path d="M3 9l9-5 9 5M5 9v12h14V9M9 21v-6h6v6"/></svg>;
    case "calendar": return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>;
    case "clip": return <svg {...p}><rect x="6" y="4" width="12" height="18" rx="2"/><path d="M9 4h6v3H9zM9 11h6M9 15h6M9 19h3"/></svg>;
    case "wallet": return <svg {...p}><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M17 15h1"/></svg>;
    case "spark": return <svg {...p}><path d="M5 8l2 2-2 2-2-2zM12 3l3 3-3 3-3-3zM19 8l2 2-2 2-2-2zM12 13l3 3-3 5-3-5z"/></svg>;
    case "globe": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case "user": return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>;
    case "scan": return <svg {...p}><path d="M3 8V5a2 2 0 0 1 2-2h3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3M7 12h10"/></svg>;
    case "wifi": return <svg {...p}><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19h.01"/></svg>;
    case "phone": return <svg {...p}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>;
    case "sun": return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></svg>;
    case "chev": return <svg {...p}><path d="M9 6l6 6-6 6"/></svg>;
    case "down": return <svg {...p}><path d="M6 9l6 6 6-6"/></svg>;
    case "exit": return <svg {...p}><path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2M9 12h12M17 8l4 4-4 4"/></svg>;
    default: return null;
  }
}

// ─── Sidebar ────────────────────────────────────────────────────────────

function Sidebar({ active }: { active: string }) {
  // figure out which group is auto-open (the one containing active)
  const openGroups: Record<string, boolean> = {};
  SIDEBAR.forEach((row) => {
    if (row.group && row.items && row.items.some((i) => i.id === active)) openGroups[row.group] = true;
  });
  // default: open Restaurant if active is dashboard or doesn't match anything
  if (!Object.keys(openGroups).length) openGroups["Restaurant"] = true;

  return (
    <aside className="prod-sb">
      <div className="prod-sb-logo">
        <span className="prod-sb-logo-mark">T</span>
        <span className="prod-sb-logo-text">TasteIQ</span>
      </div>
      <nav className="prod-sb-nav">
        {SIDEBAR.map((row, idx) => {
          if (!row.group) {
            const on = row.id === active;
            return (
              <a key={row.id} className={`prod-sb-row${on ? " on" : ""}`}>
                <span className="prod-sb-icn"><Ic k={row.icon} /></span>
                <span>{row.label}</span>
              </a>
            );
          }
          const open = openGroups[row.group];
          return (
            <div key={row.group} className="prod-sb-grp">
              <div className="prod-sb-row prod-sb-grp-h">
                <span className="prod-sb-icn"><Ic k={row.icon} /></span>
                <span>{row.group}</span>
                <span className="prod-sb-chev"><Ic k="down" size={14} /></span>
              </div>
              {open && row.items.map((it) => {
                const on = it.id === active;
                return (
                  <a key={it.id} className={`prod-sb-row prod-sb-sub${on ? " on" : ""}`}>
                    <span className="prod-sb-icn"><Ic k={'icon' in it && it.icon ? it.icon : 'bill'} /></span>
                    <span>{it.label}</span>
                  </a>
                );
              })}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

// ─── Top bar ────────────────────────────────────────────────────────────

function TopBar({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="prod-top">
      <h2 className="prod-top-h">{title}</h2>
      <div className="prod-top-r">
        <span className="prod-top-pill"><Ic k="globe" size={14} /><span>EN</span></span>
        <span className="prod-top-online"><Ic k="wifi" size={14} /><span>Online</span></span>
        <span className="prod-top-phone"><Ic k="phone" size={14} /><span>+91 62074 66460</span></span>
        <span className="prod-top-pill prod-top-icon"><Ic k="sun" size={14} /></span>
        <span className="prod-top-outlet">
          <span>TastyChats</span>
          <Ic k="down" size={14} />
        </span>
        <span className="prod-top-exit" style={{ color: accent }}><Ic k="exit" size={16} /></span>
      </div>
    </div>
  );
}

// ─── Screen: Dashboard (TastyChats — 1:1 with the real product) ──────

function ScreenDashboard({ accent }: { accent: string }) {
  return (
    <div className="prod-body">
      <div className="prod-dashtop">
        <span className="prod-daterange">
          <Ic k="calendar" size={14} />
          <span>Apr 09, 2026 — May 09, 2026</span>
        </span>
      </div>

      <div className="prod-grid prod-grid-3">
        {/* Daily Sales — area chart */}
        <div className="prod-card">
          <div className="prod-card-h">Daily Sales</div>
          <DailySalesChart />
        </div>

        {/* Payment Breakdown — donut, 100% cash */}
        <div className="prod-card">
          <div className="prod-card-h">Payment Breakdown</div>
          <div className="prod-donut-wrap">
            <PaymentDonut accent={accent} />
          </div>
          <div className="prod-donut-legend">
            <span className="prod-donut-dot" style={{ background: accent }} />
            CASH 100.0%
          </div>
        </div>

        {/* Trending items */}
        <div className="prod-card">
          <div className="prod-card-h">Trending items</div>
          <ul className="prod-trend">
            {[
              ["MASALA PURI", 707, "₹42,750"],
              ["DAHI PURI",   390, "₹22,200"],
              ["PANI PURI",   342, "₹18,765"],
              ["BHEL PURI",   319, "₹16,065"],
              ["SEV PURI",    219, "₹13,050"],
            ].map(([n, o, amt]) => (
              <li key={n} className="prod-trend-row">
                <div>
                  <div className="prod-trend-n">{n}</div>
                  <div className="prod-trend-sub">{o} orders</div>
                </div>
                <span className="prod-trend-amt">{amt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="prod-grid prod-grid-2">
        <div className="prod-card prod-card-empty">
          <div className="prod-card-h">Upsell Revenue</div>
          <div className="prod-empty">
            <div className="prod-empty-icn">↑</div>
            <div className="prod-empty-t">No data available</div>
          </div>
        </div>
        <div className="prod-card">
          <div className="prod-card-h">Peak Order Time</div>
          <PeakOrderChart accent={accent} />
        </div>
      </div>
    </div>
  );
}

function DailySalesChart() {
  // Faithful-ish: jagged area chart, INR axis, Apr 14 → May 8.
  const data = [3.2, 4.8, 6.1, 7.4, 9.8, 11.2, 10.5, 7.8, 5.2, 6.0, 5.8, 4.4,
                7.2, 8.0, 9.6, 9.1, 7.0, 5.8, 6.4, 4.2, 1.8, 0.5, 1.1, 6.2, 7.8];
  const max = 12;
  const W = 100, H = 100;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * W, H - (v / max) * H]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${W} ${H} L0 ${H} Z`;
  return (
    <div className="prod-area">
      <div className="prod-area-yaxis">
        <span>INR12,000</span><span>INR9,000</span><span>INR6,000</span><span>INR3,000</span><span>INR0</span>
      </div>
      <div className="prod-area-canvas">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="prod-area-svg">
          <defs>
            <linearGradient id="dsg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#7C5AE9" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#7C5AE9" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#dsg)" />
          <path d={line} stroke="#5B3DD9" strokeWidth="0.8" fill="none" />
        </svg>
        <div className="prod-area-xaxis">
          <span>Apr 14</span><span>Apr 20</span><span>Apr 26</span><span>May 2</span><span>May 8</span>
        </div>
      </div>
    </div>
  );
}

function PaymentDonut({ accent }: { accent: string }) {
  const r = 44, c = 2 * Math.PI * r, size = 120;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={accent} strokeWidth="14"/>
      <circle cx={size/2} cy={size/2} r={r-12} fill="none" stroke="#fff" strokeWidth="0"/>
    </svg>
  );
}

function PeakOrderChart({ accent }: { accent: string }) {
  // bars approximating the real screenshot's peak (afternoon/evening spike)
  const bars = [
    { h: 0.40, label: "12p" }, { h: 0.10, label: "" }, { h: 0.05, label: "1p" },
    { h: 0.02, label: "" }, { h: 0.02, label: "2p" }, { h: 0.02, label: "" },
    { h: 0.40, label: "5p" }, { h: 0.78, label: "" }, { h: 0.92, label: "6p" },
    { h: 0.85, label: "" }, { h: 0.40, label: "7p" }, { h: 0.20, label: "" },
  ];
  return (
    <div className="prod-bars">
      <div className="prod-bars-y">
        <span>800</span><span>600</span><span>400</span><span>200</span><span>0</span>
      </div>
      <div className="prod-bars-canvas">
        <div className="prod-bars-row">
          {bars.map((b, i) => (
            <div key={i} className="prod-bar">
              <div className="prod-bar-fill" style={{
                height: `${b.h * 100}%`,
                background: b.h > 0.3 ? accent : "rgba(15,14,12,0.20)"
              }} />
            </div>
          ))}
        </div>
        <div className="prod-bars-x">
          <span>12p</span><span>2p</span><span>4p</span><span>6p</span><span>8p</span>
        </div>
        <div className="prod-bars-ylabel">Number of Orders</div>
      </div>
    </div>
  );
}

// ─── Screen: Billing (POS) ──────────────────────────────────────────────

function ScreenBilling({ accent }: { accent: string }) {
  const cats = ["All", "Snacks", "VADA PAVS", "CHAATS", "Goli Soda", "BHEL", "DAHI CHAATS",
                "CHEESE CHAATS", "Desserts", "Pav Bhaji", "GRILLED SANDWICH", "MAGGI", "BUN SNACKS"];
  const items = [
    ["TEA", 15],
    ["FILTER COFFEE", 15],
    ["PLAIN KACHORI", 20],
    ["FRENCH FRIES", 80],
    ["MASALA PURI", 60],
    ["DAHI PURI", 60],
    ["PANI PURI", 50],
    ["BHEL PURI", 50],
  ];
  return (
    <div className="prod-body prod-billing">
      <div className="prod-bill-l">
        <div className="prod-search">
          <Ic k="globe" size={16} />
          <input placeholder="Search menu items… (or scan barcode)" readOnly />
        </div>

        <div className="prod-bill-section">
          <div className="prod-bill-section-h">Categories (20)</div>
          <div className="prod-chips">
            {cats.map((c, i) => (
              <span key={c} className={`prod-chip${i === 0 ? " on" : ""}`}>{c}</span>
            ))}
          </div>
        </div>

        <div className="prod-bill-section">
          <div className="prod-bill-section-h">Items (143)</div>
          <div className="prod-items">
            {items.map(([n, p]) => (
              <div key={n} className="prod-item">
                <div className="prod-item-thumb">
                  <PlateGlyph />
                </div>
                <div className="prod-item-n">{n}</div>
                <div className="prod-item-p">INR {p}.00</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="prod-bill-r">
        <label className="prod-check">
          <input type="checkbox" readOnly /> Non-Taxable Bill
        </label>
        <div className="prod-field">
          <label>Schedule</label>
          <input type="text" defaultValue="dd/mm/yyyy, --:-- --" readOnly />
        </div>

        <div className="prod-bill-section-h">Order Information</div>
        <div className="prod-field">
          <input type="text" placeholder="Order ID (Auto-generated)" readOnly />
        </div>
        <div className="prod-field-row">
          <button className="prod-btn-2nd">Fetch Last Order ID</button>
          <button className="prod-btn-2nd" style={{ color: accent, borderColor: accent }}>
            <span>↻</span> New Order
          </button>
        </div>
        <div className="prod-field-row">
          <input type="text" placeholder="First Name" readOnly />
          <input type="text" placeholder="Last Name" readOnly />
        </div>
        <div className="prod-field-row">
          <div className="prod-field-phone">
            <span className="prod-flag">🇮🇳</span>
            <input type="text" defaultValue="+91" readOnly />
          </div>
          <input type="text" placeholder="Email" readOnly />
        </div>

        <div className="prod-bill-section-h">Order Details</div>
        <div className="prod-field-row">
          <select disabled defaultValue=""><option value="">Select Table</option></select>
          <select disabled defaultValue=""><option value="">Select Waiter</option></select>
        </div>
        <div className="prod-field-row">
          <select disabled defaultValue="dine"><option value="dine">Dine In</option></select>
          <select disabled defaultValue="acc"><option value="acc">Accepted</option></select>
        </div>

        <button className="prod-btn-primary" style={{ background: accent }}>Create Order</button>
        <div className="prod-or">or generate invoice</div>
        <button className="prod-btn-2nd-lg">
          <Ic k="bill" size={14} /> Generate Invoice
        </button>
      </div>
    </div>
  );
}

function PlateGlyph() {
  // Tiny abstract "plate of chaat" glyph — never a stock food photo.
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="#F3EEDF" />
      <circle cx="32" cy="32" r="20" fill="#fff" />
      <ellipse cx="26" cy="30" rx="6" ry="4" fill="#C84B31" opacity="0.85"/>
      <ellipse cx="36" cy="34" rx="5" ry="3.5" fill="#5B3DD9" opacity="0.75"/>
      <circle cx="30" cy="36" r="2" fill="#1F4D3A" opacity="0.7"/>
      <circle cx="38" cy="28" r="1.4" fill="#0F0E0C" opacity="0.55"/>
    </svg>
  );
}

// ─── Screen: Kitchen (tickets / KOT board) ──────────────────────────────

function ScreenKitchen({ accent }: { accent: string }) {
  const tix = [
    { id: "K-2841", table: "T4", age: "0:42", items: ["2× Masala Puri", "1× Tea"], state: "fire" },
    { id: "K-2842", table: "Takeaway", age: "1:18", items: ["3× Plain Kachori", "1× Filter Coffee"], state: "fire" },
    { id: "K-2843", table: "T1", age: "2:04", items: ["4× Pani Puri", "2× Bhel Puri", "2× Goli Soda"], state: "prep" },
    { id: "K-2844", table: "Online · Swiggy", age: "3:11", items: ["1× Dahi Puri", "1× Sev Puri", "1× French Fries"], state: "prep" },
    { id: "K-2845", table: "T7", age: "4:30", items: ["1× Cheese Pav Bhaji", "1× Maggi"], state: "ready" },
    { id: "K-2846", table: "T2", age: "5:12", items: ["2× Grilled Sandwich"], state: "ready" },
  ];
  const stateColor = (s: string) => s === "fire" ? accent : s === "prep" ? "rgba(15,14,12,0.55)" : "#1F8A5B";
  const stateBg    = (s: string) => s === "fire" ? `${accent}14` : "rgba(15,14,12,0.04)" ;
  return (
    <div className="prod-body">
      <div className="prod-kit-head">
        <div className="prod-kit-tabs">
          <span className="prod-kit-tab on" style={{ borderColor: accent, color: accent }}>All · 6</span>
          <span className="prod-kit-tab">Dine-in · 4</span>
          <span className="prod-kit-tab">Takeaway · 1</span>
          <span className="prod-kit-tab">Online · 1</span>
        </div>
        <div className="prod-kit-stats">
          <span>Avg KOT→serve <b>6:42</b></span>
          <span>On-time <b>92%</b></span>
        </div>
      </div>
      <div className="prod-kit-grid">
        {tix.map((t) => (
          <div key={t.id} className="prod-kit-card" style={{ borderColor: t.state === "fire" ? accent : "rgba(15,14,12,0.10)" }}>
            <div className="prod-kit-top">
              <span className="prod-kit-id">{t.id}</span>
              <span className="prod-kit-age">{t.age}</span>
            </div>
            <div className="prod-kit-tbl">{t.table}</div>
            <ul className="prod-kit-items">
              {t.items.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
            <div className="prod-kit-foot" style={{
              background: stateBg(t.state),
              color: stateColor(t.state),
            }}>
              {t.state === "fire" ? "▶ Fire now" : t.state === "prep" ? "⏵ In prep" : "✓ Ready to serve"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen: Table Billing ──────────────────────────────────────────────

function ScreenTables({ accent }: { accent: string }) {
  const tables = [
    { id: "T1", pax: 4, total: 380, mins: 22, state: "billing" },
    { id: "T2", pax: 2, total: 145, mins: 8,  state: "ordered" },
    { id: "T3", pax: 0, total: 0,   mins: 0,  state: "free" },
    { id: "T4", pax: 6, total: 920, mins: 34, state: "ordered" },
    { id: "T5", pax: 2, total: 0,   mins: 2,  state: "seated" },
    { id: "T6", pax: 0, total: 0,   mins: 0,  state: "free" },
    { id: "T7", pax: 4, total: 280, mins: 18, state: "ordered" },
    { id: "T8", pax: 3, total: 165, mins: 12, state: "ordered" },
    { id: "T9", pax: 0, total: 0,   mins: 0,  state: "free" },
    { id: "T10",pax: 2, total: 90,  mins: 5,  state: "ordered" },
    { id: "T11",pax: 0, total: 0,   mins: 0,  state: "cleaning" },
    { id: "T12",pax: 0, total: 0,   mins: 0,  state: "free" },
  ];
  const tone = (s: string) =>
    s === "billing"  ? accent :
    s === "ordered"  ? "rgba(15,14,12,0.65)" :
    s === "seated"   ? "rgba(15,14,12,0.35)" :
    s === "cleaning" ? "rgba(15,14,12,0.18)" :
                       "rgba(15,14,12,0.08)";
  return (
    <div className="prod-body">
      <div className="prod-tbl-head">
        <div className="prod-tbl-legend">
          <span><i style={{ background: accent }}/>Billing</span>
          <span><i style={{ background: "rgba(15,14,12,0.65)" }}/>Ordered</span>
          <span><i style={{ background: "rgba(15,14,12,0.35)" }}/>Seated</span>
          <span><i style={{ background: "rgba(15,14,12,0.18)" }}/>Cleaning</span>
          <span><i style={{ background: "rgba(15,14,12,0.08)" }}/>Free</span>
        </div>
        <span className="prod-tbl-stats">8 of 12 occupied · avg ₹268 / cover · turn 38 min</span>
      </div>
      <div className="prod-tbl-grid">
        {tables.map((t) => (
          <div key={t.id} className="prod-tbl-cell" style={{ borderColor: tone(t.state) }}>
            <div className="prod-tbl-top">
              <span className="prod-tbl-id">{t.id}</span>
              <span className="prod-tbl-state" style={{ color: tone(t.state) }}>{t.state.toUpperCase()}</span>
            </div>
            <div className="prod-tbl-pax">
              {t.pax ? <><b>{t.pax}</b> guests</> : <span>—</span>}
            </div>
            {t.total > 0 && (
              <div className="prod-tbl-bot">
                <span>₹{t.total}</span>
                <span className="prod-tbl-mins">{t.mins}m</span>
              </div>
            )}
            {t.state === "free" && <div className="prod-tbl-bot prod-tbl-cta" style={{ color: accent }}>+ Seat</div>}
            {t.state === "cleaning" && <div className="prod-tbl-bot">cleaning…</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ProductScreen — the public API ─────────────────────────────────────

const SCREEN_MAP = {
  dashboard:  { title: "Dashboard",     render: ScreenDashboard,  active: "dashboard" },
  billing:    { title: "Billing",       render: ScreenBilling,    active: "billing"   },
  kitchen:    { title: "Kitchen",       render: ScreenKitchen,    active: "kitchen"   },
  tables:     { title: "Table Billing", render: ScreenTables,     active: "tables"    },
};

export function ProductScreen({
  screen = 'dashboard',
  accent = ACCENT_DEFAULT,
  morphKey = 0,
}: {
  screen?: ProductScreenId;
  accent?: string;
  morphKey?: number;
}) {
  const s = SCREEN_MAP[screen as keyof typeof SCREEN_MAP] || SCREEN_MAP.dashboard;
  const Render = s.render;
  return (
    <div className="prod-frame" key={morphKey}>
      <Sidebar active={s.active} />
      <div className="prod-main">
        <TopBar title={s.title} accent={accent} />
        <Render accent={accent} />
      </div>
    </div>
  );
}

