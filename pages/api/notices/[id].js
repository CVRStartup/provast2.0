import Notice from "../../../models/Notice";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchNotice(req, res);
      break;
    case "PUT":
      await updateNotice(req, res);
  }
}

const searchNotice = async (req, res) => {
  try {
    await connectDB();

    const notice = await Notice.findById(req.query.id);
    if (notice) {
      return res.status(200).json({ message: "notice Found", notice });
    } else {
      return res.status(200).json({ message: "notice not found", notice: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
