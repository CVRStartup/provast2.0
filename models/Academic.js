import mongoose from "mongoose";

const academicSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    education: [
      {
        insitution: String,
        program: String,
        board: String,
        branch: String,
        educationType: String,
        score: {
          typeOfGrade: String,
          grade: Number,
        },
        batch: {
          from: Date,
          to: Date,
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
