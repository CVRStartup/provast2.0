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
      profile: {
        firstName: {
          type: String,
          trim: true,
        },
        lastName: {
          type: String,
          trim: true,
        },
        verified: Boolean,
      },
    },
    contact: {
      address: {
        city: {
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
        },
        website: {
          type: String,
        },
        linkedin: {
          type: String,
        },
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
      rollNumber: {
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
      required: true,
    },
    rollNumber: {
      type: String,
      trim: true,
      uppercase: true,
      verified: Boolean,
    },
    principal: {
      email: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model("users", userSchema);
