const bcrypt = require("bcrypt");
const { generateToken } = require("../utilities/generateToken");
const user = require("../models/userModel");
const postModal = require("../models/postModel");

//method:POST
//url:user/signup
//access:Public

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //find user from db
    let User;
    const existUser = await user.findOne({ email });

    if (!existUser) {
      //hash user password
      const hashPassword = await bcrypt.hash(password, 10);

      if (req.files && req.files.length > 0) {
        User = new user({
          avatar: `${req.protocol}://${req.get("host")}/uploads/avatar/${
            req.files[0].filename
          }`,
          username,
          email,
          password: hashPassword,
        });
        const userData = await User.save();
        res.status(201).send(userData);
      } else {
        User = new user({ username, email, password: hashPassword });
        const userData = await User.save();
        res.status(201).send(userData);
      }
    } else {
      res.status(400).json({ message: "user already exist" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
//method:GET
//url:user/get
//access:Private
const getUser = (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(404).send("not found");
  }
};
const getAllUser = async (req, res) => {
  try {
    const posts = await postModal.find();
    res.send(posts);
  } catch (error) {
    console.log(error);
  }
};

//method:POST
//url:user/Login
//access:public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await user.findOne({ email });
    //password match from user request
    const isMatchPassword = await bcrypt.compare(password, User.password);
    if (isMatchPassword) {
      const userObj = {
        id: User._id,
        username: User.username,
        email: User.email,
        avatar: User.avatar,
      };

      //setCookies
      res.cookie(process.env.COOKIE_NAME, generateToken(userObj), {
        maxAge: process.env.JWT_EXPIRES,
        httpOnly: true,
        signed: true,
      });
      res.send("login successfully");
    } else {
      res.status(200).json({ error: "invalid creadintial" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//method:delete
//url:user/logout
//access:Private
const logout = (req, res) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  try {
    if (cookies) {
      res.clearCookie(process.env.COOKIE_NAME);
      res.send("user logout");
    }
  } catch (error) {
    console.log(error);
    res.send("err to failed");
  }
};

module.exports = {
  createUser,
  getUser,
  loginUser,
  logout,
  getAllUser,
};
