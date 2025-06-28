import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../util/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../util/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const verificationToken = generateVerificationToken();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationExpires: Date.now() + 24 * 60 * 60 * 1000
        });

        await newUser.save();

        generateTokenAndSetCookie(res, newUser._id);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...newUser._doc,
                password: undefined
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    res.send("login route");
};

export const logout = async (req, res) => {
    res.send("logout route");
};