import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/axios";

export const getOrders = createAsyncThunk(
  "order/getOrders",

  async () => {
    


      
      const { data } = await instance.get('/order');
    
      return data;

    
  }
);

// ==============================================

export const addOrder = createAsyncThunk(
  "order/addOrder",

  async (obj) => {
    const { data } = await instance.post(`/order`, obj);
    return data;
  }
);

const initialState = {
  orderItems: [],
  newOrder: null,
  orders: null,
  isLoading: false,
  status: null,

};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [addOrder.pending]: (state) => {
      state.isLoading = true
    },
    [addOrder.fulfilled]: (state, action) => {
      state.newOrder = action.payload;
      state.status = true
      state.isLoading = false
    },
    [addOrder.rejected]: (state, action) => {
      state.status = false
      state.isLoading = false
    },

    // ====================================================

    [getOrders.pending]: (state) => {
      state.isLoadingOrder = true
    },
    [getOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.status = true
      state.isLoadingOrder = false
    },
    [getOrders.rejected]: (state, action) => {
      state.status = false
      state.isLoadingOrder = false
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = OrderSlice.actions;

export default OrderSlice.reducer;
