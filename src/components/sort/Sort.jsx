import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BiChevronDown } from "react-icons/bi";
import {  setSortBy, setSortOrder, setSortTitle, sortList } from '../../redux/slices/productSlice';

function Sort() {

    const dispatch = useDispatch()
    
    const sortRef = React.useRef()


    const { sortTitle, category } = useSelector(state => state.product)
    const [isSortShown, setIsSortShown] = React.useState(false)

    

    const onSortValueClick = (el) => {
        dispatch(setSortBy(el.sortBy))
        dispatch(setSortOrder(el.sortOrder))
        dispatch(setSortTitle(el.sortTitle))
        
        setIsSortShown(false)
    }

    const sortValueElements = sortList.map((el, index) => {
        return (
            <span
                key={index}
                onClick={() => onSortValueClick(el)}
                className="sort__item">
                {el.sortTitle}
            </span>
        )
    })

    React.useEffect(() => {
        const handleClickOutsideSort = (e) => {
            if (!e.composedPath().includes(sortRef.current)) {
                setIsSortShown(false)
            }
        }
        document.body.addEventListener('click', handleClickOutsideSort)

        return () => {
            document.body.removeEventListener('click', handleClickOutsideSort)
        }
    }, [])

    const onSortOpenClick = () => {
        setIsSortShown(!isSortShown)
    }

    if (category) {
        return (
            <div ref={sortRef} className='sort'>
                <div onClick={onSortOpenClick} className="sort__body">
                    <span className="sort__value">{sortTitle}</span>
                    <BiChevronDown className={'sort__icon' + (isSortShown ? ' _active' : '')} size={20} />
                </div>
                <div className={'sort__drop' + (isSortShown ? ' _active' : '')}>
                    {sortValueElements}
                </div>
    
            </div>
    
    
        )
    }
    
}

export default Sort