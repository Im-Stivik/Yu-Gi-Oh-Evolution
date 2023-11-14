import express from "express"; 
import bp from "body-parser";
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "./database.sqlite"
});

const SERVER_PORT = 3000;

const app = express();

app.use(bp.urlencoded ({ extended: false }));
app.use(bp.json());

import cardController from "./controllers/card.js";
app.use('/cards', cardController);

app.listen(SERVER_PORT, () => {
	console.log(`server is runing at port: ${SERVER_PORT}`);
});

console.log("hello world");
