
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
    res.send("signup route");
};

export const login = async (req, res) => {
    res.send("login route");
};

export const logout = async (req, res) => {
    res.send("logout route");
};