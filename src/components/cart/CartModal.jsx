import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate  } from 'react-router-dom'
import { setIsCartShown } from '../../redux/slices/cartSlice';
import { reset } from '../../redux/slices/productSlice';
import CartItem from './CartItem';

function CartModal() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartLayoutRef = React.useRef(null)
    const cartCloseRef = React.useRef(null)
    const { isCartShown, cartItems, deliveryCosts, minOrderSum } = useSelector(state => state.cart)

    const sum = cartItems?.reduce((total, item) => { return total + (item.price * item.productQty) }, 0)

    
    React.useEffect(() => {
        const body = document.getElementsByTagName("body")[0]
        body.classList.add('_lock')
        const handleClickOutsideCart = (e) => {

            if (cartLayoutRef.current === e.target || e.composedPath().includes(cartCloseRef.current)) {
                dispatch(setIsCartShown(false))
                body.classList.remove('_lock')
            }

        }
        document.addEventListener('click', handleClickOutsideCart)

        return () => {
            document.removeEventListener('click', handleClickOutsideCart)
            body.classList.remove('_lock')
        }
    }, [])


    const cartElements = cartItems?.map((item) => <CartItem key={item.productId} {...item} size={20} />)

    const onOrderClick = () => {
        navigate('cart')
        dispatch(setIsCartShown(false))
        dispatch(reset())
    }


    return (


        <div className={'cart-modal' + (isCartShown ? ' _active' : '')}>
            <div ref={cartLayoutRef} className="cart-modal__layout">
                <div className="cart-modal__body animated">
                    <div ref={cartCloseRef} className="cart-modal__close-btn">
                        <div className="cart-modal__close-btn-icon">
                            <BiArrowBack />
                        </div>
                    </div>
                    {cartItems.length ?
                        <>
                            <div className="cart-modal__title title">Ваше замовлення</div>
                            <div className="cart-modal__items">
                                {cartElements}
                            </div>
                            <div className="cart-modal__info info-cart-modal">
                                <div className="info-cart-modal__item">
                                    <div className="info-cart-modal__title">Всього:</div>
                                    <div className="info-cart-modal__value">{sum} <span>грн</span></div>
                                </div>
                                <div className="info-cart-modal__item">
                                    <div className="info-cart-modal__title">Доставка:</div>
                                    {
                                        sum > minOrderSum ?
                                            <div className="info-cart-modal__value info-cart-modal__value-free">Безкоштовно</div>
                                            :
                                            <div className="info-cart-modal__value info-cart-modal__value-charge">
                                                {deliveryCosts} грн.
                                                <span>Безкоштовно від {minOrderSum} грн.</span>
                                            </div>
                                    }
                                </div>
                                <div className="info-cart-modal__item">
                                    <div className="info-cart-modal__title">Сума до сплати:</div>
                                    <div className="info-cart-modal__value orange">{sum + (sum > minOrderSum ? 0 : deliveryCosts)} <span>грн</span></div>
                                </div>
                            </div>
                            <button onClick={onOrderClick} className="cart-modal__order-btn btn__long">оформити замовлення</button>
                        </>
                        :

                        <div className="cart-modal__empty">Нажаль, Ви не додали жодного товару ☹</div>}
                </div>
            </div>
        </div>



    )
}

export default CartModal