import connectDB from "../../../../src/lib/connectDB";
import Academic from "../../../../models/Academic";

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
  try {
    await connectDB();
    const { user } = req.query;

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const academics = await Academic.findOne({ user: user });
    const newEducation = [];
    const bodyAcademics = req.body.academics;
    console.log("123", bodyAcademics);

    if (academics) {
      academics.education.forEach((x) => {
        if (x) {
          newEducation.push(x);
          if (bodyAcademics) newEducation.push(bodyAcademics);
        }
      });
      console.log(academics._id, newEducation);
      const newAcademics = {
        user,
        education: newEducation,
      };
      const updated = await Academic.findByIdAndUpdate(
        academics._id,
        newAcademics,
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Academic Details Updated", updated });
    } else {
      return res
        .status(200)
        .json({ message: "Academic Details Not Found", updated });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchAcademics = async (req, res) => {
  try {
    await connectDB();
    const { user } = req.query;

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const academics = await Academic.findOne({ user: user });

    if (academics) {
      return res
        .status(200)
        .json({ message: "Academic Details Found", academics });
    } else {
      return res
        .status(200)
        .json({ message: "Academic Details Not Found", academics: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const createUserAcademics = async (req, res) => {
  try {
    await connectDB();
    const { user } = req.query;

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const details = await Academic.findOne({ _id: user });

    if (details) {
      return res.status(200).json({ message: "Details Already Exists" });
    } else {
      const { academics } = req.body;
      const newAcademic = new Academic({
        user,
        education: [academics],
      });

      await newAcademic.save();

      return res.status(200).json({
        message: "Details Created",
        academics,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
