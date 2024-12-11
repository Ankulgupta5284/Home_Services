import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { WorkerContext } from '../context/WorkerContext'

const Sidebar = () => {

    const { aToken } = useContext(AdminContext)
    const { wToken } = useContext(WorkerContext)
    


    return (
        <div className='min-h-screen bg-white border-r'>
            {aToken && <ul className='text-[#515151] mt-5'>

                <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                    <img className='min-w-5' src={assets.home_icon} alt='' />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink to={'/all-bookings'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                    <img className='min-w-5' src={assets.booking_icon} alt='' />
                    <p className='hidden md:block'>Bookings</p>
                </NavLink>
                <NavLink to={'/add-worker'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                    <img className='min-w-5' src={assets.add_icon} alt='' />
                    <p className='hidden md:block'>Add Worker</p>
                </NavLink>
                <NavLink to={'/worker-list'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                    <img className='min-w-5' src={assets.people_icon} alt='' />
                    <p className='hidden md:block'>Workers List</p>
                </NavLink>
            </ul>}


            {wToken && <ul className='text-[#515151] mt-5'>

                <NavLink to={'/worker-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                    <img className='min-w-5' src={assets.home_icon} alt='' />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink to={'/worker-bookings'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                    <img className='min-w-5' src={assets.booking_icon} alt='' />
                    <p className='hidden md:block'>Bookings</p>
                </NavLink>
                <NavLink to={'/worker-profile'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                    <img className='min-w-5' src={assets.people_icon} alt='' />
                    <p className='hidden md:block'>Profile</p>
                </NavLink>
            </ul>}


        </div>
    )
}

export default Sidebar