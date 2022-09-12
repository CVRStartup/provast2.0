import connectDB from "../../../../../src/lib/connectDB";
import Academic from "../../../../../models/Academic";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      await updateAcademicDetails(req, res);
      break;
    case "GET":
      await getAcademicDetails(req, res);
      break;
  }
}

const getAcademicDetails = async (req, res) => {
  try {
    const { rollNumber, id: academicId } = req.query;
    const academics = await Academic.findOne({ rollNumber });
    let filteredAcademics;
    if (academics) {
      filteredAcademics = academics.education.filter((x) => !academicId || x._id == academicId);
      return res.status(200).json({ message: "Academics Details Found", filteredAcademics });
    } else {
      return res.status(200).json({ message: "Academics Details Not Found", filteredAcademics });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAcademicDetails = async (req, res) => {
  try {
    await connectDB();
    const { rollNumber, id: academicId } = req.query;

    let academics = await Academic.findOne({ rollNumber });

    if (academics) {
      for (let i = 0; i < academics.education.length; i++) {
        if (academics.education[i]._id == academicId) {
          academics.education.splice(i, 1);
          i--;
        }
      }
      academics.education.push(req.body);

      academics = await Academic.findOneAndUpdate({ rollNumber }, academics, { new: true });

      return res.status(200).json({ message: "Academics Updated", academics });
    } else {
      return res.status(200).json({ message: "Academics Not Found", academics });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
