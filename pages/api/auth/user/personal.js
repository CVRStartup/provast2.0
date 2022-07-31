import connectDB from "../../../../src/lib/connectDB";
import Personal from "../../../../models/Personal";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchPersonalDetails(req, res);
      break;
    case "POST":
      await createPersonalDetails(req, res);
      break;
    case "PUT":
      await updatePersonalDetails(req, res);
      break;
  }
}

const searchPersonalDetails = async (req, res) => {
  try {
    await connectDB();
    const { userId } = req.query;

    const personal = await Personal.findOne({ user: userId });

    if (personal) {
      return res.status(200).json({ message: "Details Found", personal });
    } else {
      return res.status(200).json({ message: "Details not found", personal: undefined });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createPersonalDetails = async (req, res) => {
  try {
    await connectDB();

    const { userId } = req.query;
    const { contact } = req.body;

    const details = await Personal.findOne({ user: userId });

    if (details) {
      return res.status(200).json({ message: "Details Already Exists", details });
    } else {
      const newDetails = new Personal({
        user: userId,
        contact,
      });
      await newDetails.save();

      return res.status(200).json({ message: "Personal Details Created", newDetails });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePersonalDetails = async (req, res) => {
  try {
    await connectDB();

    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const details = await Personal.findOneAndUpdate({ user: userId }, req.body, { new: true });

    if (details) {
      return res.status(200).json({ message: "Personal Details Updated", details });
    } else {
      return res.status(400).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
