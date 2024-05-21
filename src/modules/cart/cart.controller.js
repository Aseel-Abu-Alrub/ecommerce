import cartModel from "../../../DB/model/cart.model.js"
import productModel from "../../../DB/model/product.model.js"

export const createCart=async(req,res,next)=>{
    //  const productId=req.params.id
    const{quantity,productId}=req.body
    
    // if(!await productModel.findById({_id:productId})){
    //     return res.status(200).json({message:"product not found"})

    // }
    const cart=await cartModel.findOne({userId:req.user._id})

    if(!cart){
    const newCart=await cartModel.create({userId:req.user._id,products:{productId,quantity}})

    return res.status(200).json({message:"success",newCart})
    }
    let matchedProduct=false
    for(let i=0;i<cart.products.length;i++){
        if(cart.products[i].productId == productId){
            cart.products[i].quantity=quantity || 1
            matchedProduct=true;
            break;
        }

    }

if(!matchedProduct){
    cart.products.push({productId,quantity})
}
await cart.save()
return res.status(200).json({message:"success",cart}) 


} 

export const removeItem=async(req,res,next)=>{
    const {productId}=req.body
     await cartModel.updateOne({userId:req.user._id},{
        $pull:{
            products:{
                productId
            } 
        }
     })

     return res.status(201).json({message:"success"})
}

export const clearCart=async(req,res,next)=>{
const clearCart=await cartModel.updateOne({userId:req.user._id},{products:[]})
return res.status(201).json({message:"success"})

}

export const getCart=async(req,res,next)=>{ 

const cart=await cartModel.findOne({userId:req.user._id})
return res.status(201).json({message:"success",cart})
}
