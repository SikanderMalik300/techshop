import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js'; // Adjust the path as necessary
import productRoutes from './routes/productRoutes.js'; // Adjust the paths as necessary
import userRoutes from './routes/userRoutes.js'; // Adjust the paths as necessary
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Adjust the paths as necessary

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('API is running..');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Error middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => console.log(`Server is running on Port ${port}`));
