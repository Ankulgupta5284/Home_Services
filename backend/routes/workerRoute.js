import express from 'express'
import { workerList,loginWorker,bookingsWorker,bookingCancel,bookingComplete,workerDashboard,workerProfile,updateWorkerProfile } from '../controllers/workerController.js'
import authWorker from '../middlewares/authWorker.js'

const workerRouter = express.Router()
workerRouter.get('/list',workerList)
workerRouter.post('/login',loginWorker)
workerRouter.get('/bookings',authWorker,bookingsWorker)
workerRouter.post('/complete-booking',authWorker,bookingComplete)

workerRouter.post('/cancel-booking',authWorker,bookingCancel)
workerRouter.get('/dashboard',authWorker,workerDashboard)
workerRouter.get('/profile',authWorker,workerProfile)
workerRouter.post('/update-profile',authWorker,updateWorkerProfile)




export default workerRouter