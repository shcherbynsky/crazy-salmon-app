import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import ProfileMenu from './ProfileMenu'

function ProfileLayout() {

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
    ]

    const [sectionTitle, setSectionTitle] = React.useState(menuItems[localStorage.getItem("profileMenuIndex")].title)

    const {user} = useSelector(state => state.user)


   


    return (
        <div className='profile'>
            <div className="profile__container">

                <h4 className="profile__title title">Мій кабінет | {user?.name}</h4>
                <div className="profile__body">
                    <ProfileMenu setSectionTitle={setSectionTitle}/>
                    <div className="profile__content content-profile">
                        <div className="content-profile__title">{sectionTitle}</div>
                        <div className="content-profile__body">
                            <Outlet />
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default ProfileLayout