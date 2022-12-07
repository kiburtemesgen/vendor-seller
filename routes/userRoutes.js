import express from 'express'
import {createUser, getUser, updateUser, deleteUser} from '../controllers/userController.js'
import {auth} from '../middleware/auth.js'


const router = express.Router()

router.route('/create').post(createUser)
router.route('/get').get(auth, getUser)
router.route('/update/:id').put(auth, updateUser)
router.route('/delete/:id').delete(auth, deleteUser)

export default router

