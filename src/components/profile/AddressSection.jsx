import React from 'react'
import { BsPencilSquare } from "react-icons/bs";
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import EmptyPage from '../emptyPage/EmptyPage'

function AddressSection() {

  const { user } = useSelector(state => state.user)

  const addressEl = user?.address?.map((item) => {
    return (
      <div className="myaddress__item item-myaddress">
        <div className="item-myaddress__street"><span>Вулиця:</span>{item.street}</div>
        <div className="item-myaddress__house"><span>Будинок:</span>{item.house}</div>
        <div className="item-myaddress__flat"><span>Квартира:</span>{item.flat}</div>
        <div className="item-myaddress__city"><span>Місто:</span>Київ</div>
        <div className="item-myaddress__edit"><BsPencilSquare /> </div>
      </div>
    )
  })

  if (!user) {
    return
  }

  return (
    // <div className='myaddress'>
    //   <div className="myaddress__body">
    //     {/* <EmptyPage text={'Ви не додали жодну адресу'} /> */}

    //     <div className="myaddress__items">
    //       {addressEl}
    //     </div>

        <Outlet />

    //   </div>
    //   <NavLink to={'add-address'} className="myaddress__add-btn btn__long">Додати адресу</NavLink>
    // </div>
  )
}

export default AddressSection