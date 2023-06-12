import multer from 'multer';
const upload = multer();
import express from "express";
import bodyParser from 'body-parser';
import {Product} from "./src/entity/Product";
import {AppDataSource} from "./src/data-source";
const PORT = 8000;
import router from "./src/router/router"

// thiết lập kết nối cơ sở dữ liệu
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(bodyParser.json());
app.use(express.json());
app.use(router);
app.use(express.static( './src/public'));
app.listen(PORT, () => {
    console.log("App running with port: " + PORT)
})