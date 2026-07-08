const pdfParse = require("pdf-parse")

const MAX_CHARACTER_LIMITS = Object.freeze({
    resume: 60000,
    "job description": 120000
})

async function extractText(file, pastedText, fileType) {

    let extractedText = ""
    let source = ""

    const hasFile = !!file
    const hasPastedText = typeof pastedText === "string" && pastedText.trim().length > 0

    if (hasFile && hasPastedText) {
        throw new Error(`Please either upload the ${fileType} or paste the ${fileType}, not both.`)
    }

    if (!hasFile && !hasPastedText) {
        throw new Error(`Please upload the ${fileType} or paste the ${fileType}.`)
    }

    if (hasFile) {

        if (!file.buffer) {
            throw new Error(`Invalid ${fileType} file.`)
        }

        if (file.buffer.length === 0) {
            throw new Error(`${fileType} file is empty.`)
        }

        switch (file.mimetype) {
            case "application/pdf":
                source = "PDF"
                try {
                    const pdfContent = await (new pdfParse.PDFParse(Uint8Array.from(file.buffer))).getText()
                    extractedText = pdfContent.text || ""
                    if (!extractedText.trim()) {
                        throw new Error()
                    }
                } catch {
                    throw new Error(`Unable to extract readable text from the ${fileType} PDF. The file may be scanned, corrupted, or password protected.`)
                }
                break
            case "text/plain":
                source = "TXT"
                extractedText = Buffer.from(file.buffer).toString("utf8")
                break
            default:
                throw new Error(`Unsupported ${fileType} format.`)
        }

    } else {
        source = "PASTE"
        extractedText = String(pastedText)
    }

    extractedText = extractedText
        .replace(/\0/g, "")
        .replace(/\r/g, "")
        .replace(/\t/g, " ")
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'")
        .replace(/\uFFFD/g, "")
        .replace(/[ ]{2,}/g, " ")
        .replace(/\n +/g, "\n")
        .replace(/[ ]+\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim()

    if (!extractedText.trim()) {
        throw new Error(`${fileType} does not contain readable text.`)
    }

    const words = extractedText.match(/\S+/g) || []

    if (words.length > 25000) {
        throw new Error(
            `${fileType} contains too much text.`
        )
    }

    const wordCount = words.length

    const characterCount = extractedText.length

    if (characterCount === 0) {
        throw new Error(`${fileType} cannot be empty.`)
    }

    if (wordCount < 10) {
        throw new Error(`${fileType} appears to be empty or invalid.`)
    }

    const maxCharacters = MAX_CHARACTER_LIMITS[fileType.toLowerCase()] || 120000

    if (characterCount > maxCharacters) {
        throw new Error(`${fileType} is too large. Please upload a shorter document.`)
    }

    return Object.freeze({
        text: extractedText,
        source,
        wordCount,
        characterCount
    })

}

module.exports = extractText