import React from 'react'
import Logo from '../logo/Logo'

function Footer({ menuItems }) {

  const menuElements = menuItems.map((item) => {
    return (
      <div key={item.id} className="footer__item">
        <a href="#!" className="footer__link">{item.title}</a>
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