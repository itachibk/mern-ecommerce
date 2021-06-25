const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config();


exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({

                message: `Loi ton tai user ${error}`
            });
            const { firstName, lastName, email, password } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                userName: Math.random(111)
            });

            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: `Loi ${error}`
                    })
                }
                if (data) {
                    return res.status(201).json({
                        user: data
                    })
                }
            });
        });
}

exports.signin = (req, res) => {
    console.log("ss")
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authentication(req.body.password)) {
                    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                    const { firstName, lastName, email, role, fullname } = user;
                    res.status(200).json({
                        token,
                        user: {
                            firstName, lastName, email, role, fullname
                        }
                    })
                } else {
                    return res.status(400).json({ message: "Sai username or passowrd" })
                }

            } else {
                return res.status(400).json({ message: "Something went wrong" })
            }
        });
}