import express from 'express';

import dotenv from 'dotenv';
import connectDb from './config/db.js';
import ProductRouter from './routes/productRoutes.js';
import userRouters from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';


dotenv.config();
const Port = process.env.PORT || 5000;

connectDb()

const app = express();



app.get('/',(req,res) => {
    res.send('Api is running...');
});


app.use('/api/products', ProductRouter);

app.use('/api/users', userRouters);

app.use(notFound);
app.use(errorHandler);


app.listen(Port,()=> console.log(`server listening on port ${Port}`));