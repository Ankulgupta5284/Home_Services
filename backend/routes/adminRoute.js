import express from 'express';
import { addWorker,allWorkers,loginAdmin,bookingsAdmin,bookingCancel,adminDashboard } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/workerController.js';

const adminRouter = express.Router();

// POST request to add worker (without image upload)
adminRouter.post('/add-worker',authAdmin,upload.single('image'),addWorker);

adminRouter.post('/login',loginAdmin);
adminRouter.get('/all-workers',authAdmin,allWorkers);

adminRouter.post("/change-availability", authAdmin, changeAvailablity)

adminRouter.get('/bookings',authAdmin,bookingsAdmin)

adminRouter.post("/cancel-booking", authAdmin, bookingCancel)
adminRouter.get("/dashboard", authAdmin, adminDashboard)


export default adminRouter;
