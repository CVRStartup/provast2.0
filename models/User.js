import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, unique: true },
    hash: { type: String },
    salt: { type: String },
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
    },
    phone: {
      type: Number,
    },
    approved: {
      type: Boolean,
    },
    category: {
      type: String,
    },
    rollNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },
    college: {
      name: {
        type: String,
        uppercase: true,
      },
      code: {
        type: String,
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
    },
  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model("users", userSchema);
