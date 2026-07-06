const extractText = require("../utils/extractText")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")
const mongoose = require("mongoose")

async function extractInterviewInputs(
    resumeFile,
    jobDescriptionFile,
    body
) {

    const resume = await extractText(
        resumeFile,
        body.resume,
        "Resume"
    )

    const jobDescription = await extractText(
        jobDescriptionFile,
        body.jobDescription,
        "Job Description"
    )

    return {
        resumeText: resume.text,
        jobDescriptionText: jobDescription.text
    }

}


/**
 * @description Controller to generate an interview report using the resume and job description.
 */
async function generateInterviewReportController(req, res) {

    if (!req.user?.id) {
        return res.status(401).json({
            message: "Unauthorized."
        })
    }

    try {
        const startedAt = Date.now()
        const resumeFile = req.files?.resume?.[0]

        const jobDescriptionFile = req.files?.jobDescriptionFile?.[0]

        const {
            resumeText,
            jobDescriptionText
        } = await extractInterviewInputs(
            resumeFile,
            jobDescriptionFile,
            req.body
        )

        if (!resumeText.trim()) {
            return res.status(400).json({
                message: "Resume is empty."
            })
        }

        if (!jobDescriptionText.trim()) {
            return res.status(400).json({
                message: "Job description is empty."
            })
        }

        const normalizedResume = resumeText.trim()
        const normalizedJobDescription = jobDescriptionText.trim()

        const interviewReportByAI =
            await generateInterviewReport({
                resume: normalizedResume,
                jobDescription: normalizedJobDescription
            })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: normalizedResume,
            jobDescription: normalizedJobDescription,
            processingTime: Date.now() - startedAt,
            ...interviewReportByAI
        })

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (error) {
        console.error("[Interview Controller]", error)

        return res.status(500).json({
            message:
                process.env.NODE_ENV === "production"
                    ? "Internal Server Error"
                    : error.message
        })
    }

}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    if (!req.user?.id) {
        return res.status(401).json({
            message: "Unauthorized."
        })
    }

    try {
        const { interviewId } = req.params
        if (!mongoose.Types.ObjectId.isValid(interviewId)) {
            return res.status(400).json({
                message: "Invalid interview ID."
            })
        }

        const interviewReport = await interviewReportModel
            .findOne({
                _id: interviewId,
                user: req.user.id
            })
            .lean()

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        return res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })
    } catch (error) {
        console.error("[Interview Controller]", error)

        return res.status(500).json({
            message:
                process.env.NODE_ENV === "production"
                    ? "Internal Server Error"
                    : error.message
        })
    }
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {

    if (!req.user?.id) {
        return res.status(401).json({
            message: "Unauthorized."
        })
    }

    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select([
            "-resume",
            "-jobDescription",
            "-technicalQuestions",
            "-behavioralQuestions",
            "-skillGaps",
            "-preparationPlan",
            "-__v"
        ].join(" ")).lean()

        return res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    } catch (error) {
        console.error("[Interview Controller]", error)

        return res.status(500).json({
            message:
                process.env.NODE_ENV === "production"
                    ? "Internal Server Error"
                    : error.message
        })
    }
}


/**
 * @description Controller to generate an ATS-optimized resume PDF using the stored resume and job description.
 */
async function generateResumePdfController(req, res) {

    if (!req.user?.id) {
        return res.status(401).json({
            message: "Unauthorized."
        })
    }

    try {
        const { interviewReportId } = req.params

        if (!mongoose.Types.ObjectId.isValid(interviewReportId)) {
            return res.status(400).json({
                message: "Invalid interview report ID."
            })
        }

        const interviewReport =
            await interviewReportModel.findOne({
                _id: interviewReportId,
                user: req.user.id
            })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        const { resume, jobDescription } = interviewReport

        const pdfBuffer = await generateResumePdf({ resume, jobDescription })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        return res.send(pdfBuffer)
    } catch (error) {
        console.error("[Interview Controller]", error)

        return res.status(500).json({
            message:
                process.env.NODE_ENV === "production"
                    ? "Internal Server Error"
                    : error.message
        })
    }
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }