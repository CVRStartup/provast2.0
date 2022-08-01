import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    college: {
      name: {
        type: String,
      },
      code: {
        type: String,
      },
    },
    name: {
      type: String,
    },
    timePermitted: {
      type: Number,
    },
    sections: [
      {
        name: String,
        questions: [
          {
            question: {
              data: String,
              image: String,
            },
            options: [
              {
                key: String,
                value: String,
              },
            ],
            answer: String,
            difficulty: String,
          },
        ],
      },
    ],

    shortlistedStudents: [String],

    allowedBranches: {
      type: [String],
    },

    allowedBatches: {
      type: [Number],
    },

    expectedTime: {
      type: Number,
    },

    public: {
      type: Boolean,
    },

    company: String,
    mode: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.assessments ||
  mongoose.model("assessments", assessmentSchema);
