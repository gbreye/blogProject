import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  textBlock: {
    type: String,
    required: true,
  },
});

const Page = mongoose.model("Page", userSchema);

export default Page;