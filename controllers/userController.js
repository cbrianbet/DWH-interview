const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Op} = require("sequelize");
const {sequelize} = require("../db_connection");
const initModels = require("../database/models_generated/init-models");
const models = initModels(sequelize);

exports.add = async (req, res, next) => {
    try {
        let {email} = req.body;
        const email_user = await models.users.findOne({where: {email}});
        if (email_user)
            return res
                .status(400)
                .json({message: `User with email: ${email} already exists.`});

        let newUser = req.body;
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        newUser.createdAt = new Date();
        newUser.accesslevel = 2
        await models.users.create(newUser)

        res.status(201).json({message: "User Added Successfully"});
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.user = async (req, res, next) => {
    try {
        res.json({
            user: req.user
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error
        })
    }
};

exports.update = async (req, res, next) => {
    try {
        let uid = req.userId;
        let facility = await models.facilityusers.findOne({where: {user: uid}});
        if (facility)
            return res
                .status(400)
                .json({message: `User already attached to facility.`});

        let userfacility = await models.facilityusers.create(
            req.body
        );
        res.status(200).json({message: "User Updated Successfully", userfacility});
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        //  Now find the user by their email address
        let user = await models.users.findOne({where: {email: req.body.email}});
        if (!user) {
            return res.status(400).json({message: "Incorrect username or password."});
        }

        // Then validate the Credentials in db match
        // those provided in the request
        console.log(user)
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            console.log('Icorrect')
            return res.status(400).json({message: "Incorrect username or password."});
        }

        let {id, email, firstName, lastName, accesslevel} = user;
        const token = jwt.sign({
            id, email, firstName, lastName, accesslevel
        }, `${process.env.SECRET_KEY}`, {expiresIn: 60 * 60 * 24});
        res.status(200).json({token, user: {id, email, firstName, lastName, accesslevel}});
    } catch (error) {
        error.status = 400;
        next(error);
    }
};
