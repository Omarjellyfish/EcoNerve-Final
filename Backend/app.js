const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;
const connectionString = process.env.CONNECTION_STRING;


app.use(express.json());
mongoose.connect(process.env.CONNECTION_STRING, {}).then(() => {
  console.log("connected to mongodb");
  const corsOptions = {
    origin: `${process.env.FRONT_BASE_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  };
  app.use(cors(corsOptions));
  const userRouter = require("./routes/user-router");
  const classificationRouter = require("./routes/classfication-routes/classfication-router");
  app.use("/user", userRouter);
  app.use("/classification", classificationRouter);

  app.listen(port, () => {
    console.log("server is running on", `${port}`);
  });
});
