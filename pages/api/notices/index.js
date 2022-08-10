import Notice from "../../../models/Notice";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchNotices(req, res);
      break;
    case "POST":
      await createNotice(req, res);
      break;
    case "PUT":
      await updateNotice(req, res);
      break;
    case "DELETE":
      await deleteNotice(req, res);
  }
}

const createNotice = async (req, res) => {
  try {
    await connectDB();

    const createNotice = new Notice(req.body);
    await createNotice.save();
    res.json({
      message: "Success! Notice Created",
      notice: createNotice,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchNotices = async (req, res) => {
  try {
    await connectDB();
    const notices = await Notice.find({
      college: { name: req.query.collegename, code: req.query.collegecode },
    }).sort({ $natural: -1 });

    if (notices.length > 0) {
      return res.status(200).json({ message: "Notices Found", notices });
    } else {
      return res.status(200).json({ message: "Notices not found", notices: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateNotice = async (req, res) => {
  try {
    await connectDB();

    const notice = await Notice.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (notice) {
      return res.status(200).json({ message: "Notice Updated", notice });
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

    const notice = await Notice.findByIdAndDelete(req.query.id);
    if (notice) {
      return res.status(200).json({ message: "Notice Removed", notice });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
