import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import whishlistService from "./whishlistService";

const initialState = {
  whishlist: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getWhishList = createAsyncThunk(
  "whishlist/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await whishlistService.getWhishList(token);
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

export const addToWhishlist = createAsyncThunk(
  "whishlist/add",
  async (bookId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await whishlistService.addToWhishlist(bookId, token);
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

export const removeFromWhishlist = createAsyncThunk(
  "whishlist/remove",
  async (bookId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await whishlistService.removeFromWhishlist(bookId, token);
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

export const whishlistSlice = createSlice({
  name: "whishlist",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWhishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWhishList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.whishlist = payload;
      })
      .addCase(getWhishList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(addToWhishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWhishlist.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.whishlist.push(payload.book);
      })
      .addCase(addToWhishlist.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(removeFromWhishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromWhishlist.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.whishlist = state.whishlist.filter(
          (book) => book._id !== payload._id
        );
      })
      .addCase(removeFromWhishlist.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export const { reset } = whishlistSlice.actions;
export default whishlistSlice.reducer;
