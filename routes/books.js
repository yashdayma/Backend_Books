// routes/bookRoutes.js
const express = require('express');
const { getAllBooks, createBook } = require('../controllers/books.controller');
const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);

module.exports = router;
