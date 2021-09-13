const express = require("express");
const app = express();
app.use(express.static("./public"));
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
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

app.listen(5000, () => {
  console.log("app is listening on port 5000...");
});
