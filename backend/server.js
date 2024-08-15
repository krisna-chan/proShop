import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv';
import productRoutes from './routes/productRoute.js'
import { notFound , errorHandler } from './middleware/errorMiddleware.js'
dotenv.config();
const port = process.env.PORT || 8000;

connectDB();

const app = express();
app.get('/', (req, res) => {
    res.send('Hello from the server!')
});



app.use('/api/products', productRoutes);

app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log(`Server running on port ${port}`));