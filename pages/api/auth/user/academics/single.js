import connectDB from "../../../../../src/lib/connectDB";
import Academic from "../../../../../models/Academic";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getUserSingleAcademic(req, res);
      break;
    case "PUT":
      await updateUserSingleAcademic(req, res);
      break;
  }
}

const getUserSingleAcademic = async (req, res) => {
  try {
    await connectDB();
    const { id, rollNumber } = req.query;

    const academics = await Academic.findOne({ rollNumber });
    let oldAcademic = [];
    if (id === "undefined") {
      oldAcademic = academics.education.filter((academic) => academic.current);
      console.log("old academic ", oldAcademic);
    } else if (id === "null") {
      oldAcademic = academics;
    } else {
      oldAcademic = academics.education.filter((academic) => academic._id === id);
    }
    if (oldAcademic?.length > 0) {
      return res
        .status(200)
        .json({ message: "Academic Details Found", oldAcademic: oldAcademic[0] });
    } else {
      return res.status(200).json({ message: "Academic Details Not Found", oldAcademic });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUserSingleAcademic = async (req, res) => {
  try {
    await connectDB();
    const { id, rollNumber } = req.query;

    const academics = await Academic.findOne({ rollNumber });

    const oldAcademic = academics.education.filter((academic) => academic._id == id);
    console.log(oldAcademic);

    // const newEducation = [];
    // const bodyAcademics = req.body.academics;

    // if (academics) {
    //   academics.education.forEach((x) => {
    //     if (x) {
    //       newEducation.push(x);
    //       if (bodyAcademics) newEducation.push(bodyAcademics);
    //     }
    //   });
    //   console.log(academics._id, newEducation);
    //   const newAcademics = {
    //     rollNumber,
    //     education: newEducation,
    //   };
    //   const updated = await Academic.findByIdAndUpdate(academics._id, newAcademics, { new: true });
    //   return res.status(200).json({ message: "Academic Details Updated", updated });
    // } else {
    //   return res.status(200).json({ message: "Academic Details Not Found", updated });
    // }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
