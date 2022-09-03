import crypto from "crypto";
import CRTPayment from "../../../models/CRTReciepts";
import connectDB from "../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchOrder(req, res);
      break;
    case "POST":
      await verifyAndCreateOrder(req, res);
      break;
    case "PUT":
      await createOrder(req, res);
      break;
  }
}

const searchOrder = async (req, res) => {
  try {
    await connectDB();
    const userId = req.query.id;
    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const crtPayment = await CRTPayment.findOne({ email: userId });

    console.log(crtPayment);

    if (crtPayment) {
      return res.status(200).json({ message: "payment Found", crtPayment });
    } else {
      return res.status(200).json({ message: "payment not found", crtPayment: undefined });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyAndCreateOrder = async (req, res) => {
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
      const paymentDetails = new CRTPayment({
        user: req.body.userId,
        paymentId: razorpay_payment_id,
        amount: req.body.amount,
        orderId: razorpay_order_id,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
      });

      await paymentDetails.save();
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

const createOrder = async (req, res) => {
  try {
    await connectDB();

    const paymentDetails = new CRTPayment(req.body);

    await paymentDetails.save();
    if (paymentDetails) {
      return res.status(200).json({ message: "CRT Recipt Creation Successfull" });
    } else {
      return res.status(200).json({ message: "Please Try Again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
