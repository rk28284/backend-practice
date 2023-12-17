const express = require("express");
const DeveloperRouter = express.Router();
const { isAuth } = require("../Middleware/auth.Middleware");
const { DeveloperModel } = require('../model/Developer.model');

DeveloperRouter.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      skills,
      professionalExperience,
      educationalExperience,
    } = req.body;

    const result = await DeveloperModel.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      skills,
      professional_experience: professionalExperience,
      educational_experience: educationalExperience,
    });

    res.status(201).json({ message: "Signup successful", user: result });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

DeveloperRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await DeveloperModel.findOne({ email });

    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ userId: user._id, userEmail: user.email }, process.env.JWT_SECRET);
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

DeveloperRouter.get("/profile", isAuth, async (req, res) => {
  try {
    const userProfile = req.body;
    res.status(200).json({ message: "Profile retrieved successfully", user: userProfile });
  } catch (error) {
    console.error("Profile retrieval error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

DeveloperRouter.put("/profile", isAuth, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      skills,
      professionalExperience,
      educationalExperience,
    } = req.body;

    const result = await DeveloperModel.updateOne(
      { _id: req.body.authorId },
      {
        $set: {
          first_name: firstName,
          last_name: lastName,
          skills,
          professional_experience: professionalExperience,
          educational_experience: educationalExperience,
        },
      }
    );

    res.status(200).json({ message: "Profile updated successfully", user: result });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { DeveloperRouter };
