import Razorpay from "razorpay";
import uniquId from "uniqid";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await createTransferOrder(req, res);
      break;
  }
}

const getTwoPercent = (amount) => {
  return ((amount / 100) * 2).toFixed(2);
};

const createTransferOrder = async (req, res) => {
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
        transfers: [
          {
            account: "acc_K6PgLGfZjOtadJ",
            amount: amount * 100 - getTwoPercent(amount * 100),
            currency: "INR",
            on_hold: 0,
          },
        ],
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
