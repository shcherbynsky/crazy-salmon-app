import React from 'react'
import Counter from '../counter/Counter';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { addItemToCart, addItemToLocalCart, minusFromCart, removeFromCart } from '../../redux/slices/cartSlice';
import { addFavouriteItem, removeFromfavouriteItem } from '../../redux/slices/wishlistSlice';
import { isAuthed } from '../../redux/slices/userSlice';

function ProductItem({
    productId,
    title,
    imageUrl,
    description,
    price,
    bestseller }
) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { wishlistItems } = useSelector(state => state.wishlist)
    const { cartItems } = useSelector(state => state.cart)
    const isAuth = useSelector(isAuthed)
    const inFavourites = wishlistItems.findIndex((item) => item.id === productId)

    const findItem = cartItems.find((item) => item.productId === productId)

    const onAddToCartClick = () => {
        if (isAuth) {
            dispatch(addItemToCart(productId))
        } else {
            dispatch(addItemToLocalCart({ productId, price, title, imageUrl }))
        }
    }

    const onAddTofavoritesClick = () => {
        if (isAuth) {
            if (inFavourites >= 0) {
                dispatch(removeFromfavouriteItem(productId))
            } else {
                dispatch(addFavouriteItem(productId))
            }
        } else {
            navigate('/login')
        }
    }




    return (
        <div className='product'>
            <div className="product__body">
                <div onClick={()=> navigate(`/product/${productId}`)} className="product__img">
                    <img src={imageUrl} alt="" />
                </div>
                <h2 onClick={()=> navigate(`/product/${productId}`)} className="product__title">{title}</h2>
                <div className="product__content">
                    <p className="product__description">
                        {description}
                    </p>
                    <div className="product__bottom-block">
                        <span className="product__price">{price} <span>грн</span></span>
                        {
                            !findItem ?
                                <button onClick={() => onAddToCartClick()} className="product__btn btn__card">Хочу</button>
                                :
                                <Counter
                                    size={20}
                                    value={findItem.productQty}
                                    productId={productId}
                                />
                        }
                    </div>
                </div>
            </div>
            {bestseller && <div className="product__marker-bestseller">топ продажів</div>}
            <div
                className="product__marker-addfaforite"
                onClick={onAddTofavoritesClick}>
                {inFavourites >= 0 ? <BiSolidHeart size={35} color='white' /> : <BiHeart size={35} color='white' />}
            </div>
        </div>
    )
}

export default ProductItem