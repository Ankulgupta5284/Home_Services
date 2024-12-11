import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
const Workers = () => {
  const { service } = useParams()
  console.log(service)
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { workers } = useContext(AppContext)

  const applyFilter = () => {
    if (service) {
      const filtered = workers.filter(doc => doc.service?.toLowerCase() === service?.toLowerCase());
      console.log('Filtered Workers:', filtered);
      setFilterDoc(filtered);
    } else {
      setFilterDoc(workers);
    }
  };


  console.log(filterDoc);

  useEffect(() => {
    applyFilter()
  }, [workers, service])

  return (
    <div>
      <p className='text-gray-600'>Browse through the workers service.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => service === 'electrician' ? navigate('/workers') : navigate('/workers/electrician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === 'electrician' ? 'bg-[#E2E5FF] text-black ' : ''}`}>electrician</p>

          <p onClick={() => service === 'plumber' ? navigate('/workers') : navigate('/workers/plumber')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === 'plumber' ? 'bg-[#E2E5FF] text-black ' : ''}`}>plumber</p>

          <p onClick={() => service === 'carpenter' ? navigate('/workers') : navigate('/workers/carpenter')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === 'carpenter' ? 'bg-[#E2E5FF] text-black ' : ''}`}>carpenter</p>


          <p onClick={() => service === 'painter' ? navigate('/workers') : navigate('/workers/painter')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === 'painter' ? 'bg-[#E2E5FF] text-black ' : ''}`}>painter</p>


          <p onClick={() => service === 'barber' ? navigate('/workers') : navigate('/workers/barber')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === 'barber' ? 'bg-[#E2E5FF] text-black ' : ''}`}>barber</p>


          <p onClick={() => service === 'cleaner' ? navigate('/workers') : navigate('/workers/cleaner')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === 'cleaner' ? 'bg-[#E2E5FF] text-black ' : ''}`}>cleaner</p>
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div onClick={() => { navigate(`/booking/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='bg-[#EAEFFF]' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Workers

