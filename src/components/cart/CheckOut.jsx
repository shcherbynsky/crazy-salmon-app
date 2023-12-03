import React from "react";
import { useForm } from "react-hook-form";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deleteCart } from "../../redux/slices/cartSlice";
import { addOrder } from "../../redux/slices/orderSlice";
import Loader from "../loader/Loader"
import MessageModal from "../messageModal/MessageModal";

function CheckOut() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, checkedAddress } = useSelector(state => state.user)
    const { cartItems, deliveryCosts, minOrderSum } = useSelector(state => state.cart)
    const { status, isLoading, newOrder } = useSelector(state => state.order)
    const [phoneValue, setPhoneValue] = React.useState('')
    const [personCount, setPersonCount] = React.useState(2)
    const [isThanksModalShown, setIsThanksModalShown] = React.useState(false)






    const addressEl = user?.address?.[checkedAddress]
    const address = 'м. Київ, ' + addressEl?.street + ', будинок ' + addressEl?.house + (addressEl?.flat ? ', кв. ' + addressEl.flat : '')
    const sum = cartItems?.reduce((total, item) => { return total + (item.price * item.productQty) }, 0)


    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            toPhone: "yes",
            payMethod: "cardonsite"
        },
        mode: 'onChange',
    })
    // React.useEffect(() => {

    //     reset({
    //         name: user?.name ? user.name : '',
    //         phone: user?.phone ? user.phone : '',
    //         email: user?.email ? user.email : '',
    //         toPhone: "no"
    //     });

    // }, [user]);


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

    const onMinusClick = () => {
        if (personCount > 1) {
            setPersonCount(prev => prev - 1)
        }
    }
    const onPlusClick = () => {
        setPersonCount(prev => prev + 1)
    }


    const onSubmit = (obj) => {
        console.log(obj, personCount);
       
    }
    // const onSubmit = ({ name, phone, email, toPhone, payMethod, comment }) => {

    //     const productData = cartItems.map((item) => {
    //         return { productQty: item.productQty, productId: item.productId, productPrice: item.price }
    //     })

    //     // -----------------------------------------

    //     dispatch(addOrder({ productData, address, sum, name, phone, email, toPhone, payMethod, comment, personCount }))

    //     if (status) {
    //         dispatch(deleteCart())
    //     }

    //     if (!isLoading) {
    //         setIsThanksModalShown(true)
    //     }
    // }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="checkout">
                <div className="checkout__container">
                    <h3 className="checkout__title title">Оформлення замовлення</h3>
                    <div className="checkout__body">
                        <form onSubmit={handleSubmit(onSubmit)} className="checkout__form form-checkout">
                            <div className="form-checkout__userinfo">
                                <div className="form-checkout__item">
                                    <label className='form-checkout__label' htmlFor="name">Ім'я:</label>
                                    <div className="form-checkout__input-wrapper">
                                        <input className={"form-checkout__input" + (errors?.name ? ' error' : '')} autoComplete="off" id="name" name="userinfo"
                                            {...register('name', {
                                                required: "Поле обовйязкове для заповнення",
                                            })}
                                        />
                                    </div>
                                    <div className="input-err">{errors?.name && errors.name.message}</div>

                                </div>
                                <div className="form-checkout__item">
                                    <label className='form-checkout__label' htmlFor="phone">Телефон:</label>
                                    <div className="form-checkout__input-wrapper form-checkout__input-wrapper-phone">
                                        <input className={"form-checkout__input form-checkout__input-phone" + (errors?.phone ? ' error' : '')} autoComplete="off" value={phoneValue} id="phone" name="userinfo"
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
                                </div>
                                <div className="form-checkout__item">
                                    <label className='form-checkout__label' htmlFor="email">Email:</label>
                                    <div className="form-checkout__input-wrapper">
                                        <input className={"form-checkout__input" + (errors?.email ? ' error' : '')} autoComplete="off" type="email" id="email" name="userinfo"
                                            {...register('email', {
                                                required: "Поле обовйязкове для заповнення",
                                                pattern: {
                                                    value:
                                                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Перевірте email",
                                                },
                                            })}
                                        />
                                    </div>
                                    <div className="input-err">{errors?.email && errors.email.message}</div>
                                </div>
                            </div>
                            {/* <div className="form-checkout__userinfo">
                            <div className="form-checkout__item">
                                <label className='form-checkout__label' htmlFor="name">Ім'я:</label>
                                <div className={"form-checkout__value" + (errors?.name ? ' error' : '')}>
                                    <input className='input input-name' id="name" name="userinfo" value={user?.name ? user.name : ''}
                                        {...register('name', {
                                            required: "Поле обовйязкове для заповнення",
                                        })}
                                    />
                                </div>
                                <div className="input-err">{errors?.name && errors.name.message}</div>

                            </div>
                            <div className="form-checkout__item">
                                <label className='form-checkout__label' htmlFor="phone">Телефон:</label>
                                <div className={"form-checkout__value" + (errors?.phone ? ' error' : '')}>
                                    <span className="tel-prefix">+380</span>
                                    <input className='input input-tel' id="phone" name="userinfo" value={user?.phone ? user.phone : ''}
                                        {...register('phone', {
                                            required: "Поле обовйязкове для заповнення",
                                            // onChange: (e) => { onPhoneChange(e) },
                                            minLength: {
                                                value: 12,
                                                message: "Перевірте правільність номеру телефона"
                                            }
                                        })}
                                    />
                                </div>
                            <div className="input-err">{errors?.phone && errors.phone.message}</div>
                            </div>
                            <div className="form-checkout__item">
                                <label className='form-checkout__label' htmlFor="email">Email:</label>
                                <div className={"form-checkout__value" + (errors?.email ? ' error' : '')}>
                                    <input className='input input-pass' type="email" id="email" name="userinfo" value={user?.email ? user.email : ''}
                                        {...register('email', {
                                            required: "Поле обовйязкове для заповнення",
                                            minLength: {
                                                value: 6,
                                                message: "Пароль має бути довше 6 символів!"
                                            }
                                        })}
                                    />
                                </div>
                                <div className="input-err">{errors?.email && errors.email.message}</div>
                            </div>
                        </div> */}
                            <div className="checkout-address form-checkout__item">
                                <div className="checkout-address__title form-checkout__title">Адреса доставки:</div>
                                <div className="checkout-address__value">{address}</div>
                            </div>
                            <div className="checkout-person form-checkout__item">
                                <div className="checkout-person__title form-checkout__title">Кількість персон:</div>
                                <div className="checkout-person__value">
                                    <div className='counter'>
                                        <div className="counter__body">
                                            <div onClick={(onMinusClick)} className="counter__button counter__button-minus"><BiMinus size={16} /></div>
                                            <div className="counter__value" style={{ fontSize: 16 }}>{personCount}</div>
                                            <div onClick={onPlusClick} className="counter__button counter__button-plus"><BiPlus size={16} /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="checkout-tophone">
                                <div className="checkout-tophone__title form-checkout__title">Вам зателефонувати для підтвердження замовлення?</div>
                                <div className="checkout-tophone__descr">Ми все ж таки можемо зателефонувати, якщо ви замовляєте вперше, або якщо у нас залишились запитання.</div>
                                <div className="checkout-tophone__body">
                                    <label className="checkout-tophone__item form-checkout__item">
                                        <div>
                                            <input type="radio" value="no" {...register("toPhone")} />
                                            <span>Не дзвоніть мені</span>
                                        </div>
                                    </label>
                                    <label className="checkout-tophone__item form-checkout__item">
                                        <div>
                                            <input type="radio" value="yes" {...register("toPhone")} />
                                            <span>Так, зателефонуйте мені</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="checkout-comment">
                                <div className="checkout-comment__title form-checkout__title">Коментар до замовлення:</div>
                                <textarea className="checkout-comment__text" placeholder="Залиште додаткові побажання щодо замовлення або підказку, як вас знайти"
                                    {...register('comment', {

                                    })} />
                            </div>
                            <div className="checkout__paymethod paymethod-checkout">
                                <div className="paymethod-checkout__title form-checkout__title">Спосіб оплати:</div>
                                <div className="paymethod-checkout__body">
                                    <label className="paymethod-checkout__item form-checkout__item">
                                        <div>
                                            <input type="radio" value="cardonsite" {...register("payMethod")} />
                                            <span>Картою на сайті</span>
                                        </div>
                                    </label>
                                    <label className="paymethod-checkout__item form-checkout__item">
                                        <div>
                                            <input type="radio" value="terminal" {...register("payMethod")} />
                                            <span>Термінал (оплата карткою при отриманні)</span>
                                        </div>
                                    </label>
                                    <label className="paymethod-checkout__item form-checkout__item">
                                        <div>
                                            <input type="radio" value="cash" {...register("payMethod")} />
                                            <span>Готівкою при отриманні</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="checkout__info info-checkout">
                                <div className="info-checkout__body">
                                    <div className="info-checkout__item">
                                        <div className="info-checkout__title form-checkout__title">Всього:</div>
                                        <div className="info-checkout__value">{sum} <span>грн</span></div>
                                    </div>
                                    <div className="info-checkout__item">
                                        <div className="info-checkout__title form-checkout__title">Доставка:</div>
                                        {
                                            sum > minOrderSum ?
                                                <div className="info-checkout__value info-checkout__value-free">Безкоштовно</div>
                                                :
                                                <div className="info-checkout__value info-checkout__value-charge">
                                                    {deliveryCosts} грн.
                                                    <span>(Безкоштовно від {minOrderSum} грн.)</span>
                                                </div>
                                        }
                                    </div>
                                    <div className="info-checkout__item">
                                        <div className="info-checkout__title form-checkout__title">Сума до сплати:</div>
                                        <div className="info-checkout__value orange">{sum > minOrderSum ? sum : sum + deliveryCosts} <span>грн</span></div>
                                    </div>
                                </div>
                            </div>
                            <input type="submit" value="Швиденько, я чекаю" className={"checkout__btn btn__long" + (errors.name || errors.phone || errors.email ? " _blocked" : "")} />
                        </form>
                    </div>
                </div >
            </div >
            {isThanksModalShown && <MessageModal
                status={status}
                setIsModalShown={setIsThanksModalShown}
                messageOk={'Замовлення №' + newOrder + ' створено'}
                messageError={'Не вдалось створити замовлення, спробуйте ще раз'}
            />
            }
            {/* <div className={"cart__modal modal-cart" + (isThanksModalShown ? " _active" : "")}>
                <div ref={modalLayoutRef} className="modal-cart__layout">
                    <div className="modal-cart__body">
                        <div className="modal-cart__content">
                            <p className="modal-cart__title">{status ? 'Дякуємо!' : 'Помилка('}</p>
                            <p className="modal-cart__message">{status ? ('Замовлення №' + newOrder + ' створено') : 'Не вдалось створити замовлення, спробуйте ще раз'}</p>
                            <p className="modal-cart__message">{status && 'Наш менеджер зателефонує Вам найближчим часом для уточнення деталей'}</p>
                        </div>
                        <div ref={modalCloseButtonRef} className="modal-cart__button btn__long">Закрити</div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default CheckOut