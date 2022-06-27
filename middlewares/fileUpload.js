const uploads = require("../utilities/fileUpload");

const fileUpload = (req, res, next) => {
  uploads("avatar").any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};
module.exports = fileUpload;
