import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true, enum: ['CareGiver', 'Doctor', 'Nurse'] }
});

export default mongoose.model("Users", UserSchema);