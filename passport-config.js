const localStratagy = require('passport-local').Strategy
const JWTstratagy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStratagy = require('passport-google-oauth20').Strategy

const bcrypt = require('bcryptjs')
const Login = require('./model/is-auth.model');


module.exports = function (passport) {

    passport.use(new localStratagy({ usernameField: 'email' }, (email, password, done) => {

        Login.findOne({ where: { email: email } })
            .then(user => {
                if (!user) {
                    return done({ error_meesage: 'email is not exist' }, false)
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done({ error_meesage: 'invalid password' }, false)
                    }
                })
            })
            .catch(err => console.log(err))
    })
    );

    passport.use(new JWTstratagy({
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
    },
        async (token, done) => {
            try {
                return done(null, token.user)
            }
            catch (error) {
                return done(error)
            }
        }
    ))

    passport.use(new FacebookStrategy({
        clientID: '1748835005293921',
        clientSecret: '96b375a38a154cf3f048862dd101e941',
        callbackURL: "http://localhost:5500/auth/facebook/callback",
        enableProof: true
    },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile)
        }
    ));


    passport.use(new GoogleStratagy({
        clientID: '980511279132-gmfl0raghf16numc65mhhsq1svl5f0c0.apps.googleusercontent.com',
        clientSecret: 'VR1kgPKmurh8g1yZJ4pkvbJ1',
        callbackURL: '/google/callback'

    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile)
    }
    ))
}

















// async function initialize(passport, getUserByEmail) {
//     const authenticateUser = async (email, password, done) => {
//         const user = Login.findOne({ where: { email: email } })
//         if (user == null) {
//             return done(null, false, { message: 'user is not registered' })
//         }
//         try {
//             if (await bcrypt.compare(password, user.password)) {
//                 return done(null, user)
//             } else {
//                 return done(null, false, { message: 'incorrect password' })
//             }
//         }
//         catch (e) {
//             return done(e)
//         }

//     }
//     passport.use(new localStratagy({ usernameField: 'email' }, authenticateUser))
// }

// module.exports = initialize;