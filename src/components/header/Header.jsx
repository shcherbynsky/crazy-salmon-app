import React from 'react';
import { BiCart, BiSearch, BiPhone, BiUser } from "react-icons/bi"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setIsCartShown } from '../../redux/slices/cartSlice';
import Logo from '../logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../search/Search';
import { isAuthed, setIsAuthShown } from '../../redux/slices/userSlice';
import { reset } from '../../redux/slices/productSlice';
// import { checkIsAuth, setIsAuthShown } from '../../redux/slices/userSlice';



const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(isAuthed)

    const { cartItems } = useSelector(state => state.cart)

    const [isPhoneDropActive, setIsPhoneDropActive] = React.useState(false)


    const sum = cartItems && cartItems.reduce((total, item) => {
        return total + item.price * item.productQty
    }, 0)
    const quantity = cartItems && cartItems.reduce((total, item) => {
        return total + item.productQty
    }, 0)

    const onCartClick = () => {

        if (document.documentElement.clientWidth < 768) {
            navigate('cart')
        } else {
            dispatch(setIsCartShown(true))
        }
    }
    const onAccountClick = () => {
        if (isAuth) {
            navigate('/profile/wish-list')
            dispatch(reset())
        } else {
            navigate('/login')
        } 
    }

    const onPhoneButtonClick = () => {
        setIsPhoneDropActive(!isPhoneDropActive)
    }


    return (
        <>
            <div className="header">
                <div className="header__container">
                    <Logo color={'#000'} />
                    <div className="header__body">

                        <Search />
                        <div className="header__info-wrapper">
                            <div onClick={onPhoneButtonClick} className="header__phone-button"><BiPhone /></div>
                            <div className="header__info header-info">
                                <a href="tel:+380508030004" className="header-info__tel">+38 050 803 00 04</a>
                                <div className="header-info__schedule">Замовлення приймаються <br /> з 10:00 до 21:45 без вихідних</div>
                            </div>
                            <div className={"header-phone__drop header-phone-drop" + (isPhoneDropActive ? " _active" : "")}>
                                <div className="header-phone-drop__items">
                                    <div className="header-phone-drop__item">
                                        <a href="tel:+380508030004" className="header-phone-drop__link">+38 050 803 00 04</a>
                                    </div>
                                    <div className="header-phone-drop__item">
                                        <a href="tel:+380638030004" className="header-phone-drop__link">+38 063 803 00 04</a>
                                    </div>
                                    <div className="header-phone-drop__item">
                                        <a href="tel:+38978030004" className="header-phone-drop__link">+38 097 803 00 04</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div onClick={onAccountClick} className={"header__account-icon" + (isAuth ? " _loggedIn" : "")}>
                            <BiUser />
                        </div>
                        <div onClick={onCartClick} className="header__cart-btn cart-btn">
                            <span className="cart-btn__sum">{sum ? sum : 0}<span> грн</span></span>
                            <div className="cart-btn__quantity">
                                <div className="cart-btn__icon">
                                    <BiCart />
                                </div>
                                <span>{quantity ? quantity : 0}</span>
                            </div>
                        </div>
                    </div>
                    {/* <div className="header__menu menu">
            {location.pathname !== '/cart' && <ul className="menu__items">
                {categoryElements}
            </ul>}
            </div> */}
                </div>
            </div>
        </>
    )
}

export default Header;