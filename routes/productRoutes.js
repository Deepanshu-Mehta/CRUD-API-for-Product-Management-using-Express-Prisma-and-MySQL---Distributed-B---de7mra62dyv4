const express = require('express');
const { createProduct, retriveProducts, retrivebyId, updateProduct, partialUpdate, deleteProduct } = require('../controller/product.controller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

//write your code here
router.post('/create',authMiddleware, createProduct);
router.get('/get',authMiddleware, retriveProducts);
router.get('/getById/:id',authMiddleware, retrivebyId);
router.put('/put/:id',authMiddleware, updateProduct);
router.patch('/patch/:id',authMiddleware, partialUpdate);
router.delete('/delete/:id',authMiddleware, deleteProduct);

module.exports = router;
