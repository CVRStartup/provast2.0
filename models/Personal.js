import mongoose from "mongoose";

const personalSchema = new mongoose.Schema({
  user: String,
  rollNumber: { type: String },
  contact: {
    parents: {
      father: {
        name: String,
        email: String,
        phone: String,
        occupation: String,
      },
      mother: {
        name: String,
        email: String,
        phone: String,
        occupation: String,
      },
    },
    address: {
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      },
    },
    linkedin: {
      type: String,
    },
    website: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    frozen: {
      type: Boolean,
      default: false,
    },
  },
});

export default mongoose.models.personals || mongoose.model("personals", personalSchema);
