import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setCategory, setSearchValue, setSearchValueLocal } from '../../redux/slices/productSlice'
import Logo from '../logo/Logo'

function Footer({ menuItems }) {

  const dispatch = useDispatch()
  const onMenuClick = (index) => {
    window.scroll(0, 0)
    dispatch(setCategory(index + 1))
    dispatch(setSearchValue(''))
    dispatch(setSearchValueLocal(''))

  }

 
  const menuElements = menuItems.map((item, index) => {
    return (
      <div key={item.id} className="footer__item">
        <NavLink to={'/menu'}
          onClick={() => onMenuClick(index)}
          className={"footer__link__link"}>
          {item.title}
        </NavLink>
      </div>

    )
  })

  

 


  return (
    <div className='footer'>
      <div className="footer__container">
        <div className="footer__body">
          <div className="footer__column">
            <Logo color={'#fff'} />
          </div>
          <div className="footer__column">
            {menuElements}
          </div>
          <div className="footer__column">
            <div className="footer__item">
              Контакти
            </div>
            <div className="footer__item">
              <a href="tel:+380508030004" className="footer__link">+38 (050) 803 00 04</a>
            </div>
            <div className="footer__item">
              <a href="tel:+380638030004" className="footer__link">+38 (063) 803 00 04</a>
            </div>
            <div className="footer__item">
              <a href="tel:+380678030004" className="footer__link">+38 (067) 803 00 04</a>
            </div>
            <div className="footer__item">
              <a href="mailto:info@crazysalmon.com" className="footer__link">info@crazysalmon.com</a>
            </div>
          </div>
        </div>
        <div className="footer__copy">© 2017-2023 СкаженийЛосось</div>
      </div>
    </div>
  )
}

export default Footer