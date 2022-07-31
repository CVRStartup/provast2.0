import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    paymentId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    coupon: {
      data: [
        {
          type: String,
        },
      ],
      discount: {
        type: Number,
      },
    },
    email: String,
    phone: String,
    address: {
      country: String,
      postal: String,
    },
    plan: {
      type: String,
      required: true,
    },
    tier: {
      type: Number,
      default: 1,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.payments || mongoose.model("payments", paymentSchema);
