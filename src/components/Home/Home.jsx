import React from 'react'
import Slider from '../slider/Slider'
import TopProducts from '../topProducts/TopProducts'

function Home() {
  return (
    <div className='home'>
        <Slider />
        <TopProducts />
    </div>
  )
}

export default Home