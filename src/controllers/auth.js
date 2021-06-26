const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const shortid = require('shortid')


//Đăng kí mới
exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        //Trường hợp có lỗi.
        if (error) return res.status(400).json({ message: "Có lỗi khi xác thực thông tin user" });
        //Trường hợp đã tồn tại user name
        if (user) return res.status(400).json({ message: "User đã tồn tại" })
        //Lấy thông tin từ client
        const { firstName, lastName, email, password } = req.body
        //Mã hóa lại mật khẩu
        const hash_password = await bcrypt.hash(password, 10);
        //Tạo một đối tượng User từ thông tin lấy được từ client
        const userTemp = new User({
            firstName,
            lastName,
            email,
            password,
            username: shortid.generate(),
        });
        //Lưu lại thông tin user
        userTemp.save((error, user) => {
            //Trường hợp lỗi
            if (error) {
                return res.status(400).json({ message: "Tạo user thất bại" });
            }
            //Trường hợp lưu thành công.
            if (user) {
                const token = generateJwtToken(user._id, user.role);
                const { _id, firstName, lastName, email, role, fullName } = user;
                return res.status(201).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName },
                });
            }
        })
    });
}

//Check login
exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            const isPassword = await user.authentication(req.body.password)
            if (isPassword && user.role === "user") {
                const token = generateJwtToken(user._id, user.role);
                const { _id, firstName, lastName, email, role, fullname } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullname
                    }
                });
            } else {
                return res.status(400).json({ message: "Something went wrong" })
            }

        } else {
            return res.status(400).json({ message: "Something went wrong" })
        }
    });
}

//Tạo tokenid
const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};
