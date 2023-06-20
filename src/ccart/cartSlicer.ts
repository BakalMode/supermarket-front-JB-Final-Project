import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Product } from '../shopMain/shopMainSlicer';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.product.id === newItem.product.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.product.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.product.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product.id !== productId);
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
