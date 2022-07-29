import mongoose from "mongoose";

const resumeDetailsSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    public: {
      type: Boolean,
      default: false,
    },
    layout: {
      name: String,
      template: {
        type: String,
      },
      color: {
        r: String,
        g: String,
        b: String,
        a: String,
      },
      font: {
        type: String,
      },
    },
    personal: {
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
      },
      role: {
        type: String,
      },
      dob: {
        type: String,
      },
      email: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
      },
    },
    social: [
      {
        network: {
          type: String,
        },
        username: {
          type: String,
        },
        url: {
          type: String,
        },
        enabled: {
          type: Boolean,
        },
      },
    ],
    objective: {
      type: String,
    },
    work: [
      {
        company: {
          type: String,
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
        designation: {
          type: String,
        },
        website: {
          type: String,
        },
        summary: {
          data: {
            type: String,
          },
          enabled: {
            type: Boolean,
          },
        },
        enabled: {
          type: Boolean,
        },
      },
    ],
    education: [
      {
        institution: {
          type: String,
        },
        fieldOfStudy: {
          type: String,
        },
        typeOfDegree: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        gpa: {
          type: String,
        },
        summary: {
          data: {
            type: String,
          },
          enabled: {
            type: Boolean,
          },
        },
        enabled: {
          type: Boolean,
          required: false,
        },
      },
    ],
    projects: [
      {
        name: {
          type: String,
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
        website: {
          type: String,
        },
        summary: {
          data: {
            type: String,
          },
          enabled: {
            type: Boolean,
          },
        },
        enabled: {
          type: Boolean,
        },
      },
    ],
    awards: [
      {
        name: {
          type: String,
        },
        awarder: {
          type: String,
        },
        date: {
          type: Date,
        },
        summary: {
          data: {
            type: String,
          },
          enabled: {
            type: Boolean,
          },
        },
        enabled: {
          type: Boolean,
        },
      },
    ],
    certifications: [
      {
        title: {
          type: String,
        },
        date: {
          type: String,
        },
        issuer: {
          type: String,
        },
        summary: {
          data: {
            type: String,
          },
          enabled: {
            type: Boolean,
          },
        },
        enabled: {
          type: Boolean,
        },
      },
    ],
    skills: [
      {
        name: {
          type: String,
        },
        level: {
          type: String,
        },
        enabled: {
          type: Boolean,
        },
      },
    ],
    hobbies: [
      {
        name: {
          type: String,
        },
        enabled: {
          type: Boolean,
        },
      },
    ],
    languages: [
      {
        name: {
          type: String,
        },
        fluency: {
          type: String,
        },
        enabled: {
          type: Boolean,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Resume || mongoose.model("Resume", resumeDetailsSchema);
