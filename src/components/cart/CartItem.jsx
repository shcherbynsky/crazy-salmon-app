import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BiX } from "react-icons/bi";
import { deleteItemFromLocalCart, removeFromCart } from '../../redux/slices/cartSlice';

import Counter from '../counter/Counter';

function CartItem({
    productId,
    title,
    imageUrl,
    price,
    productQty,
    size
}) {
    // const itemInfo = {productId, title, imageUrl, price, productQty}
    // console.log('itemInfo = ', itemInfo);
    const dispatch = useDispatch()

    const { token } = useSelector(state => state.user)


    // const onMinusClick = () => {
    //         if (token) {
    //             dispatch(minusFromCart(productId))

    //         } else {
    //             dispatch(minusItemFromLocalCart({productId}))
    //         }
    // }
    // const onPlusClick = () => {
    //     if (token) {
    //         dispatch(addItemToCart(productId))
    //     } else {
    //         dispatch(addItemToLocalCart({productId}))
    //     }
    // }

    const onDeleteFromCartClick = () => {
        if (token) {
            dispatch(removeFromCart(productId))
        } else {
            dispatch(deleteItemFromLocalCart({ productId }))
        }
    }

    return (
        <div className="cart__item item-cart">
            {/* <tr> */}
                <div className="item-cart__img">
                    <img src={imageUrl} alt="" />
                </div>
                <div className="item-cart__info">
                    <h3 className="item-cart__item item-cart__title">{title}</h3>
                    <div className="item-cart__item item-cart__price">{price} грн. <span>Ціна за страву</span></div>
                    <div className="item-cart__item item-cart__counter">
                        <Counter
                            size={size}
                            token={token}
                            productId={productId}
                        />
                        <span>Кількість</span>
                    </div>
                    <div className="item-cart__item item-cart__total-sum">{price * productQty} грн <span>Всього</span></div>
                </div>
                <div onClick={onDeleteFromCartClick} className="item-cart__delete-icon"><BiX /></div>
            {/* </tr> */}

        </div>
        // <tbody className="cart__item item-cart">
        //     {/* <tr> */}
        //         <td className="item-cart__img">
        //             <img src={imageUrl} alt="" />
        //         </td>
        //         <td className="item-cart__title">{title}</td>
        //         <td className="item-cart__price">{price} <span>грн</span></td>
        //         <td className="item-cart__counter">
        //             <Counter
        //                 size={size}
        //                 token={token}
        //                 productId={productId}
        //             />
        //         </td>
        //         <td className="item-cart__total-sum">{price * productQty} <span>грн</span></td>
        //         <td onClick={onDeleteFromCartClick} className="item-cart__delete-icon"><BiX /></td>
        //     {/* </tr> */}

        // </tbody>
    )
    // return (
    //     <div className="cart__item item-cart">
    //         <div className="item-cart__body">
    //             <div className="item-cart__img">
    //                 <img src={imageUrl} alt="" />
    //             </div>
    //             <div className="item-cart__info">
    //                 <h3 className="item-cart__title">{title}</h3>
    //                 <div className="item-cart__price">{price} <span>грн</span></div>
    //                 <Counter
    //                 size={size} 
    //                 token={token}
    //                 productId = {productId}
    //                 />

    //                 <div className="item-cart__total-sum">{price * productQty} <span>грн</span></div>
    //             </div>
    //             <div onClick={onDeleteFromCartClick} className="item-cart__delete-icon"><BiX /></div>
    //         </div>

    //     </div>
    // )
}

export default CartItem