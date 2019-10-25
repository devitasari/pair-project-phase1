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
                LocationId : req.body.LocationId,
                SpecialisasiId : req.body.SpecialisasiId
            },
            order: [['rating', 'DESC']]
        })
        .then((doctors) => {
            res.render('searchResult',{doctors,userId: req.session.user.id})
        })
        .catch((err) => {
            res.send(err.message)
        });
    }

    static showOne(req,res) {
        DoctorUser.findAll({
            where: {
                DoctorId: req.params.DoctorId
            }
        }).then((notes) => {
            res.render('homeDoctor',{notes})
            // res.send(notes)
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
            rating : (Math.random()*5).toFixed(1),
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
            if (!doctor ||  doctor.pass != passInput) res.redirect('/')
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
                res.redirect('/');
            });
    }


}

module.exports = DoctorController