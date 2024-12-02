import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  authorId: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  tags: [String],

  imgFile: {
    type: String,
    default: "",
  },
  // imgPath:{
  //   type: String,
  //   default : "../public/images",
  // },
  createdAt: {
    type: Date,
    default: new Date().toISOString,
  },
  //likes
  likeCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Tour", tourSchema);
