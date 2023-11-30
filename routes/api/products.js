const express = require("express");
const router = express.Router();
const productsCtrl = require("../../controllers/products");

const multer = require('multer');
const upload = multer();

/*---------- Public Routes ----------*/
router.post('/', upload.single('photo'), productsCtrl.create);
router.get('/', productsCtrl.index);
router.delete('/:id', productsCtrl.deleteProduct)

/*---------- Protected Routes ----------*/

module.exports = router;



/*---------- Protected Routes ----------*/



