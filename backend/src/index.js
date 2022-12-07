const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/routes");
const app = express();
dotenv.config();
app.use(express.json());
app.use("/", router);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listnening on port ${port}`);
});
