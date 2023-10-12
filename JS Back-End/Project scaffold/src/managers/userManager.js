const { SECRET } = require('../configs/config');
const jwt = require('../lib/jwt');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login =async (username, password) => {
    const user =await checkForExistingUser(username)
    
    if (!user) {
        throw new Error ('Email or password wrong');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid user or password!')
    }

    const token = await generateToken(user)

    return token;
}

exports.register =async (userData) => {
    const user = await checkForExistingUser(userData.username)
    if (user){
        throw new Error('Username has already been used!')
    }
    if (userData.password !== userData.rePassword){
        throw new Error(`Passwords don't match!`)
    }
    
    const hash = await bcrypt.hash(userData.password, 10)
    userData.password = hash;

    const createdUser = User.create(userData);
    const token =await generateToken(createdUser);

    return token;
}

const checkForExistingUser =async (username) => {
    const user = await User.findOne({username});
    return user;
}

function generateToken(user){
    
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    };

    const token = jwt.sign(payload, SECRET, {
        expiresIn: '2d'
    });

    return token;
}