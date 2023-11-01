const {Op} = require("sequelize");
const {Sequelize} = require("sequelize");

const {sequelize} = require("../db_connection");
const initModels = require("../database/models_generated/init-models");
const models = initModels(sequelize);

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

exports.addHR = async (req, res, next) => {
    try {
        console.log(req.body);

        let newHR = req.body;
        newHR.createdAt = new Date();
        newHR.updatedAt = new Date();
        
        await models.hr.create(newHR);


        return res.status(201).json({message: "Details recorded successfully"});
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.getHR = async (req, res, next) => {
    try {
        let hr_data = await models.hr.findAll();

		res.json({ hr_data });
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

exports.getPushedAdmin = async (req, res, next) => {
    try {
        let patients_gender, patients_reg, patients_age, patients
        if (req.user.accesslevel === 2) {
            let facilityusers = await models.facilityusers.findOne({where: {user: req.userId}})

            patients_reg = await models.patients.findAll({
                where:{ facility : facilityusers.facility },
                order: [
                    ['createdAt', 'ASC'],
                ],
                attributes: [
                    [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
                    [sequelize.fn('YEAR', sequelize.col('createdAt')), 'year'],
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['month', 'year'],
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
                order: [
                    ['age', 'ASC'],
                ],
                attributes: [
                    'age',
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['age'],
            });

            patients = await models.patients.findAll({
                where: {facility : facilityusers.facility}
            })
        } else {

            patients_reg = await models.patients.findAll({
                order: [
                    ['createdAt', 'ASC'],
                ],
                attributes: [
                    [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
                    [sequelize.fn('YEAR', sequelize.col('createdAt')), 'year'],
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['month', 'year'],
            });

            patients_gender = await models.patients.findAll({
                attributes: [
                    'gender',
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['gender'],
            });

            patients_age = await models.patients.findAll({
                order: [
                    ['age', 'ASC'],
                ],
                attributes: [
                    'age',
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['age'],
            });

            patients = await models.patients.findAll({})
        }
        res.json({patients_reg, patients_gender, patients_age, patients:patients.length});
    } catch (error) {
        error.status = 400;
        next(error);
    }

}

exports.getPushed = async (req, res, next) => {
    try {
        let patients_data
        if (req.user.accesslevel === 2) {
            let facilityusers = await models.facilityusers.findOne({where: {user: req.userId}})

            patients_data = await models.patients.findAll({
                where:{ facility : facilityusers.facility },
                include: ['facility_facility'],
            });
        } else {

            patients_data = await models.patients.findAll({
                include: ['facility_facility'],
            });
        }
        res.json({patients_data});
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
