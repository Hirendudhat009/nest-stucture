const express = require('express')
const userController = require('../controller/userController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
    passError: true
})
const passport = require('passport')

const router = express.Router();


router.get('/', passport.authenticate('jwt', { session: false }), userController.getUser);

const schema = Joi.object({
    firstname: Joi.string().min(5).required(),
    lastname: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required().valid('male', 'female', 'other'),
    interestId: Joi
        .required()
});

router.post('/', validator.body(schema), userController.postUser);

router.post('/interest', userController.postInterest)
router.get('/interest',passport.authenticate('jwt', { session: false }), userController.getInterest)


module.exports = router