
// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; 

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Add the reducer under the 'cart' slice
  },
});
