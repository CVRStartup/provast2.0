import ResumeDetails from "../../../models/Resume";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchResumeDetails(req, res);
      break;
    case "POST":
      await createResumeDetails(req, res);
      break;
  }
}

const createResumeDetails = async (req, res) => {
  try {
    await connectDB();

    let { userId, resume } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const createResumeDetails = new ResumeDetails({
      ...resume,
      user: userId,
    });

    await createResumeDetails.save();
    res.json({
      message: "Success! Resumes Created",
      resume: createResumeDetails,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchResumeDetails = async (req, res) => {
  try {
    await connectDB();
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const resumeDetails = await ResumeDetails.find();

    if (resumeDetails) {
      return res.status(200).json({ message: "Resumes Found", resumes: resumeDetails });
    } else {
      return res.status(200).json({ message: "Resumes not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
