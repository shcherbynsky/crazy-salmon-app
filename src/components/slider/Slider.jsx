import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';



function Slider() {


    return (
        <Swiper
            autoHeight={true}
            effect={'fade'}
            autoplay={{
                "delay": 4000,
                "disableOnInteraction": false
              }}
            modules={[EffectFade, Autoplay]}
        
        >
            <SwiperSlide>
                <div className="slide">
                    <div className="slide__img">
                        <img src="img/slider/1.jpg" alt="" />
                    </div>
                    <div className="slide__body">
                        <div className="slide__content">
                            <p className="slide__title"><span>З найсвіжішого</span> лосося та овочів</p>
                            <p className="slide__text">доставка всього за 45 хв.</p>
                        </div>
                        {/* <button onClick={} className="slide__btn btn__long">Обрати страви</button> */}
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide">
                    <div className="slide__img">
                        <img src="img/slider/2.jpg" alt="" />
                    </div>
                    <div className="slide__body">
                        <div className="slide__content">
                            <p className="slide__title">Ексклюзивно!</p>
                            <p className="slide__text">Тільки найкраще поєднання овочів і риби</p>
                        </div>
                        {/* <button className="slide__btn btn__long">Обрати страви</button> */}
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide">
                    <div className="slide__img">
                        <img src="img/slider/3.jpg" alt="" />
                    </div>
                    <div className="slide__body">
                        <div className="slide__content">
                            <p className="slide__title">Найніжніше!!</p>
                            <p className="slide__text">Спробуйте нові десерти <br />моті-тістечка у 3 різних смаках!</p>
                        </div>
                        {/* <button className="slide__btn btn__long">Обрати страви</button> */}
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    )
}

export default Slider