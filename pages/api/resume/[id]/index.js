import ResumeDetails from "../../../../models/Resume";
import connectDB from "../../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchResumeDetails(req, res);
      break;
    case "PUT":
      await updateResumeDetails(req, res);
      break;
    case "DELETE":
      await deleteResumeDetails(req, res);
      break;
  }
}

const searchResumeDetails = async (req, res) => {
  try {
    await connectDB();
    const resumeId = req.query.id;
    if (!resumeId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const resume = await ResumeDetails.findById(resumeId);
    if (resume) {
      return res.status(200).json({ message: "Resume Found", resume });
    } else {
      return res.status(200).json({ message: "Resume not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateResumeDetails = async (req, res) => {
  try {
    await connectDB();
    const resumeId = req.query.id;
    if (!resumeId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const resume = await ResumeDetails.findByIdAndUpdate(
      resumeId,
      { ...req.body.res },
      { new: true }
    );
    if (resume) {
      return res.status(200).json({ message: "Resume Updated", resume });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteResumeDetails = async (req, res) => {
  try {
    await connectDB();
    const resumeId = req.query.id;
    if (!resumeId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const resume = await ResumeDetails.findByIdAndDelete(resumeId);
    if (resume) {
      return res.status(200).json({ message: "Resume Deleted", resume });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
