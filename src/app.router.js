import connectDB from '../DB/connection.js'
import categoriesRouter from './modules/categories/categories.router.js'
import productsRouter from './modules/products/products.router.js'
import categoryRouter from './modules/subcategory/subcategory.router.js'
import AuthRouter from './modules/auth/auth.router.js'
import couponRouter from './modules/coupon/coupon.router.js'
import cartRouter from './modules/cart/cart.router.js'
import orderRouter from './modules/order/order.router.js'
import { globalErrorHandler } from './services/errorHandling.js'

const initApp=(app,express)=>{
    app.use(express.json())
    connectDB()
    app.get('/',(req,res)=>{
        return res.json('welcome')
    })
    app.use('/auth',AuthRouter)
    app.use('/categories',categoriesRouter)
    app.use('/subcategory',categoryRouter)
    app.use('/products',productsRouter)
    app.use('/coupon',couponRouter)
    app.use('/cart',cartRouter)
    app.use('/order',orderRouter)

    app.get('/*',(req,res)=>{
        return res.json('page not found')
    })

    app.use(globalErrorHandler)
}

export default initApp