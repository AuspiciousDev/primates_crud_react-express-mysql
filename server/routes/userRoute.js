import express from 'express'
import userController from '../controller/userController.js'

const router = express.Router()

router.get('/all', userController.getAllUsers)

router.get('/find/:user_id', userController.getUser)

router.post('/add', userController.addUser)

router.patch('/change-password', userController.changePassword)

router.delete('/delete/:user_id', userController.deleteUser)

export default router