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
        value: {
          type: String,
          trim: true,
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
      lastName: {
        value: {
          type: String,
          trim: true,
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
      image: {
        type: String,
        default:
          "http://res.cloudinary.com/dj7nomqfd/image/upload/v1647117869/uploads/bphhxvmlcyyu2pntbikm.png",
      },
      dob: {
        value: {
          type: Date,
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
      gender: {
        value: {
          type: String,
          trim: true,
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
    contact: {
      parents: {
        father: {
          name: String,
          email: String,
          phone: Number,
          occupation: String,
        },
        mother: {
          name: String,
          email: String,
          phone: Number,
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
        value: {
          type: String,
          trim: true,
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
      linkedin: {
        value: {
          type: String,
          trim: true,
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
      website: {
        value: {
          type: String,
          trim: true,
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
        unique: true,
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
