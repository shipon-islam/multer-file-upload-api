const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  try {
    if (cookies) {
      const token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    }
  } catch (error) {
    console.log(error);
    next("äuthencctioon  eerr");
  }
};
module.exports = checkLogin;
