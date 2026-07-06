const mongoose = require("mongoose")

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"],
        trim: true
    },
    intention: {
        type: String,
        required: [true, "Intention is required"],
        trim: true
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
        trim: true
    }
}, {
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioral question is required"],
        trim: true
    },
    intention: {
        type: String,
        required: [true, "Intention is required"],
        trim: true
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
        trim: true
    }
}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true,
        trim: true
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true
    },
    improvement: {
        type: String,
        required: true,
        trim: true
    }
}, {
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"],
        min: 1
    },
    focus: {
        type: String,
        required: [true, "Focus is required"],
        trim: true
    },
    tasks: {
        type: [{
            type: String,
            trim: true
        }],
        default: []
    }
}, {
    _id: false
})

const interviewReportSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Job title is required"],
        trim: true,
        maxlength: 200
    },

    jobDescription: {
        type: String,
        required: [true, "Job description is required"],
        trim: true,
        maxlength: 120000
    },

    resume: {
        type: String,
        required: [true, "Resume is required"],
        trim: true,
        maxlength: 60000
    },

    matchScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    atsScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    overallFeedback: {
        type: String,
        trim: true,
        default: ""
    },

    recruiterSummary: {
        type: String,
        trim: true,
        default: ""
    },

    strengths: {
        type: [{
            type: String,
            trim: true
        }],
        default: []
    },

    weaknesses: {
        type: [{
            type: String,
            trim: true
        }],
        default: []
    },

    missingKeywords: {
        type: [{
            type: String,
            trim: true
        }],
        default: []
    },

    matchedKeywords: {
        type: [{
            type: String,
            trim: true
        }],
        default: []
    },

    resumeImprovements: {
        type: [{
            type: String,
            trim: true
        }],
        default: []
    },

    technicalQuestions: {
        type: [technicalQuestionSchema],
        default: []
    },

    behavioralQuestions: {
        type: [behavioralQuestionSchema],
        default: []
    },

    skillGaps: {
        type: [skillGapSchema],
        default: []
    },

    preparationPlan: {
        type: [preparationPlanSchema],
        default: []
    },

    recommendedProjects: {
        type: [{
            type: String,
            trim: true
        }],
        default: []
    },

    recommendedCertifications: {
        type: [{
            type: String,
            trim: true
        }],
        default: []
    },

    prioritySkills: {
        type: [{
            type: String,
            trim: true
        }],
        default: []
    },

    interviewDifficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"]
    },

    hiringProbability: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    confidenceScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    resumeSectionScores: {
        summary: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        skills: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        experience: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        projects: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        education: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        overall: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        }
    },

    keywordCoverage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    topMissingSkills: {
        type: [{
            type: String,
            trim: true
        }],
        default: []
    },

    actionVerbScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    achievementScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    readabilityScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    resumeLengthRecommendation: {
        type: String,
        enum: ["One Page", "Two Pages"]
    },

    importantWarnings: {
        type: [{
            type: String,
            trim: true
        }],
        default: []
    },

    generatedWith: {
        type: String,
        default: "gemini-3-flash-preview"
    },

    processingTime: {
        type: Number,
        min: 0,
        default: 0,
        max: 600000
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required"],
        index: true,
        immutable: true
    }

}, {
    timestamps: true,
    strict: true,
    minimize: false
})

interviewReportSchema.index({
    user: 1,
    createdAt: -1
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)

module.exports = interviewReportModel