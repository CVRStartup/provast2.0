import AssessmentStatus from "../../../../models/AssessmentStatus";
import connectDB from "../../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchAssessmentStatus(req, res);
      break;
    case "POST":
      await createAssessmentStatus(req, res);
      break;
    case "PUT":
      await updateAssessmentStatus(req, res);
      break;
    case "DELETE":
      await deleteAssessmentStatus(req, res);
  }
}

const createAssessmentStatus = async (req, res) => {
  try {
    await connectDB();

    const createAssessmentStatus = new AssessmentStatus(req.body);

    await createAssessmentStatus.save();

    console.log("success");
    res.json({
      message: "Success! AssessmentStatus Created",
      AssessmentStatus: createAssessmentStatus,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchAssessmentStatus = async (req, res) => {
  try {
    await connectDB();
    const assessmentId = req.query.assessmentId;
    const assessmentStatuses = await AssessmentStatus.find({
      assessment: assessmentId,
    });

    if (assessmentStatuses) {
      return res
        .status(200)
        .json({ message: "AssessmentStatus Found", assessmentStatuses });
    } else {
      return res.status(200).json({
        message: "AssessmentStatuss not found",
        assessmentStatuses: false,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAssessmentStatus = async (req, res) => {
  try {
    await connectDB();

    const assessmentStatus = await AssessmentStatus.findByIdAndUpdate(
      req.body._id,
      req.body,
      {
        new: true,
      }
    );

    if (assessmentStatus) {
      return res
        .status(200)
        .json({ message: "AssessmentStatus Updated", assessmentStatus });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAssessmentStatus = async (req, res) => {
  try {
    await connectDB();

    const assessmentStatus = await AssessmentStatus.findByIdAndDelete(
      req.query.id
    );
    if (assessmentStatus) {
      return res
        .status(200)
        .json({ message: "AssessmentStatus Removed", assessmentStatus });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
