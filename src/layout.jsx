import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Auth from './components/auth/Auth'
import CartModal from './components/cart/CartModal'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Menu from './components/headerMenu/HeaderMenu'
import { fetchCategory } from './redux/slices/categorySlice'
import { getMe } from './redux/slices/userSlice'


const HomeLayout = () => {

    const dispatch = useDispatch()

    
    const {categoryItems} = useSelector(state => state.category)
    const {isCartShown} = useSelector(state => state.cart)
    const {isAuthShown} = useSelector(state => state.user)

    // React.useEffect(()=> {
    //   dispatch(getMe()) 
      
    // }, [])

    React.useEffect(()=> {
      dispatch(fetchCategory()) 
    }, [])
    return (
        <>
        <Header />
        <Menu menuItems={categoryItems}/>
        <main className="main">
                <Outlet />
        </main>
        <Footer menuItems={categoryItems}/>
        {isCartShown && <CartModal />}
        {/* {isAuthShown && <Auth />} */}
        </>
    )
   
}

export default HomeLayout