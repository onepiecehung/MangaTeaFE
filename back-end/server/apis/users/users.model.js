var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
// var autoIncrement = require("mongoose-plugin-autoinc")


const validateEmail = email => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        minlength: [5, 'The username should be at least 5 characters long']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please provide a valid email address'],
        default: 'unknown@need-deleted.com' // cái này cho đăng nhập bằng mxh
    },
    password: {
        type: String,
        minlength: [8, 'The password should be at least 8 characters long']
    },
    status: {
        type: Number,
        default: 1
    },
    permission: {
        type: Number
    },
    role: [{
        type: String,
        enum: ['Admin', 'Member', 'Sudo'],
        default: 'Member' // để  admin cho test api, thực tế sẽ là student, còn bây giờ nó là đăng ký cho mxh
    }],
    createAt: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: "No image"
    },
    currentToken: {
        type: String
    },
    permission: [{
        type: Number
    }],
    fromCountry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Langauge',
        // default: "Unknown_ID"
    },
    appellation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appellation',
        // default: "Unknown_ID"
    }],
});


UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                if (user.password == undefined) {
                    user.password = "Error_Need_Action"
                }
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// UserSchema.plugin(autoIncrement.plugin, {
//     model: 'UserSchema',
//     field: '_id'
// });
module.exports = mongoose.model('User', UserSchema);
