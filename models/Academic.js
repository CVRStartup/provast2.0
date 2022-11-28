import mongoose from "mongoose";

const academicSchema = new mongoose.Schema(
  {
    user: { type: String },
    rollNumber: { type: String, unique: true },
    education: [
      {
        institution: String,
        program: String,
        board: String,
        branch: String,
        educationType: String,
        sem: [
          {
            number: Number,
            onGoingBacklogs: Number,
            result: {
              typeOfGrade: String,
              current: {
                type: Number,
              },
              cummulative: {
                type: Number,
              },
              totalBacklogs: {
                type: Number,
              },
              onGoingBacklogs: {
                type: Number,
              },
            },
            sheet: String,
            verified: Boolean,
            frozen: Boolean,
          },
        ],
        score: {
          typeOfGrade: String,
          grade: Number,
        },
        batch: {
          from: Number,
          to: Number,
        },
        current: {
          type: Boolean,
          default: false,
        },
        verified: {
          type: Boolean,
          default: false,
        },
        frozen: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.academics || mongoose.model("academics", academicSchema);
