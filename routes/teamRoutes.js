const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const  { nanoid } = require('nanoid');

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

//Create Team
router.post('/create', async (req, res) => {
    const { teamName, memberName, password, email, rollNo, phone, branch, year } = req.body;
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
            code: nanoid(12),
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
           
        }))
        // console.log('hello');
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
        // console.log('hi');
        const e = errorFormatter(err.message);
        res.status(400).send(e);
    }
});

// join team
router.post('/join', async (req, res) => {
    const { code, memberName, email, rollNo, phone, branch, year } = req.body;
    try{
        const team = await Team.findOne({code: code});
        if(team){
            if(team.noOfMembers < 4){
                try{
                    const newMember = await Member.create({
                        memberName,
                        rollNo,
                        email,
                        phone,
                        branch,
                        year,
                        isLeader: false,
                        teamId: team._id
                    });

                    const updatedTeam = await Team.findByIdAndUpdate(team._id, {
                        $push:{
                            memberIds: newMember._id
                        },
                        $inc:{
                            noOfMembers: 1
                        }
                    }, {new: true})

                    res.status(200).json(updatedTeam);
                }catch(err){
                    const e = errorFormatter(err.message);
                    res.status(400).send(e);
                }
            }else{
                res.status(400).send('Team is already full');
            }
        }else{
            res.status(400).send('Team code is invalid');
        }
    }catch(err){
        const e = errorFormatter(err.message);
        res.status(400).send(e);
    }
});

//Login Hande
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        // failureFlash: true
    })(req, res, next);
});

//Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    // req.flash('success_msg', 'You are logged out successfully!');
    res.redirect('/teams/login');
})

module.exports = router;