var User = require("./users.model");
// let Teacher = require("../teacher/teacher.model");
// let Student = require("../student/student.model");
let Member = require("../member/member.model")
var jwt = require("jsonwebtoken");
var config = require("../../config/database");
let nodemailer = require("nodemailer");
var bcrypt = require("bcryptjs");
// var jwtDecode = require("jwt-decode");

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(" ");
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = {
    SignUp: async (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.status(401).json({
                success: false,
                message: "Please pass username and password."
            });
        } else {
            try {
                var newUser = new User({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    role: req.body.role
                });
                var user = await User.create(newUser);
                if (req.body.role == "Member" || !req.body.role) {
                    await Member.create(
                        {
                            user: user._id
                        },
                        (err, data) => {
                            if (err) {
                                res.status(400).json({
                                    success: false,
                                    message: err.message
                                });
                            }
                            res.status(201).json({
                                success: true,
                                message: "Successful created new member.",
                                // data:data
                            });
                        }
                    );
                }
            } catch (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
        }
    },
    SignIn: (req, res) => {
        User.findOne(
            {
                username: req.body.username
            },
            function (err, user) {
                if (err) throw err;

                if (!user) {
                    res.status(401).send({
                        success: false,
                        msg: "Authentication failed. User not found."
                    });
                } else {
                    // check if password matches
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            // if user is found and password is right create a token
                            var token = jwt.sign(user.toJSON(), config.secret, {
                                expiresIn: 604800 // 1 week
                            });
                            // return the information including token as JSON
                            res.json({
                                success: true,
                                token: "JWT " + token
                            });
                        } else {
                            res.status(401).send({
                                success: false,
                                msg: "Authentication failed. Wrong password."
                            });
                        }
                    });
                }
            }
        );
    },
    LogOut: function (req, res) {
        req.logout();
        res.json({
            success: true,
            msg: "Sign out successfully."
        });
    },
    forgotPassword: async (req, res) => {
        // res.json({msg:req.user});
        try {
            var token = jwt.sign(
                {
                    data: req.body.email
                },
                config.secret,
                {
                    expiresIn: 300
                }
            ); // 5 minutes
            await User.findOneAndUpdate(
                {
                    email: req.body.email
                },
                {
                    currentToken: token
                }
            );
        } catch (error) {
            console.log(err.message);
        }
        var transporter = nodemailer.createTransport({
            // config mail server
            service: "Gmail",
            auth: {
                user: "cskh.vaic@gmail.com",
                pass: "Vaic@123456"
            }
        });
        var mainOptions = {
            // thiết lập đối tượng, nội dung gửi mail
            from: "Sanda.asia",
            to: req.body.email,
            subject: `Reset password for user ${req.body.email}`,
            text: "Reset password for you ",
            html: `Access the password change link: http://localhost:3000/change-password/${token}`
        };
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log("Message sent: " + info.response);
                res.status(201).json({
                    msg: info.response,
                    token: token
                });
            }
        });
    },

    updateUserProfile: async (req, res) => {
        let newUser = {
            fullname: req.body.fullname,
            about: req.body.about,
            connect: req.body.connect
        };
        if (req.file) {
            //if exists file => update file
            newUser.avatar = req.file.filename;
        }
        const validateEmail = email => {
            const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return re.test(email);
        };
        try {
            if (req.body.email) {
                if (validateEmail(req.body.email)) newUser.email = req.body.email;
                else throw new Error("Please provide a valid email address!");
            }
            await User.findOneAndUpdate({ _id: req.user.data._id }, newUser);
            res.status(200).json({ message: "Update user successfully!", as: true });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    changePassword: async (req, res) => {
        let token = getToken(req.headers);
        try {
            var decode = jwt.verify(token, config.secret);
        } catch (error) {
            res.status(401).json({
                success: false,
                msg: "Unauthorzition"
            });
        }
        //find user
        User.findOne(
            {
                email: decode.email
            },
            (err, user) => {
                if (err) throw err;
                if (!user) {
                    res.status(401).send({
                        success: false,
                        msg: "Authentication failed. User not found."
                    });
                } else {
                    // check if password matches
                    user.comparePassword(req.body.Oldpassword, function (err, isMatch) {
                        if (isMatch && !err) {
                            // if user is found and password is right create a token
                            var token = jwt.sign(user.toJSON(), config.secret, {
                                expiresIn: 604800 // 1 week
                            });
                            // return the information including token as JSON
                            if (req.body.newPassword == req.body.confirmPassword) {
                                bcrypt.genSalt(10, function (err, salt) {
                                    if (err) {
                                        return res.send(err);
                                    }
                                    bcrypt.hash(req.body.newPassword, salt, null, function (
                                        err,
                                        hash
                                    ) {
                                        if (err) {
                                            return res.send(err);
                                        }
                                        console.log(hash);
                                        User.findOneAndUpdate(
                                            {
                                                _id: user._id
                                            },
                                            {
                                                password: hash
                                            },
                                            (err, data) => {
                                                if (err) {
                                                    res.status(500).json({
                                                        msg: err.message
                                                    });
                                                }
                                                res.status(200).json({
                                                    success: true,
                                                    msg: "Password was changed"
                                                });
                                            }
                                        );
                                    });
                                });
                            } else {
                                res.status(401).send({
                                    success: false,
                                    msg: "Password not match"
                                });
                            }
                        } else {
                            res.status(401).send({
                                success: false,
                                msg: "Authentication failed. Wrong Oldpassword."
                            });
                        }
                    });
                }
            }
        );
    },

    resetPassword: async (req, res) => {
        let token = req.params.token || null;
        try {
            var decode = jwt.verify(token, config.secret);
        } catch (error) {
            res.status(401).json({
                success: false,
                msg: "Unauthorzition"
            });
        }
        // res.send(decode)
        User.findOne(
            {
                email: decode.data
            },
            (err, user) => {
                if (user.currentToken != token) {
                    res.status(401).json({
                        success: false,
                        msg: "Token is wrong!"
                    });
                } else {
                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) {
                            return next(err);
                        }
                        bcrypt.hash(req.body.password, salt, null, function (err, hash) {
                            if (err) {
                                return next(err);
                            }
                            User.findOneAndUpdate(
                                {
                                    _id: user._id
                                },
                                {
                                    password: hash
                                },
                                (err, data) => {
                                    if (err) {
                                        res.status(500).json({
                                            msg: err.message
                                        });
                                    }
                                    res.status(200).json({
                                        success: true,
                                        msg: "Password was changed"
                                    });
                                }
                            );
                        });
                    });
                }
            }
        );
    },

    recharge: async (req, res) => {
        //for student //role: only admin
        try {
            let student = await Student.findOneAndUpdate(
                {
                    user: req.params.idStudent
                },
                {
                    $inc: {
                        balance: +req.body.value
                    }
                }
            );
            if (!student)
                return res.status(404).json({
                    err_msg: "Student not found!"
                });
        } catch (error) {
            res.status(500).json({
                err_msg: error.message
            });
        }
    },

    withdrawal: async (req, res) => {
        //for teacher // role: only admin
        try {
            let value = req.body.value || 0;
            await Teacher.findOne({
                user: req.params.idTeacher
            });
            let update = await Teacher.update(
                {
                    salary: {
                        $gte: value
                    }
                },
                {
                    $inc: {
                        salary: -value
                    }
                }
            );
            if (update.n === 0)
                return res.status(400).json({
                    err_msg: "Withdrawal value is greater than the balance"
                });
            res.status(200).json({
                message: "Withdrawal successfully!"
            });
        } catch (error) {
            if (error.name == "CastError")
                res.status(404).json({
                    error_msg: "Teacher was not found"
                });
            res.status(500).json({
                err_msg: error
            });
        }
    },

    usCheck: async (req, res) => {
        try {
            let userCheck = false;
            let user = await User.find({
                username: req.params.username
            });
            if (user.length > 0) {
                userCheck = true;
            }
            res.status(200).json({
                checkUser: userCheck
            });
        } catch (error) {
            res.status(500).json({
                err_msg: error
            });
        }
    },

    infoUser: async (req, res) => {
        try {
            let user = await User.find({
                _id: req.params.id
            }).select("-password");
            res.status(200).json({
                info: user
            });
        } catch (error) {
            res.status(500).json({
                err_msg: error
            });
        }
    },
    getIncomeAdmin: async (req, res) => {
        try {
            let teacher = await Teacher.find({});
            if (!teacher)
                return res.status(404).json({ message: "Teacher not found" });
            let income = teacher.map(item => item.salary).reduce((a, b) => a + b);
            res.status(200).json({ income: (income * 3) / 7 });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    decodeJWT: async (req, res) => {
        try {
            if (req.params.token) {
                jwt.verify(req.params.token, config.secret, async (err, decode) => {
                    if (err) {
                        let result = {
                            success: false,
                            message: err.message
                        };
                        res.status(301).json(result);
                    } else {
                        res.status(200).json({
                            success: true,
                            message: 'Authorized.',
                            data: {
                                userID: decode._id
                            }
                        })
                    }
                });
            } else {
                return res.status(403).send({
                    success: false,
                    message: 'Unauthorized.'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },
    decodeJWT2: async (req, res) => {
        let token = getToken(req.headers);
        try {
            if (token) {
                jwt.verify(token, config.secret, async (err, decode) => {
                    if (err) {
                        let result = {
                            success: false,
                            message: err.message
                        };
                        res.status(301).json(result);
                    } else {
                        res.status(200).json({
                            success: true,
                            message: 'Authorized.',
                            data: {
                                userID: decode._id
                            }
                        })
                    }
                });
            } else {
                return res.status(403).send({
                    success: false,
                    message: 'Unauthorized.'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
};
