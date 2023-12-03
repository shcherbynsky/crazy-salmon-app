import { configureStore } from '@reduxjs/toolkit' 
import ProductReducer from './slices/productSlice'
import CategoryReducer from './slices/categorySlice'
import CartReducer from './slices/cartSlice'
import UserReducer  from './slices/userSlice'
import WishlistReducer  from './slices/wishlistSlice'
import OrderReducer  from './slices/OrderSlice'

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    category: CategoryReducer,
    cart: CartReducer,
    user: UserReducer,
    wishlist: WishlistReducer,
    order: OrderReducer,
  },
})