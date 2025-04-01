import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, position } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            position
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update user by ID
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
