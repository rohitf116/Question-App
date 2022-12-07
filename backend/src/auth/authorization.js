const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
exports.authorization = (req, res, next) => {
  try {
    const auhorization = req.headers.authorization;
    const token = auhorization.split(" ")[1];
    if (!auhorization) {
      return res
        .status(401)
        .json({ status: false, message: "token is missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
      if (error) {
        return res
          .status(401)
          .json({ status: false, message: "invalid token" });
      }
      console.log(response);
      if (response.isAdmin == "false") {
        return res.status(401).json({
          status: false,
          message: "This user is not authorized for this page",
        });
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
