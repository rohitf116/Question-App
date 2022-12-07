const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const { connect } = require("mongoose");
const router = require("./routes/routes");
const app = express();
dotenv.config();
app.use(express.json());
app.use(multer().any());
connect(process.env.MONGO_STRING)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log(error));

app.use("/", router);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listnening on port ${port}`);
});
