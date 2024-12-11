import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyBooking = () => {


  const { backendUrl, token ,getWorkersData} = useContext(AppContext)

  const [bookings, setBookings] = useState([])

  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }



  // Getting User Appointments Data Using API
  const getUserBookings = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/user/bookings', { headers: { token } })

      if (data.success) {
        setBookings(data.bookings.reverse())
        console.log(data.bookings)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


   // Function to cancel appointment Using API
   const cancelBooking = async (bookingId) => {

    try {

        const { data } = await axios.post(backendUrl + '/api/user/cancel-booking', { bookingId }, { headers: { token } })

        if (data.success) {
            toast.success(data.message)
            getWorkersData()
           
        } else {
            toast.error(data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}


const updatePaymentStatus = async (bookingId) => {
  try {
      const { data } = await axios.post(
          backendUrl + '/api/user/payment-completed',
          { bookingId },
          { headers: { token } }
      );

      if (data.success) {
          toast.success(data.message);
          getUserBookings(); // Refresh bookings to reflect payment status
      } else {
          toast.error(data.message);
      }
  } catch (error) {
      console.error(error);
      toast.error(error.message);
  }
};



  useEffect(() => {
    if (token) {
      getUserBookings()
    }
  }, [token])



  return (
    <div>
      <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My Booking</p>
      <div className=''>
        {bookings.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
            <div>
              <img className='w-36 bg-[#EAEFFF]' src={item.workerData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-[#5E5E5E]'>
              <p className='text-[#262626] text-base font-semibold'>{item.workerData.name}</p>
              <p>{item.workerData.service}</p>
              <p className='text-[#464646] font-medium mt-1'>Address:</p>
              <p className=''>{item.workerData.address.line1}</p>
              <p className=''>{item.workerData.address.line2}</p>
              <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> { slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end text-sm text-center'>
              {!item.isCompleted &&!item.payment && !item.cancelled && <button onClick={() => updatePaymentStatus(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
              
              {!item.isCompleted && !item.cancelled && !item.payment && <button onClick={() => cancelBooking(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300'>Cancel Payment</button>}

              {!item.isCompleted && item.cancelled && !item.payment &&  <button  className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Booking cancelled</button>}

              {item.isCompleted  && <button  className="text-blue-500 sm:min-w-48 py-2 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition-all duration-300">Completed</button>}
              
           
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBooking