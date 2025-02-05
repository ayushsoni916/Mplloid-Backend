const User = require("../models/UserSchema");
const generateToken = require("../utills/jwtHelper");

// Email Validation Helper Function
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

// Key Validation Helper Function
const isValidKey = (key) => {
    return key.endsWith("n?Q!vJaiShreeRam");
};

async function createUser(req, res) {
    try {
        const { name, email, phone, key } = req.body;

        if (!name || !email || !phone || !key) {
            return res.status(400).json({ message: "name, email, phone, and key are required" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!isValidKey(key)) {
            return res.status(400).json({ message: "Invalid key format" });
        }

        // Check if the email or phone already exists
        const existUser = await User.findOne({ 
            $or: [{ email }, { phone }]
        });

        if (existUser) {
            return res.status(400).json({ message: "Email or phone number is already registered" });
        }

        // Create a new user
        const newUser = await User.create({ name, email, phone });

        // Generate JWT token
        const token = generateToken(newUser._id);

        console.log(token)

        return res.status(201).json({ message: "User created successfully", user: newUser, token });

    } catch (error) {
        console.error("Error in createUser:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = createUser;
