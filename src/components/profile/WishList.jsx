import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getfavouriteItems } from '../../redux/slices/wishlistSlice'
import EmptyPage from '../emptyPage/EmptyPage'
import ProductItem from '../ProductItem/ProductItem'

function WishList() {

  const dispatch = useDispatch()

  const { isLoading, wishlistItems } = useSelector(state => state.wishlist)


  const wishlistElements = wishlistItems?.map((product) => {
    return <ProductItem
      key={product.id}
      productId={product.id}
      title={product.title}
      imageUrl={product.imageUrl}
      description={product.descr}
      price={product.price}
      bestseller={product.bestseller}
    />
  })

  if (!wishlistElements.length) {
    return <EmptyPage text={'У Вас поки нема улюбленних товарів (('}/>
  }

  return (
    <div className='wishlist'>
      <div className="wishlist__body">
        {wishlistElements}
      </div>
    </div>
  )
}

export default WishList
