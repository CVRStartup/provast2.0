import connectDB from "../../../../../src/lib/connectDB";
import Academic from "../../../../../models/Academic";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchAcademics(req, res);
      break;
    case "POST":
      await createUserAcademics(req, res);
      break;
    case "PUT":
      await updateUserDetails(req, res);
      break;
  }
}

const updateUserDetails = async (req, res) => {
  // try {
  await connectDB();
  const { rollNumber } = req.query;
  console.log(rollNumber);
  const academics = await Academic.findOne({ rollNumber });
  const newEducation = [];
  const bodyAcademics = req.body.academics;
  console.log("123", bodyAcademics);
  console.log("456", academics);

  if (academics) {
    academics.education.forEach((x) => {
      if (x && x._id.toString() !== bodyAcademics._id) {
        newEducation.push(x);
      } else {
        if (bodyAcademics) newEducation.push(bodyAcademics);
      }
    });
    const newAcademics = {
      rollNumber,
      education: newEducation,
    };
    const updated = await Academic.findByIdAndUpdate(academics._id, newAcademics, { new: true });
    return res.status(200).json({ message: "Academic Details Updated", updated });
  } else {
    return res.status(200).json({ message: "Academic Details Not Found", updated: undefined });
  }
  // } catch (error) {
  //   return res.status(500).json({ message: error.message });
  // }
};

const searchAcademics = async (req, res) => {
  try {
    await connectDB();
    const { rollNumber } = req.query;

    if (!rollNumber) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const academics = await Academic.findOne({ rollNumber });

    if (academics) {
      return res.status(200).json({ message: "Academic Details Found", academics });
    } else {
      return res.status(500).json({ message: "Academic Details Not Found", academics: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const createUserAcademics = async (req, res) => {
  try {
    await connectDB();

    const details = await Academic.findOne({ rollNumber: req.body.rollNumber });
    const { education } = req.body;
    if (details) {
      await Academic.findByIdAndUpdate(
        details._id,
        {
          rollNumber: req.body.rollNumber,
          education: education,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Details Created",
        education,
      });
    } else {
      const newAcademic = new Academic({
        rollNumber: req.body.rollNumber,
        education: education,
      });

      await newAcademic.save();

      return res.status(200).json({
        message: "Details Created",
        education,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
