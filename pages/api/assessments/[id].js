import Assessments from "../../../models/Assessment";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchAssessment(req, res);
      break;
  }
}

const searchAssessment = async (req, res) => {
  try {
    await connectDB();
    const assessment = await Assessments.findById(req.query.id);

    if (assessment) {
      return res.status(200).json({ message: "Assessment Found", assessment });
    } else {
      return res
        .status(200)
        .json({ message: "Assessment not found", assessment: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
