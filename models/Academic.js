import mongoose from "mongoose";

const academicSchema = new mongoose.Schema(
  {
    user: { type: String },
    education: [
      {
        institution: String,
        program: String,
        board: String,
        branch: String,
        educationType: String,
        score: {
          typeOfGrade: String,
          grade: Number,
        },
        batch: {
          from: Number,
          to: Number,
        },
        current: Boolean,
        verified: Boolean,
        frozen: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.academics || mongoose.model("academics", academicSchema);
