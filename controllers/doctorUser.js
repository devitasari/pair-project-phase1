const DoctorUser = require('../models').DoctorUser

class DoctorUserController {

    static create(req,res) {
        DoctorUser.create({
            DoctorId : req.params.DoctorId,
            UserId : req.params.UserId,
            note : req.body.note
        }).then((result) => {
            res.send(result)
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
            res.send(result)
        }).catch((err) => {
            res.send(err.message)
        });
    }

    static delete(req,res) {
        DoctorUser.destroy({
            where : {
                id : req.params.DoctorUserId
            }
        }).then(() => {
            res.send('succes')
        }).catch((err) => {
            res.send(err.message)
        });
    }
}

module.exports = DoctorUserController