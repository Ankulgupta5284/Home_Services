import workerModel from "../models/workerModel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bookingModel from "../models/bookingModel.js";
 

// API for doctor Login 
const loginWorker = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await workerModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get Worker bookings for worker panel
const bookingsWorker = async (req, res) => {
    try {

        const { workerId } = req.body
        const bookings = await bookingModel.find({ workerId })

        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}





// API to change doctor availablity for Admin and Doctor Panel
const changeAvailablity = async (req, res) => {
    try {

        const { workerId } = req.body

        const workerData = await workerModel.findById(workerId)
        await workerModel.findByIdAndUpdate(workerId, { available: !workerData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to get all workers list for Frontend
const workerList = async (req, res) => {
    try {

        const workers = await workerModel.find({}).select(['-password', '-email'])
        res.json({ success: true, workers })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to cancel Booking for Worker panel
const bookingCancel = async (req, res) => {
    try {
        const { workerId, bookingId } = req.body;

        // Validate input parameters
        if (!workerId || !bookingId) {
            return res.status(400).json({ success: false, message: 'Worker ID and Booking ID are required' });
        }

        const bookingData = await bookingModel.findById(bookingId);
        if (bookingData && bookingData.workerId.toString() === workerId.toString()) {
            await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true });
            return res.json({ success: true, message: 'Booking Cancelled' });
        }

        return res.status(404).json({ success: false, message: 'Booking not found or unauthorized access' });
    } catch (error) {
        console.error('Error in bookingCancel:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while cancelling the booking' });
    }
};

// API to mark appointment completed for doctor panel
const bookingComplete = async (req, res) => {
    try {
        const { workerId, bookingId } = req.body;

        // Validate input parameters
        if (!workerId || !bookingId) {
            return res.status(400).json({ success: false, message: 'Worker ID and Booking ID are required' });
        }

        const bookingData = await bookingModel.findById(bookingId);
        if (bookingData && bookingData.workerId.toString() === workerId.toString()) {
            await bookingModel.findByIdAndUpdate(bookingId, { isCompleted: true });
            return res.json({ success: true, message: 'Booking Completed' });
        }

        return res.status(404).json({ success: false, message: 'Booking not found or unauthorized access' });
    } catch (error) {
        console.error('Error in bookingComplete:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while completing the booking' });
    }
};

// API to get dashboard data for worker panel
const workerDashboard = async (req, res) => {
    try {

        const { workerId } = req.body

        const bookings = await bookingModel.find({ workerId })

        let earnings = 0

        bookings.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let customers = []

        bookings.map((item) => {
            if (!customers.includes(item.userId)) {
                customers.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            bookings: bookings.length,
            customers: customers.length,
            latestBookings: bookings.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// API to get worker profile for  worker Panel
const workerProfile = async (req, res) => {
    try {

        const { workerId } = req.body
        const profileData = await workerModel.findById(workerId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to update worker profile data from  Worker Panel
const updateWorkerProfile = async (req, res) => {
    try {

        const { workerId, fees, address, available } = req.body

        await workerModel.findByIdAndUpdate(workerId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



export {changeAvailablity,workerList,loginWorker,bookingsWorker,bookingCancel,bookingComplete,workerDashboard,workerProfile,updateWorkerProfile}