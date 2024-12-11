import validator from "validator";
import bcrypt from "bcrypt";
import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary'
import bookingModel from "../models/bookingModel.js";
import workerModel from "../models/workerModel.js";
import razorpay from 'razorpay'

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to book booking 
const bookBooking = async (req, res) => {

    try {
        // console.log(req.body)
        const { userId, workerId, slotDate, slotTime } = req.body
        const workerData = await workerModel.findById(workerId).select("-password")

        // console.log(workerData)

        if (!workerData.available) {
            return res.json({ success: false, message: 'Worker Not Available' })
        }

        let slots_booked = workerData.slots_booked

        // checking for slot availablity 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete workerData.slots_booked

        const bookingData = {
            userId,
            workerId,
            userData,
            workerData,
            amount: workerData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newBooking = new bookingModel(bookingData)
        await newBooking.save()

        // save new slots data in docData
        await workerModel.findByIdAndUpdate(workerId, { slots_booked })

        res.json({ success: true, message: 'BOOKing Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}




// API to get user booking for frontend my-booking page
const listBooking = async (req, res) => {
    try {

        const { userId } = req.body
        const bookings = await bookingModel.find({ userId })

        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const cancelBooking = async (req, res) => {
    try {
        const { userId, bookingId } = req.body;
        
        // Fetch booking details
        const bookingData = await bookingModel.findById(bookingId);
        if (!bookingData) {
            return res.json({ success: false, message: 'Booking not found' });
        }

        // Verify the appointment user
        if (String(bookingData.userId) !== String(userId)) {
            return res.json({ success: false, message: 'Unauthorized action' });
        }

        // Cancel the booking
        await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true });

        // Release doctor slot
        const { workerId, slotDate, slotTime } = bookingData;

        // Fetch the doctor data
        const workerData = await workerModel.findById(workerId);
        if (!workerData) {
            return res.json({ success: false, message: 'Doctor not found' });
        }

        // Ensure slots_booked is defined
        let slots_booked = workerData.slots_booked || {};

        // Ensure slots_booked[slotDate] is an array
        slots_booked[slotDate] = slots_booked[slotDate] || [];

        // Remove the slot
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        // Update the doctor data
        await workerModel.findByIdAndUpdate(workerId, { slots_booked });

        res.json({ success: true, message: 'Booking Cancelled' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


// userController.js
const PaymentCompleted = async (req, res) => {
    try {
        const { userId, bookingId } = req.body;

         // Fetch booking details
        const bookingData = await bookingModel.findById(bookingId);
        if (!bookingData) {
            return res.json({ success: false, message: 'Booking not found' });
        }
 
        // Update the payment status
        bookingData.payment = true;
        
        await bookingData.save();

        res.status(200).json({ success: true, message: "Payment status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};





export { registerUser, loginUser, getProfile, updateProfile, bookBooking, listBooking,cancelBooking,PaymentCompleted }