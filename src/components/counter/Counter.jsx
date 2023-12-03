import React from 'react'
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, addItemToLocalCart, minusFromCart, minusItemFromLocalCart, removeFromCart } from '../../redux/slices/cartSlice';



function Counter({ productId }) {
    const {cartItems} = useSelector(state => state.cart)
    const {token} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const productQty = cartItems.find((item) => parseInt(item.productId) === parseInt(productId)).productQty

    
    const onMinusClick = () => {
            if (token) {
                dispatch(minusFromCart(productId))

            } else {
                dispatch(minusItemFromLocalCart({productId}))
            }
    }
    const onPlusClick = () => {
        if (token) {
            
            dispatch(addItemToCart(productId))
        } else {
            dispatch(addItemToLocalCart({productId}))
        }
    }

   



    return (
        <div className='counter'>
            <div className="counter__body">
                {/* <div onClick={onMinusClick} className="counter__button counter__button-minus"><BiMinus size={size} /></div> */}
                <div onClick={onMinusClick} className="counter__button counter__button-minus">-</div>
                {/* <div className="counter__value" style={{ fontSize: size }}>{productQty}</div> */}
                <div className="counter__value">{productQty}</div>
                <div onClick={onPlusClick} className="counter__button counter__button-plus">+</div>
                {/* <div onClick={onPlusClick} className="counter__button counter__button-plus"><BiPlus size={size} /></div> */}
            </div>
        </div>
    )
}

export default Counter