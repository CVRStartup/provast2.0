import mongoose from "mongoose";

const OpenjobSchema = mongoose.Schema(
  {
    name: String,
    eligiblityBatch: String,
    lastDate: Date,
    jobLink: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Openjob || mongoose.model("Openjob", OpenjobSchema);
