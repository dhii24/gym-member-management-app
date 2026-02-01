const Member = require("./models/Member");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/gymDB")
  .then(() => {
    console.log("MongoDB connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB connection error ❌", err);
  });

// Home route
app.get("/", (req, res) => {
  res.send("Gym Member Management App is running 🚀");
});

app.get("/add-member", (req, res) => {
  res.render("add");
});

app.post("/add-member", async (req, res) => {
  try {
    const { name, age, gender, membershipType } = req.body;

    const newMember = new Member({
      name,
      age,
      gender,
      membershipType
    });

    await newMember.save();

    res.send("Member added successfully ✅");
  } catch (error) {
    res.send("Error adding member ❌");
  }
});

// View all members
app.get("/members", async (req, res) => {
  try {
    const members = await Member.find();
    res.render("members", { members });
  } catch (error) {
    res.send("Error fetching members ❌");
  }
});

// Show edit form
app.get("/members/:id/edit", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    res.render("edit", { member });
  } catch (error) {
    res.send("Error loading edit form ❌");
  }
});


// Update member
app.post("/members/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Member.findByIdAndUpdate(id, req.body, {
      runValidators: true
    });

    res.redirect("/members");
  } catch (error) {
    res.send("Error updating member ❌");
  }
});


// Delete member
app.post("/delete-member/:id", async (req, res) => {
  try {
    const memberId = req.params.id;

    await Member.findByIdAndDelete(memberId);

    res.redirect("/members");
  } catch (error) {
    res.send("Error deleting member ❌");
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
