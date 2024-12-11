import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Workers from './pages/Workers'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyBooking from './pages/MyBooking'
import Booking from './pages/Booking'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar></Navbar>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/workers' element={<Workers/>}></Route>
      <Route path='/workers/:service' element={<Workers/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/my-profile' element={<MyProfile/>}></Route>
      <Route path='/my-booking' element={<MyBooking/>}></Route>
      <Route path='/booking/:workerId' element={<Booking/>}></Route>
     
      
     </Routes>
     <Footer></Footer>
    </div>
  )
}

export default App