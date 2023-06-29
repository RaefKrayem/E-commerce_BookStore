import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  cart: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await cartService.getCart(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// add to cart with book id and quantity
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ bookId, quantity }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const quantityToAdd = quantity || 1;
      const response = await cartService.addToCart(
        bookId,
        quantityToAdd,
        token
      );
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// remove from cart with book id
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ bookId, quantity }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const quantityToRemove = quantity || 1;
      const response = await cartService.removeFromCart(
        bookId,
        quantityToRemove,
        token
      );
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = payload;
        state.message = "";
      })
      .addCase(getCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        // push the new book to the cart
        state.isLoading = false;
        state.isSuccess = true;
        // if the book is already in the cart, update the quantity
        const cartItem = state.cart.find((item) =>
          item._id === payload.book._id ? item : null
        );
        if (cartItem) {
          cartItem.ordered_quantity += payload.book.ordered_quantity;
          state.message = payload.message;
        } else {
          state.cart.push(payload.book);
          state.message = payload.message;
        }
      })
      .addCase(addToCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        // remove the book from the cart
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = state.cart.filter((book) => book._id !== payload._id);
      })
      .addCase(removeFromCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
