const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  }
  
});

const User = model("User", userSchema);

module.exports = User;
