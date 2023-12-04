import React from 'react'
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { addItemToCart, addItemToLocalCart } from '../../redux/slices/cartSlice'
import { addFavouriteItem, removeFromfavouriteItem } from '../../redux/slices/wishlistSlice';
import { fetchOneProduct } from '../../redux/slices/productSlice'
import Counter from '../counter/Counter'
import Loader from '../loader/Loader'

function ProductCard() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productId = useParams().id
    const { productItems } = useSelector(state => state.product)
    const { token } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    const { wishlistItems } = useSelector(state => state.wishlist)

    const inFavourites = wishlistItems.find((item) => parseInt(item.productId) === parseInt(productId))
    const findItem = cartItems.find((item) => parseInt(item.productId) === parseInt(productId))

    React.useEffect(() => {
        dispatch(fetchOneProduct(productId))
    }, [])


    const onAddToCartClick = () => {
        if (token) {
            dispatch(addItemToCart(productId))
        } else {
            const productId = productItems.id
            const price = productItems.price
            const title = productItems.title
            const imageUrl = productItems.imageUrl
            dispatch(addItemToLocalCart({ productId, price, title, imageUrl }))
        }
    }

    const onAddTofavoritesClick = () => {
        if (token) {
            if (inFavourites) {
                console.log('inFavourites');
                dispatch(removeFromfavouriteItem(productId))
            } else {
                console.log('Not in inFavourites');
                dispatch(addFavouriteItem(productId))
            }
        } else {
            navigate('/login')
        }
    }

    if (!productItems?.title) {
        return <Loader />
    }

    return (
        <div className='productcard'>
            <div className="productcard__container">
                <div className="productcard__body">
                    <div className="productcard__img">
                        <img src={productItems.imageUrl} alt="" />
                        {productItems.bestseller && <div className="product__marker-bestseller">топ продажів</div>}
                        <div
                            className="product__marker-addfaforite"
                            onClick={onAddTofavoritesClick}>
                            {inFavourites ? <BiSolidHeart size={35} color='white' /> : <BiHeart size={35} color='white' />}
                        </div>
                    </div>
                    <div className="productcard__content">
                        <h3 className="productcard__title">{productItems.title}</h3>
                        <p className="productcard__descr">
                            {productItems.descr}
                        </p>
                        <div className="productcard__compound compound-productcard">
                            <div className="compound-productcard__item">
                                <div className="compound-productcard__title">Калорійність:</div>
                                <div className="compound-productcard__value">{productItems.calorie} ккал</div>
                            </div>
                            <div className="compound-productcard__item">
                                <div className="compound-productcard__title">Білки:</div>
                                <div className="compound-productcard__value">{productItems.proteine} г</div>
                            </div>
                            <div className="compound-productcard__item">
                                <div className="compound-productcard__title">Жири:</div>
                                <div className="compound-productcard__value">{productItems.fats} г</div>
                            </div>
                            <div className="compound-productcard__item">
                                <div className="compound-productcard__title">Вуглеводи:</div>
                                <div className="compound-productcard__value">{productItems.carbohydrates} г</div>
                            </div>
                        </div>
                        <div className="productcard__bottom-block">
                            <span className="productcard__price">{productItems.price} <span>грн</span></span>
                            {
                                !findItem ?
                                    <button onClick={() => onAddToCartClick()} className="productcard__btn btn__card">Хочу</button>
                                    :
                                    <Counter
                                        productId={productItems.id}
                                    />
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductCard