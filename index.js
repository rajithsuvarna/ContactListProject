const express = require("express");
const path = require("path");
const port = 8000;

const app = express();
const db = require("./config/mongoose");
const Contact = require("./model/contact");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

var contactList = [
  { name: "Spider Man", phone: "1231231234" },
  { name: "Bat Man", phone: "1234123456" },
  { name: "Ant Man", phone: "1234512345" },
];

app.get("/", function (req, res) {
  /*
  return res.render("home", {
    title: "Contact List",
    Contact_List: contactList,
  });
  */
  Contact.find({})
    .then((conacts) => {
      return res.render("home", {
        title: "ContactList",
        Contact_List: conacts,
      });
    })
    .catch((err) => console.log("ERROR", err));
});

app.post("/create-contact", function (req, res) {
  /*let contactdetails = { name: req.body.name, phone: req.body.phone };
  contactList.push(contactdetails);
  return res.redirect("back");*/
  Contact.create({ name: req.body.name, phone: req.body.phone })
    .then(() => {
      return res.redirect("back");
    })
    .catch((err) => console.log(err));
});

app.get("/delete-contact", function (req, res) {
  /*
  let phone = req.query.phone;
  let contactIndex = contactList.findIndex((contact) => contact.phone == phone);
  if (contactIndex != -1) {
    contactList.splice(contactIndex, 1);
  }

  return res.redirect("back");
  */

  let id = req.query.id;
  Contact.findByIdAndDelete(id)
    .then(() => {
      return res.redirect("back");
    })
    .catch((err) => console.log("ERROR:", err));
});

app.listen(port, function (err) {
  if (err) {
    console.log("ERROR:", err);
    return;
  }
  console.log("Server is UP and RUNNING!! on port:", port);
});
