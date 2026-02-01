const mongoose = require("mongoose");

// Create schema
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  membershipType: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
});

// Create model
const Member = mongoose.model("Member", memberSchema);

// Export model
module.exports = Member;
