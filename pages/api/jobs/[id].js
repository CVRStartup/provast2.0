import Jobs from "../../../models/Job";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchJob(req, res);
      break;
  }
}

const searchJob = async (req, res) => {
  try {
    await connectDB();

    const job = await Jobs.findById(req.query.id);
    if (job) {
      return res.status(200).json({ message: "job Found", job });
    } else {
      return res.status(200).json({ message: "job not found", job: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
