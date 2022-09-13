import connectDB from "../../../../src/lib/connectDB";
import User from "../../../../models/User.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      await updateUserPlacedDetails(req, res);
      break;
  }
}

const updateUserPlacedDetails = async (req, res) => {
  try {
    await connectDB();
    const { rollNumber, placed } = req.body;

    const user = await User.findOne({ "rollNumber.value": rollNumber });

    if (user) {
      await User.findOneAndUpdate({ "rollNumber.value": rollNumber }, { placed });
      return res.status(200).json({ message: "Updated" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
