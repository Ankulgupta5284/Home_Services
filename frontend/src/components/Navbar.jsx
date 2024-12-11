import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const navigate = useNavigate()
    const { token, setToken,userData } = useContext(AppContext)

    const logout = () => {
        localStorage.removeItem('token')
        setToken(false)
        navigate('/login')
      }

    const [showMenu, setShowMenu] = useState(false)

    const [showDropdown, setShowDropdown] = useState(false); // Add state for dropdown visibility

    const handleCreateAccountClick = () => {
        navigate('/login');
        setShowMenu(false); // Close mobile menu when navigating to login
    };

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>

            {/* Logo */}
            <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />

            {/* Desktop Menu */}
            <ul className='md:flex items-start gap-5 font-medium hidden'>
                <NavLink to='/' >
                    <li className='py-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/workers' >
                    <li className='py-1'>ALL Workers</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about' >
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact' >
                    <li className='py-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>

            {/* Desktop View for Profile / Logout */}
            <div className='flex items-center gap-4 '>
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative' onClick={() => setShowDropdown(!showDropdown)}>
                            <img className='w-8 rounded-full' src={userData.image} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            {/* Dropdown for desktop and mobile */}
                            {showDropdown && (
                                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20'>
                                    <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                                        <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                        <p onClick={() => navigate('/my-booking')} className='hover:text-black cursor-pointer'>My Booking</p>
                                        <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        : <button onClick={handleCreateAccountClick} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
                }

                {/* Mobile Menu Button */}
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

                {/* Mobile Menu */}
                <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img src={assets.logo} className='w-36' alt="" />
                        <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/workers' ><p className='px-4 py-2 rounded full inline-block'>ALL Workers</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>

                        {/* Mobile View for Profile / Logout */}
                        {!token && (
                            <button onClick={handleCreateAccountClick} className='bg-primary text-white px-8 py-3 rounded-full font-light mt-4'>
                                Create account
                            </button>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar




