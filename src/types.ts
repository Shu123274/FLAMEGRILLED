export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  category: string;
  image: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  crowns: number;
}

export interface OrderItem extends FoodItem {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: any;
}

export interface Reward {
  id: string;
  name: string;
  cost: number;
  description: string;
  image: string;
}
