import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    paymentId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    orderId: {
      type: String,
    },
    college: {
      name: String,
      code: String,
    },
    email: String,
    phone: String,
    address: {
      country: String,
      postal: String,
    },
    plan: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.crtrecipts || mongoose.model("crtrecipts", paymentSchema);
