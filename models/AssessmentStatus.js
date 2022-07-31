import mongoose from "mongoose";

const assessmentStatusSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    assessment: { type: String, ref: "assessment" },
    college: {
      name: {
        type: String,
        uppercase: true,
      },
      code: {
        type: String,
        uppercase: true,
      },
    },
    responses: [
      {
        question: String,
        response: String,
      },
    ],
    marks: {
      total: Number,
      scored: Number,
    },
    openedAt: {
      type: Date,
    },
    finishedAt: {
      type: Date,
      default: null,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.assessmentStatus ||
  mongoose.model("assessmentStatus", assessmentStatusSchema);
