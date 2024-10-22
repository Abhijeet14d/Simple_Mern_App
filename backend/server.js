import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
const PORT = process.env.PORT || 5000;





dotenv.config();

const app = express();

app.use(cors(
    {
        origin:"*"
    }
));
app.use(express.json()); // allows us to accept json data in the body

app.use("/api/products", productRoutes);

app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ success: false, message: err.message });
});

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
})


