const {Op} = require("sequelize");
const {Sequelize} = require("sequelize");

const {sequelize} = require("../db_connection");
var initModels = require("../database/models_generated/init-models");
var models = initModels(sequelize);

exports.addPatient = async (req, res, next) => {
    try {
        if (req.user.accesslevel !== 2)
            res.status(400).send('user is not facility user')
        let facility_user = await models.facilityusers.findOne({where: {user: req.userId}})
        console.log(facility_user)
        if (!facility_user)
            res.status(400).json({success: false, message: "user not attached to facility"})

        let newPatient = req.body;
        newPatient.createdAt = new Date();
        newPatient.updatedAt = new Date();
        newPatient.facility = facility_user.facility
        await models.patients.create(newPatient);


        return res.status(201).json({message: "Patient details recorded successfully"});
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.pushMonthly = async (req, res, next) => {
    try {
        let facility_user = await models.facilityusers.findOne({where: {user: req.userId}})
        if (!facility_user)
            res.status(400).json({success: false, message: "user not attached to facility"})


    } catch (error) {
        error.status = 400;
        next(error);
    }

}

exports.getPushed = async (req, res, next) => {
    try {
        let facility_user = await models.facilityusers.findOne({where: {user: req.userId}})
        if (facility_user) {
            let data = await models.pushdata.findAll({where: {facility: facility_user.facility}})

            res.json({data})
        }
        res.status(400).json({success: false, message: "user not attached to facility"})

    } catch (error) {
        error.status = 400;
        next(error);
    }

}

exports.getPushedAdmin = async (req, res, next) => {
    try {
        let patients_gender, patients_reg, patients_age
        if (req.user.accesslevel === 2) {
            let facilityusers = await models.facilityusers.findOne({where: {user: req.userId}})

            patients_reg = await models.patients.findAll({
                where:{ facility : facilityusers.facility },
                attributes: [
                    [sequelize.fn('MONTH', sequelize.col('createdAt')), 'data'],
                    [sequelize.fn('YEAR', sequelize.col('createdAt')), 'year'],
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['data', 'year'],
            });

            patients_gender = await models.patients.findAll({
                where:{ facility : facilityusers.facility },
                attributes: [
                    'gender',
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['gender'],
            });

            patients_age = await models.patients.findAll({
                where:{ facility : facilityusers.facility },
                attributes: [
                    'age',
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['age'],
            });
        } else {

            patients_reg = await models.patients.findAll({
                attributes: [
                    [sequelize.fn('MONTH', sequelize.col('createdAt')), 'data'],
                    [sequelize.fn('YEAR', sequelize.col('createdAt')), 'year'],
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['data', 'year'],
            });

            patients_gender = await models.patients.findAll({
                attributes: [
                    'gender',
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['gender'],
            });

            patients_age = await models.patients.findAll({
                attributes: [
                    'age',
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['age'],
            });
        }
        res.json({patients_reg, patients_gender, patients_age});
    } catch (error) {
        error.status = 400;
        next(error);
    }

}

exports.facilities = async (req, res, next) => {
    try {
        let facilities = await models.facilities.findAll()

        res.json({facilities});
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.addFacility = async (req, res, next) => {
    try {
        await models.facilities.create(req.body)

        return res.status(201).json({message: "Facility details recorded successfully"});
    } catch (error) {
        error.status = 400;
        next(error);
    }
}
