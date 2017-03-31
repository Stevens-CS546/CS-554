const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: "./uploads" });

const magick = require("../utils/magick");

const fs = require("fs");
const path = require("path");

router.post("/", upload.single('imageToResize'), (req, res) => {
    res.setHeader('Content-disposition', 'attachment; filename=result.png');
    res.setHeader('Content-type', "image/png");

    const fileStream = fs.createReadStream(path.resolve(req.file.path));
    const resultStream = magick.makeThumbnail(fileStream);

    resultStream.pipe(res);
});

module.exports = router;