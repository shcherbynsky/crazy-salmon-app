import debounce from "lodash.debounce";
import React from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue, setSearchValueLocal } from "../../redux/slices/productSlice";


const Search = () => {
    const dispatch = useDispatch()
    // const inputRef = React.useRef()
    const searchRef = React.useRef()
    const searchButtonRef = React.useRef()

    const [isSearchActive, setIsSearchActive] = React.useState(false)
    const { searchValue, searchValueLocal } = useSelector(state => state.product)

    React.useEffect(() => {
        const handleClickOutsideAddress = (e) => {
            if (!e.composedPath().includes(searchRef.current) && !e.composedPath().includes(searchButtonRef.current)) {
                setIsSearchActive(false)
            }
        }
        document.body.addEventListener('click', handleClickOutsideAddress)

        return () => {
            document.body.removeEventListener('click', handleClickOutsideAddress)
        }
    }, [])

    const debounceFunc = React.useCallback(
        debounce((value) => {
            dispatch(setSearchValue(value))
        }, 2000), []
    )


    const onSearchChange = (e) => {
        dispatch(setSearchValueLocal(e.target.value))
        debounceFunc(e.target.value)

    }

    const onClearClick = () => {
        dispatch(setSearchValueLocal(''))
        dispatch(setSearchValue(''))
    }

    const onSearchButtonClick = ()=> {
        setIsSearchActive(!isSearchActive)
    }



    return (
        <>

            <div ref={searchButtonRef} onClick={onSearchButtonClick} className="search__button"><BiSearch /></div>
            <div ref={searchRef} className={"search" + (isSearchActive ? " _active" : "")}>
                <div className="search__form">
                    <div className="search__icon">
                        <BiSearch />
                    </div>
                    <input  placeholder="пошук..." onChange={onSearchChange} value={searchValueLocal} type="text" className="search__input" />
                    <div onClick={onClearClick} className="search__icon search__icon-close">
                        {searchValueLocal && <BiX />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search;