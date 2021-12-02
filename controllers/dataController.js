const {Op} = require("sequelize");
const {Sequelize} = require("sequelize");

const {sequelize} = require("../db_connection");
var initModels = require("../database/models_generated/init-models");
var models = initModels(sequelize);

exports.addPatient = async (req, res, next) => {
    try {
        let newPatient = req.body;
        newPatient.createdAt = new Date();
        newPatient.updatedAt = new Date();
        await models.patients.create(newPatient);

        return res.status(201).json({message: "Patient details recorded successfully"});
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.pushMonthly = async (req, res, next) => {
    try {
        let car = await MyCars.findOne({where: {uuid: req.body.uuid, created_by_id: req.userId}})

        if (car) {
            await MyCars.update(req.body, {where: {uuid: req.body.uuid, created_by_id: req.userId}})
                .then(() => {
                    return res.json({success: true, message: "Car deleted"})
                })
                .catch((err) => {
                    return res.status(500).json({success: false, error: err})
                })
        } else
            return res.status(500).json({success: false, error: "Car not found"})

    } catch (error) {
        error.status = 400;
        next(error);
    }

}

exports.getPushed = async (req, res, next) => {
    try {
        let facility_user = models.facility_user.findOne({where: {user: req.userId}})
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

exports.getCar = async (req, res, next) => {
    try {
        let cars = await MyCars.findAll({
            where: {created_by_id: req.userId},
            order: [
                ['milage', 'DESC'],
                // ['next_service', 'ASC'],
            ],
        });
        res.json({cars});
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
