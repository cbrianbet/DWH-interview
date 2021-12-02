const jwt = require("jsonwebtoken")
// models
const {sequelize} = require("../db_connection");
const initModels = require("../database/models_generated/init-models");
const models = initModels(sequelize);

const SECRET_KEY = process.env.SECRET_KEY

exports.encode = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await models.user.getUserById(userId);
        const payload = {
            userId: user._id,
            userType: user.type,
        };
        req.authToken = jwt.sign(payload, SECRET_KEY);
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.error });
    }
}

exports.decode = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
        req.userId = decoded.id;
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}
