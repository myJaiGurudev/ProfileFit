const mongoose = require("mongoose")


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

    overallFeedback: {
        type: String,
        default: "",
        trim: true,
        maxlength: 5000
    },

    recruiterSummary: {
        type: String,
        default: "",
        trim: true,
        maxlength: 3000
    },

    strengths: {
        type: [String],
        default: []
    },

    weaknesses: {
        type: [String],
        default: []
    },

    missingKeywords: {
        type: [String],
        default: []
    },

    matchedKeywords: {
        type: [String],
        default: []
    },

    resumeImprovements: {
        type: [String],
        default: []
    },

    technicalQuestions: {
        type: [String],
        default: []
    },

    behavioralQuestions: {
        type: [String],
        default: []
    },

    skillGaps: {
        type: [String],
        default: []
    },

    preparationPlan: {
        type: [String],
        default: []
    },

    recommendedProjects: {
        type: [String],
        default: []
    },

    prioritySkills: {
        type: [String],
        default: []
    },

    interviewDifficulty: {
        type: String,
        enum: [
            "Easy",
            "Medium",
            "Hard"
        ]
    },

    hiringProbability: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    confidenceScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    generatedWith: {
        type: String,
        default: "gemini-2.5-flash"
    },

    processingTime: {
        type: Number,
        default: 0,
        min: 0
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required"],
        immutable: true,
        index: true
    }

}, { timestamps: true, strict: true, minimize: false })

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)

module.exports = interviewReportModel