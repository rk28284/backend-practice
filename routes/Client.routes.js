const express = require("express");
const clientRouter = express.Router();
const bcrypt = require("bcrypt");
const { ClientModel } = require("../model/Client.Model");
const jwt = require("jsonwebtoken");

clientRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.error("Bcrypt hash error:", err);
        throw err; // Throw the error to be caught in the catch block
      }

      const user = new ClientModel({ email, password: hash });
      await user.save();
      res.status(201).send({ msg: "You successfully registered" });
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(400).send({ msg: "Failed to register" });
  }
});

clientRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await ClientModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          const token = jwt.sign(
            { userId: user._id, userEmail: user.email },
            process.env.JWT_SECRET
          );
          res.status(200).send({ msg: "Successfully obtained token", token });
        } else {
          res.status(401).send({ msg: "Invalid credentials" });
        }
      });
    } else {
      res.status(401).send({ msg: "Invalid credentials" });
    }
  } catch (err) {
    res.status(400).send({ msg: "Login failed" });
  }
});

module.exports = { clientRouter };
