import mongoose from 'mongoose';

const ClinicalSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    bph: { type: Number, required: true },
    bpl: { type: Number, required: true },
    rr: { type: Number, required: true },
    bol: { type: Number, required: true },
    hbr: { type: Number, required: true }
});

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    bdate: { type: Date, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    address: { type: String, required: true },
    status: { type: String, required: true, enum: ['Critical', 'Normal'] },
    image: { type: String, required: false },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clinical: [ClinicalSchema]
});

export default mongoose.model("patients", PatientSchema);


