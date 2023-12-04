import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import instance from "../../utils/axios";

export const addFavouriteItem = createAsyncThunk(
  "wishlist/addFavouriteItem",

  async (productId) => {

    const { data } = await instance.post(`/favourite/add`, {productId});
    return data;
  }
);

// -----------------------------------------------------

export const removeFromfavouriteItem = createAsyncThunk(
  "wishlist/removeFromfavouriteItem",

  async (productId) => {
    
    
    const { data } = await instance.delete(`/favourite?productId=${productId}`);
    return data;
  }
);


export const getfavouriteItems = createAsyncThunk(
  "wishlist/getfavouriteItems",

  async () => {
    const { data } = await instance.get(`/favourite`);
    
    return data;
  }
);

const initialState = {
  isLoading: false,
  wishlistItems: [],
};

export const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setIsCartShown: (state, action) => {
      state.isCartShown = action.payload;
    },
  },

  extraReducers: {
    [addFavouriteItem.pending]: (state) => {
      state.isLoading = true
    },
    [addFavouriteItem.fulfilled]: (state, action) => {
      state.wishlistItems = [...state.wishlistItems, action.payload] 
      state.isLoading = false
    },
    [addFavouriteItem.rejected]: (state) => {
      state.isLoading = false
    },


    [getfavouriteItems.pending]: (state) => {
      state.isLoading = true
    },

    [getfavouriteItems.fulfilled]: (state, action) => {

      state.wishlistItems = action.payload
      state.isLoading = false

    },
    [getfavouriteItems.rejected]: (state) => {
      state.isLoading = false
    },

    // ---------------------------------------

    [removeFromfavouriteItem.pending]: (state) => {
      // state.isLoading = true
    },

    [removeFromfavouriteItem.fulfilled]: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter((item) => parseInt(item.productId) !== parseInt(action.payload.productId))
     

    },
    [removeFromfavouriteItem.rejected]: (state) => {
      // state.isLoading = false
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = WishlistSlice.actions;

export default WishlistSlice.reducer;
