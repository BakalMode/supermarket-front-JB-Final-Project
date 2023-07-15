import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { fetchProducts } from './shopMainAPI';

export interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'failed';
  filteredProducts: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: any;
  category: string;
  category_name: string; 
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  filteredProducts: [],
};

export const fetchProductsAsync = createAsyncThunk(
  'shopMain/fetchProducts',
  async () => {
    const response = await fetchProducts();
    return response.data;
  }
);

export const shopMainSlice = createSlice({
  name: 'shopMain',
  initialState,
  reducers: { // ask the teacher about reducer and tell him how i used mine
    filterProducts: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload;
      if (searchTerm.trim() === '') {
        state.filteredProducts = state.products;
      } else {
        const filteredProducts = state.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        state.filteredProducts = filteredProducts;
      }
    },
    filterProductsByCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;

      if (category.trim() === '') {
        state.filteredProducts = state.products;
      } else {
        const filteredProducts = state.products.filter((product) =>
          product.category_name == (category)
        );
        state.filteredProducts = filteredProducts;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
        state.filteredProducts = action.payload; // Initialize filteredProducts with all products
      })
      .addCase(fetchProductsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { filterProducts,filterProductsByCategory } = shopMainSlice.actions;

export const selectProducts = (state: RootState) => state.shopMain.products;

export default shopMainSlice.reducer;
