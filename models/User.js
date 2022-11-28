import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, unique: true },
    hash: { type: String },
    salt: { type: String },
    placed: {
      type: Boolean,
      default: false,
    },
    detailsAvailable: {
      type: Boolean,
    },
    academicsAvailable: {
      type: Boolean,
    },
    profile: {
      firstName: {
        type: String,
        trim: true,
      },
      middleName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
      image: {
        type: String,
        default:
          "http://res.cloudinary.com/dj7nomqfd/image/upload/v1647117869/uploads/bphhxvmlcyyu2pntbikm.png",
      },
      dob: {
        type: Date,
      },
      gender: {
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
    phone: {
      value: {
        type: Number,
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
    approved: {
      type: Boolean,
    },
    category: {
      type: String,
    },
    rollNumber: {
      value: {
        type: String,
        trim: true,
        uppercase: true,
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
    college: {
      name: {
        type: String,
      },
      code: {
        type: String,
      },
      campus: {
        type: String
      },
      program: {
        type: String,
      },
      specialisation: {
        type: String
      },
      passphrase: {
        type: String,
      },
      website: {
        type: String,
      },
      principal: {
        email: {
          type: String,
        },
        phone: {
          type: Number,
        },
      },
      placement: {
        designation: {
          type: String,
        },
        email: {
          type: String,
        },
        phone: {
          type: Number,
        },
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
  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model("users", userSchema);
