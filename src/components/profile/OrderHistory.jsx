import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../redux/slices/orderSlice'
import { RxTriangleDown } from "react-icons/rx";

const monthItems = [
  'Січня',
  'Лютого',
  'Березня',
  'Квітня',
  'Травня',
  'Червня',
  'Липня',
  'Серпня',
  'Вересня',
  'Жовтня',
  'Листопада',
  'Грудня']

function OrderHistory() {

  const dispatch = useDispatch()

  const { orders } = useSelector(state => state.order)
  const [activeTab, setActiveTab] = React.useState()

  React.useEffect(() => {
    console.log('useeffect');
    dispatch(getOrders())
  }, [])

  const onDetailsButtonClick = (index) => {
    if (activeTab === index) {
      setActiveTab(null)
    } else {
      setActiveTab(index)
    }
  }

  const orderElements = orders?.map((order, index) => {

    const orderItems = order?.items?.map((item, index) => {
      return (
        <div key={index} className="order__item">
          <div className="order__img">
            <img src={item.imageUrl} alt="" />
          </div>
        </div>
      )
    })

    return (
      <div key={order.orderNumber} className="orders__item order">
        <div className="order__main">
          <div className="order__info">
            <div className="order__number"> № {order.orderNumber}</div>
            <div className="order__date-desktop">{order.date.split('-')[2]} {monthItems[parseInt(order.date.split('-')[1]) - 1]} {order.date.split('-')[0]}</div>
            <div className="order__date-mobile">{order.date.split('-')[2]}.{order.date.split('-')[1]}.{order.date.split('-')[0]}</div>
          </div>
          <div className="order__sum sum-order">
            <div className="sum-order__title">Сума <span>замовлення</span></div>
            <div className="sum-order__value">{order.totalSum} ₴</div>
          </div>
          <div onClick={() => onDetailsButtonClick(index)} className={"order__details-btn" + (activeTab === index ? " _active" : "")}>
            Детальніше <RxTriangleDown color='#FF6600' size={35} />
          </div>
        </div>
        <div className={"order__details" + (activeTab === index ? " _active" : "")}>
          <div className="order__items">
            {orderItems}

          </div>
        </div>
      </div>
    )
  })



  return (
    <div className='orders'>
      <div className="orders__items">
        {orderElements}
      </div>
    </div>
  )
}

export default OrderHistory