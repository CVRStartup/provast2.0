import UserDetails from "../../../../models/User";
import connectDB from "../../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getAllRegisteredColleges(req, res);
      break;
    case "PUT":
      await updateRegisteredCollegeStatus(req, res);
      break;
    case "DELETE":
      await deleteRegisteredCollege(req, res);
      break;
  }
}

const deleteRegisteredCollege = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.query;

    const college = await UserDetails.findOneAndDelete({ _id: id });

    if (college) {
      return res.status(200).json({ message: "College Deleted" });
    } else {
      return res.status(200).json({ message: "No Colleges available" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateRegisteredCollegeStatus = async (req, res) => {
  try {
    await connectDB();

    const { id, status } = req.query;

    const college = await UserDetails.findOneAndUpdate(
      { _id: id },
      { approved: status },
      { new: true }
    );

    if (college) {
      return res.status(200).json({ message: "Status Updated", college });
    } else {
      return res.status(200).json({ message: "No Colleges available", colleges: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllRegisteredColleges = async (req, res) => {
  try {
    await connectDB();

    const collegeDetails = await UserDetails.find({ category: "college" });

    if (collegeDetails.length > 0) {
      return res.status(200).json({ message: "colleges Found", collegeDetails });
    } else {
      return res.status(200).json({ message: "No Colleges available", collegeDetails: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
