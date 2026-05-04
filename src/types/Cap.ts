export interface Cap {
  id: string;
  name: string;
  team: string;
  year: number;
  condition: 'deadstock' | 'near-mint' | 'excellent' | 'good' | 'fair' | 'beater';
  price: number;
  description: string;
  image: string;
  featured: boolean;
}

export interface SellerContact {
  shopName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  bio: string;
}
