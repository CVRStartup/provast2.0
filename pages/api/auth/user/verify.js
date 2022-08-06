import connectDB from "../../../../src/lib/connectDB";
import User from "../../../../models/User.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await verifyPassphrase(req, res);
      break;
  }
}

const verifyPassphrase = async (req, res) => {
  try {
    await connectDB();

    const { pass } = req.query;

    console.log(req.body);

    if (!pass) {
      return res.status(400).json({ message: "Invalid Passphrase" });
    }
    const college = await User.findOne({ "college.passphrase": pass });
    console.log(college);
    if (college.approved) {
      return res.status(200).json({
        message: "College found",
        verified: true,
        college: {
          name: college.college.name,
          code: college.college.code,
        },
      });
    } else {
      return res
        .status(200)
        .json({ message: "Please try again!", verified: false, college: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
