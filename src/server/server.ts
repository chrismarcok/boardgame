import * as express from "express";
import * as path from "path";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as session from "express-session";
import * as http from "http";
import initializePassport from "./auth/passportConfig";
import UserRouter from "./routers/rest/UserRouter";
import LoginRouter from "./routers/LoginRouter";
import { CYAN, RED, YELLOW } from "../utils/colors";
dotenv.config();

// SERVER INIT
const app = express();
const server = http.createServer(app);

// MONGOOSE

(<any>mongoose).Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(CYAN, `[INFO] MongoDB Connection Established.`))
  .catch((err: Error) => console.log(RED, `[ERROR] Mongo error: ${err.message}`));


// EXPRESS SESSION

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// PASSPORT

initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

// BODYPARSER

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ROUTES

app.use(express.static(path.join(__dirname, "../public")));
app.use(`/`, LoginRouter);
app.use(`/api`, UserRouter);

const defaultRouter = express.Router();
defaultRouter.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});
app.use(defaultRouter);

// SERVE

const port: string | number = process.env.PORT || 3000;
server.listen(port, () =>{
  console.log(CYAN, `[INFO] Server listening on port ${port} in mode ${app.settings.env}.`);
  console.log(YELLOW, `\n******\n[INFO] Visit ( http://localhost:3000 ) to open the app.\n******\n`);
});