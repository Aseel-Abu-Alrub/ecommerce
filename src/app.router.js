import connectDB from '../DB/connection.js'
import categoriesRouter from './modules/categories/categories.router.js'
import productsRouter from './modules/products/products.router.js'
import categoryRouter from './modules/subcategory/subcategory.router.js'
import AuthRouter from './modules/auth/auth.router.js'
import couponRouter from './modules/coupon/coupon.router.js'
import cartRouter from './modules/cart/cart.router.js'
import orderRouter from './modules/order/order.router.js'
import userRouter from './modules/user/user.router.js'
import cors from 'cors'
import { globalErrorHandler } from './services/errorHandling.js'

const initApp=(app,express)=>{
    app.use(express.json())
    connectDB()
    app.use(cors())

    app.get("/", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
         });
        
   
    app.get('/',(req,res)=>{
        return res.json('welcome')
    })
    //app.use('userPdf',express.static('./'))
    app.use('/auth',AuthRouter)
    app.use('/categories',categoriesRouter)
    app.use('/subcategory',categoryRouter)
    app.use('/products',productsRouter)
    app.use('/coupon',couponRouter)
    app.use('/cart',cartRouter)
    app.use('/order',orderRouter)
    app.use('/profile',userRouter)

    app.get('/*',(req,res)=>{
        return res.json('page not found')
    })

    app.use(globalErrorHandler)
}

export default initApp