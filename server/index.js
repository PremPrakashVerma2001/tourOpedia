import express from "express"; //used for backend server framework
import morgan from "morgan"; //used as logger backend
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
// import path from "path";

//routers:
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

const app = express();

const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL;
const format = process.env.MORGAN_FORMAT || "dev";
// const __dirname = path.resolve();

app.use(express.json({ limit: "50mb" }));
app.use(morgan(format));
app.use(cors());

app.get("/", (req, res) => {
  res.send("this home ! ");
});

app.use("/auth", userRouter);
app.use("/tour", tourRouter);

// first connect to db:
mongoose
  .connect(mongo_url)
  .then((res) => {
    console.log("Connected to DB successfully!\n");
    // console.log(res);
    //then start server:
    app.listen(port, (req, res) => {
      console.log("Server started at port no: ", port);
    });
  })
  .catch((err) => {
    console.log("<-----Something went wrong with below error----> \n", err);
  });
