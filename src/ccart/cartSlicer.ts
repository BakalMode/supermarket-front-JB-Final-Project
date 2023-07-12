import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Product } from '../shopMain/shopMainSlicer';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

const getInitialItems = (): CartItem[] => {
  const storedItems = localStorage.getItem('cart');
  if (storedItems) {
    return JSON.parse(storedItems) as CartItem[];
  }
  return [];
};

const getInitialTotal = (): number => {
  const storedTotal = localStorage.getItem('total');
  if (storedTotal) {
    return Number.parseFloat(storedTotal);
  }
  return 0;
};

const initialState: CartState = {
  items: getInitialItems(),
  total: getInitialTotal(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.product.id === newItem.product.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      state.total += newItem.product.price * newItem.quantity;
      if (state.total < 0) {
        state.total = 0;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('total', state.total.toString());
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.product.id === productId);
      if (existingItem) {
        const previousQuantity = existingItem.quantity;
        existingItem.quantity += 1;
        state.total += existingItem.product.price * (existingItem.quantity - previousQuantity);
        if (state.total < 0) {
          state.total = 0;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('total', state.total.toString());
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.product.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        const previousQuantity = existingItem.quantity;
        existingItem.quantity -= 1;
        state.total -= existingItem.product.price * (previousQuantity - existingItem.quantity);
        if (state.total < 0) {
          state.total = 0;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('total', state.total.toString());
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const removedItem = state.items.find((item) => item.product.id === productId);
      if (removedItem) {
        state.total -= removedItem.product.price * removedItem.quantity;
        state.items = state.items.filter((item) => item.product.id !== productId);
        if (state.total < 0) {
          state.total = 0;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('total', state.total.toString());
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;

export default cartSlice.reducer;
