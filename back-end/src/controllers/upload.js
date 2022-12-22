const multer = require("multer");
const fs = require("fs-extra");
const UserModel = require("../models/user");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
let upload = multer({ storage: storage });
module.exports = {
  uploadAvatar: async (req, res, next) => {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return res.status(400).send({ message: "User not found" });
    if (!req.file)
      return res.status(400).send({ message: "Please upload a file" });
    let typeOfFile = req.file.mimetype.split("/")[1];
    if (typeOfFile.match("/JPG|jpg|jpeg|png|gif/")) {
      let img = fs.readFileSync(req.file.path);
      let encode_image = img.toString("base64");
      const avatar = { contentType: req.file.mimetype, imageBase64: encode_image };
      user.avatar = avatar
      await user.save();
      user.password = undefined
      res.status(200).send({
        message: "Upload image successfully",
        data: user
      });
    } else {
      return res.status(400).send({ message: "Only image file is allowed" });
    }
  },

  uploadMultipleImages: (req, res, next) => {
    if (!req.files)
      return res.status(400).send({ message: "Please choose files" });
    const files = req.files;
    for (let i = 0; i < files.length; i++) {
      const typeOfFile = files[i].mimetype.split("/")[1];
      if (!typeOfFile.match("/JPG|jpg|jpeg|png|gif/")) {
        return res
          .status(400)
          .send({ message: "Only image files are allowed" });
      }
    }
    upload.array("myImage", files.length);
    let data = [];
    for (let i = 0; i < files.length; i++) {
      let img = fs.readFileSync(files[i].path);
      let encode_image = img.toString("base64");
      ImageModel.create({
        contentType: files[i].mimetype,
        image: encode_image,
      });
    }
    return res.status(200).send({
      message: "Upload images successfully",
    });
  },
};
