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
        verified: Boolean,
        frozen: Boolean,
      },
      lastName: {
        type: String,
        trim: true,
        verified: Boolean,
        frozen: Boolean,
      },
      image: {
        type: String,
        default:
          "http://res.cloudinary.com/dj7nomqfd/image/upload/v1647117869/uploads/bphhxvmlcyyu2pntbikm.png",
      },
      dob: {
        type: Date,
        verified: Boolean,
        frozen: Boolean,
      },
      gender: {
        type: String,
        verified: Boolean,
        frozen: Boolean,
      },
    },
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
      email: {
        type: String,
        verified: Boolean,
        frozen: Boolean,
      },
      linkedin: {
        type: String,
        verified: Boolean,
        frozen: Boolean,
      },
      phone: {
        type: Number,
        verified: Boolean,
        frozen: Boolean,
      },
      website: {
        type: String,
        verified: Boolean,
        frozen: Boolean,
      },
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
      verified: Boolean,
      frozen: Boolean,
    },
    college: {
      name: {
        type: String,
        uppercase: true,
      },
      code: {
        type: String,
        uppercase: true,
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
