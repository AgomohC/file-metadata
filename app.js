const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.static("./public"));
const multer = require("multer");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("upfile");
// const upload = multer({ dest: "uploads/" });
app.post("/api/fileanalyse", multerUploads, (req, res) => {
  console.log("req.file:", req.file);
  const upfile = req.file;
  if (!upfile) {
    return res.status(400).json({ msg: "file not found" });
  }
  res.status(201).json({
    name: upfile.originalname,
    type: upfile.mimetype,
    size: upfile.size,
  });
});
app.use((req, res) => {
  res.status(404).send("route does not exist");
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app is listening on port ${port}...`);
});
