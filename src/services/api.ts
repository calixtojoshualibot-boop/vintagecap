import { Cap, SellerContact } from '../types/Cap';

const STORE_KEY = 'vintage_caps';
const AUTH_KEY = 'cap_admin';
const CONTACT_KEY = 'seller_contact';

const SEED: Cap[] = [
  { id:'1', name:'Bulls Dynasty Snapback', team:'Chicago Bulls', year:1996, condition:'near-mint', price:18000, description:'Original 96 Championship era Bulls snapback. Red crown, black brim, embroidered bull logo. From the legendary 72-10 season.', image:'bulls', featured:true },
  { id:'2', name:'Lakers Showtime Fitted', team:'Los Angeles Lakers', year:1988, condition:'excellent', price:25000, description:'Purple and gold fitted from the Showtime era. Classic Lakers script logo. Magic Johnson era.', image:'lakers', featured:true },
  { id:'3', name:'Celtics 86 Championship', team:'Boston Celtics', year:1986, condition:'good', price:20000, description:'Green snapback commemorating the 1986 NBA Championship. Larry Bird era with leprechaun logo.', image:'celtics', featured:false },
  { id:'4', name:'Warriors The City Edition', team:'Golden State Warriors', year:1975, condition:'fair', price:35000, description:'Iconic "The City" design with Golden Gate Bridge. One of the most legendary NBA logos ever. Rick Barry era.', image:'warriors', featured:true },
  { id:'5', name:'Knicks Starter Snapback', team:'New York Knicks', year:1994, condition:'good', price:11000, description:'Classic Starter brand Knicks snapback. Blue and orange. Patrick Ewing era when Knicks were contenders.', image:'knicks', featured:false },
  { id:'6', name:'Heat Inaugural Season', team:'Miami Heat', year:1988, condition:'excellent', price:15000, description:'Original 1988 inaugural season snapback. The original flame ball logo in red, black, and white.', image:'heat', featured:true },
  { id:'7', name:'Spurs Fiesta Logo', team:'San Antonio Spurs', year:1995, condition:'near-mint', price:9500, description:'The beloved fiesta logo with teal, pink, and orange stripes. Pre-Duncan era fan favorite.', image:'spurs', featured:false },
  { id:'8', name:'Raptors Dino Logo', team:'Toronto Raptors', year:1995, condition:'excellent', price:13000, description:'Original raptor dribbling basketball logo. Purple, red, and black. Vince Carter era vibes.', image:'raptors', featured:true },
  { id:'9', name:'Suns Sunburst Classic', team:'Phoenix Suns', year:1993, condition:'good', price:10500, description:'Classic sunburst logo. Purple and orange. Charles Barkley MVP season era.', image:'suns', featured:false },
  { id:'10', name:'Bucks Vintage Deer', team:'Milwaukee Bucks', year:1977, condition:'fair', price:22000, description:'Vintage green and purple with classic deer head logo. Kareem Abdul-Jabbar era. Incredible patina.', image:'bucks', featured:true },
  { id:'11', name:'Magic Penny Era', team:'Orlando Magic', year:1995, condition:'near-mint', price:12000, description:'Black pinstripe with classic star logo. Penny Hardaway and Shaq era. Finals appearance year.', image:'magic', featured:false },
  { id:'12', name:'Rockets Olajuwon Era', team:'Houston Rockets', year:1994, condition:'excellent', price:16000, description:'Red and white from the Hakeem Olajuwon back-to-back championship years. Classic rocket logo.', image:'rockets', featured:true },
];

function load(): Cap[] {
  const s = localStorage.getItem(STORE_KEY);
  if (!s) { localStorage.setItem(STORE_KEY, JSON.stringify(SEED)); return SEED; }
  return JSON.parse(s);
}
function save(list: Cap[]) { localStorage.setItem(STORE_KEY, JSON.stringify(list)); }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

const DEFAULT_CONTACT: SellerContact = {
  shopName: 'Caps Vault Manila',
  ownerName: 'Juan Dela Cruz',
  phone: '+63 917 123 4567',
  email: 'seller@capsvault.ph',
  address: 'Unit 5, Vintage Row Building, Makati Avenue, Makati City, Metro Manila 1200',
  facebook: 'facebook.com/capsvaultmanila',
  instagram: '@capsvaultmanila',
  bio: 'Collector and reseller of authentic vintage NBA caps since 2018. All items verified authentic. Meet-ups available in Metro Manila area. Shipping nationwide via J&T Express.',
};

function loadContact(): SellerContact {
  const s = localStorage.getItem(CONTACT_KEY);
  if (!s) { localStorage.setItem(CONTACT_KEY, JSON.stringify(DEFAULT_CONTACT)); return DEFAULT_CONTACT; }
  return JSON.parse(s);
}
function saveContact(data: SellerContact) { localStorage.setItem(CONTACT_KEY, JSON.stringify(data)); }

export const api = {
  login(email: string, pw: string): boolean {
    if (email === 'admin@caps.ph' && pw === 'admin123') {
      localStorage.setItem(AUTH_KEY, '1');
      return true;
    }
    return false;
  },
  logout() { localStorage.removeItem(AUTH_KEY); },
  isLoggedIn() { return localStorage.getItem(AUTH_KEY) === '1'; },

  getAll() { return load(); },
  getOne(id: string) { return load().find(c => c.id === id) ?? null; },

  create(data: Omit<Cap,'id'>) {
    const list = load();
    const cap: Cap = { ...data, id: uid() };
    list.push(cap);
    save(list);
    return cap;
  },

  update(id: string, data: Partial<Cap>) {
    const list = load();
    const i = list.findIndex(c => c.id === id);
    if (i < 0) return null;
    list[i] = { ...list[i], ...data };
    save(list);
    return list[i];
  },

  remove(id: string) {
    const list = load().filter(c => c.id !== id);
    save(list);
  },

  getContact(): SellerContact { return loadContact(); },
  saveContact(data: SellerContact) { saveContact(data); },
};
