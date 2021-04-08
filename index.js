const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const multer = require("multer");

const app = express();

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./data/factsheet");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("myfile");

app.set("view engine", "ejs");
app.set("views", "views");
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "views", "index.html"));
  res.render("index");
});

app.get("/superuser", (req, res) => {
  fs.readFile("./data/contacts.json", (err, data) => {
    const fileData = JSON.parse(data);
    res.render("admin", { fileData });
  });
});

app.post("/pms", (req, res) => {
  fs.readFile("./data/contacts.json", (err, data) => {
    const fileData = JSON.parse(data);
    fileData.pms.push({
      name: req.body["pms-name"],
      email: req.body["pms-email"],
      company: req.body["pms-company"],
      phone: req.body["pms-phone-no"],
      message: req.body["pms-message"],
    });
    fs.writeFile("./data/contacts.json", JSON.stringify(fileData), (err) => {
      res.redirect("/");
    });
  });
});

app.post("/raf", (req, res) => {
  fs.readFile("./data/contacts.json", (err, data) => {
    const fileData = JSON.parse(data);
    fileData.raf.push({
      name: req.body["raf-name"],
      email: req.body["raf-email"],
      company: req.body["raf-company"],
      phone: req.body["raf-phone-no"],
      message: req.body["raf-message"],
    });
    fs.writeFile("./data/contacts.json", JSON.stringify(fileData), (err) => {
      res.redirect("/");
    });
  });
});

app.post("/contact", (req, res) => {
  fs.readFile("./data/contacts.json", (err, data) => {
    const fileData = JSON.parse(data);
    fileData.contact.push({
      name: req.body["contact-name"],
      email: req.body["contact-email"],
      phone: req.body["contact-phone"],
      message: req.body["contact-message"],
    });
    fs.writeFile("./data/contacts.json", JSON.stringify(fileData), (err) => {
      res.redirect("/");
    });
  });
});

app.get("/get/:data", (req, res) => {
  fs.readFile("./data/contacts.json", (err, data) => {
    const fileData = JSON.parse(data);
    switch (req.params.data) {
      case "pms":
        res.send(fileData.pms);
        break;
      case "raf":
        res.send(fileData.raf);
      case "contact":
        res.send(fileData.contact);
        break;
    }
  });
});

app.post("/factsheet", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    fs.readFile("./data/data.json", (err, data) => {
      const fileData = JSON.parse(data);
      fileData.factsheet_filename = req.file.originalname;
      fs.writeFile("./data/data.json", JSON.stringify(fileData), (err) => {
        res.redirect("/");
      });
    });
    // res.end("File is uploaded successfully!");
  });
});

app.get("/downloadfs", (req, res) => {
  fs.readFile("./data/data.json", (err, data) => {
    const fileData = JSON.parse(data);
    res.download(
      path.join(__dirname, "data", "factsheet", fileData.factsheet_filename)
    );
  });
});

app.get("/robots.txt", (req, res) => {
res.send("*");
});

app.listen(3000, () => console.log("server started at port 3000"));
