import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    service: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: {type: Boolean, default: true},
    fees: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
}, { minimize: false });

const workerModel = mongoose.models.worker || mongoose.model("worker", workerSchema);

export default workerModel;
