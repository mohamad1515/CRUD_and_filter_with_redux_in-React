const express = require('express')

const router = express.Router()

const productControllers = require('../controllers/product-controllers')

router.post('/posts/filter', productControllers.filteredPosts)

// Color
router.get('/colors', productControllers.getAllColors)

// CRUD
router.post('/products/', productControllers.createProduct)
router.get('/products', productControllers.getAllProducts)
router.get('/products/:id', productControllers.getProduct)
router.put('/products/:id', productControllers.updateProduct)
router.post('/products/:id', productControllers.deleteProduct)

module.exports = router
