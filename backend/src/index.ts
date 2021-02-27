import App from "./app";
import UserController from "./controllers/UserController";
import * as bodyParser from "body-parser";
import loggerMiddleware from "./middleware/logger";
import ShoppingController from "./controllers/ShoppingCartController";
require("dotenv").config();
require("./db/index");

const PORT = process.env.PORT;

const app = new App({
  port: Number(process.env.PORT),
  controllers: [new UserController(),
                new ShoppingController()],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware,
    
  ],
});

app.listen();
