import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/axios";

export const sortList = [
  {
    sortTitle: "Спочатку популярні",
    sortBy: "bestseller",
    sortOrder: "desc",
  },
  {
    sortTitle: "Від дешевих до дорогих",
    sortBy: "price",
    sortOrder: "asc",
  },
  {
    sortTitle: "Від дорогих до дешевих",
    sortBy: "price",
    sortOrder: "desc",
  },
];

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (params) => {
    
    const { category, sortBy, sortOrder, searchValue } = params;
    const { data } = await instance.get(
      `/api/product${category ? `?category=${category}` : ""}${sortBy ? `&sort=${sortBy}` : ""}${sortOrder ? `&order=${sortOrder}` : ""}${searchValue ? `&search=${searchValue}` : ""}`);
    return data;
  }
);
export const fetchOneProduct = createAsyncThunk(
  "product/fetchOneProduct",
  async (id) => {
    
    const { data } = await instance.get(
      `http://localhost:5000/api/product/${id}`);
      
    return data;
  }
);
export const fetchTopProduct = createAsyncThunk(
  "product/fetchTopProduct",
  async (params) => {
    const { data } = await instance.get(`http://localhost:5000/api/product`);
    return data;
  }
);

const initialState = {
  productItems: [],
  isLoading: false,
  searchValue: "",
  searchValueLocal: "",
  category: null,
  sortTitle: sortList[0].sortTitle,
  sortBy: sortList[0].sortBy,
  sortOrder: sortList[0].sortOrder,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSearchValueLocal: (state, action) => {
      state.searchValueLocal = action.payload;
    },
    setSortTitle: (state, action) => {
      state.sortTitle = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setFilter: (state, action) => {
      state.category = action.payload.category || null;
      state.searchValue = action.payload.search || '';
      state.sortTitle = action.payload.title || "Спочатку популярні";
      (state.sortBy = action.payload.sortBy),
      (state.sortOrder = action.payload.sortOrder || "desc");
    },
    reset: (state) => {
      state.category = initialState.category;
      state.sortTitle = initialState.sortTitle;
      state.sortBy = initialState.sortBy;
      state.sortOrder = initialState.sortOrder;
    },
  },
  extraReducers: {
    [fetchProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.productItems = action.payload;
      state.isLoading = false;
    },
    [fetchProduct.rejected]: (state) => {
      state.isLoading = false;
    },

    [fetchOneProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchOneProduct.fulfilled]: (state, action) => {
      state.productItems = action.payload;
      state.isLoading = false;
    },
    [fetchOneProduct.rejected]: (state) => {
      state.isLoading = false;
    },

    [fetchTopProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchTopProduct.fulfilled]: (state, action) => {
      state.productItems = action.payload;
      state.isLoading = false;
    },
    [fetchTopProduct.rejected]: (state) => {
      state.isLoading = false;
    },

    // [fetchProductByCategory.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [fetchProductByCategory.fulfilled]: (state, action) => {
    //   state.productItems = action.payload;
    //   state.isLoading = false;
    // },
    // [fetchProductByCategory.rejected]: (state) => {
    //   state.isLoading = false;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCategory,
  setSortTitle,
  setSortBy,
  setSortOrder,
  setFilter,
  reset,
  setSearchValue,
  setSearchValueLocal,
} = ProductSlice.actions;

export default ProductSlice.reducer;
