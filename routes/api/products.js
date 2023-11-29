const express = require("express");
const router = express.Router();
const productsCtrl = require("../../controllers/products");

const multer = require('multer');
const upload = multer();

/*---------- Public Routes ----------*/
router.post('/', upload.single('photo'), productsCtrl.create);

/*---------- Protected Routes ----------*/

module.exports = router;



/*---------- Protected Routes ----------*/



