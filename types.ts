export type ItemType = 'lost' | 'found';

export type Category =
  | 'Wallet'
  | 'Phone'
  | 'Keys'
  | 'Bag'
  | 'Laptop'
  | 'ID Card'
  | 'Clothing'
  | 'Electronics'
  | 'Other';

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  category: Category;
  location: string;
  date: string; // YYYY-MM-DD
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'matched' | 'resolved';
  postedAt: string;
}

export interface AiMatchResult {
  itemId: string;
  matchPercentage: number;
  reason: string;
  matchedItem: Item;
}

export type PageRoute = 'home' | 'report-lost' | 'report-found' | 'browse' | 'detail';
