const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const ClientModel = mongoose.model("Client", clientSchema);

module.exports = {ClientModel};
