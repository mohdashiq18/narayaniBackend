const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema({
  title: { type: String, required: true },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  size: {
    _length: { type: Number, required: true },
    _width: { type: Number, required: true },
  },
});

const UploadModel = mongoose.model("Images", uploadSchema);
module.exports = {
  UploadModel,
};
  