const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
    {
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        category: {
            type: String,
            enum: [
                'Baby and Infant Products',
                'Bakery',
                'Beverages',
                'Canned and Jarred Goods',
                'Cereal and Breakfast Foods',
                'Condiments',
                'Dairy and Eggs',
                'Fresh Produce',
                'Frozen Foods',
                'Health and Wellness',
                'Household and Cleaning Products',
                'Meat and Seafood',
                'Personal Care',
                'Pasta and Grains',
                'Pet Supplies',
                'Snacks'
            ]
        },
        description: String,
        photoUrl: String // string from aws!
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Product", productSchema);
