import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
export const WorkerContext = createContext()
const WorkerContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL


  const [wToken, setWToken] = useState(localStorage.getItem('wToken') ? localStorage.getItem('wToken') : '')

  const [bookings, setBookings] = useState([])
  const [dashData, setDashData] = useState(false)
  const [profileData, setProfileData] = useState(false)


  // Getting Worker bookings data from Database using API
  const getBookings = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/worker/bookings', { headers: { wToken } })

      if (data.success) {
        setBookings(data.bookings.reverse())
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

    // Function to cancel worker booking using API
    const cancelBooking = async (bookingId) => {

      try {

          const { data } = await axios.post(backendUrl + '/api/worker/cancel-booking', { bookingId }, { headers: { wToken } })

          if (data.success) {
              toast.success(data.message)
              getBookings()
           
          } else {
              toast.error(data.message)
          }

      } catch (error) {
          toast.error(error.message)
          console.log(error)
      }

  }

  // Function to Mark appointment completed using API
  const completeBooking = async (bookingId) => {

      try {

          const { data } = await axios.post(backendUrl + '/api/worker/complete-booking', { bookingId }, { headers: { wToken } })

          if (data.success) {
              toast.success(data.message)
              getBookings()
          
          } else {
              toast.error(data.message)
          }

      } catch (error) {
          toast.error(error.message)
          console.log(error)
      }

  }


 // Getting Doctor dashboard data using API
 const getDashData = async () => {
  try {

      const { data } = await axios.get(backendUrl + '/api/worker/dashboard', { headers: { wToken } })

      if (data.success) {
          setDashData(data.dashData)
      } else {
          toast.error(data.message)
      }

  } catch (error) {
      console.log(error)
      toast.error(error.message)
  }

}


    // Getting worker profile data from Database using API
    const getProfileData = async () => {
      try {

          const { data } = await axios.get(backendUrl + '/api/worker/profile', { headers: { wToken } })
          console.log(data.profileData)
          setProfileData(data.profileData)

      } catch (error) {
          console.log(error)
          toast.error(error.message)
      }
  }


  const value = {
    wToken, setWToken, backendUrl,getBookings,bookings,setBookings,completeBooking,cancelBooking,    dashData, getDashData,setDashData,
    profileData,setProfileData,getProfileData
  }
  return (
    <WorkerContext.Provider value={value}>
      {props.children}
    </WorkerContext.Provider>

  )
}


export default WorkerContextProvider
