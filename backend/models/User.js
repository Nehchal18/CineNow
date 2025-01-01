import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //     throw new Error('email is invalid');
        //     }
        // },
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        // validate(value) {
        //     if (value.toLowerCase().includes('password')) {
        //     throw new Error('Password should not contain word: password');
        //     }
        // },
    },
    bookings: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Booking",
        }
    ]
    // role: {
    // type: String,
    // default: 'guest',
    // enum: ['guest', 'admin', 'superadmin'],
    // },

    // facebook: String,
    // google: String,

    // phone: {
    // type: String,
    // unique: true,
    // trim: true,
    // validate(value) {
    //     if (!validator.isMobilePhone(value)) {
    //     throw new Error('Phone is invalid');
    //     }
    // },
    // },
    // imageurl: {
    // type: String,
    // },
    // tokens: [
    // {
    //     token: {
    //     type: String,
    //     required: true,
    //     },
    // },
    // ]
});

export default mongoose.model("User", userSchema);