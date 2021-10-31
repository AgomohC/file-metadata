//  require and initialize dependencies
const express = require("express");
const app = express();
require("dotenv").config();
const multer = require("multer");
const DataUriParser = require("datauri/parser");
const path = require("path");
const { cloudinaryConfig, uploader } = require("./config/cloudinaryConfig");
const parser = new DataUriParser();
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("upfile");

// middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("*", cloudinaryConfig);

// routes
app.post("/api/fileanalyse", multerUploads, async (req, res) => {
  try {
    //  check if file to upload exists
    const upfile = req.file;
    if (!upfile) {
      return res.status(400).json({ msg: "file not found" });
    }
    //  upload file
    const upload = await uploader.upload(
      parser.format(
        path.extname(req.file.originalname).toString(),
        req.file.buffer
      ).content
    );

    //  json return
    return res.status(201).json({
      name: upfile.originalname,
      type: upfile.mimetype,
      size: upfile.size,
      img: upload.secure_url,
    });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
});

// not found handler
app.use((req, res) => {
  res.status(404).send("route does not exist");
});

// listener function
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app is listening on port ${port}...`);
});
