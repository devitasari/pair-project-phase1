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

router.get('/', (req,res) => res.render('home'))
router.get('/loginregister', (req,res) => res.render('loginregister'))


// ==================================== DOCTOR ===============================
router.get('/doctors/logout',  DoctorController.logout)
router.get('/doctors/login', (req,res) => {
    res.render('loginDoctor')
})
router.post('/doctors/login', DoctorController.login)
router.post('/doctors/register', DoctorController.register) //untuk register
router.get('/doctors/register', (req,res) => {
    res.render('registerDoctor')
})

router.post('/doctors/edit/:DoctorId/:DoctorUserId', DoctorUserController.edit)
router.get('/doctors/:DoctorId',  DoctorController.showOne) //untuk menampilkan daftar appoinment dokter bisa diaprove/tidak
// router.post('/doctors/:DoctorId',  DoctorController.showOne) //untuk menampilkan daftar appoinment dokter bisa diaprove/tidak
router.get('/doctors/:locationId/:SpecialisasiId',  DoctorController.showAll) //untuk pencarian berdasarkan lokasi dan spesialisasi



// router.get('/doctors/:DoctorId/edit/:DoctorUserId',  (req,res) => {
//     res.render('editStatus')
// })
// router.post('/doctors/:DoctorId/edit/:DoctorUserId',  DoctorUserController.edit) //untuk menanggapi appoinment



// ==================================== USER ===============================

const loginMiddlewareUser= (req,res,next) => {
    if (req.session.user && req.session.user.id) {
        next()
    } else {
        res.redirect('/')
    }
}

router.get('/loginregister', (req,res) => {
    res.render('loginregister')
})

router.get('/users/register', (req,res) => {
    res.render('registerUser')
})
router.post('/users/register', UserController.create)

router.get('/users/login', (req,res) => {
    res.render('loginUser')
})
router.post('/users/login', UserController.login) //untuk login
router.get('/users/:UserId',  UserController.findOne) //untuk menampilkan daftar appoinment di halaman user

router.get('/users/:UserId/search/doctors',  (req,res) => { 
    res.render('homeUser')
})
router.post('/users/:UserId/search/doctors', DoctorController.showAll) //untuk cari dokter

router.get('/users/:UserId/:DoctorId/add/appo',  (req,res) => { //untuk make appointment butuh id dokter 
    res.render('make-appointment')
})

router.post('/users/:UserId/:DoctorId/add/appo', DoctorUserController.create)

router.get('/users/:UserId/edit/:DoctorUserId',  (req,res) => {
    res.render('editNote') //akan mengirim objek doctoruser id tertentu
})

router.get('/users/:UserId/delete/:DoctorUserId',  DoctorUserController.delete)


router.get('/users/logout',  UserController.logout)



// ========================================================= DUMMY ========================================================================
// router.get('/', (req,res) => res.render('index'))
// router.get('/loginregister', (req,res) => res.render('loginregister'))
// router.get('/users', (req,res) => res.render('homeUser'))
// router.get('/doctors', (req,res) => res.render('homeDoctor'))
// router.get('/search', (req,res) => res.render('searchResult'))
// router.get('/dummy', (req,res) => res.render('dummyView'))
// router.get('/index', (req,res) => res.render('index'))



module.exports = router