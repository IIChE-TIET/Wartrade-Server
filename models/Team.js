const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const {MemberSchema} = require('./Member');

const TeamSchema = new mongoose.Schema({
    teamName:{
        type: String,
        unique: [true, 'This Team Name is already registered'],
        required: [true, 'Please enter the Team Name']
    },
    password:{
        type: String,
        minlength: [6, 'Password should be of minimum 6 characters'], 
        required: [true, 'Please enter the Password']
    },
    code:{
        type: String,
        // required: true
    },
    leader:{
        type: MemberSchema,
        required: true,
        _id: false
    },
    noOfMembers:{
        type: Number,
        // required: true,
        maxlength: 4,
        default: 0
    },
    memberIds:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Member",
    }
}, {timestamps: true});

TeamSchema.plugin(uniqueValidator, { message: 'This {PATH} is already registered.' });

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;