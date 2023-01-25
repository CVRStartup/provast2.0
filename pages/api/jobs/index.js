import axios from "axios";
import Jobs from "../../../models/Job";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchJobs(req, res);
      break;
    case "POST":
      await createJob(req, res);
      break;
    case "PUT":
      await updateJob(req, res);
      break;
    case "DELETE":
      await deleteJob(req, res);
  }
}

const createJob = async (req, res) => {
  if (req.body.status != "Draft") {
    await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        to: "/topics/all",
        notification: {
          title: `${req.body.company} posted a job`,
          body: "Click to know more",
        },
        priority: 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `key=${process.env.FCM_SERVERKEY}`,
        },
      }
    );
  }
  try {
    await connectDB();

    const createJob = new Jobs(req.body);
    await createJob.save();
    res.json({
      message: "Success! Job Created",
      job: createJob,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchJobs = async (req, res) => {
  try {
    await connectDB();
    const jobs = await Jobs.find({
      college: { name: req.query.collegename, code: req.query.collegecode },
    }).sort({ updatedAt: -1 }).limit(12)

    if (jobs.length > 0) {
      return res.status(200).json({ message: "jobs Found", jobs });
    } else {
      return res.status(200).json({ message: "jobs not found", jobs: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    await connectDB();

    const job = await Jobs.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (job) {
      return res.status(200).json({ message: "Job Updated", job });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    await connectDB();

    const Job = await Jobs.findByIdAndDelete(req.query.id);
    if (Job) {
      return res.status(200).json({ message: "Job Removed", Job });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
