import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { changeUserData } from '../../redux/slices/userSlice';
import Loader from '../loader/Loader';
import MessageModal from '../messageModal/MessageModal';

function EditAccount() {

  const modalLayoutRef = React.useRef()
  const modalCloseButtonRef = React.useRef()

  const [isModalShown, setIsModalShown] = React.useState(false)
  const {user, isLoading, status} = useSelector(state => state.user)

  const dispatch = useDispatch()
  

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
        name: '', 
        mail: 'email@gmail.com', 
        phone: '', 
      }
    })

    React.useEffect(() => {
      if (user) {
          reset({
              name: user.name,
              phone: user.phone,
          });
      }
  }, [user]); 

  
  
  
    const onSubmit = ({name, mail, phone}) => {
      dispatch(changeUserData({name, mail, phone, userId: user.id}))
      setIsModalShown(true)
    }

if (isLoading || !user?.id) {
  return <Loader />
}

  return (
    <div className="mydata">
          <form onSubmit={handleSubmit(onSubmit)} className="mydata__form form">
  
  
            <label className='form__label'>
              Ім'я:
              <div className={"form__item" + (errors?.name ? ' error' : '')}>
                <input className='input' type="text"
                  {...register('name', {
                    required: "Поле обовйязкове для заповнення",
                  })}
                />
              </div>
              <div className="input-err">{errors?.name && errors.name.message}</div>
            </label>
  
            <label className='form__label'>
              E-mail:
              <div className={"form__item" + (errors?.mail ? ' error' : '')}>
                <input className='input' type="text"
                  {...register('mail', {
                    required: "Поле обовйязкове для заповнення",
                  })}
                />
              </div>
              <div className="input-err">{errors?.mail && errors.mail.message}</div>
            </label>
  
            <label className='form__label'>
              Телефон:
              <div className={"form__item" + (errors?.phone ? ' error' : '')}>
                <input className='input' type="text"
                  {...register('phone', {
                    required: "Поле обовйязкове для заповнення",
                  })}
                />
              </div>
              <div className="input-err">{errors?.phone && errors.phone.message}</div>
            </label>
  
  
  
            <div className="form__buttons">
            <input type="submit" value={'Оновити'} className="form__btn btn__long" />
            </div>
          </form>
          {isModalShown && <MessageModal 
          setIsModalShown = {setIsModalShown}
          status = {status}
          messageOk = {'Дані успішно оновлено'} 
          MessageError = {'Не вдалось оновити дані, спробуйте ще раз'}
          />}
          {/* <div className={"modal" + (isModalShown ? " _active" : "")}>
          <div ref={modalLayoutRef} className="modal__layout">
            <div className="modal__body">
              <div className="modal__content">
                <p className="modal__title">{status ? 'Дякуємо!': 'Помилка('}</p>
                <p className="modal__message">{status ? ('Дані успішно оновлено') : 'Не вдалось оновити дані, спробуйте ще раз'}</p>
              </div>
              <div ref={modalCloseButtonRef} className="modal__button btn__long">Закрити</div>
            </div>
          </div>
        </div> */}
        </div>
  )





}


export default EditAccount