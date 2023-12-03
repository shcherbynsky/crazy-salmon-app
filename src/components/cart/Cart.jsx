import React from 'react'
import { BsPencilSquare } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { CiDeliveryTruck } from "react-icons/ci";
import { RxTriangleDown } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { deleteCart } from '../../redux/slices/cartSlice';
import { changeCheckedAddress } from '../../redux/slices/userSlice';
import { addOrder } from '../../redux/slices/orderSlice';
import Loader from '../loader/Loader'
import EmptyPage from '../emptyPage/EmptyPage'
import AddAddress from '../profile/AddAddress';
import CartItem from './CartItem'

function Cart() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { cartItems, deliveryCosts, minOrderSum, isLoading } = useSelector(state => state.cart)
  const { user, token, checkedAddress } = useSelector(state => state.user)
  const { newOrder, isLoadingOrder, status } = useSelector(state => state.order)
  const [isThanksModalShown, setIsThanksModalShown] = React.useState(false)
  const [isAddUserInfoModalShown, setIsAddUserInfoModalShown] = React.useState(false)

  const addressArray = user?.address?.map((item, index) => {
    return (
      <div key={index} onClick={() => onAddressClick(index)} className="drop-address__item">
        {'м. Київ, ' + item.street + ', будинок ' + item.house + (item.flat ? ', кв. ' + item.flat : '')}
      </div>
    )
  }) || []
  const [isDropAddressShown, setIsDropAddressShown] = React.useState(false)
  const [isAddAddressActive, setIsAddAddressActive] = React.useState(false)
  const [addressValue, setAddressvalue] = React.useState(user?.address?.length ? ('м. Київ, ' + user.address[checkedAddress].street + ', будинок ' + user.address[checkedAddress].house + (user.address[checkedAddress].flat ? ', кв. ' + user.address[checkedAddress].flat : '')) : '')
  React.useEffect(() => {
    setAddressvalue(user?.address?.length ? ('м. Київ, ' + user.address[checkedAddress].street + ', будинок ' + user.address[checkedAddress].house + (user.address[checkedAddress].flat ? ', кв. ' + user.address[checkedAddress].flat : '')) : '')
  }, [user])

  const addressDropRef = React.useRef()
  // const modalLayoutRef = React.useRef()
  // const modalCloseButtonRef = React.useRef()


  React.useEffect(() => {
    const handleClickOutsideAddress = (e) => {
      if (!e.composedPath().includes(addressDropRef.current)) {
        setIsDropAddressShown(false)
      }
    }
    document.body.addEventListener('click', handleClickOutsideAddress)

    return () => {
      document.body.removeEventListener('click', handleClickOutsideAddress)
    }
  }, [])




  const onAddAddressButtonClick = () => {
    if (token) {
      navigate('/profile/address-book/add-address')
    } else {
      setIsAddAddressActive(true)
    }
  }

  const onAddressClick = (index) => {
    setAddressvalue('м. Київ, ' + user.address[index].street + ', будинок ' + user.address[index].house + (user.address[index].flat ? ', кв. ' + user.address[index].flat : ''))
    setIsDropAddressShown(false)
  }

  const cartElements = cartItems?.map((item) => <CartItem key={item.productId} {...item} size={25} />)

  const sum = cartItems?.reduce((total, item) => { return total + (item.price * item.productQty) }, 0)

  const onOrderClick = () => {

    if (token) {
      const userId = user.id
      const productData = cartItems.map((item) => {
        return { productQty: item.productQty, productId: item.id, productPrice: item.price }
      })
      const address = addressValue.props.children


      dispatch(addOrder({ userId, productData, address, sum }))

      if (status) {
        dispatch(deleteCart())
      }
    } else {
      setIsAddUserInfoModalShown(true)
    }



    setIsThanksModalShown(true)
  }


  if (isLoading || isLoadingOrder) {
    return <Loader />
  }

  if (!cartItems.length) {
    return <EmptyPage text={'Нажаль, Ви не додали жодного товару('} />
  }


  return (
    <>
      {!isAddAddressActive ?
        <div className='cart'>
          <div className="cart__container">

            <div className="cart__title title">
              <div className="cart__back-btn" onClick={() => navigate(-1)}><BiArrowBack size={25} /></div>
              Кошик
            </div>

            <div className="cart__body">
              <div className="cart__items">
                {cartElements}
              </div>

              <div className="cart__info info-cart">
                <div className="info-cart__body">
                  <div className="info-cart__item">
                    <div className="info-cart__title">Всього:</div>
                    <div className="info-cart__value">{sum} <span>грн</span></div>
                  </div>
                  <div className="info-cart__item">
                    <div className="info-cart__title">Доставка:</div>
                    {
                      sum > minOrderSum ?
                        <div className="info-cart__value info-cart__value-free">Безкоштовно</div>
                        :
                        <div className="info-cart__value info-cart__value-charge">
                          {deliveryCosts} грн.
                          <span>Безкоштовно від  {minOrderSum}  грн.</span>
                        </div>
                    }
                  </div>
                  <div className="info-cart__item">
                    <div className="info-cart__title">Сума до сплати:</div>
                    <div className="info-cart__value orange">{sum > minOrderSum ? sum : sum + deliveryCosts} <span>грн</span></div>
                  </div>
                </div>
              </div>

              <div className="cart__address-block address-block">
                <div className="address-block__label">
                  <div className="address-block__icon"><CiDeliveryTruck /></div>
                  <div className="address-block__title">Адреса доставки:</div>
                </div>
                {addressValue ?
                  <div ref={addressDropRef} className="address-block__value-body">
                    <div onClick={() => setIsDropAddressShown(!isDropAddressShown)} className="address-block__value-content">
                      <div className="address-block__value">{addressValue}</div>
                      <div className="address-block__drop-icon"><RxTriangleDown color='#FF6600' /></div>
                    </div>
                    <div className={'address-block__drop drop-address' + (isDropAddressShown ? ' _active' : '')}>
                      <div className="drop-address__body">
                        <div className="drop-address__items">
                          {addressArray?.length && addressArray}
                        </div>
                      </div>
                      <NavLink to={'/profile/address-book/add-address'} className="drop-address__add-button"><BsPencilSquare />Інша адреса</NavLink>
                    </div>
                  </div>
                  :
                  <div onClick={onAddAddressButtonClick} className="address-block__add-button">Додати адресу</div>
                }
              </div>


              <button onClick={() => navigate('/checkout')} className={"cart__order-btn btn__long" + (!addressValue ? " _blocked" : "")}>оформити замовлення</button>
            </div>
            {/* <div className={"cart__modal modal-cart" + (isThanksModalShown ? " _active" : "")}>
          <div ref={modalLayoutRef} className="modal-cart__layout">
            <div className="modal-cart__body">
              <div className="modal-cart__content">
                <p className="modal-cart__title">{status ? 'Дякуємо!': 'Помилка('}</p>
                <p className="modal-cart__message">{status ? ('Замовлення №' + newOrder + ' створено') : 'Не вдалось створити замовлення, спробуйте ще раз'}</p>
                <p className="modal-cart__message">{ status && 'Наш менеджер зателефонує Вам найближчим часом для уточнення деталей'}</p>
              </div>
              <div ref={modalCloseButtonRef} className="modal-cart__button btn__long">Закрити</div>
            </div>
          </div>
        </div> */}
          </div>
        </div>
        : <AddAddress setIsAddAddressActive={setIsAddAddressActive} />}

      <div className="adduserinfo">
        <div className="adduserinfo__body">

        </div>
      </div>

    </>
  )
}

export default Cart