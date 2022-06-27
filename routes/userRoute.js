const express = require("express");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin");
const fileUpload = require("../middlewares/fileUpload");
const {
  createUser,
  loginUser,
  getUser,
  logout,
  getAllUser,
} = require("../controllers/userControllers");
const {
  userValidation,
  addUserValidate,
} = require("../middlewares/userValidation");

router.post("/signup", fileUpload, userValidation, addUserValidate, createUser);
router.get("/get", checkLogin, getUser);
router.get("/getall", getAllUser);
router.post("/login", loginUser);
router.delete("/logout", logout);

module.exports = router;
