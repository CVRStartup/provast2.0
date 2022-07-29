import ResumeDetails from "../../../models/Resume";
import connectDB from "../../../src/lib/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();
    const userId = req.query.id;
    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const resumes = await ResumeDetails.find({ user: userId, public: true });

    if (resumes) {
      return res.status(200).json({ message: "Resume Found", resumes });
    } else {
      return res.status(200).json({ message: "Resume not found", resumes: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
