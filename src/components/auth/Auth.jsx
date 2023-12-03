import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from 'react-router-dom'
// import { login, registration } from '../../http/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { syncCart } from '../../redux/slices/cartSlice';
import { loginUser, registerUser } from '../../redux/slices/userSlice';
import MessageModal from '../messageModal/MessageModal';


const Auth = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    const { token, status, message } = useSelector(state => state.user)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isModalShown, setIsModalShown] = React.useState(false)
console.log('token = ', token);
    const isLogin = location.pathname === '/login'
    // const [nameValue, setNameValue] = React.useState()
    const [phoneValue, setPhoneValue] = React.useState('')
    // const [passwordValue, setPasswordValue] = React.useState()

    const methods = useForm()
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset,
        control,
    } = useForm({
        mode: 'onChange'
    })

    React.useEffect(() => {
        if (token) {
            console.log('token got');
            dispatch(syncCart())
            navigate(-1)
        }
    }, [token])

    const onPhoneChange = (e) => {
        const value = e.target.value
        if (value.length < 13) {
            const valueArr = value.split('')
            if (valueArr[valueArr.length - 1] !== '-' && value.slice(-1) * 0 === 0) {
                if (value.length === 3 || value.length === 7 || value.length === 10) {
                    if (value.length < phoneValue.length) {
                        setPhoneValue(value)
                    } else {
                        setPhoneValue(prev => prev + '-' + valueArr[valueArr.length - 1])
                    }
                } else {
                    if (value.length < phoneValue.length) {
                        setPhoneValue(value)
                    } else {
                        setPhoneValue(prev => prev + valueArr[valueArr.length - 1])
                    }
                }
            } else {
                setPhoneValue(value.slice(0, -1))
            }
        }

    }

    const onSubmit = async ({ name, phone, password }) => {
        phone = '0' + phone.replace(/-/g, '')

        try {
            if (isLogin) {
                dispatch(loginUser({ phone, password }))

            }
            else {
                dispatch(registerUser({ name, phone, password }))
            }
            // setIsModalShown(true)
            // if (token) {
            //     console.log('token got');
            //     dispatch(syncCart())
            //     navigate(-1)
            // }
        } catch (error) {

        }

    
    }



    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="auth">
                <div className="auth__body">
                    <h2 className="auth__title">{isLogin ? 'Вхід' : 'Реєстрація'}</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="auth__form form">
                        {!isLogin &&

                            <label className='form__label'>
                                Ім'я:
                                <div className={"form__item" + (errors?.name ? ' error' : '')}>
                                    <input className='input input-name' type="text"
                                        {...register('name', {
                                            required: "Поле обовйязкове для заповнення",
                                        })}
                                    />
                                </div>

                                <div className="input-err">{errors?.name && errors.name.message}</div>
                            </label>
                        }

                        <label>
                            Телефон:
                            <div className={"form__item" + (errors?.phone ? ' error' : '')}>
                                <span className="tel-prefix">+380</span>
                                <input className='input input-tel' type="text" value={phoneValue}
                                    {...register('phone', {
                                        required: "Поле обовйязкове для заповнення",
                                        onChange: (e) => { onPhoneChange(e) },
                                        minLength: {
                                            value: 12,
                                            message: "Перевірте правільність номеру телефона"
                                        }
                                    })}
                                />
                            </div>
                            <div className="input-err">{errors?.phone && errors.phone.message}</div>
                        </label>
                        <label>
                            Пароль:
                            <div className={"form__item" + (errors?.password ? ' error' : '')}>
                                <input className='input input-pass' type="password"
                                    {...register('password', {
                                        required: "Поле обовйязкове для заповнення",
                                        minLength: {
                                            value: 6,
                                            message: "Пароль має бути довше 6 символів!"
                                        }
                                    })}
                                />
                            </div>
                            <div className="input-err">{errors?.password && errors.password.message}</div>
                        </label>
                        <input type="submit" value={isLogin ? "Увійти" : "Зареєструватись"} className="auth__btn btn__long" />
                    </form>
                    {isLogin ?
                        <div className="auth__action-string">
                            Немає акаунту? <span onClick={() => navigate('/registration')}>Зареєструватись</span>
                        </div>
                        :
                        <div className="auth__action-string">
                            Вже зареєстровані?
                            <span onClick={() => navigate('/login')}>Увійти</span>
                        </div>
                    }
                </div>
            </div>
            {isModalShown && <MessageModal
                // isModalShown={isModalShown}
                setIsModalShown={setIsModalShown}
                status={status}
                message={message}
            />}
        </>
    )
}

export default Auth


