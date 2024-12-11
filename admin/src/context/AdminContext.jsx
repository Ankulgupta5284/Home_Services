import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AdminContext = createContext()
const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [workers, setWorkers] = useState([])

    const [bookings, setBookings] = useState([])

    const [dashData, setDashData] = useState(false)

    // Getting all Doctors data from Database using API
    const getAllWorkers = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-workers', { headers: { aToken } })
            if (data.success) {
                setWorkers(data.workers)
                console.log(data.workers)

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }



    // Function to change worker availablity using API
    const changeAvailability = async (workerId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { workerId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllWorkers()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    // Getting all booking data from Database using API
    const getAllBookings = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/bookings', { headers: { aToken } })
            if (data.success) {
                setBookings(data.bookings.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }


     // Function to cancel appointment using API
     const cancelBooking = async (bookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-booking', { bookingId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllBookings()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }


    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

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



    const value = {
        aToken, setAToken,
        backendUrl, workers, getAllWorkers, changeAvailability,
        bookings,setBookings,getAllBookings,cancelBooking,dashData,getDashData
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>

    )
}


export default AdminContextProvider
