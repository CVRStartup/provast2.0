import AssessmentStatus from "../../../../models/AssessmentStatus";
import connectDB from "../../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchAssessmentStatus(req, res);
      break;
  }
}

const searchAssessmentStatus = async (req, res) => {
  try {
    await connectDB();
    const userId = req.query.userId;
    const assessmentId = req.query.id;
    const assessmentStatus = await AssessmentStatus.findOne({
      user: userId,
      assessment: assessmentId,
    });

    if (assessmentStatus) {
      return res
        .status(200)
        .json({ message: "AssessmentStatus Found", assessmentStatus });
    } else {
      return res.status(200).json({
        message: "AssessmentStatus not found",
        assessmentStatus: false,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
