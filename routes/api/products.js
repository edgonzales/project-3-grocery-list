const express = require("express");
const router = express.Router();
const productsCtrl = require("../../controllers/products");

const multer = require('multer');
const upload = multer();

/*---------- Public Routes ----------*/
router.post("/addProduct", upload.single('photo'), productsCtrl.addProduct);

/*---------- Protected Routes ----------*/

module.exports = router;



/*---------- Protected Routes ----------*/



