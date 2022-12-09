const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
exports.authenticate = (req, res, next) => {
  try {
    const auhorization = req.headers.authorization;
    console.log(auhorization, "auhorization");
    if (!auhorization) {
      return res
        .status(401)
        .json({ status: false, message: "token is missing" });
    }
    const token = auhorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
      if (error) {
        return res
          .status(401)
          .json({ status: false, message: "invalid token" });
      }
      next();
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};
