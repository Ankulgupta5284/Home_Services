import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import RelatedWorkers from '../components/RelatedWorkers'
import axios from 'axios'

const Booking = () => {
  const { workerId } = useParams()
  const { workers, backendUrl, token, getWorkersData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']


  const [workerInfo, setWorkerInfo] = useState(false)
  const [workerSlots, setWorkerSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const navigate = useNavigate()


  const fetchWorkerInfo = async () => {
    const workerInfo = workers.find((doc) => doc._id === workerId)
    setWorkerInfo(workerInfo)
  }



  const getAvailableSlots = async () => {
    if (!workerInfo) return;

    setWorkerSlots([]); // Clear existing slots initially
    let today = new Date();

    for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        let endTime = new Date()
        endTime.setDate(today.getDate() + i)
        endTime.setHours(21, 0, 0, 0)
       
 // setting hours 
 if (today.getDate() === currentDate.getDate()) {
  currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
  currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
} else {
  currentDate.setHours(10)
  currentDate.setMinutes(0)
}

        let timeSlots = [];

        // Generate all time slots between 7:30 PM and 9:00 PM
        while (currentDate < endTime) {
            let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();

            const slotDate = `${day}_${month}_${year}`;
            const slotTime = formattedTime;
               
            // Check if the slot is booked in backend data
            const isSlotAvailable = workerInfo.slots_booked[slotDate] && workerInfo.slots_booked[slotDate].includes(slotTime) ? false : true


            // Add the slot only if it is not booked
            if (isSlotAvailable) {
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime,
                });
            }

            // Increment time by 30 minutes
            currentDate.setMinutes(currentDate.getMinutes() + 30);
        }

        // Update worker slots for the current date
        setWorkerSlots((prev) => [...prev, timeSlots]);
    }
};



  const bookBooking = async () => {
    if (!workerInfo) {
      toast.error("Worker information not available.")
      return;
    }





    if (!token) {
      toast.warning('Login to book appointment')
      return navigate('/login')
    }

    if (!workerSlots.length || !workerSlots[slotIndex]?.length) {
      toast.error('No slots available for the selected date');
      return;
    }

 

    const date = workerSlots[slotIndex][0].datetime



    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    



    const slotDate = day + "_" + month + "_" + year

    try {
      
    
      const { data } = await axios.post(backendUrl + '/api/user/book-booking', { workerId, slotDate, slotTime }, { headers: { token } })

      
      if (data.success) {
        toast.success(data.message)
        getWorkersData()
        navigate('/my-booking')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }



  useEffect(() => {
    if (workers.length > 0) {
      fetchWorkerInfo()
    }
  }, [workers, workerId])

  useEffect(() => {
    if (workerInfo) {
      getAvailableSlots()
    }
  }, [workerInfo])

  return workerInfo ? (
    <div className="px-4 py-6">
      {/* Doctor Details */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Worker Image */}
        <div className="flex-shrink-0">
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={workerInfo.image} alt="" />
        </div>

        {/* Worker Info */}
        <div className="flex-1 border border-[#ADADAD] rounded-lg p-6 bg-white">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {workerInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <p className="mt-1 text-gray-600">{workerInfo.service}</p>
          <div className="mt-3">
            <p className="text-sm font-medium text-[#262626]">About</p>
            <p className="text-sm text-gray-600 mt-1">{workerInfo.about}</p>
          </div>
          <p className="text-gray-600 font-medium mt-4">
            Service fee: <span className="text-gray-800">{workerInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-8">
        <p className="font-medium text-[#565656]">Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-auto mt-4">
          {workerSlots.length &&
            workerSlots.map((item, index) => (
              <div
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'
                  }`}
                onClick={() => setSlotIndex(index)}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>
         
         
        <div className="flex gap-3 w-full overflow-x-auto mt-4">
          {
            console.log(workerSlots)
          }
          {workerSlots.length &&
            workerSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                className={`text-sm font-light px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime
                    ? 'bg-primary text-white'
                    : 'text-[#949494] border border-[#B4B4B4]'
                  }`}
                onClick={() => setSlotTime(item.time)}
              >
                {item.time.toLowerCase()}
             
              </p>
            ))}
        </div>

        <button onClick={bookBooking} className="bg-primary text-white text-sm font-light px-10 py-3 rounded-full mt-6">
          Book a Slot
        </button>
      </div>

      {/* Related Workers */}
      <RelatedWorkers service={workerInfo.service} imgId={workerId} />
    </div>
  ) : null
}

export default Booking
