import Payment from "../../../models/Payment";
import connectDB from "../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchOrder(req, res);
      break;
    case "POST":
      await generateOrder(req, res);
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

    const payment = await Payment.findOne({ user: userId });

    if (payment) {
      return res.status(200).json({ message: "payment Found", payment });
    } else {
      return res.status(200).json({ message: "payment not found", payment: undefined });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const generateOrder = async (req, res) => {
  try {
    await connectDB();

    const paymentDetails = new Payment(req.body);

    await paymentDetails.save();

    if (paymentDetails) {
      return res.status(200).json({ message: "Payment Generated", paymentDetails });
    } else {
      return res.status(200).json({ message: "Please try again!", paymentDetails: undefined });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
