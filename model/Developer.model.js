const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Add other skill-related fields as needed
});

const professionalExperienceSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  tech_stack: { type: String, required: true },
  skills_used: [skillSchema],
  time_period: { type: String, required: true },
});

const educationalExperienceSchema = new mongoose.Schema({
  degree_name: { type: String, required: true },
  school_name: { type: String, required: true },
  time_period: { type: String, required: true },
});

const developerSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: [skillSchema],
  professional_experience: [professionalExperienceSchema],
  educational_experience: [educationalExperienceSchema],
});

const DeveloperModel = mongoose.model("Developer", developerSchema);

module.exports = {DeveloperModel};
