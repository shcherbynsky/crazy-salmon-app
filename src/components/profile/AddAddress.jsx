import React from 'react'
import {  NavLink, useLocation, useNavigate  } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { addAddress, addLocalAddress, changeAddress } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function AddAddress({setIsAddAddressActive}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {token} = useSelector(state => state.user)

    const { state } = useLocation();
    const addressId = state?.addressId || ''
    const streetValue = state?.streetValue || ''
    const houseValue = state?.houseValue || ''
    const flatValue = state?.flatValue || ''


    

    const {
        register,
        formState: {
          errors,
        },
        handleSubmit,
        reset,
        control,
      } = useForm({
        mode: 'onChange',
        defaultValues: {
          street: '' || streetValue,
          house: '' || houseValue,
          flat: '' || flatValue,
        }
      })
    
    
      const onSubmit = ({street, house, flat}) => {
        if (token) {
          if (addressId) {
            dispatch(changeAddress({street, house, flat, addressId}))
          } else {
            dispatch(addAddress({street, house, flat }))
          }
        } else {
          dispatch(addLocalAddress({street, house, flat}))
        }
        
        setIsAddAddressActive(false)
      }



  return (
    <div className="add-address">
          <div className="add-address__body">
            <form onSubmit={handleSubmit(onSubmit)} className="modal-myaddress__form form">
              <label className='form__label'>
                Вулиця:
                <div className={"form__item" + (errors?.street ? ' error' : '')}>
                  <input className='input' type="text"
                    {...register('street', {
                      required: "Поле обовйязкове для заповнення",
                    })}
                  />
                </div>
                <div className="input-err">{errors?.street && errors.street.message}</div>
              </label>
              <label className='form__label'>
                Будинок:
                <div className={"form__item" + (errors?.house ? ' error' : '')}>
                  <input className='input' type="text"
                    {...register('house', {
                      required: "Поле обовйязкове для заповнення",
                    })}
                  />
                </div>
                <div className="input-err">{errors?.house && errors.house.message}</div>
              </label>
              <label className='form__label'>
                Квартира:
                <div className={"form__item" + (errors?.flat ? ' error' : '')}>
                  <input className='input' type="text"
                    {...register('flat', {
                      required: "Поле обовйязкове для заповнення",
                    })}
                  />
                </div>
                <div className="input-err">{errors?.flat && errors.flat.message}</div>
              </label>
              <div className="form__buttons">
              <input type="submit" value={addressId ? 'Оновити адресу' : 'Додати адресу'} className="form__btn btn__long" />
                    <div onClick={() => setIsAddAddressActive(false)} className="form__btn btn__long">Закрити</div>
              </div>
            </form>
          </div>
        </div>
  )
}

export default AddAddress