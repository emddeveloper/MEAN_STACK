const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1];
    jwt.verify(token, "very-long-sentence");
    next();
  } catch (eror) {
    res.status(401).json({
      _message: "Not Authorized",
    });
  }
};
