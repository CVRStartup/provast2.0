import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, unique: true },
    hash: { type: String },
    salt: { type: String },
    profile: {
      firstName: {
        type: String,
        trim: true,
        verified: Boolean,
      },
      lastName: {
        type: String,
        trim: true,
        verified: Boolean,
      },
      image: {
        type: String,
        default:
          "http://res.cloudinary.com/dj7nomqfd/image/upload/v1647117869/uploads/bphhxvmlcyyu2pntbikm.png",
      },
      dob: {
        type: Date,
        verified: Boolean,
      },
      gender: {
        type: String,
        verified: Boolean,
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
      },
      linkedin: {
        type: String,
        verified: Boolean,
      },
      phone: {
        type: Number,
        verified: Boolean,
      },
      website: {
        type: String,
        verified: Boolean,
      },
    },
    education: {
      tenth: {
        name: String,
        board: String,
        typeOfGrade: String,
        grade: Number,
        from: Date,
        to: Date,
        verified: Boolean,
      },
      inter: {
        name: String,
        board: String,
        typeOfGrade: String,
        branch: String,
        grade: Number,
        from: Date,
        to: Date,
        verified: Boolean,
      },
      higherEducation: [
        {
          program: String,
          branch: String,
          typeOfGrade: String,
          grade: Number,
          from: Date,
          to: Date,
          college: {
            name: {
              type: String,
              uppercase: true,
            },
            code: String,
          },
          verified: Boolean,
        },
      ],
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
      website: {
        type: String,
      },
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
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model("users", userSchema);
