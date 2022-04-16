const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

//Team Model
const Team = require('../models/Team');
const {Member} = require('../models/Member');

//error formatter
const errorFormatter = e => {
    let errors = {}

    //Member validation failed: year: Year of study should be either 1, 2, 3, 4, email: This email is already registered.,

    const allErrors = e.substring(e.indexOf(':')+1).trim()
    const allErrorsArrayFormat = allErrors.split(',').map(err => err.trim());
    allErrorsArrayFormat.forEach(error => {
        const [key, value] = error.split(':').map(err => err.trim());
        errors[key] = value;
    });

    return errors;
}

//Register Handle
router.post('/create', async (req, res) => {
    const { teamName, memberName, password, email, rollNo, phone, branch, year } = req.body;
    // console.log(teamName, password);
    // const name = memberName
    const leader = {
        memberName,
        rollNo,
        email,
        phone,
        branch,
        year
    }
    // console.log(leader);
    try {

        const newTeam = await Team.create({
            teamName,
            password,
            leader
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) => 
        bcrypt.hash(newTeam.password, salt, async (err, hash) => {
            if(err) throw err;
            //Set password to hashed
            const t = await Team.findByIdAndUpdate(newTeam._id, {
                $set:{
                    password: hash
                }
            }, {new: true});
            // newTeam.password = hash;
            // console.log('hello1');
            //Save team
            // await newTeam.save();
            // console.log(result);
           
        }))
        console.log('hello');
        console.log(newTeam);
        const tId = newTeam._id;
        const newMember = await Member.create(leader);
        newMember.isLeader = true;
        newMember.teamId = tId;
        await newMember.save();

        const team = await Team.findByIdAndUpdate(tId, {
            $set:{
                noOfMembers: 1,
                memberIds: [newMember._id]
            }
        }, {new: true});
        console.log('updated: ', team);
        // newTeam.leader.isLeader = true;
        // newTeam.noOfMembers = 1;
        // newTeam.memberIds.push(newMember._id);
        // await newTeam.save();
        res.status(200).json(team);
        
        // try{
        //     const newMember = await Member.create({
        //         memberName,
        //         rollNo,
        //         email,
        //         phone,
        //         branch,
        //         year,
        //         teamId: newTeam._id
        //     });

        //     newTeam.memberIds.push(newMember._id);
        //     newTeam.noOfMembers += 1;
        //     await newTeam.save();
        //     res.status(200).json(newTeam);
        // }catch (err){
        //     console.log('hello');
        //     Team.deleteOne({ _id: tId })
        //         .then(result => {
        //             // console.log('result: ', result);
        //             const e = errorFormatter(err.message);
        //             res.status(400).send(e);
        //         })
        //         // .catch(error => console.log(error))
        //     ;
        // }

    }catch (err){
        console.log('hi');
        const e = errorFormatter(err.message);
        res.status(400).send(e);
    }
});

module.exports = router;