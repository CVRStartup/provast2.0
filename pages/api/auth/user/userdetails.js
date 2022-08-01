import connectDB from "../../../../src/lib/connectDB";
import User from "../../../../models/User.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchDetails(req, res);
      break;
  }
}

const searchDetails = async (req, res) => {
  try {
    await connectDB();
    const { userId } = req.query;

    const details = await User.findById(userId);

    if (details) {
      return res.status(200).json({ message: "Details Found", details });
    } else {
      return res.status(200).json({ message: "Details not found", details: undefined });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
