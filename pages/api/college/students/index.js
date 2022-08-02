import User from "../../../../models/User.js";
import connectDB from "../../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getUserDetailsByCollege(req, res);
      break;
  }
}
function validEmail(e) {
  var filter =
    /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(e).search(filter) != -1;
}

function checkRollNumber(e) {
  if (!Number.isNaN(Number(e.charAt(0))) && !Number.isNaN(Number(e.charAt(1))))
    return true;
  return false;
}

const getUserDetailsByCollege = async (req, res) => {
  try {
    await connectDB();
    const collegename = req.query.collegename;
    const collegecode = req.query.collegecode;
    const searchKeyword = req.query.searchKeyword;
    let filter = {};
    let pageNumber = req.query.pageNumber;
    const pageLimit = 20;

    if (searchKeyword) {
      if (checkRollNumber(searchKeyword)) {
        filter = {
          rollNumber: new RegExp(searchKeyword, "i"),
        };
      } else {
        let [firstName, lastName] = searchKeyword.split(" ");
        firstName = new RegExp(firstName, "i");
        if (lastName === undefined) {
          filter = {
            firstName: firstName,
          };
        } else {
          lastName = new RegExp(lastName, "i");
          filter = {
            firstName: firstName,
            lastName: lastName,
          };
        }
      }
    }

    // filter.college = { name: collegename, code: collegecode };
    // filter.category = "student";

    filter = {
      "college.name": collegename,
      "college.code": collegecode,
      category: "student",
    };

    let students = User.find(filter).sort({ firstName: 1 });

    if (pageNumber)
      students.limit(pageLimit).skip((pageNumber - 1) * pageLimit);

    students = await students;

    if (students) {
      if (pageNumber) {
        return res.status(200).json({
          message: "students found",
          students,
          meta: {
            pageNumber,
            pageLimit,
            totalCount: students.length,
            pageCount: Math.ceil(students.length / pageLimit),
          },
        });
      }
      return res.status(200).json({ message: "students Found", students });
    } else {
      return res.status(200).json({ message: "students not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
