
import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllBookings = () => {

  const { aToken, bookings, getAllBookings,cancelBooking } = useContext(AdminContext)
  const { slotDateFormat, calculateAge} = useContext(AppContext)

 
  useEffect(() => {
    if (aToken) {
      getAllBookings()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>All Bookings</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Customer</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Worker</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {bookings.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img src={item.workerData.image} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.workerData.name}</p>
            </div>
            <p>{item.amount}</p>
            {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.payment ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelBooking(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllBookings