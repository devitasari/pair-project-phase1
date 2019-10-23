const User = require('../models').User
const Doctor = require('../models').Doctor
const DoctorUser = require('../models').DoctorUser
const hashPass = require('../helpers/hashPassword')

class UserController {

    static findOne(req,res) {
        User.findOne( {include:[Doctor],
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
            let passInput = hashPass(req.body.pass)
            console.log(passInput);
            
            User.findOne({
                where : {
                    name : req.body.name
                }
            })
            .then((user) => {
                
                if (!user || user.pass != passInput) res.send('Username/pass salah')
                else {
                    req.session.user = { id : user.id }
                    res.send(req.session)
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