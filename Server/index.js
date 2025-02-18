import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import AuthRouter from './Routes/AuthRouter.js';
import DonorRouter from './Routes/DonorRouter.js';
import bloodStockRoutes from "./Routes/bloodStockRoutes.js";


const app = express();
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser());

app.use('/api', AuthRouter);
app.use('/api/donors', DonorRouter);
app.use("/bloodstock", bloodStockRoutes);


app.listen(8000, () => {
    console.log("Server running on port 8000");
});
