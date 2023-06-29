import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import bookSlice from "../features/books/bookSlice";
import cartSlice from "../features/cart/cartSlice";
import whishlistSlice from "../features/whishlist/whishlistSlice";
import orders from "../features/orders/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
    books: bookSlice,
    whishlist: whishlistSlice,
    orders: orders,
  },
});
