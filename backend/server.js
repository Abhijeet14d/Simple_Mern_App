import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(express.json()); // allows us to accept json data in the body

app.use("/api/products", productRoutes);


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
})


