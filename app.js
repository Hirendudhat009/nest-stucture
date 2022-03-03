const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')
const passportConfig = require('./passport-config')(passport)
const sequelize = require('./utils/database');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/is-auth.routes');
const Interest = require('./model/interModel');
const User = require('./model/userModel');
const app = express()


app.use(bodyParser.json({}));//to use json data in body
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRoutes)
app.use('/', userRoutes);

app.use((err, req, res, next) => {
    return res.json({ error: { 'error_message': err.error.message } })
})


// User.hasMany(Interest, { onDelete: 'CASCADE' });
// Interest.belongsTo(User, { foreignKey: 'id' })

User.belongsTo(Interest)


sequelize.sync()
    .then(() => {
        console.log('database connected')
        app.listen(5500);
    })
