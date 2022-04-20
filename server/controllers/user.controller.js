const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');




module.exports.register = (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id,
                username: user.username
            }, process.env.SECRET_KEY);
            res
                .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                    httpOnly: true
                })
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        return res.sendStatus(400);
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
        return res.sendStatus(400);
    }
    const userToken = jwt.sign({
        id: user._id,
        username: user.username,
    }, `${process.env.SECRET_KEY}`);

    res.cookie("usertoken", userToken, process.env.SECRET_KEY, {
        httpOnly: true
    })
        .json({ msg: "Success!"});
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getLoggedInUser = (req, res) => {
    const decodedJwt = jwt.decode(req.cookies.usertoken, {complete:true})
    User.findOne({_id: decodedJwt.payload.id})
        .then(foundUser =>{
            res.json({results: foundUser})
        })
        .catch(err=>{
            res.json(err)
        })

}

module.exports.getAll = (req, res) => {
    User.find({})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({ message: "that didnt quite work", err }))
}

