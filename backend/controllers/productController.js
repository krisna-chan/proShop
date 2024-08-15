import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModels.js"


// @desc fetch all products
// @route GET /api/products
// @access Public
const getProduct = asyncHandler( async(req , res) => {
    const products = await Product.find({});
    res.json(products);
});


// @desc fetch all products
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async(req , res) => {
    const product = await Product.findById(req.params.id);

    if (product){
        return res.json(product);
    } else{
        res.status(404);
        throw new Error('Product not found');
    }
})

export { getProduct, getProductById}