import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import DB_connect from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"
import productRoutes from "./routes/productRoute.js"
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const app = express();

//database config
DB_connect();

//middlewares;
app.use(cors());
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)

app.get("/", (req, res) => {
    res.send({ message: "server in on" });
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server in running on ${PORT}`.bgBlue.white)
})