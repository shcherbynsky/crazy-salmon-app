import React from 'react'
import { useDispatch } from 'react-redux'
import {  NavLink } from 'react-router-dom'
import { reset } from '../../redux/slices/productSlice'

function Logo({color}) {

    const dispatch = useDispatch()

    const onLogoClick = () => {
        dispatch(reset())
    }

    return (
        <NavLink to={'/'} onClick={onLogoClick}   className="logo">
            <div className="logo__img">
                <img src="/img/logo.png" alt="" />
            </div>
            <div className="logo__name">
                <p style={color={color}}  className="logo__name">Скажений <br /> Лосось</p>
            </div>
        </NavLink>
    )
}

export default Logo