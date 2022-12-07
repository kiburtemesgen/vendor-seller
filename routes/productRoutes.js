import express from 'express'
import {createProduct, getProduct, updateProduct, deleteProduct} from '../controllers/productController.js'

const router = express.Router()

router.route('/create').post(createProduct)
router.route('/get').get(getProduct)
router.route('/update/:id').put(updateProduct)
router.route('/delete/:id').delete(deleteProduct)

export default router

