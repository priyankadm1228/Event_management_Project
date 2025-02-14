const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

let users = [];

app.get("/", (req, res) => {
  console.log("Accessed the home page");
  res.render("index", { title: "Home Page" });
});

app.get("/users", (req, res) => {
  console.log("Accessed the users page");
  res.render("users", { title: "Users Page", users: users });
});

app.post("/add-user", (req, res) => {
  const { name, gender } = req.body;
  console.log(`Adding user: Name: ${name}, Gender: ${gender}`);
  users.push({ name: name, gender: gender });
  res.redirect("/users");
});

app.get("/delete", (req, res) => {
  console.log("Accessed the delete user page");
  res.render("delete", { title: "Delete User" });
});

app.post("/delete-user", (req, res) => {
  const { name } = req.body;
  console.log(`Attempting to delete user: ${name}`);

  const index = users.findIndex((user) => user.name === name);

  if (index !== -1) {
    users.splice(index, 1);
    console.log(`User ${name} deleted successfully`);

    res.redirect("/users");
  } else {
    console.log(`User ${name} not found`);
    res.render("error", {
      message: "User not found. Please check the name and try again.",
    });
  }
});

app.get("/contact", (req, res) => {
  console.log("Accessed the contact page");
  res.render("contact", { title: "Contact Us" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
