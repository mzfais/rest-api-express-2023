const jwt = require("jsonwebtoken");
const jwtAuth = () => {
  return function (req, res, next) {
    try {
      if (!req.headers.authorization) throw { message: "TOKEN is Required" };
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      console.log(verified);
      if (!verified) throw { message: "Token Error" };
      req.jwt = verified;
      next();
    } catch (error) {
      res.status(401).send({ message: error?.message });
    }
  };
};
module.exports = jwtAuth;
