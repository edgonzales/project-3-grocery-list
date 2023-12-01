const Product = require('../models/product');

module.exports = {
    create,
    index,
    deleteProduct
};


const S3 = require('aws-sdk/clients/s3');
const s3 = new S3()

const { v4: uuidv4 } = require('uuid');

function create(req, res) {
    console.log(req.file, req.body, req.user)
    if (!req.file) return res.status(400).json({ error: 'Please submit a photo' })

    const filePath = `grocerylist/${uuidv4()}-${req.file.originalname}`
    const params = { Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer }
    s3.upload(params, async function (err, data) {
        if (err) {
            console.log('=========================')
            console.log(err, ' <-- error from aws, probably wrong keys in your code ~/.aws/credentials file, or you have the wrong bucket name, are you sure you know what process.env.BUCKET_NAME is, did you log it out?')
            console.log('==========================')
        }

        try {
            const productDoc = await Product.create({
                productName: req.body.productName,
                price: req.body.price,
                category: req.body.category,
                description: req.body.description,
                photoUrl: data.Location,
            })
            res.status(201).json({ product: productDoc })

        } catch (err) {
            console.log(err, " <- error in create product")
            res.json({ error: 'Problem with creating a product, try again' })
        }
    })
}

async function index(req, res) {
    try {
        const products = await Product.find({}).exec();
        res.status(200).json({ products });
    } catch (err) {
        res.json({ error: err })
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json({ data: 'product removed' })
    } catch (err) {
        res.status(400).json({ err })
    }
}