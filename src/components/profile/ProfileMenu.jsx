import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout, setProfileMenuIndex } from '../../redux/slices/userSlice';

function ProfileMenu({ setSectionTitle }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isModalShown, setIsModalShown] = React.useState(false)
    // const [activeMenu, setActiveMenu] = React.useState(parseInt(window.localStorage.getItem('profileMenuIndex')) || 0)
    const {profileMenuIndex} = useSelector(state => state.user)


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
        // {
        //     title: 'Вийти',
        //     url: 'logout'
        // },
    ]

    React.useEffect(() => {
        // return () => {
        //     setActiveMenu(0)
        //     window.localStorage.setItem('profileMenuIndex', 0)
        // }
    }, [])

    const onLogoutClick = () => {
        setIsModalShown(true)
        // dispatch(logout())
        // navigate('/')
    }

    const onYesModalButtonClick = () => {
        dispatch(logout())
        navigate('/')
        setIsModalShown(false)
    }

    const onMenuClick = (index) => {
        if (index !== 4) {
            setSectionTitle(menuItems[index].title)
            dispatch(setProfileMenuIndex(index))
        }

    }

    const menuElements = menuItems.map((item, index) => {

        return (
            <li
                key={index}
                className={"menu-profile__item" + (profileMenuIndex === index ? " _active" : "") + (profileMenuIndex === 2 ? " menu-profile__item-address" : "")}
                onClick={() => onMenuClick(index)}>
                <Link to={index !== 4 && item.url} className="menu-profile__link">{item.title}</Link>
            </li>
        )
    })


    return (
        <>
            <div className="profile__menu menu-profile">
                <ul className="menu-profile__list">

                    {menuElements}
                    <div onClick={onLogoutClick} className="menu-profile__item menu-profile__logout-btn">
                        <span className="menu-profile__link">Вийти</span>
                    </div>

                </ul>
            </div>
            <div className={"modal-logout" + (isModalShown ? " _active" : "")}>
                <div className="modal-logout__layout">
                    <div className="modal-logout__body">
                        <div className="modal-logout__content">
                            <p className="modal-logout__title">Ви дійсно хочете вийти з акаунту?</p>
                        </div>
                        <div className="modal-logout__buttons">
                            <div onClick={onYesModalButtonClick} className="modal-logout__button btn__long">Так</div>
                            <div onClick={() => setIsModalShown(false)} className="modal-logout__button btn__long">Ні</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileMenu