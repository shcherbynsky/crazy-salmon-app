import React from 'react'
import qs from 'qs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchProduct, setCategory, setFilter, setSortBy, setSortOrder, setSortTitle, sortList } from '../../redux/slices/productSlice';
import Loader from '../loader/Loader';
import ProductItem from '../ProductItem/ProductItem';
import EmptyPage from '../emptyPage/EmptyPage';

function ProductContent() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearchParams = React.useRef(false)
    const { productItems, category, sortBy, sortOrder, isLoading, searchValue } = useSelector(state => state.product)

    const [searchParams, setSearchParams] = useSearchParams()


    React.useEffect(() => {
        if (window.location.search) {

            const categoryString = searchParams.get('category')
            const sortByString = searchParams.get('sortBy')
            const sortOrderString = searchParams.get('sortOrder')

            const sortObj = sortList.find(obj => obj.sortBy === sortByString)

            console.log('sortObj = ', sortObj);

            dispatch(setSortBy(sortByString))
            dispatch(setSortOrder(sortOrderString))
            dispatch(setSortTitle(sortObj.sortTitle))
            dispatch(setCategory(categoryString))

            isSearchParams.current = true
        }

    }, [])



    React.useEffect(() => {

        if (!isSearchParams.current) {
            dispatch(fetchProduct({
                category: category ? category : 1,
                sortBy: sortBy ? sortBy : '',
                sortOrder: sortOrder ? sortOrder : '',
                searchValue: searchValue,
            }))
        }

        isSearchParams.current = false
        
    }, [category, sortBy, sortOrder, searchValue])



    React.useEffect(() => {
        if (category) {
            setSearchParams({ category, sortBy, sortOrder })
        } else {
            setSearchParams({ sortBy, sortOrder })
        }
    }, [category, sortBy, sortOrder])
















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

    if (isLoading) {
        return <Loader />
    }
    if (!productElements?.length) {
        return <EmptyPage text={'Нажаль, жодного товару не знайдено... 🙁'} />
    }

    return (
        <div className='product-content'>
            <div className="product-content__container">
                {productElements}
            </div>
        </div>
    )
}

export default ProductContent