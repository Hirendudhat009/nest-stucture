const express = require('express');
const authController = require('../controller/is-auth.controller')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
    passError: true
})
const router = express.Router();

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
})

router.post('/signup', validator.body(schema), authController.signup);

router.post('/login', async (req, res, next) => {
    passport.authenticate('local',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    res.json({ ' error': err })
                    return next(err);
                }
                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);

                        const body = { id: user.id, email: user.email };
                        const token = jwt.sign({ user: body }, 'TOP_SECRET', { expiresIn: 3600 * 24 });
                        return res.json({ token });
                    })
            } catch (error) {
                return next(error)
            }
        })(req, res, next)
})


// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true,
//     session: false
// })
//     , authController.login);


router.get('/auth/facebook',
    passport.authenticate('facebook', { successRedirect: '/' }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', passport.authenticate('google'))

module.exports = router;