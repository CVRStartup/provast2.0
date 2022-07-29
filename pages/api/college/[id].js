import College from "../../../models/College";
import connectDB from "../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getCollegesList(req, res);
      break;
  }
}

const getCollegesList = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.query;

    const college = await College.findById(id);

    if (college) {
      return res.status(200).json({ message: "colleges Found", college });
    } else {
      return res.status(200).json({ message: "No Colleges available", college: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
