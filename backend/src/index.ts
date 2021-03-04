import App from "./app";
import UserController from "./controllers/UserController";
import * as bodyParser from "body-parser";
import loggerMiddleware from "./middleware/logger";
import ShoppingController from "./controllers/ShoppingCartController";
import { userController } from "./controllers/CreateController/CreateUserController";
require("dotenv").config();
require("./db/index");

const PORT = process.env.PORT;

const app = new App({
  port: Number(process.env.PORT),
  controllers: [userController,
                new ShoppingController()],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware,
    
  ],
});

app.listen();
