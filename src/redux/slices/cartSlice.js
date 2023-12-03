import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/axios";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",

  async () => {

      const { data } = await instance.get(`/cart`);
      return data;
    }

);

//  ====================================================================

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",

  async (productId) => {

    

    const { data } = await instance.post(`/cart/add`, {productId});
    return data;
  }
);

// ===================================================

export const minusFromCart = createAsyncThunk(
  "cart/minusFromCart",

  async (productId ) => {
   

    
    
    const { data } = await instance.patch(`/cart/remove`, {productId});
    return data;
  }
);

// ===================================================

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",

  async (productId, { getState }) => {
    const userId = getState().user?.user.id;
    
    if (userId) {
      const { data } = await instance.delete(
        `/cart/remove?productId=${productId}&userId=${userId}`
      );
      return data;
    }
  }
);

// ===================================================

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",

  async (_, { getState }) => {
    const userId = getState().user?.user.id;
    if (userId) {
      const { data } = await instance.delete(`/cart/deletecart?userId=${userId}`);
      return data;
    }
  }
);

// ===================================================

export const syncCart = createAsyncThunk(
  "cart/syncCart",

  async (_, { getState }) => {
    const state = getState();
    const cartItems = state.cart.cartItems;
    const userId = state.user.user.id;
    
    if (cartItems.length) {
      let cartData = [];
      for (let i = 0; i < cartItems.length; i++) {
        cartData.push({
          productId: cartItems[i].productId,
          productQty: cartItems[i].productQty,
        });
      }
      const { data } = await instance.post(`/cart/sync`, cartData);
      return data;
    } else {
      // const { data } = await instance.post(`cart/sync`, { userId });
      // return data;
    }
  }
);

// =================================================================

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("/cart")) || [],
  isCartShown: false,
  deliveryCosts: 90,
  minOrderSum: 600,
  isLoading: false,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsCartShown: (state, action) => {
      state.isCartShown = action.payload;
    },

    addItemToLocalCart: (state, action) => {
      const findItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (findItem) {
        findItem.productQty++;
      } else {
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload, productQty: 1 },
        ];
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    minusItemFromLocalCart: (state, action) => {
      const findItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (findItem) {
        if (findItem.productQty > 1) {
          findItem.productQty--;
        } else {
          state.cartItems = state.cartItems.filter(item => parseInt(item.productId) !== parseInt(action.payload.productId)
          );
        }
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    deleteItemFromLocalCart: (state, action) => {
      const findItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (findItem) {
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== findItem.productId
        );
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
  },

  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.cartItems = action.payload;
      state.isLoading = false;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },

    // =====================================================
    [syncCart.pending]: (state) => {
      state.isLoading = true;
    },
    [syncCart.fulfilled]: (state, action) => {
      state.cartItems = action.payload || [];
      localStorage.removeItem("cart");
      state.isLoading = false;
    },
    [syncCart.rejected]: (state) => {
      state.isLoading = false;
    },

    // =====================================================

    [addItemToCart.pending]: (state) => {},
    [addItemToCart.fulfilled]: (state, action) => {
      const findItem = state.cartItems.find((item) => {
        return parseInt(item.productId) === parseInt(action.payload.productId);
      });
      if (findItem) {
        findItem.productQty = action.payload.productQty;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    [addItemToCart.rejected]: (state) => {},

    // =====================================================

    [minusFromCart.pending]: (state) => {},
    [minusFromCart.fulfilled]: (state, action) => {
      const findItem = state.cartItems.find((item) => {
        return parseInt(item.productId) === parseInt(action.payload.productId);
      });
      if (findItem) {
        findItem.productQty = action.payload.productQty;
      }
      if (action.payload?.result === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => parseInt(item.productId) !== parseInt(action.payload.productId)
        );
      }
    },
    [minusFromCart.rejected]: (state) => {},

    // =====================================================

    [removeFromCart.pending]: (state) => {},
    [removeFromCart.fulfilled]: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => parseInt(item.productId) !== parseInt(action.payload.productId)
      );
    },
    [removeFromCart.rejected]: (state) => {},

    // =====================================================

    [deleteCart.pending]: (state) => {},
    [deleteCart.fulfilled]: (state, action) => {
      state.cartItems = [];
    },
    [deleteCart.rejected]: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsCartShown,
  addToCart,
  deleteItemFromLocalCart,
  addItemToLocalCart,
  minusItemFromLocalCart,
} = CartSlice.actions;

export default CartSlice.reducer;
