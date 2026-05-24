export const WHO_ITS_FOR = [
  'HOTELS',
  'RESORTS',
  'BANQUET HALLS',
  'BEACH PROPERTIES',
] as const;

export type SolutionItem = {
  id: string;
  title: string;
  description: string;
  iconKey: string;
};

export type SolutionGroup = {
  id: string;
  label: string;
  items: SolutionItem[];
};

export const HOTELS_SOLUTION_GROUPS: SolutionGroup[] = [
  {
    id: 'bookings',
    label: 'Bookings & Distribution',
    items: [
      {
        id: 'pms',
        title: 'Property Management System (PMS)',
        description:
          'Front desk, rooms and inventory on one real-time availability calendar — your hotel management software command centre.',
        iconKey: 'pms',
      },
      {
        id: 'channel',
        title: 'Channel Manager & OTA sync',
        description:
          'Hotel channel manager with two-way OTA integration — update rates once, sell everywhere, prevent overbooking.',
        iconKey: 'channel',
      },
      {
        id: 'booking-engine',
        title: 'Direct booking engine',
        description:
          'Commission-free bookings from your own site with UPI, cards and net banking — built for India.',
        iconKey: 'booking',
      },
      {
        id: 'multi-property',
        title: 'Multi-property management',
        description:
          'Run resort, beach and city properties from one dashboard — resort management software at scale.',
        iconKey: 'multi',
      },
    ],
  },
  {
    id: 'fnb',
    label: 'F&B',
    items: [
      {
        id: 'restaurant-pos',
        title: 'Restaurant & outlet POS',
        description:
          'Counter and table billing for hotel restaurants, cafés and bars — GST-ready, modifier-heavy menus, captain shortcuts.',
        iconKey: 'catering',
      },
      {
        id: 'in-room-dining',
        title: 'In-room dining & room service',
        description:
          'Room-charge routing to guest folios, kitchen tickets and delivery tracking from kitchen to floor.',
        iconKey: 'booking',
      },
      {
        id: 'kitchen-kot',
        title: 'Kitchen display & KOT',
        description:
          'Fire, prep and ready states on a KOT board — prints to your kitchen printer, synced with outlet menus.',
        iconKey: 'staff',
      },
      {
        id: 'fnb-inventory',
        title: 'F&B inventory & recipes',
        description:
          'Recipe costing, outlet-wise stock, vendor GRN and consumption tied to covers and room service.',
        iconKey: 'reports',
      },
    ],
  },
  {
    id: 'guests',
    label: 'Guests & Compliance',
    items: [
      {
        id: 'guest-mgmt',
        title: 'Guest management',
        description:
          'Profiles, stay history and preferences — one guest record across rooms, outlets and folios.',
        iconKey: 'guests',
      },
      {
        id: 'kyc',
        title: 'KYC & ID verification',
        description:
          'Capture and store guest IDs with Form C and foreign-guest reporting — compliance-ready hospitality.',
        iconKey: 'kyc',
      },
      {
        id: 'crm',
        title: 'CRM & lead management',
        description:
          'Capture inquiries, quotes and follow-ups for rooms and group bookings — convert leads faster.',
        iconKey: 'crm',
      },
    ],
  },
  {
    id: 'operations',
    label: 'Operations & Money',
    items: [
      {
        id: 'staff',
        title: 'Staff & housekeeping scheduling',
        description:
          'Shifts, room turnaround, outlet rosters and housekeeping queues with hand-off checklists.',
        iconKey: 'staff',
      },
      {
        id: 'quotations',
        title: 'Quotations & billing',
        description:
          'Itemized quotes, advances, deposits and GST invoices — room, F&B and extras on one folio.',
        iconKey: 'quote',
      },
      {
        id: 'payments',
        title: 'Payments',
        description:
          'Collect advances and balances via UPI, Razorpay, cards and net banking — track dues in one place.',
        iconKey: 'payments',
      },
      {
        id: 'reports',
        title: 'Reports & analytics',
        description:
          'Occupancy, RevPAR, F&B revenue, outlet performance, OTA mix and property-wise insights.',
        iconKey: 'reports',
      },
    ],
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Inquiry',
    description: 'Capture room and F&B inquiries from web, phone, walk-in or OTA.',
  },
  {
    step: 2,
    title: 'Quote & KYC',
    description: 'Send itemized quotes, collect advances and verify guest IDs where required.',
  },
  {
    step: 3,
    title: 'Manage stay & outlets',
    description: 'Confirm PMS inventory, sync OTAs, run kitchen and housekeeping from one system.',
  },
  {
    step: 4,
    title: 'Bill & report',
    description: 'GST invoices, folio settlement and occupancy or F&B revenue reports.',
  },
] as const;

