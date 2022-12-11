const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
exports.authenticate = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    console.log(authorization, "auhorization");
    console.log(req.headers, "req.headers");
    if (!authorization) {
      return res
        .status(401)
        .json({ status: false, message: "token is missing" });
    }
    const token = authorization.split(" ")[1];

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
