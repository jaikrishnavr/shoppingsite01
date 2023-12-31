import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import ProductRouter from './routes/productRoutes.js';
import userRouters from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRouters from './routes/orderRouter.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';


dotenv.config();
const Port = process.env.PORT || 5000;

connectDb()

const app = express();

// body parser middleware
 app.use(express.json());
 app.use(express.urlencoded({ extended: true}));
 //Cookie parser middleware
 app.use(cookieParser());


app.get('/',(req,res) => {
    res.send('Api is running...');
});


app.use('/api/products', ProductRouter);

app.use('/api/users', userRouters);
app.use('/api/orders', orderRouters);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }))

const __dirname = path.resolve(); //set __dirname to current working directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);


app.listen(Port,()=> console.log(`server listening on port ${Port}`));