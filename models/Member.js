const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const MemberSchema = new mongoose.Schema({
    memberName:{
        type: String,
        required: [true, 'Please enter your name']
    },
    rollNo:{
        type: Number,
        required: [true, 'Please enter your rollNo'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'Please enter your email id'],
        unique: [true, 'This email id is already registered']
    },
    phone:{
        type: Number,
        maxlength: [10, 'Phone number should of 10 digits'],
        minlength: [10, 'Phone number should of 10 digits'],
        required: [true, 'Please enter your phone number'],
        unique: [true, 'This Phone number is already registered']
    },
    branch:{
        type: String,
        required: [true, 'Please enter your branch']
    },
    year:{
        type: Number,
        enum: [[1, 2, 3, 4], 'Year of study should be either 1 2 3 or 4'],
        required: [true, 'Please select your year of study']
    },
    isLeader:{
        type: Boolean,
    },
    teamId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }
}, {timestamps: true});

MemberSchema.plugin(uniqueValidator, { message: 'This {PATH} is already registered.' });

const Member = mongoose.model('Member', MemberSchema);
module.exports = {Member, MemberSchema};