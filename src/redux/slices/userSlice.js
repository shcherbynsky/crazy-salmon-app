import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",

  async ({ name, phone, password }) => {
    try {
      const { data } = await instance.post(`/auth/registration`, {
        name,
        phone,
        password,
      });

      return data;
    } catch (error) {
      console.log("error = ", error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",

  async ({ phone, password }) => {
   
      const { data } = await instance.post(`/auth/login`, { phone, password });
      return data;
  }
);

export const getMe = createAsyncThunk(
  "user/getMe",

  async () => {
    try {
      const { data } = await instance.get(`/auth/me`);

      return data;
    } catch (error) {
    }
  }
);

// ==========================================================

export const addAddress = createAsyncThunk(
  "cart/addAddress",

  async (userData, { getState }) => {
    const state = getState();

    const userId = state.user.user.id;

    const { data } = await instance.post(`/user/address`, { userData, userId });
    return data;
  }
);

// ======================================================
export const changeAddress = createAsyncThunk(
  "cart/changeAddress",

  async (userData, { getState }) => {
    const state = getState();

    const userId = state.user.user.id;
    const { data } = await instance.patch(`/user/address`, { userData, userId });
    return data;
  }
);

// ======================================================
// ======================================================
export const deleteAddress = createAsyncThunk(
  "cart/deleteAddress",

  async (addressId, { getState }) => {
    const state = getState();

    const userId = state.user.user.id;
    const { data } = await instance.delete(
      `/user/address?addressId=${addressId}&userId=${userId}`
    );

    return data;
  }
);

// ======================================================

export const changeUserData = createAsyncThunk(
  "cart/changeUserData",

  async (userData) => {
    const { data } = await instance.patch(`/user/data`, { userData });
    return data;
  }
);

// ======================================================

const initialState = {
  user: {},
  checkedAddress: 0,
  token: null,
  isLoading: false,
  status: null,
  message: null,
  isAuthShown: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthShown: (state, action) => {
      state.isAuthShown = action.payload;
    },
    logout: (state) => {
      state.user = [];
      state.token = null;
      window.localStorage.removeItem("token");
      state.status = null;
    },
    addLocalAddress: (state, action) => {
      
      // state.user = {address: ['м. Київ, ' + action.payload.street + ', будинок ' + action.payload.house + (action.payload.flat ? ', кв. ' + action.payload.flat : '')]} 
      state.user = {address: [action.payload]} 
      // state.user.checkedAddress = state.user.address.length - 1
      state.checkedAddress = 0


      window.localStorage.setItem("user", JSON.stringify(state.user));
    },
    changeCheckedAddress: (state, action) => {
      
      
      state.checkedAddress = action.payload


    },
  },
  extraReducers: {
    // registration
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;

      window.localStorage.setItem("token", data.token);

      state.isLoading = false;
    },
    [registerUser.rejected]: (state) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },

    // login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = true;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
      window.localStorage.setItem("token", action.payload.token);
      state.isLoading = false;
    },
    [loginUser.rejected]: (state, action) => {
      
      state.status = false;
      state.message = 'Невірний пароль або email';
      state.isLoading = false;
    },

    // getMe
    [getMe.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      if (action.payload?.token) {
        state.status = null;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        window.localStorage.setItem("token", action.payload?.token);
      } else {
        state.status = null;
        state.user = JSON.parse(localStorage.getItem('user')) || null;
        state.token = null;
        window.localStorage.removeItem("token");
      }

      state.isLoading = false;
    },
    [getMe.rejected]: (state) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },

    // ==========================================================

    [addAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [addAddress.fulfilled]: (state, action) => {
      state.user.address = state.user.address
        ? [...state.user.address, action.payload]
        : [action.payload];
        
      // state.user.checkedAddress = state.user.address.length - 1
      state.isLoading = false;
    },
    [addAddress.rejected]: (state) => {
      state.isLoading = false;
    },

    // ==========================================================

    [changeAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [changeAddress.fulfilled]: (state, action) => {
      state.user.address = state.user.address.filter(
        (item) => item.id !== action.payload.id
      );

      state.user.address = state.user.address
        ? [...state.user.address, action.payload]
        : [action.payload];
      state.isLoading = false;
    },
    [changeAddress.rejected]: (state) => {
      state.isLoading = false;
    },

    // ==========================================================

    [deleteAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAddress.fulfilled]: (state, action) => {
      state.user.address = state.user.address.filter(
        (item) => parseInt(item.id) !== parseInt(action.payload)
      );
      state.isLoading = false;
    },
    [deleteAddress.rejected]: (state) => {
      state.isLoading = false;
    },
    // ==========================================================

    [changeUserData.pending]: (state) => {
      state.status = false;
      state.isLoading = true;
    },
    [changeUserData.fulfilled]: (state, action) => {
      state.user = action.payload.data && action.payload.data;
      state.status = true;
      state.isLoading = false;
    },
    [changeUserData.rejected]: (state) => {
      state.status = false;
      state.isLoading = false;
    },
  },
});

export const isAuthed = (state) => Boolean(state.user.token);
// Action creators are generated for each case reducer function
export const { setIsAuthShown, logout, addLocalAddress, changeCheckedAddress } = UserSlice.actions;

export default UserSlice.reducer;
