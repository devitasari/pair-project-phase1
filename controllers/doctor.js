const Doctor = require('../models').Doctor
const Location = require('../models').Location
const Specialisasi = require('../models').Specialisasi
const User = require('../models').User
const hashPassword = require('../helpers/hashPassword')

class DoctorController {

    //cari dokter berdasarkan lokasi dan spesialisasi
    static showAll(req,res) {
        Doctor.findAll({include:[Location,Specialisasi]}, {
            where: {
                LocationId : req.params.LocationId,
                SpecialisasiId : req.params.SpecialisasiId
            }
        })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err.message)
        });
    }

    static showOne(req,res) {
        Doctor.findOne({
            include: [User]
        }, {
            where: {
                id: req.params.DoctorId
            }
        }).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err.message)
        });
    }

    static register(req,res) {
        Doctor.create({
            name : req.body.name,
            email : req.body.email,
            pass : req.body.pass,
            address : req.body.address,
            tarif : req.body.tarif,
            workingHours : req.body.workingHours,
            SpecialisasiId : req.body.SpecialisasiId,
            LocationId : req.body.LocationId,
            isLogin : 0
        })
        .then((result) => {
            res.send(result)   
        }).catch((err) => {
            res.send(err)
        });
    }

    //cari doctor dengan username tertentu
    static login(req,res) {
        let passInput = hashPassword(req.body.pass)
        Doctor.findOne({
            where : {
                name : req.body.name,
                pass : passInput
            }
        })
        .then((doctor) => {
            if (!doctor) res.send('Username/pass salah')
            else {
                Doctor.update({
                    isLogin : 1
                },{
                    where : {
                        id : doctor.id
                    }
                })
            }
        })
        .then(() => {
            res.send('succes')
            // res.render('loginDoctor')
        })
        .catch((err) => {
            res.send(err.message)
        });
    }

}

module.exports = DoctorController