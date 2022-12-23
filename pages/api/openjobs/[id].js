import Openjob from "../../../models/Openjob";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchOpenjob(req, res);
      break;
  }
}

const searchOpenjob = async (req, res) => {
  try {
    await connectDB();

    const openjob = await Openjob.findById(req.query.id);
    if (openjob) {
      return res.status(200).json({ message: "openjob Found", openjob });
    } else {
      return res.status(200).json({ message: "openjob not found", openjob: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
