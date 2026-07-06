const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")
const interviewReportPrompt = require("../prompts/interviewReport.prompt")
const resumePdfPrompt = require("../prompts/resumePdf.prompt")
const generateResumeHtml = require("../templates/resumeTemplate")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const AI_TIMEOUT = 60000

const PDF_OPTIONS = Object.freeze({
    format: "A4",
    margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm"
    },
    printBackground: true,
    preferCSSPageSize: true
})

if (!process.env.GOOGLE_GENAI_API_KEY) {
    throw new Error("GOOGLE_GENAI_API_KEY environment variable is missing.")
}

async function generateAiResponse(request) {

    const MAX_RETRIES = 3

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {

        try {

            const response = await Promise.race([
                ai.models.generateContent(request),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("AI request timed out.")), AI_TIMEOUT)
                )
            ])

            if (!response || !response.text) {
                throw new Error("AI returned an empty response.")
            }

            return response

        } catch (error) {

            if (attempt === MAX_RETRIES) {
                throw error
            }

            await new Promise(resolve => setTimeout(resolve, 1000 * attempt))

        }

    }

}

function safeJsonParse(text) {

    try {
        return JSON.parse(text)
    } catch {
        return null
    }

}

const AI_MODEL = process.env.GOOGLE_GENAI_MODEL || "gemini-2.5-flash"

const interviewReportSchema = z.object({

    title: z.string(),

    matchScore: z.number().min(0).max(100),

    atsScore: z.number().min(0).max(100),

    overallFeedback: z.string(),

    recruiterSummary: z.string(),

    strengths: z.array(
        z.string()
    ),

    weaknesses: z.array(
        z.string()
    ),

    missingKeywords: z.array(
        z.string()
    ),

    matchedKeywords: z.array(
        z.string()
    ),

    resumeImprovements: z.array(
        z.string()
    ),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum([
                "low",
                "medium",
                "high"
            ]),
            improvement: z.string()
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(
                z.string()
            )
        })
    ),

    recommendedProjects: z.array(
        z.string()
    ),

    recommendedCertifications: z.array(
        z.string()
    ),

    prioritySkills: z.array(
        z.string()
    ),

    interviewDifficulty: z.enum([
        "Easy",
        "Medium",
        "Hard"
    ]),

    hiringProbability: z.number().min(0).max(100),

    confidenceScore: z.number().min(0).max(100),

    resumeSectionScores: z.object({

        summary: z.number().min(0).max(100),

        skills: z.number().min(0).max(100),

        experience: z.number().min(0).max(100),

        projects: z.number().min(0).max(100),

        education: z.number().min(0).max(100),

        overall: z.number().min(0).max(100)

    }),

    keywordCoverage: z.number().min(0).max(100),

    topMissingSkills: z.array(
        z.string()
    ),

    actionVerbScore: z.number().min(0).max(100),

    achievementScore: z.number().min(0).max(100),

    readabilityScore: z.number().min(0).max(100),

    resumeLengthRecommendation: z.enum([
        "One Page",
        "Two Pages"
    ]),

    importantWarnings: z.array(
        z.string()
    )

})

const resumePdfSchema = z.object({
    fullName: z.string().default(""),
    email: z.string().default(""),
    phone: z.string().default(""),
    location: z.string().default(""),
    linkedin: z.string().default(""),
    github: z.string().default(""),
    portfolio: z.string().default(""),
    professionalSummary: z.string().default(""),
    skills: z.array(
        z.string().default("")
    ),
    experience: z.array(
        z.object({
            company: z.string().default(""),
            position: z.string().default(""),
            duration: z.string().default(""),
            responsibilities: z.array(
                z.string().default("")
            )
        })
    ),
    projects: z.array(
        z.object({
            title: z.string().default(""),
            technologies: z.array(
                z.string().default("")
            ),
            description: z.array(
                z.string().default("")
            )
        })
    ),
    education: z.array(
        z.object({
            institution: z.string().default(""),
            degree: z.string().default(""),
            duration: z.string().default(""),
            score: z.string().default("")
        })
    ),
    certifications: z.array(
        z.string().default("")
    )
})


async function generateInterviewReport({ resume, jobDescription }) {

    if (!resume || !resume.trim()) {
        throw new Error("Resume content cannot be empty.")
    }

    if (!jobDescription || !jobDescription.trim()) {
        throw new Error("Job description cannot be empty.")
    }

    const prompt = interviewReportPrompt({
        resume: resume.trim(),
        jobDescription: jobDescription.trim()
    })

    const response = await generateAiResponse({
        model: AI_MODEL,
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: prompt
                    }
                ]
            }
        ],
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    })
    const report = safeJsonParse(
        response.text.trim()
    )

    if (!report || typeof report !== "object") {
        throw new Error("AI returned an invalid JSON response.")
    }

    if (Object.keys(report).length === 0) {
        throw new Error("AI returned an empty response.")
    }

    return report
}

async function generatePdfFromHtml(htmlContent) {

    let browser

    try {

        browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        })

        const page = await browser.newPage()

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        })

        return await page.pdf(PDF_OPTIONS)

    } finally {

        if (browser) {
            await browser.close()
        }

    }

}

async function generateResumePdf({ resume, jobDescription }) {
    if (!resume || !resume.trim()) {
        throw new Error("Resume content cannot be empty.")
    }

    if (!jobDescription || !jobDescription.trim()) {
        throw new Error("Job description cannot be empty.")
    }
    const prompt = resumePdfPrompt({
        resume: resume.trim(),
        jobDescription: jobDescription.trim()
    })

    const response = await generateAiResponse({
        model: AI_MODEL,
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: prompt
                    }
                ]
            }
        ],
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema)
        }
    })

    const resumeData = safeJsonParse(
        response.text.trim()
    )

    if (!resumeData || typeof resumeData !== "object") {
        throw new Error("AI returned an invalid resume.")
    }

    if (Object.keys(resumeData).length === 0) {
        throw new Error("AI returned an empty response.")
    }

    const htmlContent =
        generateResumeHtml(
            resumeData
        )

    const pdfBuffer =
        await generatePdfFromHtml(
            htmlContent
        )
    return pdfBuffer
}


module.exports = { generateInterviewReport, generateResumePdf }