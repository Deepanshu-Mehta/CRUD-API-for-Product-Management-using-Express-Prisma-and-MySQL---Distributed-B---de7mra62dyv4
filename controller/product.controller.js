const {prisma} = require('../db/config')
const createProduct = async (req,res)=>{
    try{
        const {name, stock, price} = req.body;
        if(!name || !stock || !price){
            return res.status(400).json({error: "All fields required"})
        }
        const product = await prisma.Product.create({
            data : {name, stock, price}
        });
        res.status(201).json(product);
    }catch(err){
        return res.status(500).json({message : "Internal Server Error"});
    }
}

const retriveProducts = async(req,res)=>{
    try{
        const allProducts = await prisma.Product.find();
        res.status(200).json(allProducts);
    }catch(err){
        return res.status(500).json({message : "Internal Server Error"});
    }
    
}

const retrivebyId= async (req,res)=>{
    try{
        const {id} = req.params;
        const product = await prisma.Product.findUnique({where : {id : parseInt(id)}});
        if(!product){
            return res.status(404).json({error : "Product not found"});
        }
        res.status(200).json(product);
    }catch(err){
        return res.status(500).json({message : "Internal Server Error"});
    }
}

const updateProduct = async (req,res)=>{
    const {id} = req.params;
    const product = await prisma.Product.findUnique({where : {id : parseInt(id)}});
    if(!product){
        return res.status(404).json({error : "Product not found"});
    }
    const updatedProduct = await prisma.Product.update({
        where : {id : parseInt(id)},
        data : req.body
    })
    res.status(200).json(updatedProduct);
}

const partialUpdate = async(req,res)=>{
    try{
    const {id} = req.params;
    const product = await prisma.Product.findUnique({where : {id : parseInt(id)}});
    if(!product){
        return res.status(404).json({error : "Product not found"});
    }
    const updatedProduct = await prisma.Product.update({where : {id : parseInt(id)}, data : req.body});
    res.status(200).json(updatedProduct);
    }catch(err){
        return res.status(500).json({message : "Internal Server Error"});
    }
}

const deleteProduct = async (req,res)=>{
    try{
        const {id} = req.params;
        const product = await prisma.Product.findUnique({where : {id : parseInt(id)}});
        if(!product){
            return res.status(404).json({error : "Product not found"});
        }
        await prisma.Product.delete({where : {id : parseInt(id)}});
        res.status(200).json({ message:"Product is deleted"});
    }catch(err){
        return res.status(500).json({message : "Internal Server Error"});
    }
}
module.exports = {createProduct, retriveProducts, retrivebyId, updateProduct, partialUpdate, deleteProduct}