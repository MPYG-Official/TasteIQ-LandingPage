export type PinLookup = { available: true; pin: string; area: string } | { available: false; pin: string };

export const PIN_DB: Record<string, { area: string }> = {
  '560001': { area: 'MG Road' },
  '560008': { area: 'Indiranagar' },
  '560034': { area: 'Koramangala' },
  '560038': { area: 'Indiranagar 2nd Stage' },
  '560048': { area: 'Whitefield West' },
  '560066': { area: 'Whitefield' },
  '560076': { area: 'BTM Layout' },
  '560078': { area: 'Banashankari' },
  '560100': { area: 'Electronic City' },
  '560102': { area: 'HSR Layout' },
  '560103': { area: 'Whitefield' },
};

export type Kitchen = {
  name: string;
  cui: string;
  tags: string[];
  price: string;
  rating: string;
  reviews: string;
  km: string;
  logo: string;
  color: string;
  isVeg?: boolean;
  isNew?: boolean;
};

export const KITCHENS: Kitchen[] = [
  { name: 'Bowl Spot', cui: 'Salads & grain bowls', tags: ['Healthy', 'Bowls', 'Veg'], price: '180–260', rating: '4.6', reviews: '1.2k', km: '0.8', logo: 'B', color: '#2A6F4F', isVeg: true },
  { name: 'Tiffin Co.', cui: 'Home-style North Indian', tags: ['Tiffin', 'Indian', 'Veg'], price: '140–200', rating: '4.7', reviews: '2.4k', km: '1.1', logo: 'T', color: '#C24A2A', isVeg: true },
  { name: 'Wok This Way', cui: 'Pan-Asian street food', tags: ['Asian', 'Non-veg', 'Dinner'], price: '200–280', rating: '4.5', reviews: '980', km: '1.4', logo: 'W', color: '#4A4A6E' },
  { name: 'The Daily Roti', cui: 'Rotis & sabzi meals', tags: ['Indian', 'Tiffin', 'Veg'], price: '160–220', rating: '4.8', reviews: '3.1k', km: '0.6', logo: 'R', color: '#8A6E2F', isVeg: true },
  { name: 'Idli Express', cui: 'South Indian breakfasts', tags: ['Indian', 'Breakfast', 'Veg'], price: '120–180', rating: '4.7', reviews: '1.8k', km: '1.7', logo: 'I', color: '#5F6B2A', isVeg: true },
  { name: 'Curry Pot', cui: 'Andhra & Telangana meals', tags: ['Indian', 'Non-veg'], price: '180–240', rating: '4.6', reviews: '1.1k', km: '1.0', logo: 'C', color: '#A33E25' },
  { name: 'Greenly', cui: 'Plant-forward & smoothies', tags: ['Healthy', 'Bowls', 'Veg'], price: '220–320', rating: '4.5', reviews: '640', km: '0.9', logo: 'G', color: '#2A6F3F', isVeg: true, isNew: true },
  { name: 'Bombay Tiffin', cui: 'Maharashtrian thalis', tags: ['Indian', 'Tiffin', 'Veg'], price: '190–260', rating: '4.6', reviews: '870', km: '1.3', logo: 'B', color: '#6B4226', isVeg: true },
  { name: 'Smoke House', cui: 'Grills, kebabs, biryanis', tags: ['Indian', 'Non-veg', 'Dinner'], price: '260–360', rating: '4.5', reviews: '1.6k', km: '2.0', logo: 'S', color: '#3E3E3E' },
  { name: 'Pasta Bar', cui: 'Italian & sandwiches', tags: ['Continental'], price: '220–320', rating: '4.4', reviews: '720', km: '1.5', logo: 'P', color: '#7A2A4E' },
  { name: 'Poke & Co.', cui: 'Hawaiian poke bowls', tags: ['Bowls', 'Healthy', 'Non-veg'], price: '260–360', rating: '4.6', reviews: '510', km: '1.8', logo: 'P', color: '#2A4E6B', isNew: true },
  { name: 'Biryani Tales', cui: 'Hyderabadi & Lucknowi', tags: ['Indian', 'Non-veg', 'Dinner'], price: '220–300', rating: '4.7', reviews: '2.0k', km: '1.2', logo: 'B', color: '#8A3318' },
  { name: 'Khichdi & Co', cui: 'Comfort bowls & dals', tags: ['Indian', 'Healthy', 'Veg'], price: '160–220', rating: '4.6', reviews: '430', km: '0.7', logo: 'K', color: '#5F4A2A', isVeg: true },
  { name: 'Sandwich Lab', cui: 'Sandwiches, wraps, soups', tags: ['Continental', 'Breakfast'], price: '140–200', rating: '4.4', reviews: '910', km: '1.6', logo: 'S', color: '#4A6E5F' },
];

export type FoodFilter = {
  id: string;
  label: string;
  match: ((k: Kitchen) => boolean) | null;
};

export const FILTERS: FoodFilter[] = [
  { id: 'all', label: 'All', match: null },
  { id: 'veg', label: 'Veg only', match: (k) => !!k.isVeg },
  { id: 'Bowls', label: 'Bowls', match: (k) => k.tags.includes('Bowls') },
  { id: 'Indian', label: 'Indian', match: (k) => k.tags.includes('Indian') },
  { id: 'Asian', label: 'Asian', match: (k) => k.tags.includes('Asian') },
  { id: 'Healthy', label: 'Healthy', match: (k) => k.tags.includes('Healthy') },
  { id: 'Tiffin', label: 'Tiffin', match: (k) => k.tags.includes('Tiffin') },
  { id: 'Breakfast', label: 'Breakfast', match: (k) => k.tags.includes('Breakfast') },
  { id: 'Dinner', label: 'Dinner', match: (k) => k.tags.includes('Dinner') },
  { id: 'Continental', label: 'Continental', match: (k) => k.tags.includes('Continental') },
];

export function lookupPin(pin: string): Promise<PinLookup> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const entry = PIN_DB[pin];
      if (entry) {
        resolve({ available: true, pin, area: entry.area });
      } else {
        resolve({ available: false, pin });
      }
    }, 650 + Math.random() * 250);
  });
}

export const PIN_CHIPS = [
  { pin: '560103', label: '560103 · Whitefield' },
  { pin: '560034', label: '560034 · Koramangala' },
  { pin: '500032', label: '500032 · Hyderabad' },
];
