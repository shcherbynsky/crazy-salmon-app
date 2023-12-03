import React from 'react'
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import EmptyPage from '../emptyPage/EmptyPage'
import { deleteAddress } from '../../redux/slices/userSlice';
import Loader from '../loader/Loader';

function MyAddress() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector(state => state.user)


  const onChangeAddressClick = (item) => {
    navigate('add-address', {
      state: {
        addressId: item.id,
        streetValue: item.street,
        houseValue: item.house,
        flatValue: item.flat,
      }
    })
  }

  const onDeleteAddressClick = (item) => {
    dispatch(deleteAddress(item.id))
  }

  const addressEl = user?.address?.map((item) => {
    return (
      <div key={item.id} className="myaddress__item item-myaddress">
        <div className="item-myaddress__body">
          <div className="item-myaddress__street"><span>Вулиця:</span>{item.street}</div>
          <div className="item-myaddress__house"><span>Будинок:</span>{item.house}</div>
          <div className="item-myaddress__flat"><span>Квартира:</span>{item.flat}</div>
          <div className="item-myaddress__city"><span>Місто:</span>Київ</div>
        </div>
        <div className="item-myaddress__actions">
          <div onClick={() => onDeleteAddressClick(item)} className="item-myaddress__delete"><AiOutlineClose /> </div>
          <div onClick={() => onChangeAddressClick(item)} className="item-myaddress__edit"><BsPencilSquare /> </div>
        </div>
      </div>
    )
  })

  if (!user) {
    return
  }
  if (isLoading) {
    return <Loader />
  }



  return (
    <div className='myaddress'>
      <div className="myaddress__body">
        {!addressEl?.length ?
          <EmptyPage text={'Ви не додали жодну адресу'} />
          :
          <div className="myaddress__items">
            {addressEl}
          </div>
        }
      </div>
      <NavLink to={'add-address'} className="myaddress__add-btn btn__long">Додати адресу</NavLink>
    </div>
  )
}

export default MyAddress