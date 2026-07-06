const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
} = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

const MAX_FIELDS = 2



/**
 * @route POST /api/interview/
 * @description Generate a new interview report using the resume and job description. Both documents can be uploaded as PDF/TXT files or provided as pasted text.
 * @access private
 */
interviewRouter.post(
    "/",
    authMiddleware.authUser,
    upload.fields([
        {
            name: "resume",
            maxCount: 1
        },
        {
            name: "jobDescriptionFile",
            maxCount: 1
        }
    ]),
    generateInterviewReportController
)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, getInterviewReportByIdController)


/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authMiddleware.authUser, getAllInterviewReportsController)


/**
 * @route GET /api/interview/resume/pdf
 * @description Generate an ATS-optimized resume PDF using the stored resume and job description.
 * @access private
 */
interviewRouter.post(
    "/resume/pdf/:interviewReportId",
    authMiddleware.authUser,
    interviewController.generateResumePdfController
)



module.exports = interviewRouter