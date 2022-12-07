const { Schema, model } = require("mongoose");
const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true },
  secret: { type: String, required: true },
});

module.exports = model("Admin", AdminSchema);
