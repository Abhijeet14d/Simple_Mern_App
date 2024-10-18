import Product from "../models/product.js";

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    }catch(error){
        res.status(500).json({success: false, message: 'Server Error'});
    }
};


export const createProducts = async (req, res) => {
    const product = req.body;

    if(!product.name || product.price || product.image){
        res.status(400).json({message: 'All fields are required'});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    }catch(error){
        res.status(500).json({success: false ,message: 'Something went wrong'});
    }
};


export const updateProducts = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(mongo.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: 'Invalid Product ID'});
    }

    try{
        const updatedProduct =  await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    }catch(error){
        res.status(500).json({success: false, message: 'Something went wrong'});
    }
};
export const deleteProducts = async (req, res) => {
    const {id} = req.params;

    if(mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: 'Invalid Product ID'});
    };    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product has been deleted'});
    }catch(error){
        res.status(500).json({success: false, message: 'Something went wrong'});
    }

};