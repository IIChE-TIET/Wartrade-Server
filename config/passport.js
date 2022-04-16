const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Load Team model
const Team = require('../models/Team');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'teamName' }, (teamName, password, done) => {
            //Match team
            Team.findOne({ teamName: teamName })
                .then(team => {
                    if(!team){
                        return done(null, false, { message: 'That team name is not registered' });
                    }

                    //Match the password
                    bcrypt.compare(password, team.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch){
                            return done(null, team);
                        }else{
                            return done(null, false, { message: 'Password is incorrect'});
                        }
                    });
                })
                .catch(err => console.log(err))
            ;
        })
    )
    passport.serializeUser((team, done) => {
        done(null, team.id);
    });
    
    passport.deserializeUser((id, done) => {
        Team.findById(id, (err, team) => {
            done(err, team);
        });
    });
}