import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
// import {  } from "react-router";
import {setCategory, setSearchValue, setSearchValueLocal} from '../../redux/slices/productSlice'
import Sort from '../sort/Sort'

function Menu({ menuItems }) {

  const dispatch = useDispatch()
  const location = useLocation()
  const [isMenuOpened, setIsMenuOpened] = React.useState(false)
  const { category } = useSelector(state => state.product)


  const isMenu = location.pathname.includes('menu');


  const onMenuClick = (index) => {
    setIsMenuOpened(false)
    const body = document.getElementsByTagName("body")[0]
    body.classList.remove('_lock')
    dispatch(setCategory(index + 1))
    dispatch(setSearchValue(''))
    dispatch(setSearchValueLocal(''))

  }

  const onMenuIconClick = () => {
    setIsMenuOpened(!isMenuOpened)
    const body = document.getElementsByTagName("body")[0]
    body.classList.toggle('_lock')
  }


  const menuElements = menuItems.map((item, index) => {
    return (
      <li key={item.id} className="header-menu__item">
        <NavLink to={'/menu'}
          onClick={() => onMenuClick(index)}
          className={"header-menu__link" + (index === category - 1 ? " _active" : "")}>
          {item.title}
        </NavLink>
      </li>
    )
  })



  return (
    <nav className='header-menu'>
      <div className="header-menu__container">
        {isMenu && <Sort />}
        <div onClick={onMenuIconClick} className={"header-menu__icon" + (isMenuOpened ? ' _active' : '')}><span></span></div>
        <ul className={"header-menu__list" + (isMenuOpened ? " _active" : "")}>
          {menuElements}
        </ul>
      </div>
    </nav>
  )
}

export default Menu