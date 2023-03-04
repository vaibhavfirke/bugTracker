const express = require("express");
const userRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../model/user.model");
userRoutes.get("/", async (req, res) => {
  const data = await userModel.find();
  res.send(data);
});

userRoutes.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const chack = await userModel.find({ email: email });
  if (chack.length > 0) {
    res.send({ msg: "Uset All ready Exists !" });
    return;
  }

  try {
    bcrypt.hash(password, 8, async function (err, hash) {
      if (err) {
        res.send({ msg: err });
      } else {
        const data = new userModel({ name, email, password: hash });
        await data.save();
        res.send({ msg: "User Registered" });
      }
    });
  } catch (err) {
    res.send({ msg: err });
  }
});

userRoutes.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.find({ email: email });
  if (user.length > 0) {
    try {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result) {
            const ID=user[0]._id
            const token=jwt.sign({UserId:ID},"bug");
            res.send({msg:"User Login Sucessfull !",token:token})
        } else {
          res.send({ msg: "Wrong Password !" });
        }
      });
    } catch (err) {
      res.send({ msg: err });
    }
  } else {
    res.send({ msg: "Woring email Address !" });
  }
});

module.exports = { userRoutes };
