export type FnbModule = {
  id: string;
  title: string;
  description: string;
};

export type FnbModuleGroup = {
  id: string;
  title: string;
  modules: FnbModule[];
};

export const FNB_MODULE_GROUPS: FnbModuleGroup[] = [
  {
    id: 'fnb',
    title: 'F&B',
    modules: [
      {
        id: 'billing',
        title: 'Billing & POS',
        description: 'Counter-style F&B POS with deep menus, modifiers, GST and e-invoice.',
      },
      {
        id: 'tables',
        title: 'Table Billing',
        description: 'Floor map, table state, captain shortcuts, bill-print in two taps.',
      },
      {
        id: 'orders',
        title: 'Orders',
        description: 'All channels in one queue — dine-in, takeaway, online, subscription.',
      },
      {
        id: 'menu',
        title: 'Menu',
        description: 'Categories, variants, modifiers, photos. Bulk-import from old POS.',
      },
      {
        id: 'kitchen',
        title: 'Kitchen (KOT)',
        description: 'Kitchen display with fire / prep / ready states. Prints to your printer.',
      },
      {
        id: 'in-room',
        title: 'In-room & hotel F&B',
        description: 'Room-charge routing, guest folios, outlet-wise menus for hotel restaurants.',
      },
      {
        id: 'subscription',
        title: 'Subscription Orders',
        description: 'Tiffin runs, school canteens, corporate plans — recurring billing built in.',
      },
    ],
  },
  {
    id: 'front-desk',
    title: 'Front Desk',
    modules: [
      {
        id: 'reservations',
        title: 'Reservations',
        description: 'Calendar, walk-ins, deposits, SMS / WhatsApp confirmations.',
      },
      {
        id: 'housekeeping',
        title: 'Housekeeping',
        description: 'Room status, cleaning queue, daily checklist, staff hand-off.',
      },
      {
        id: 'folios',
        title: 'Guest Folios',
        description: 'F&B + room charges settled on check-out with one tap.',
      },
    ],
  },
  {
    id: 'operations',
    title: 'Operations',
    modules: [
      {
        id: 'channels',
        title: 'Channel Manager',
        description: 'Sync menus, prices and stock to Zomato, Swiggy, ONDC, Google.',
      },
      {
        id: 'customers',
        title: 'Customers',
        description: 'Phone-keyed loyalty, segments, repeat-rate, lapsed-customer alerts.',
      },
      {
        id: 'staff',
        title: 'Staff',
        description: 'Roles, shifts, attendance, performance per waiter / captain.',
      },
      {
        id: 'vendors',
        title: 'Vendors',
        description: 'Suppliers, PO drafts, GRN, payables — works with Tally export.',
      },
      {
        id: 'compliance',
        title: 'Compliance',
        description: 'GST returns, FSSAI checks, e-invoicing, audit-ready statements.',
      },
      {
        id: 'payment',
        title: 'Payment',
        description: 'UPI, cards, cash, room-charge — all settled in one ledger.',
      },
      {
        id: 'coupons',
        title: 'Coupons',
        description: 'Discount rules, coupon codes, loyalty redemptions — never miscalculated.',
      },
      {
        id: 'expenses',
        title: 'Expenses',
        description: 'Daily expenses, petty cash, supplier payouts, end-of-day close.',
      },
      {
        id: 'cash',
        title: 'Cash Management',
        description: 'Cashier drawer open/close, drops, variances, manager override.',
      },
    ],
  },
];

export const PRODUCT_FAQS = [
  {
    question: 'What is restaurant F&B software?',
    answer:
      'Restaurant F&B software covers point of sale, kitchen tickets, table management, menu and inventory, and settlement — in one system instead of separate POS, KOT printer and accounting apps. TasteIQ is built for Indian GST, UPI and aggregator channels.',
  },
  {
    question: 'Does TasteIQ work for hotels with restaurants?',
    answer:
      'Yes. Outlet POS, in-room dining and room-charge routing to guest folios work alongside TasteIQ Hotels PMS — see our Hotels page for channel manager and front desk.',
  },
  {
    question: 'Can I sync Zomato, Swiggy and ONDC?',
    answer:
      'Yes. Menus, prices and stock sync to Zomato, Swiggy, ONDC and Google from one dashboard — fewer manual updates and fewer order mistakes during peak hours.',
  },
  {
    question: 'Is GST billing and e-invoice included?',
    answer:
      'GST-ready billing, tax splits, e-invoice formats and audit-friendly statements are native to India. VAT and sales tax engines are available for other markets.',
  },
  {
    question: 'Does the POS work offline?',
    answer:
      'Yes. Patchy Wi‑Fi at the counter? Keep billing. Orders, payments and tickets queue locally and sync when the network returns.',
  },
];
