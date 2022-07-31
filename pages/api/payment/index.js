import crypto from "crypto";
import Razorpay from "razorpay";
import uniquId from "uniqid";
import Payment from "../../../models/Payment";
import connectDB from "../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await createOrder(req, res);
      break;
    case "POST":
      await verifyOrder(req, res);
      break;
  }
}

const createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.query;

    await instance.orders.create(
      {
        amount: amount * 100,
        currency: "INR",
        receipt: uniquId(),
      },
      (error, order) => {
        if (error) {
          return res.status(500).json({ message: error });
        }

        return res.status(201).json({ order });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const verifyOrder = async (req, res) => {
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
      const paymentDetails = new Payment({
        user: req.body.userId,
        paymentId: razorpay_payment_id,
        amount: req.body.amount,
        orderId: razorpay_order_id,
        plan: req.body.plan,
        tier: req.body.tier,
        expiryDate: duedate,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
      });

      await paymentDetails.save();

      return res.status(200).json({ message: "Payment Successfull" });
    } else return res.status(200).json({ message: "Payment Unsuccessfull" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