/** Placeholder metrics — replace with live figures */
export const HOTELS_STATS = [
  { id: 'properties', value: '120+', label: 'properties live', placeholder: true },
  { id: 'otas', value: '100+', label: 'OTAs connected', placeholder: true },
  { id: 'fnb', value: '340+', label: 'F&B outlets', placeholder: true },
  { id: 'guests', value: '2M+', label: 'guest records', placeholder: true },
] as const;

export const HOTELS_FAQS = [
  {
    question: 'What is a hotel channel manager?',
    answer:
      'A hotel channel manager connects your property management system to online travel agencies (OTAs) like Booking.com, Expedia, Agoda and Airbnb. TasteIQ syncs rates and availability in real time so you update once and every channel stays accurate — reducing manual work and preventing overbooking.',
  },
  {
    question: 'Does TasteIQ prevent overbooking across OTAs and direct bookings?',
    answer:
      'Yes. Two-way sync pushes inventory changes to all connected OTAs within seconds. Room inventory and direct bookings share one calendar, so a sale on any channel blocks the room everywhere.',
  },
  {
    question: 'Which OTAs do you integrate with?',
    answer:
      'Core global OTAs include Booking.com, Expedia, Agoda and Airbnb. In India we connect MakeMyTrip, Goibibo, Cleartrip, Yatra, EaseMyTrip, Ixigo and TBO — plus 100+ more through our channel manager. GDS (Amadeus, Sabre, Galileo) and metasearch (Google Hotel Ads, Trivago, TripAdvisor) are supported.',
  },
  {
    question: 'Does TasteIQ include hotel F&B and restaurant POS?',
    answer:
      'Yes. Run restaurant, bar, café and in-room dining on the same platform as your PMS — room charges post to guest folios, kitchen gets KOTs, and F&B inventory stays tied to recipes and vendors.',
  },
  {
    question: 'Is guest KYC and Form C supported for foreign guests?',
    answer:
      'Yes. Capture and store guest ID documents and generate Form C / foreign-guest reporting workflows required for Indian hospitality compliance.',
  },
  {
    question: 'Do you support India payment methods on direct bookings?',
    answer:
      'Direct bookings through your booking engine accept UPI, Razorpay, PayU, Paytm, cards and net banking — so guests pay the way they already do, without OTA commission.',
  },
];

export const PROPERTY_TYPES = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'resort', label: 'Resort' },
  { value: 'banquet', label: 'Banquet hall' },
  { value: 'beach', label: 'Beach property' },
  { value: 'multi', label: 'Multi-property group' },
  { value: 'other', label: 'Other' },
] as const;

export const HOTELS_TRUST_ITEMS = [
  { key: 'all-in-one', label: 'All-in-one platform', display: 'ALL-IN-ONE' },
  { key: 'otas', label: '100 plus OTA integrations', display: '100+ OTAs' },
  { key: 'compliance', label: 'Compliance ready', display: 'COMPLIANCE-READY' },
  { key: 'multi', label: 'Multi-property support', display: 'MULTI-PROPERTY' },
] as const;

export type HotelsTrustItem = (typeof HOTELS_TRUST_ITEMS)[number];
