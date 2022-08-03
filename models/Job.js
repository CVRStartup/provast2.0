import mongoose from "mongoose";

const JobSchema = mongoose.Schema(
  {
    user: { type: String, required: true },
    college: {
      name: {
        type: String,
      },
      code: {
        type: String,
      },
    },
    company: {
      type: String,
    },
    program: String,
    website: {
      type: String,
    },
    role: {
      type: String,
    },
    designation: {
      max: Number,
      roles: [
        {
          type: String,
        },
      ],
    },
    jobPostingLocation: [
      {
        type: String,
      },
    ],
    yearofPassing: [
      {
        type: String,
      },
    ],
    branchOptions: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
    },
    typeOfPost: {
      type: String,
    },
    stipend: {
      type: Number,
    },
    stipendRange: {
      type: String,
    },
    ctc: {
      type: Number,
    },
    ctcRange: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    logo: {
      type: String,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    eligibility: {
      tenth: {
        typeOfGrade: String,
        grade: Number,
      },
      inter: {
        typeOfGrade: String,
        grade: Number,
      },
      btech: {
        typeOfGrade: String,
        grade: Number,
      },
      placed: {
        type: Boolean,
      },
      salary: {
        type: Number,
      },
    },
    eligible: [
      {
        name: String,
        branch: String,
        rollnumber: String,
        email: String,
        phone: String,
        resume: String,
        status: {
          applied: {
            type: Boolean,
            default: null,
          },
          roles: [
            {
              type: String,
            },
          ],
          answers: [
            {
              questionId: String,
              answer: {
                type: String,
                default: null,
              },
            },
          ],
          updatedAt: {
            type: Date,
          },
        },
      },
    ],
    rounds: [
      {
        name: String,
        description: String,
        status: String,
        date: {
          from: Date,
          to: Date,
        },
        attendees: [
          {
            email: String,
            role: String,
          },
        ],
        shortlisted: [
          {
            email: String,
            role: String,
          },
        ],
        result: [
          {
            email: String,
            role: String,
            status: String,
          },
        ],
      },
    ],
    questionnaire: [
      {
        question: {
          questionName: String,
          required: Boolean,
          options: [
            {
              type: String,
            },
          ],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
