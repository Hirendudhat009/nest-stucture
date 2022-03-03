const User = require('../model/userModel')
const Interest = require('../model/interModel');


exports.postUser = (req, res, next) => {
    

    const user = new User(req.body);
    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch(err => {
            // next(new Error('asdasd'));
            console.log(err)})
}

exports.getUser = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    User.findAndCountAll({
        limit: perPage,
        offset: (currentPage - 1) * perPage,
        include: [{
            model: Interest,
            // attributes: [['id', 'interestId'], ['name', 'name']]
        }],
        // raw: true
        // attributes: [['id', 'userId'], ['firstname', 'firstname'],
        // ['lastname', 'lastname'], ['email', 'email'], ['gender', 'gender']],
    })
        .then(user => {


            // const result = user.map(user1 =>
            //     user1.interests.map(interest => {
            //         return {
            //             userId: user1.id,
            //             firstname: user1.firstname,
            //             lastname: user1.lastname,
            //             email: user1.lastname,
            //             gender: user1.gender,
            //             interests: 
            //                 [
            //                     {
            //                         interestId: interest.id,
            //                         name: interest.name
            //                     }
            //                 ]

            //         }

            //     })
            // return {
            //     userId: user1.id,
            //     firstname: user1.firstname,
            //     lastname: user1.lastname,
            //     email: user1.lastname,
            //     gender: user1.gender,

            // interest: [
            //     {
            //         InterestId: user1.interest.id,
            //         name:user1.interest.name
            //     }
            // ]

            // }

            // )
            res.send({
                'data': user.rows,
                'meta': {
                    currentPage: parseInt(currentPage),
                    perPage: perPage,
                    totalUser: user.count
                }
            })


            // result.prototype.toJSON = function () {
            //     return {
            //         userId: this.id,

            //     
            // }
            // User.prototype.toJSON = function () {
            //     return {
            //         userId: this.id,
            //         firstname: this.firstname,
            //         lastname: this.lastname,
            //         email: this.email,
            //         gender: this.gender,
            //     }
            // }

            // Interest.prototype.toJSON = function () {
            //     return {
            //         interestId: this.id,
            //         name: this.name
            //     }
            // }
            // const result1=result.concat(Interest)


            // res.send({ data: result })
            // res.send({ data: result.map(r => r.toJSON()) })
        })
        .catch(err => console.log(err))
}

exports.postInterest = (req, res, next) => {
    const interest = new Interest({
        name: req.body.name,
        userId: req.body.userId
    });

    interest.save()
        .then((result) => {
            res.send(result)
        })
        .catch(err => console.log(err))
}

exports.getInterest = async (req, res, next) => {
    Interest.findAll()
        .then(interest => {
            res.send({
                'data': interest
            })
        })
        .catch(err => console.log(err))
}