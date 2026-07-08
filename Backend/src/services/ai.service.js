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

const AI_TIMEOUT = 90000

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

            await new Promise(resolve =>
                setTimeout(
                    resolve,
                    Math.min(
                        2000 * attempt,
                        5000
                    )
                )
            )

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
        z.string()
    ),
    behavioralQuestions: z.array(
        z.string()
    ),
    skillGaps: z.array(
        z.string()
    ),
    preparationPlan: z.array(
        z.string()
    ),
    recommendedProjects: z.array(
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
    confidenceScore: z.number().min(0).max(100)
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
    skills: z.array(z.string()).default([]),
    experience: z.array(z.string()).default([]),
    internships: z.array(z.string()).default([]),
    projects: z.array(z.string()).default([]),
    education: z.array(z.string()).default([]),
    achievements: z.array(z.string()).default([]),
    certifications: z.array(z.string()).default([]),
    positionsOfResponsibility: z.array(z.string()).default([]),
    publications: z.array(z.string()).default([])
}).strict()


async function generateInterviewReport({ resume, jobDescription }) {

    if (!resume || !resume.trim()) {
        throw new Error("Resume content cannot be empty.")
    }

    if (!jobDescription || !jobDescription.trim()) {
        throw new Error("Job description cannot be empty.")
    }

    const prompt =
        interviewReportPrompt({
            resume: resume.trim(),
            jobDescription: jobDescription.trim()
        })

    const response =
        await generateAiResponse({
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
                responseSchema:
                    zodToJsonSchema(
                        interviewReportSchema
                    )
            }
        })

    console.log("========== AI RESPONSE ==========")
    console.log(response.text)
    console.log("=================================")

    const report =
        safeJsonParse(
            response.text
                .replace(/```(?:json)?/gi, "")
                .trim()
        )

    if (!report || typeof report !== "object") {
        throw new Error("AI returned invalid JSON.")
    }

    const validation = interviewReportSchema.safeParse(report)

    if (!validation.success) {
        console.error(validation.error.issues)
        throw new Error("AI response does not match the required schema.")
    }

    const validated = validation.data

    return {
        ...validated,
        generatedWith:
            AI_MODEL
    }
}

async function generatePdfFromHtml(htmlContent) {

    let browser

    try {

        browser = await puppeteer.launch({
            headless: "new",
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        })

        const page = await browser.newPage()

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        })

        await page.emulateMediaType("screen")

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
            responseSchema: zodToJsonSchema(
                resumePdfSchema
            )
        }
    })

    const resumeData = safeJsonParse(
        response.text
            .replace(/```(?:json)?/gi, "")
            .trim()
    )

    if (!resumeData || typeof resumeData !== "object") {
        throw new Error("AI returned an invalid resume.")
    }

    if (Object.keys(resumeData).length === 0) {
        throw new Error("AI returned an empty response.")
    }

    const validation = resumePdfSchema.safeParse(resumeData)

    if (!validation.success) {
        console.error(validation.error.issues)
        throw new Error("AI response does not match the required resume schema.")
    }

    const validatedResume = validation.data

    const htmlContent = generateResumeHtml(validatedResume)

    if (!htmlContent || !htmlContent.trim()) {
        throw new Error("Failed to generate resume HTML.")
    }

    const pdfBuffer = await generatePdfFromHtml(htmlContent)

    if (!pdfBuffer || pdfBuffer.length === 0) {
        throw new Error("Failed to generate resume PDF.")
    }

    return pdfBuffer
}


module.exports = { generateInterviewReport, generateResumePdf }