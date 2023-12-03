import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { logout } from '../../redux/slices/userSlice'

function Profile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [activeMenu, setActiveMenu] = React.useState(0)

    const menuItems = [
        {
            title: 'Обране',
            url: 'wish-list'
        },
        {
            title: 'Історія замовлень',
            url: 'order-history'
        },
        {
            title: 'Мої адреси',
            url: 'address-book'
        },
        {
            title: 'Мої дані',
            url: 'edit-account'
        },
        {
            title: 'Вийти',
            url: 'logout'
        },
    ]
    React.useEffect(() => {
        navigate('/profile/wish-list')
    }, [])

    const onMenuClick = (index) => {
        console.log('activeMenu = ', activeMenu);
        setActiveMenu(index)
    }

    const onLogoutClick = () => {
        dispatch(logout())
        navigate('/')
    }

    const menuElements = menuItems.map((item, index) => {
        return (
            <li 
            key={index} 
            className={"menu-profile__item" + (activeMenu === index ? " _active" : "")+ (activeMenu === 2 ? " menu-profile__item-address" : "")}
            onClick={() => onMenuClick(index)}>
                <Link to={item.url} className="menu-profile__link">{item.title}</Link>
            </li>
        )
    })



    return (
        <div className='profile'>
            <div className="profile__container">
                <h4 className="profile__title title">Мій кабінет</h4>
                <div className="profile__body">
                    <div className="profile__menu menu-profile">
                        <ul className="menu-profile__list">

                            {menuElements}

                        </ul>
                    </div>
                    <div className="profile__content content-profile">
                        <div className="content-profile__title">{menuItems[activeMenu].title}</div>
                        <div className="content-profile__body">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile