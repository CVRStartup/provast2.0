import mongoose from "mongoose";

const NoticeSchema = mongoose.Schema(
  {
    user: { type: String, required: true },
    author: {
      name: String,
      image: String,
    },
    attachment: String,
    college: {
      name: String,
      code: String,
    },
    title: String,
    description: {
      type: String,
    },
    status: String,
    visible: [
      {
        email: String,
      },
    ],
    seen: [
      {
        email: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
