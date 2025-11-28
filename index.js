const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const multer = require("multer");

/**
 * @file index.js
 * @description Main entry point for the Credent Global application.
 * Sets up the Express server, configures middleware, and defines routes.
 */

const app = express();

/**
 * Disk storage configuration for multer.
 * Specifies the destination directory and filename for uploaded files.
 */
var storage = multer.diskStorage({
  /**
   * Sets the destination for uploaded files.
   * @param {Object} req - The request object.
   * @param {Object} file - The file object.
   * @param {Function} callback - The callback function to call with the destination.
   */
  destination: function (req, file, callback) {
    callback(null, "./data/factsheet");
  },
  /**
   * Sets the filename for uploaded files.
   * @param {Object} req - The request object.
   * @param {Object} file - The file object.
   * @param {Function} callback - The callback function to call with the filename.
   */
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

/**
 * Multer upload middleware configured with storage options.
 * Handles single file uploads with the field name "myfile".
 */
var upload = multer({ storage: storage }).single("myfile");

// Set up view engine and static assets
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * GET /
 * Renders the index page.
 * @name get/
 * @function
 * @memberof module:index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "views", "index.html"));
  res.render("index");
});

/**
 * GET /superuser
 * Renders the admin page with contact data loaded from contacts.json.
 * @name get/superuser
 * @function
 * @memberof module:index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/superuser", (req, res) => {
  fs.readFile("./data/contacts.json", (err, data) => {
    const fileData = JSON.parse(data);
    res.render("admin", { fileData });
  });
});

/**
 * POST /pms
 * Handles Portfolio Management Services (PMS) form submissions.
 * Appends new entry to contacts.json and redirects to root.
 * @name post/pms
 * @function
 * @memberof module:index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
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

/**
 * POST /raf
 * Handles Refer a Friend (RAF) form submissions.
 * Appends new entry to contacts.json and redirects to root.
 * @name post/raf
 * @function
 * @memberof module:index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
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

/**
 * POST /contact
 * Handles General Contact form submissions.
 * Appends new entry to contacts.json and redirects to root.
 * @name post/contact
 * @function
 * @memberof module:index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
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

/**
 * GET /get/:data
 * Retrieves specific contact data (pms, raf, or contact) as JSON.
 * @name get/get/:data
 * @function
 * @memberof module:index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
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

/**
 * POST /factsheet
 * Handles file uploads for factsheets.
 * Updates the factsheet filename in data.json and redirects to root.
 * @name post/factsheet
 * @function
 * @memberof module:index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
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

/**
 * GET /downloadfs
 * Downloads the current factsheet file.
 * Reads filename from data.json and initiates download.
 * @name get/downloadfs
 * @function
 * @memberof module:index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/downloadfs", (req, res) => {
  fs.readFile("./data/data.json", (err, data) => {
    const fileData = JSON.parse(data);
    res.download(
      path.join(__dirname, "data", "factsheet", fileData.factsheet_filename)
    );
  });
});

/**
 * GET /robots.txt
 * Serves a wildcard robots.txt allowing all access.
 * @name get/robots.txt
 * @function
 * @memberof module:index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/robots.txt", (req, res) => {
res.send("*");
});

/**
 * Starts the server on the specified port.
 */
app.listen(process.env.PORT, () => console.log("server started at port 3000"));
