import express from 'express'
import { registerUser,loginUser, getProfile,updateProfile,bookBooking,listBooking,cancelBooking,PaymentCompleted} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser)

userRouter.post("/login", loginUser)
userRouter.get("/get-profile",authUser, getProfile)

userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)

userRouter.post("/book-booking", authUser, bookBooking)
userRouter.get("/bookings", authUser, listBooking)

userRouter.post("/cancel-booking", authUser, cancelBooking)
userRouter.post("/payment-completed", authUser,PaymentCompleted);

export default userRouter