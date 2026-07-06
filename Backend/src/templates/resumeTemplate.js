function escapeHtml(value) {

    if (value === null || value === undefined) {
        return ""
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")

}

function renderList(items = []) {

    const filteredItems = items.filter(item => item)

    if (!filteredItems.length) {
        return ""
    }

    return `
        <ul>
            ${filteredItems.map(item => `
                <li>${escapeHtml(item)}</li>
            `).join("")}
        </ul>
    `

}

function renderSection(title, content) {

    if (!content || !String(content).trim()) {
        return ""
    }

    return `
        <section class="section">

            <h2>${escapeHtml(title)}</h2>

            ${content}

        </section>
    `

}

function generateResumeHtml(resumeData) {

    const {

        fullName,

        email,

        phone,

        location,

        linkedin,

        github,

        portfolio,

        professionalSummary,

        skills,

        experience,

        projects,

        education,

        certifications

    } = resumeData

    return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Resume</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

@page{
    size:A4;
    margin:20mm;
}

html{
    font-size:11px;
}

body{
    width:100%;
    max-width:210mm;
    font-family:Arial,Helvetica,sans-serif;
    color:#222;
    background:#fff;
    line-height:1.55;
}

h1{
    font-size:24px;
    font-weight:700;
    text-align:center;
    margin-bottom:6px;
    color:#111827;
}
h2{
    page-break-after:avoid;
}

ul{
    page-break-inside:avoid;
}

p{
    page-break-inside:avoid;
}

.contact{
    text-align:center;
    font-size:10px;
    color:#4b5563;
    margin-bottom:20px;
    word-break:break-word;
}

.contact span{
    margin:0 6px;
}

.section{
    break-inside:avoid;
    page-break-inside:avoid;
    margin-top:18px;
    page-break-inside:avoid;
}

.section h2{
    font-size:13px;
    font-weight:700;
    text-transform:uppercase;
    color:#111827;
    border-bottom:2px solid #d1d5db;
    padding-bottom:4px;
    margin-bottom:10px;
    letter-spacing:.5px;
}

p{
    margin-bottom:8px;
    text-align:justify;
}

ul{
    margin-left:18px;
}

li{
    margin-bottom:5px;
}

.skill-list{
    display:flex;
    flex-wrap:wrap;
    gap:6px;
}

.skill{
    border:1px solid #d1d5db;
    padding:4px 8px;
    border-radius:4px;
    font-size:10px;
}

.item{
    break-inside:avoid;
    page-break-inside:avoid;
    margin-bottom:16px;
    page-break-inside:avoid;
}

.item-header{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    margin-bottom:4px;
}

.item-title{
    font-weight:700;
    color:#111827;
}

.item-subtitle{
    color:#4b5563;
    font-size:10px;
}

.item-duration{
    color:#6b7280;
    font-size:10px;
    white-space:nowrap;
}

.tech-stack{
    margin-top:5px;
    font-size:10px;
    color:#374151;
}

.education-score{
    font-size:10px;
    color:#374151;
}

.certification{
    margin-bottom:5px;
}

a{
    color:#2563eb;
    text-decoration:none;
    word-break:break-all;
}

.page-break{
    page-break-before:always;
}

</style>

<body>

<h1>${escapeHtml(fullName || "Professional Resume")}</h1>

<div class="contact">

    ${[
        email && `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`,

        phone && `<a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>`,

        location && escapeHtml(location),

        linkedin && `<a href="${escapeHtml(linkedin)}">${escapeHtml(linkedin)}</a>`,

        github && `<a href="${escapeHtml(github)}">${escapeHtml(github)}</a>`,

        portfolio && `<a href="${escapeHtml(portfolio)}">${escapeHtml(portfolio)}</a>`

    ].filter(Boolean).join(" | ")}

</div>

${renderSection(
    "Professional Summary",
    professionalSummary
        ? `<p>${escapeHtml(professionalSummary)}</p>`
        : ""
)}

${renderSection(
    "Technical Skills",
    skills && skills.length
        ? `
        <div class="skill-list">
            ${skills.map(skill => `
                <div class="skill">
                    ${escapeHtml(skill)}
                </div>
            `).join("")}
        </div>
        `
        : ""
)}

${renderSection(
    "Professional Experience",
    experience && experience.length
        ? experience.map(job => `
            <div class="item">

                <div class="item-header">

                    <div>

                        <div class="item-title">
                            ${escapeHtml(job.position)}
                        </div>

                        <div class="item-subtitle">
                            ${escapeHtml(job.company)}
                        </div>

                    </div>

                    <div class="item-duration">
                        ${escapeHtml(job.duration)}
                    </div>

                </div>

                ${renderList(job.responsibilities)}

            </div>
        `).join("")
        : ""
)}

${renderSection(
    "Projects",
    projects && projects.length
        ? projects.map(project => `
            <div class="item">

                <div class="item-title">
                    ${escapeHtml(project.title)}
                </div>

                <div class="tech-stack">

                    <strong>Technologies:</strong>

                    ${project.technologies
                        .map(escapeHtml)
                        .join(", ")}

                </div>

                ${renderList(project.description)}

            </div>
        `).join("")
        : ""
)}

${renderSection(
    "Education",
    education && education.length
        ? education.map(item => `
            <div class="item">

                <div class="item-header">

                    <div>

                        <div class="item-title">
                            ${escapeHtml(item.degree)}
                        </div>

                        <div class="item-subtitle">
                            ${escapeHtml(item.institution)}
                        </div>

                    </div>

                    <div class="item-duration">
                        ${escapeHtml(item.duration)}
                    </div>

                </div>

                ${item.score
                    ? `<div class="education-score">${escapeHtml(item.score)}</div>`
                    : ""}

            </div>
        `).join("")
        : ""
)}

${renderSection(
    "Certifications",
    certifications && certifications.length
        ? certifications.map(cert => `
            <div class="certification">

                • ${escapeHtml(cert)}

            </div>
        `).join("")
        : ""
)}

</body>

</html>

`

}

module.exports = generateResumeHtml