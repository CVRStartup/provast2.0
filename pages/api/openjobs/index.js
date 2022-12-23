import Openjob from "../../../models/Openjob";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchNotices(req, res);
      break;
    case "POST":
      await createOpenjob(req, res);
      break;
    case "PUT":
      await updateNotice(req, res);
      break;
    case "DELETE":
      await deleteNotice(req, res);
  }
}

const createOpenjob = async (req, res) => {
  try {
    await connectDB();

    const createOpenjob = new Openjob(req.body);
    await createOpenjob.save();
    res.json({
      message: "Success! Openjob Created",
      openjob: createOpenjob,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchNotices = async (req, res) => {
  try {
    await connectDB();
    const openjobs = await Openjob.find({}).sort({ $natural: -1 });

    if (openjobs.length > 0) {
      return res.status(200).json({ message: "Openjobs Found", openjobs });
    } else {
      return res.status(200).json({ message: "Openjobs not found", openjobs: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateNotice = async (req, res) => {
  try {
    await connectDB();

    const openjob = await Openjob.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (openjob) {
      return res.status(200).json({ message: "Openjob Updated", openjob });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteNotice = async (req, res) => {
  try {
    await connectDB();

    const openjob = await Openjob.findByIdAndDelete(req.query.id);
    if (openjob) {
      return res.status(200).json({ message: "Openjob Removed", openjob });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
