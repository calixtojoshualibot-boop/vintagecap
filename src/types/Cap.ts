export interface Cap {
  id: string;
  name: string;
  team: string;
  year: number;
  condition: 'good' | 'renovated condition';
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
