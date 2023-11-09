import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import loginRouter from './routes/login.router.js';
import usersRouter from './routes/users.router.js';
import homeRouter from './routes/home.router.js';
import { Server } from 'socket.io';
import { productsService } from './services/products/products.service.js';
import './DAL/mongoDB/dbConfig.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import './routes/passport/passportStrategies.js';
import config from './config.js';


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(express.static(__dirname+'/public'))

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(cookieParser('secreKeyCookies'))

app.use(session({
    store: new mongoStore({
        mongoUrl: config.mongo_uri
    }),
    secret: 'secretSession',
    cookie: {maxAge:60000}
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/api/products',productsRouter)
app.use('/api/cart',cartsRouter)
app.use('/api/views',viewsRouter)
app.use('/api/login',loginRouter)
app.use('/api/users',usersRouter)
app.use('/api/home',homeRouter)


const PORT = config.port;

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection',(socket)=>{
    console.log(`Usuario conectado: ${socket.id}`);
    
    socket.on('addProduct',async(newProduct)=>{ 
        try{
            const addProduct = await productsService.addproduct(
                newProduct.title,
                newProduct.description,
                newProduct.price,
                newProduct.thumbnai,
                newProduct.code,
                newProduct.stock,
                newProduct.id                
            );
            socketServer.emit("addProductSuccess", addProduct);
        }catch(error){
            socket.emit('errorAddProd',"error al agregar el producto")
        }  
    })

    socket.on('deletPorduct',async(idProduct)=>{
        try{
            const producDeleted = await productsService.deleteProduct(idProduct)
            socketServer.emit("deleteProductSuccess", producDeleted);
        }catch(error){
            socket.emit('errorDeletedProd',"error al eliminar el producto")
        }
       
    })

    socket.on('disconnect',()=>{
        console.log(`Usuario desconectado: ${socket.id}`);
    })

})
