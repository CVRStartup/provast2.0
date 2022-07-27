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
    },
    contact: {
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
      phone: {
        type: Number,
        unique: true,
      },
      website: {
        type: String,
      },
      linkedin: {
        type: String,
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
      },
      inter: {
        name: String,
        board: String,
        typeOfGrade: String,
        branch: String,
        grade: Number,
        from: Date,
        to: Date,
      },
      diploma: {
        name: String,
        board: String,
        branch: String,
        typeOfGrade: String,
        grade: Number,
        from: Date,
        to: Date,
      },
      graduate: {
        name: String,
        program: String,
        branch: String,
        typeOfGrade: String,
        grade: Number,
        from: Date,
        to: Date,
      },
      postgraduate: {
        name: String,
        program: String,
        branch: String,
        typeOfGrade: String,
        grade: Number,
        from: Date,
        to: Date,
      },
    },
    approved: {
      type: Boolean,
    },
    category: {
      type: String,
      required: true,
    },

    rollNumber: {
      type: String,
      trim: true,
      uppercase: true,
      unique: true,
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
    },
    principal: {
      email: {
        type: String,
      },
      phone: {
        type: Number,
      },
    },
    passPhrase: {
      type: String,
    },
    designation: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model("users", userSchema);
