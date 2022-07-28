import College from "../../../models/College";
import connectDB from "../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getCollegesList(req, res);
      break;
    case "POST":
      await addCollege(req, res);
      break;
  }
}

const addCollege = async (req, res) => {
  try {
    await connectDB();

    const { userId, name, code } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const college = new CollegeList({
      admin: userId,
      name,
      code,
    });

    await college.save();
    res.json({
      message: "Success! college added",
      college: college,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCollegesList = async (req, res) => {
  try {
    await connectDB();

    const searchValue = req.query.search;
    let filter = {};
    let searchRegex;
    if (searchValue) {
      searchRegex = new RegExp(searchValue, "i");
      filter = { collegeName: searchRegex };
    }

    const colleges = await College.find(filter).limit(20);

    if (colleges.length > 0) {
      return res.status(200).json({ message: "colleges Found", colleges });
    } else {
      return res.status(200).json({ message: "No Colleges available", colleges: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
