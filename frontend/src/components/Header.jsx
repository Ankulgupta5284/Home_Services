import React from 'react';
import { assets } from '../assets/assets'; 
const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 rounded-lg px-6 md:px-10 lg:px-20 overflow-hidden relative'>

            <div className="absolute inset-0 z-0">
                <div className="w-20 h-20 rounded-full bg-white opacity-20 blur-3xl animate-pulse absolute top-10 left-10"></div>
                <div className="w-28 h-28 rounded-full bg-yellow-300 opacity-30 blur-3xl animate-pulse absolute bottom-20 right-16"></div>
                <div className="w-16 h-16 rounded-full bg-pink-400 opacity-25 blur-3xl animate-pulse absolute top-32 right-10"></div>
            </div>

            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] z-10'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Your One-Stop Solution <br /> for Trusted Home Services
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <p>Explore a variety of professional services, <br className='hidden sm:block' /> from cleaning to repairs, tailored for your home.</p>
                </div>
                <a href='#services' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-transform duration-300'>
                    Explore Services <img className='w-3' src={assets.arrow_icon} alt="arrow icon" />
                </a>
            </div>

            <div className="md:w-1/2 relative z-10">
  <img
    className="absolute bottom-0 right-4 w-full h-[80%] rounded-lg"
    src={assets.header_img}
    alt="Home services illustration"
  />
</div>


        </div>
    );
}

export default Header;









