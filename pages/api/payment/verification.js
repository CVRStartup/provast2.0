import crypto from "crypto";
import Payment from "../../../models/Payment";
import connectDB from "../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      await verifyAndUpdateOrder(req, res);
      break;
  }
}

const verifyAndUpdateOrder = async (req, res) => {
  try {
    await connectDB();

    const { razorpay_order_id, razorpay_signature, razorpay_payment_id } = req.body.response;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    const hash = crypto.createHmac("sha256", key_secret);
    hash.update(razorpay_order_id + "|" + razorpay_payment_id);
    const digest = hash.digest("hex");

    var now = new Date();
    var duedate = new Date(now);
    duedate.setDate(now.getDate() + 365);

    if (digest === razorpay_signature) {
      const paymentDetails = await Payment.findOneAndUpdate(
        { user: req.body.userId },
        {
          paymentId: razorpay_payment_id,
          amount: req.body.amount,
          orderId: razorpay_order_id,
          plan: req.body.plan,
          expiryDate: duedate,
          email: req.body.email,
          address: req.body.address,
          phone: req.body.phone,
        }
      );
      if (paymentDetails) {
        return res.status(200).json({ message: "Payment Successfull" });
      } else {
        return res.status(200).json({ message: "Please Try Again!" });
      }
    } else return res.status(200).json({ message: "Payment Unsuccessfull" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
