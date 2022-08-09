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
    modules: {
      type: [String],
    },
    expiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.payments || mongoose.model("payments", paymentSchema);
