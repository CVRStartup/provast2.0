import User from "../../../../models/User.js";
import connectDB from "../../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getUserDetailsByStudentId(req, res);
      break;
  }
}

const getUserDetailsByStudentId = async (req, res) => {
  try {
    await connectDB();
    let student = await User.findById(req.query.id);

    if (student) {
      return res.status(200).json({ message: "student Found", student });
    } else {
      return res.status(200).json({ message: "students not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
