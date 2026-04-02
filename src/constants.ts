import { FoodItem, Reward } from './types';

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'whopper',
    name: 'Whopper®',
    description: 'Flame-grilled beef patty, tomatoes, lettuce, mayo, ketchup, pickles, and onions on a sesame seed bun.',
    price: 6.49,
    calories: 660,
    category: 'Burgers',
    image: 'https://picsum.photos/seed/whopper/400/300'
  },
  {
    id: 'double-whopper',
    name: 'Double Whopper®',
    description: 'Two flame-grilled beef patties, tomatoes, lettuce, mayo, ketchup, pickles, and onions on a sesame seed bun.',
    price: 7.99,
    calories: 900,
    category: 'Burgers',
    image: 'https://picsum.photos/seed/doublewhopper/400/300'
  },
  {
    id: 'impossible-whopper',
    name: 'Impossible™ Whopper®',
    description: 'Flame-grilled patty made from plants, topped with tomatoes, lettuce, mayo, ketchup, pickles, and onions.',
    price: 7.49,
    calories: 630,
    category: 'Burgers',
    image: 'https://picsum.photos/seed/impossible/400/300'
  },
  {
    id: 'chicken-royal',
    name: 'Chicken Royal',
    description: 'Tender chicken breast, lettuce, and mayo on a sesame seed bun.',
    price: 5.99,
    calories: 550,
    category: 'Chicken',
    image: 'https://picsum.photos/seed/chickenroyal/400/300'
  },
  {
    id: 'fries-large',
    name: 'Large Fries',
    description: 'Golden, crispy, and perfectly salted.',
    price: 3.49,
    calories: 430,
    category: 'Sides',
    image: 'https://picsum.photos/seed/fries/400/300'
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    description: 'Crispy, golden-brown onion rings.',
    price: 2.99,
    calories: 310,
    category: 'Sides',
    image: 'https://picsum.photos/seed/onionrings/400/300'
  },
  {
    id: 'coke-large',
    name: 'Large Coca-Cola®',
    description: 'Refreshing ice-cold Coca-Cola®.',
    price: 2.49,
    calories: 290,
    category: 'Drinks',
    image: 'https://picsum.photos/seed/coke/400/300'
  }
];

export const REWARDS: Reward[] = [
  {
    id: 'free-whopper',
    name: 'Free Whopper®',
    cost: 500,
    description: 'Redeem 500 crowns for a free Whopper®.',
    image: 'https://picsum.photos/seed/rewardwhopper/400/300'
  },
  {
    id: 'free-fries',
    name: 'Free Large Fries',
    cost: 250,
    description: 'Redeem 250 crowns for a free large portion of fries.',
    image: 'https://picsum.photos/seed/rewardfries/400/300'
  },
  {
    id: 'free-drink',
    name: 'Free Large Drink',
    cost: 150,
    description: 'Redeem 150 crowns for a free large drink.',
    image: 'https://picsum.photos/seed/rewarddrink/400/300'
  }
];
