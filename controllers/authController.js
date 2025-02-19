const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const getUserCollection = require("../models/userModel");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const users = getUserCollection();

        const existingUser = await users.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await hashPassword(password);
        await users.insertOne({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = getUserCollection();

        const user = await users.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};

module.exports = { signup, login };
