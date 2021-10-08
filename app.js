const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.static("./public"));
const multer = require("multer");
const DataUriParser = require("datauri/parser");
const path = require("path");
const { cloudinaryConfig, uploader } = require("./config/cloudinaryConfig");
const parser = new DataUriParser();
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("upfile");
// const upload = multer({ dest: "uploads/" });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("*", cloudinaryConfig);
app.post("/api/fileanalyse", multerUploads, async (req, res) => {
  try {
    const upfile = req.file;
    if (!upfile) {
      return res.status(400).json({ msg: "file not found" });
    }
    // console.log(
    //   typeof parser.format(
    //     path.extname(req.file.originalname).toString(),
    //     req.file.buffer
    //   ).content
    // );
    const upload = await uploader.upload(
      parser.format(
        path.extname(req.file.originalname).toString(),
        req.file.buffer
      ).content
    );
    console.log(upload);
    res.status(201).json({
      name: upfile.originalname,
      type: upfile.mimetype,
      size: upfile.size,
      img: upload.url,
    });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
});
app.use((req, res) => {
  res.status(404).send("route does not exist");
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app is listening on port ${port}...`);
});
