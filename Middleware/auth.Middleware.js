const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    if (token) {
      let decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded) {
        req.body.authorId = decoded.authorID;
        req.body.authorName = decoded.authorName;
        next();
      } else {
        res.status(401).send({ msg: "Invalid token" });
      }
    } else {
      res.status(401).send({ msg: "Token is missing" });
    }
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};

module.exports = { isAuth };
