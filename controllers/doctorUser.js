const DoctorUser = require('../models').DoctorUser
const User = require('../models').User
const nodemailer = require('nodemailer')
const emailSender = require('../helpers/nodemailer')

class DoctorUserController {

    static create(req,res) {
        let rand = Math.floor(Math.random()*1e9)
        DoctorUser.create({
            id : rand,
            DoctorId : req.params.DoctorId,
            UserId : req.params.UserId,
            note : req.body.note,
            status : 'pending'
        }).then((result) => {
            res.redirect(`/users/${result.UserId}`)
        }).catch((err) => {
            res.send(err.message)
        });
    }

    static edit(req,res) {
        DoctorUser.update({
            status : req.body.status
        }, {
            where : {
                id : req.params.DoctorUserId
            }
        })
        .then((result) => {
            return DoctorUser.findByPk(req.params.DoctorUserId)
        })
        .then(note => {
            return User.findByPk(note.UserId)
        })
        .then(user => {
            console.log(user)
            emailSender(user.email)
            res.redirect(`/doctors/${req.params.DoctorId}`)
        })
        .catch((err) => {
            res.send(err.message)
        });
    }

    static delete(req,res) {
        DoctorUser.destroy({
            where : {
                id : req.params.DoctorUserId
            }
        }).then(() => {
            res.redirect(`/users/${req.params.UserId}`)
        }).catch((err) => {
            res.send(err.message)
        });
    }
}

module.exports = DoctorUserController