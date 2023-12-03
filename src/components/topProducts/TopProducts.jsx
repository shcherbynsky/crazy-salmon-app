import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopProduct } from '../../redux/slices/productSlice'
import ProductItem from '../ProductItem/ProductItem'


function TopProducts() {
    const dispatch = useDispatch()

    const { productItems } = useSelector(state => state.product)

    React.useEffect(() => {
        dispatch(fetchTopProduct())
    }, [])


    const productElements = productItems.length ? productItems?.map((product) => {
        return (
            <ProductItem
                key={product.id}
                productId={product.id}
                title={product.title}
                imageUrl={product.imageUrl}
                description={product.descr}
                fats={product.fats}
                proteine={product.proteine}
                carbohydrates={product.carbohydrates}
                weight={product.weight}
                price={product.price}
                bestseller={product.bestseller}
            />
        )
    }) : []



    return (
        <div className='top'>
            <div className="top__container">
                <div className="top__title title">Обирайте найкращі страви</div>
                <div className="top__body">
                    {productElements}
                </div>
            </div>
        </div>
    )
}

export default TopProducts