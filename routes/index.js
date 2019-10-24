const router = require('express').Router()
const DoctorController = require('../controllers/doctor')
const UserController = require('../controllers/user')
const DoctorUserController = require('../controllers/doctorUser')

// =============================== Session ==============================
const loginMiddlewareDoctor= (req,res,next) => {

    if (req.session.doctor && req.session.doctor.id) {
        next()
    } else {
        res.send('login dulu ya...')
    }
}



// ==================================== DOCTOR ===============================
router.get('/doctors/logout', loginMiddlewareDoctor, DoctorController.logout)
router.get('/doctors/login', (req,res) => {
    res.render('loginDoctor')
})
router.post('/doctors/login', DoctorController.login)
router.post('/doctors/register', DoctorController.register) //untuk register
router.get('/doctors/register', (req,res) => {
    res.render('registerDoctor')
})
router.get('/doctors/:locationId/:SpecialisasiId', loginMiddlewareDoctor, DoctorController.showAll) //untuk pencarian berdasarkan lokasi dan spesialisasi


router.get('/doctors/:DoctorId', loginMiddlewareDoctor, DoctorController.showOne) //untuk menampilkan daftar appoinment dokter bisa diaprove/tidak

router.get('/doctors/:DoctorId/edit/:DoctorUserId', loginMiddlewareDoctor, (req,res) => {
    res.render('editStatus')
})
router.post('/doctors/:DoctorId/edit/:DoctorUserId', loginMiddlewareDoctor, DoctorUserController.edit) //untuk menanggapi appoinment



// ==================================== USER ===============================

const loginMiddlewareUser= (req,res,next) => {
    if (req.session.user && req.session.user.id) {
        next()
    } else {
        res.redirect('/')
    }
}

router.get('/users/register', (req,res) => {
    res.render('registerUser')
})
router.post('/users/register', UserController.create)

router.get('/users/login', (req,res) => {
    res.render('loginUser')
})
router.post('/users/login', UserController.login) //untuk login

router.get('/users/:UserId/search/doctors', loginMiddlewareUser, (req,res) => {
    res.render('searchDoctor')
})
router.post('/users/:UserId/search/doctors', DoctorController.showAll) //untuk cari dokter

router.get('/users/:UserId/:DoctorId/add/appo', loginMiddlewareUser, (req,res) => { //untuk make appointment butuh id dokter 
    res.render('addNote')
})

router.post('/users/:UserId/:DoctorId/add/appo', DoctorUserController.create)

router.get('/users/:UserId/edit/:DoctorUserId', loginMiddlewareUser, (req,res) => {
    res.render('editNote') //akan mengirim objek doctoruser id tertentu
})

router.get('/users/:UserId/delete/:DoctorUserId', loginMiddlewareUser, DoctorUserController.delete)

router.get('/users/:UserId', loginMiddlewareUser, UserController.findOne) //untuk menampilkan daftar appoinment di halaman user

router.get('/users/logout', loginMiddlewareUser, UserController.logout)



// ========================================================= DUMMY ========================================================================
router.get('/home', (req,res) => res.render('home'))
router.get('/users', (req,res) => res.render('homeUser'))
router.get('/doctors', (req,res) => res.render('homeDoctor'))

module.exports = router