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

        if (normalizedResume === normalizedJobDescription) {
            return res.status(400).json({
                message: "Resume and Job Description cannot be identical."
            })
        }

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
        console.error({
            controller: "Interview Controller",
            route: req.originalUrl,
            method: req.method,
            userId: req.user?.id || null,
            error: error.message,
            stack: process.env.NODE_ENV !== "production" ? error.stack : undefined
        })

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
            .select("-__v")
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
        console.error({
            controller: "Interview Controller",
            route: req.originalUrl,
            method: req.method,
            userId: req.user?.id || null,
            error: error.message,
            stack: process.env.NODE_ENV !== "production" ? error.stack : undefined
        })

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
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -jobDescription -__v").lean()

        return res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    } catch (error) {
        console.error({
            controller: "Interview Controller",
            route: req.originalUrl,
            method: req.method,
            userId: req.user?.id || null,
            error: error.message,
            stack: process.env.NODE_ENV !== "production" ? error.stack : undefined
        })

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
                .select("resume jobDescription")

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

        res.set(
            "Content-Length",
            pdfBuffer.length
        )

        return res.send(pdfBuffer)
    } catch (error) {
        console.error({
            controller: "Interview Controller",
            route: req.originalUrl,
            method: req.method,
            userId: req.user?.id || null,
            error: error.message,
            stack: process.env.NODE_ENV !== "production" ? error.stack : undefined
        })

        return res.status(500).json({
            message:
                process.env.NODE_ENV === "production"
                    ? "Internal Server Error"
                    : error.message
        })
    }
}

async function deleteInterviewReportController(req, res) {
    try {
        const report = await interviewReportModel.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user.id // Ensures users can only delete their own reports
        });
        if (!report) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController, deleteInterviewReportController }