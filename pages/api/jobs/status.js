import Jobs from "../../../models/Job";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      await updateJob(req, res);
      break;
  }
}

const updateJob = async (req, res) => {
  try {
    await connectDB();
    let job = await Jobs.findById(req.query.id);
    if (!job) {
      throw new Error("Job not found!");
    }
    let neweligible = [];
    if (job.typeOfPost === "Shortlisted Students") {
      job?.eligible?.forEach((x) => {
        if (x) {
          if (x.email !== req.query.email) neweligible.push(x);
          else if (req.body.newstatus) neweligible.push(req.body.newstatus);
        }
      });
    } else {
      neweligible = job?.eligible ?? [];
      let index = -1;
      neweligible?.some((x, idx) => {
        if (x.email === req.query.email) {
          index = idx;
          return true;
        }
      });

      if (index == -1) neweligible.push(req.body.newstatus);
      else neweligible[index] = req.body.newstatus;
    }

    job.eligible = neweligible;
    const updated = await Jobs.findByIdAndUpdate(req.query.id, job, {
      new: true,
    });
    if (updated) {
      return res.status(200).json({ message: "Job Updated", job: updated });
    } else {
      return res.status(200).json({ message: "Please try again", job: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
