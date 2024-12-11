import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Promotion = () => {

    const navigate = useNavigate()

    return (
        <div className='flex bg-primary rounded-lg  px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

            {/* ------- Left Side ------- */}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                    <p>Unlock Exceptional Services With Highly Skilled Workers Just a Click Away</p>
                </div>
                <p className="mt-4 text-white text-lg sm:text-xl">
    Whether it's a simple home repair, a large renovation, or anything in between, we have a team of experienced professionals ready to assist you. Our workers are skilled, reliable, and always committed to delivering top-notch service. Book your services today and experience excellence.
  </p>
                <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all '>Create account</button>
            </div>

            {/* ------- Right Side ------- */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
  <img 
    className='w-full max-h-[400px] object-contain rounded-lg absolute bottom-0 right-0' 
    src={assets.indicate_img} 
    alt="" 
  />
</div>


        </div>
    )
}

export default Promotion