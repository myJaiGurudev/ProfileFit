function cleanPromptText(text) {

    if (text === null || text === undefined) {
        return ""
    }

    text = String(text)

    return text
        .replace(/\0/g, "")
        .replace(/\r/g, "")
        .replace(/\t/g, " ")
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'")
        .replace(/\uFFFD/g, "")
        .replace(/[ ]{2,}/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim()

}

module.exports = cleanPromptText