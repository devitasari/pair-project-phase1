const Doctor = require('../models').Doctor
const Location = require('../models').Location
const Specialisasi = require('../models').Specialisasi
const User = require('../models').User
const DoctorUser = require('../models').DoctorUser
const hashPassword = require('../helpers/hashPassword')

class DoctorController {

    //cari dokter berdasarkan lokasi dan spesialisasi
    static showAll(req,res) {
        Doctor.findAll({include:[Location,Specialisasi],
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
            include: [User], 
            where: {
                id: req.params.DoctorId
            }
        }).then((doctor) => {
            res.render('homeDoctor',{users :doctor.Users})
            // res.send(result)
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
        .then((succes) => {
            Doctor.findOne({
                where : {
                    name: req.body.name
                }
            })
            .then(doctor => {
                req.session.user = {
                    name : req.body.name
                }
                res.redirect(`/`)
            })   
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
            }
        })
        .then((doctor) => {
            if (!doctor ||  doctor.pass != passInput) res.send('Username/pass salah')
            else {
                req.session.doctor = { id : doctor.id }
                // res.send(doctor.Users)
                res.redirect(`/doctors/${doctor.id}`)
            }
        })
        .catch((err) => {
            res.send(err.message)
        });
    }

    static home(req,res) {
        Doctor
    }

    static logout(req,res) {
            req.session.destroy(() => {
                res.send('logout succes');
            });
    }


}

module.exports = DoctorController