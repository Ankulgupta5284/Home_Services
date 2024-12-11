import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllBookings from './pages/Admin/AllBookings';
import AddWorker from './pages/Admin/AddWorker';
import WorkersList from './pages/Admin/WorkersList';
import { Route, Routes } from 'react-router-dom'
import { WorkerContext } from './context/WorkerContext';
import WorkerDashboard from './pages/Worker/WorkerDashboard';
import WorkerBooking from './pages/Worker/WorkerBooking';
import WorkerProfile from './pages/Worker/WorkerProfile';


const App = () => {

  const { aToken } = useContext(AdminContext)

  const { wToken } = useContext(WorkerContext)

  return aToken || wToken ? (
    <div className='bg-[#F8F9FD]' >
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />

        <Routes>

          {/* Admin Route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-bookings' element={<AllBookings />} />
          <Route path='/add-worker' element={<AddWorker />} />
          <Route path='/worker-list' element={<WorkersList />} />
        
        {/* Worker Route */}
        <Route path='/worker-dashboard' element={<WorkerDashboard />} />
        <Route path='/worker-bookings' element={<WorkerBooking />} />
        <Route path='/worker-profile' element={<WorkerProfile />} />
        


        </Routes>

      </div>

    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App