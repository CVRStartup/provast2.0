import crypto from "crypto";
import connectDB from "../../../src/lib/connectDB";
import CRTPayment from "../../../models/CRTReciepts";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getAllOrders(req, res);
      break;
  }
}

const getAllOrders = async (req, res) => {
  try {
    await connectDB();
    const crtPayments = await CRTPayment.find({});

    console.log(crtPayments);

    if (crtPayments) {
      return res.status(200).json({ message: "payment Found", crtPayments });
    } else {
      return res.status(200).json({ message: "payment not found", crtPayments: undefined });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
