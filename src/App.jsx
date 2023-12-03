

import './App.scss'
import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import Home from './components/Home/Home';
import HomeLayout from './layout';
import ProductContent from './components/productContent/ProductContent';
import Auth from './components/auth/Auth';
import WishList from './components/profile/WishList';
import OrderHistory from './components/profile/OrderHistory';
import MyAddress from './components/profile/MyAddress';
import EditAccount from './components/profile/EditAccount';
import { getfavouriteItems } from './redux/slices/wishlistSlice';
import Cart from './components/cart/Cart';
import { getCartItems } from './redux/slices/cartSlice';
import AddAddress from './components/profile/AddAddress';
import AddressSection from './components/profile/AddressSection';
import ProfileLayout from './components/profile/ProfileLayout';
import CheckOut from './components/cart/CheckOut';
import { getMe } from './redux/slices/userSlice'
import ProductCard from './components/productCard/ProductCard';



const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/menu',
        element: <ProductContent />,
      },
      {
        path: '/product/:id',
        element: <ProductCard />,
        
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/login',
        element: <Auth />,
        
      },
      {
        path: '/registration',
        element: <Auth />,
        
      },
      {
        path: '/checkout',
        element: <CheckOut />,
        
      },
      {
        path: '/profile',
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <WishList />,
          },
          {
            path: 'wish-list',
            element: <WishList />,
          },
          {
            path: 'order-history',
            element: <OrderHistory />,
          },
          {
            path: 'address-book',
            element: <AddressSection />,
            children: [
              {
                index: true,
                element: <MyAddress />,
              },
              {
                path: 'add-address',
                element: <AddAddress />,
              },
            ],
          },
          {
            path: 'edit-account',
            element: <EditAccount />,
          },
          
        ],
      },
      
      {
        path: '*',
        element: <Navigate to='/'/>,
      }
    ],

  },
])

function App() {

  const dispatch = useDispatch()
  

  const { user, token } = useSelector(state => state.user)


  React.useEffect(()=> {
    dispatch(getMe()) 
    
  }, [])

  React.useEffect(() => {
    if (token) {
      
      dispatch(getCartItems())
    }
  }, [token])


  React.useEffect(() => {
    if (token) {
      dispatch(getfavouriteItems())
    }
  }, [token])

  return (
    <div className="wrapper">
      {/* <Header />
      <Menu menuItems={categoryItems} /> */}
      {/* <div className="main"> */}
      <RouterProvider router={router}>

      </RouterProvider>

      {/* /* </div> */}
      {/* <Footer menuItems={categoryItems}/> */}
    </div>


  )
}

export default App
