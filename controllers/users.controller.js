const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

// Create a new user
// exports.createUser = async (req, res) => {
//     try {
//         const newUser = new User(req.body);
//         await newUser.save();
//         res.status(201).send(newUser);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };
exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};




// Login user
exports.loginUser = async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });

if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
}

// Create JWT token
const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

res.json({ token });
} catch (error) {
res.status(500).json({ message: error.message });
}
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

