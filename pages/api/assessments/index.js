import Assessments from "../../../models/Assessment";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchAssessments(req, res);
      break;
    case "POST":
      await createAssessment(req, res);
      break;
    case "PUT":
      await updateAssessment(req, res);
      break;
    case "DELETE":
      await deleteAssessment(req, res);
  }
}

const createAssessment = async (req, res) => {
  try {
    await connectDB();
    const createAssessment = new Assessments(req.body);

    await createAssessment.save();
    // await Assessments.create(new Assessments(req.body));
    res.json({
      message: "Success! Assessment Created",
      assessment: createAssessment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchAssessments = async (req, res) => {
  try {
    await connectDB();
    const collegename = req.query.collegename;
    const collegecode = req.query.collegecode;
    const assessments = await Assessments.find({
      college: { name: collegename, code: collegecode },
    });

    if (assessments) {
      return res
        .status(200)
        .json({ message: "Assessments Found", assessments });
    } else {
      return res
        .status(200)
        .json({ message: "Assessments not found", assessments: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAssessment = async (req, res) => {
  try {
    await connectDB();

    const assessment = await Assessments.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    if (assessment) {
      return res
        .status(200)
        .json({ message: "Assessment Updated", assessment });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAssessment = async (req, res) => {
  try {
    await connectDB();

    const assessment = await Assessments.findByIdAndDelete(req.query.id);
    if (assessment) {
      return res
        .status(200)
        .json({ message: "Assessment Removed", assessment });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
