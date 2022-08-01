import connectDB from "../../../../src/lib/connectDB";
import Academic from "../../../../models/Academic";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchUserAcademics(req, res);
      break;
    case "POST":
      await createUserAcademics(req, res);
      break;
    // case "PUT":
    //   await updateUserDetails(req, res);
    //   break;
  }
}
const searchUserAcademics = async (req, res) => {
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
        .json({ message: "Academic details found", academics });
    } else {
      return res
        .status(200)
        .json({ message: "Academic details not found", academics: undefined });
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
