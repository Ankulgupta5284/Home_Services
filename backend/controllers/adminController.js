import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import workerModel from '../models/workerModel.js';
import jwt from 'jsonwebtoken';
import bookingModel from '../models/bookingModel.js';
import userModel from '../models/userModel.js'

// API for admin authentification
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// api for adding worker

const addWorker = async (req, res) => {
    try {
        const { name, email, password, service, experience, about, fees, address } = req.body;
        const imageFile=req.file

        // Checking for all data to add worker
        if (!name || !email || !password || !service || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url


        const workerData = {
            name,
            email,
            image:imageUrl,
            password: hashedPassword,
            service,
            experience,
            about,
            fees,
            address: JSON.parse(address),  // Ensure this is parsed as JSON
            date: Date.now()
        };

        const newWorker = new workerModel(workerData);
        await newWorker.save();
        res.json({ success: true, message: 'Worker Added' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// API to get all workers list for admin panel
const allWorkers = async (req, res) => {
    try {

        const workers = await workerModel.find({}).select('-password')
        res.json({ success: true, workers })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to get all appointments list
const bookingsAdmin = async (req, res) => {
    try {

        const bookings = await bookingModel.find({})
        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API for booking cancellation
const bookingCancel = async (req, res) => {
    try {

        const { bookingId } = req.body
        await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })

        res.json({ success: true, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const workers = await workerModel.find({})
        const users = await userModel.find({})
        const bookings = await bookingModel.find({})

        const dashData = {
            workers: workers.length,
            bookings: bookings.length,
            customers: users.length,
            latestBookings: bookings.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}





export { addWorker,loginAdmin,allWorkers,bookingsAdmin,bookingCancel,adminDashboard};
