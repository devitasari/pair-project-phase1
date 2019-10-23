const User = require('../models').User
const Doctor = require('../models').Doctor
const DoctorUser = require('../models').DoctorUser
const hashPass = require('../helpers/hashPassword')

class UserController {

    static findOne(req,res) {
        //Executing (default): SELECT "id", "name", "email", "pass", "createdAt", "updatedAt", "DoctorUserDoctorId" FROM "Users" AS "User" WHERE "User"."id" = '1';

        User.findOne( {include:[Doctor]}, {
            where: {
                id :   req.params.UserId
            }
        }
        ).then((user) => {
            res.send(user)
        }).catch((err) => {
            res.send(err.message)
        });
    }

    static create(req,res) {
        User.create({
            name : req.body.name,
            email : req.body.email,
            pass : req.body.pass
        })
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err.message)
        });
    }

        //cari user dengan username tertentu
        static login(req,res) {
            let passInput = hashPassword(req.body.pass)
            Doctor.findOne({
                where : {
                    name : req.body.name,
                    pass : passInput
                }
            })
            .then((user) => {
                if (!user) res.send('Username/pass salah')
                else {
                    User.update({
                        isLogin : 1
                    },{
                        where : {
                            id : user.id
                        }
                    })
                }
            })
            .then(() => {
                res.send('succes')
            })
            .catch((err) => {
                res.send(err.message)
            });
        }
    
}

module.exports = UserController