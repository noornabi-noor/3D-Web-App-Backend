import { generateToken } from "../../utils/token.js";
import { authService } from "./auth.service.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await authService.createUser({ name, email, password: hashedPassword });

        res.status(201).json({
            status: "Success",
            message: "User created successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Failed to create user",
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authService.findUser(email);

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                status: "Error",
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            status: "Success",
            message: "Login successful",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token: token
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Failed to login",
            error: error.message
        });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.status(200).json({
            status: "Success",
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

export const authController = {
    createUser,
    loginUser,
    logoutUser
};