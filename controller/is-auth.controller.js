const Login = require('../model/is-auth.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = (req, res, next) => {
    Login.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user) {
                res.send({ error: { error_message: 'email is already registered' } })
            }
            const email = req.body.email;
            const password = req.body.password;

            bcrypt.hash(password, 12)
                .then(hasepassword => {
                    const signup = new Login({
                        email: email,
                        password: hasepassword
                    })
                    return signup.save()
                })
                .then(result => {
                    res.send(result)
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

}

exports.login = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    Login.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                res.send({ error: { error_message: 'invalid e-mail' } })
            }
            // bcrypt.compare(password, user.password)
            //     .then(isMatch => {

            //     })
            // const token = jwt.sign({
            //     email: user.email
            // }, 'supersecret')
            // res.send({ 'token': token })

        })
        .catch(err => console.log(err))

}

