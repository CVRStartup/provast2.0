import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    university: {
      type: String,
    },
    establishedYear: {
      type: String,
    },
    collegeName: {
      type: String,
      required: true,
    },
    collegeType: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.colleges || mongoose.model("colleges", collegeSchema);
