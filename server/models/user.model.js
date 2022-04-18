const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "First name is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Email is required"],
        minLength: [8, "Password must be at least 8 characters"]
    }
}, { timestamps: true })

UserSchema.virtual('confirmPass')
    .get(() => this.confirmPass)
    .set(value => this.confirmPass = value)

UserSchema.pre('validate', function (next) {
    if (this.confirmPass.length === 0) {
        this.invalidate('confirmPass', "Confirm password is required");
    } if (this.password !== this.confirmPass) {
        this.invalidate('confirmPass', "Password must match confirm password");
        
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});
UserSchema.plugin(uniqueValidator);

const User = mongoose.model("user", UserSchema);

module.exports = User;