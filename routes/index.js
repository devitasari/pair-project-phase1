const router = require('express').Router()
const DoctorController = require('../controllers/doctor')
const UserController = require('../controllers/user')
const DoctorUserController = require('../controllers/doctorUser')

// ==================================== DOCTOR ===============================

router.get('/doctors/:locationId/:SpecialisasiId', DoctorController.showAll) //untuk pencarian berdasarkan lokasi dan spesialisasi
router.get('/doctors/register', (req,res) => {
    res.render('registerDoctor')
})
router.post('/doctors/register', DoctorController.register) //untuk register

router.get('/doctors/login', (req,res) => {
    res.render('loginDoctor')
})
router.post('/doctors/login', DoctorController.login) //untuk login

router.get('/doctors/:DoctorId', DoctorController.showOne) //untuk menampilkan daftar appoinment dokter bisa diaprove/tidak

router.get('/doctors/:DoctorId/edit/:DoctorUserId', (req,res) => {
    res.render('editStatus')
})
router.post('/doctors/:DoctorId/edit/:DoctorUserId', DoctorUserController.edit) //untuk menanggapi appoinment


// ==================================== USER ===============================
router.get('/users/register', (req,res) => {
    res.render('registerUser')
})
router.post('/users/register', UserController.create)

router.get('/users/login', (req,res) => {
    res.render('loginUser')
})
router.post('/users/login', UserController.login) //untuk login

router.get('/users/:UserId/search/doctors', (req,res) => {
    res.render('searchDoctor')
})
router.post('/users/:UserId/search/doctors', DoctorController.showAll) //untuk cari dokter

router.get('/users/:UserId/:DoctorId/add/appo', (req,res) => { //untuk make appointment butuh id dokter 
    res.render('addNote')
})

router.post('/users/:UserId/:DoctorId/add/appo', DoctorUserController.create)

router.get('/users/:UserId/edit/:DoctorUserId', (req,res) => {
    res.render('editNote') //akan mengirim objek doctoruser id tertentu
})

router.get('/users/:UserId/delete/:DoctorUserId', DoctorUserController.delete)

router.get('/users/:UserId', UserController.findOne) //untuk menampilkan daftar appoinment di halaman user



module.exports = router