import { createContext,useState,useEffect} from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()
const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [workers, setWorkers] = useState([])

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

    const [userData, setUserData] = useState(false)

   
    const getWorkersData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/worker/list')
            

            if (data.success) {
                setWorkers(data.workers)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    


     // Getting User Profile using API
     const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }



    
    const value = {
        workers,backendUrl,getWorkersData,
        token, setToken,
        userData, setUserData, loadUserProfileData
    }

    useEffect(() => {
        getWorkersData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }

    }, [token])


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider