import passport from "passport";
import { usersModel } from '../../DAL/mongoDB/models/users.model.js'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from "passport-github2";
import { userService } from "../../services/users/users.service.js";
import { compareData } from '../../utils.js'

passport.use('login', new LocalStrategy(
    async function (username, password, done) {
        try {
            const userDb = await userService.findUser(username)
            if (!userDb) {
                return done(null, false)
            }
            const isPasswordValid = await compareData(password, userDb.password)
            if (!isPasswordValid) {
                return done(null, false)
            }
            return done(null, userDb)
        } catch (error) {
            done(error)
        }
    }
));

passport.use(new GithubStrategy({
    clientID: 'Iv1.63778fdd36c1678e',
    clientSecret: 'b2b82517bcdeba86c0e2342e32bb0af17001b879',
    callbackURL: "http://localhost:8080/api/users/github"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const userDb = await userService.findUser(profile.username)
            if (userDb) {
                return done(null, false)
            }
            const newUser = {
                first_name: profile.displayName.split(' ')[0],
                last_name: profile.displayName.split(' ')[1],
                username: profile.username,
                email: profile._json.email,
                password: ' '
            }
            const result = await userService.createUser(newUser)
            return done(null, result)
        } catch (error) {
            done(error)
        }
    }
))

passport.serializeUser((user,done)=>{
    done(null,user._id)
})


passport.deserializeUser(async(id,done)=>{
    try {
      const user = await usersModel.findById(id)
      done(null,user)  
    } catch (error) {
        done(error)
    }
})