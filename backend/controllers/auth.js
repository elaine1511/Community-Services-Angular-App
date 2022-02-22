const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/users");
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    try {
        const response = await User.find();
        res.json({ status: 'success', response })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({ _id: ObjectId(req.params.id) })
        res.json({ status: 'success', response })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const editUser = async (req, res) => {
    const body = req.body;
    const filter = { _id: ObjectId(req.params.id) };
    const update = {
        username: body.username,
        email: body.email,
        password: body.password,
        address: body.address,
        city: body.city,
        state: body.state,
        zipcode: body.zipcode,
        phone: body.phone,
    };
    try {
        const response = await User.findOneAndUpdate(filter, update, { new: true });
        res.json({ status: 'success', response })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const signUp = async (req, res) => {
    const body = req.body;
    const newUser = new User({
        _id: new ObjectId(),
        username: body.username,
        email: body.email,
        password: body.password,
        address: body.address,
        city: body.city,
        state: body.state,
        zipcode: body.zipcode,
        phone: body.phone,
        active: true,
    });
    console.log(newUser._id)
    const salt = await bcrypt.genSalt(saltRounds);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    try {
        const foundUser = await User.findOne({ email: body.email, username: body.username });
        if (foundUser) {
            console.log(foundUser);
            res.status(404).json({ status: 'user already exists' });
        } else {
            newUser.save().then((doc) => res.status(201).json({ status: 'success', data: doc }));
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    const body = req.body;
    try {
        const foundUser = await User.findOne({ email: body.email });
        if (foundUser) {
            const validPass = await bcrypt.compare(body.password, foundUser.password);
            if (validPass) {
                const userData = {};
                userData.username = foundUser.username,
                    userData.email = foundUser.email,
                    userData._id = foundUser._id;
                userData.address = foundUser.address,
                    userData.city = foundUser.city;
                userData.state = foundUser.state;
                userData.phone = foundUser.phone;
                const token = jwt.sign(userData, process.env.SECRET);
                res.status(200).json({
                    status: 'Success',
                    authtoken: token,
                    userId: userData._id,
                    username: userData.username,
                    address: userData.address,
                    city: userData.city,
                    state: userData.state,
                    phone: userData.phone
                });
            } else {
                return res.status(404).json({ status: 'Password is invalid' });
            }
        } else {
            res.status(401).json({ error: 'User does not exist' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const isAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const jwtToken = authHeader.split(" ")[1];
        try {
            const payload = await jwt.verify(jwtToken, process.env.SECRET);
            console.log(payload)
            if (!payload) {
                return res.status(401).json({ error: 'Authorization error' })
            }
            next();
        } catch (error) {
            res.status(403).json({ error: 'Forbidden' });
        }
    } else {
        res.status(401).json({ error: "unauthorized" });

    }
}

const checkUserName = async (req, res) => {
    console.log(req.params.username)
    try {
        const foundUser = await User.findOne({ username: req.params.username });
        if (foundUser) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(200).json({ success: false })
        }
    } catch (error) {
        res.status(500).json({ message: e.message })
    }
}
const checkEmail = async (req, res) => {
    console.log(req.params.email)
    try {
        const foundUser = await User.findOne({ email: req.params.email });
        if (foundUser) {
            return res.status(200).json({ status: true });
        } else {
            return res.status(200).json({ status: false })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = { getAllUsers, getUserById, editUser, signUp, login, isAuth, checkEmail, checkUserName };