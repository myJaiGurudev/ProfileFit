function escapeHtml(value) {

    if (value === null || value === undefined) {
        return ""
    }

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#39;")

}

function normalizeArray(items) {

    if (!Array.isArray(items)) {
        return []
    }

    return items
        .map(item => String(item ?? "").trim())
        .filter(Boolean)

}

function renderSection(title, content) {

    if (!content || !String(content).trim()) {
        return ""
    }

    return `
        <section class="section">

            <h2>
                ${escapeHtml(title)}
            </h2>

            ${content}

        </section>
    `

}

function renderBulletList(items = []) {

    const values = normalizeArray(items)

    if (!values.length) {
        return ""
    }

    return `
        <ul class="bullet-list">

            ${values.map(item => `
                <li>

                    ${escapeHtml(item)}

                </li>
            `).join("")}

        </ul>
    `

}

function renderSimpleItems(items = []) {

    const values = normalizeArray(items)

    if (!values.length) {
        return ""
    }

    return values.map(item => `
        <div class="simple-item">

            ${escapeHtml(item)}

        </div>
    `).join("")

}

function renderSkills(items = []) {

    const values = normalizeArray(items)

    if (!values.length) {
        return ""
    }

    return `
        <div class="skills">

            ${values.map(skill => `
                <span>

                    ${escapeHtml(skill)}

                </span>
            `).join("")}

        </div>
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

        internships,

        projects,

        education,

        achievements,

        certifications,

        positionsOfResponsibility,

        publications

    } = resumeData

    return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1.0">

<title>
Resume
</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

@page{
    size:A4;
    margin:16mm;
}

html{
    font-size:12px;
}

body{
    font-family:Arial,Helvetica,sans-serif;
    color:#202124;
    background:#ffffff;
    width:100%;
    max-width:210mm;
    margin:0 auto;
    line-height:1.45;
    -webkit-print-color-adjust:exact;
    print-color-adjust:exact;
}

.resume{

    display:flex;

    flex-direction:column;

    justify-content:flex-start;

    width:100%;

}

header{

    text-align:center;

    border-bottom:2px solid #1f2937;

    padding-bottom:12px;

    margin-bottom:18px;

}

h1{

    font-size:30px;

    font-weight:700;

    color:#111827;

    letter-spacing:.6px;

    margin-bottom:8px;

}

.contact{

    display:flex;

    justify-content:center;

    flex-wrap:wrap;

    gap:8px;

    font-size:11px;

    color:#4b5563;

}

.contact a{

    color:#2563eb;

    text-decoration:none;

}

.contact-item{

    white-space:nowrap;

}

.section{

    margin-bottom:18px;

    page-break-inside:avoid;

    break-inside:avoid;

}

.section:last-child{

    margin-bottom:0;

}

.section h2{

    font-size:15px;

    font-weight:700;

    color:#111827;

    text-transform:uppercase;

    border-bottom:1.5px solid #d1d5db;

    padding-bottom:5px;

    margin-bottom:10px;

    letter-spacing:.4px;

}

.summary{

    text-align:justify;

    font-size:12px;

}

.skills{

    display:flex;

    flex-wrap:wrap;

    gap:6px;

    font-size:12px;

    line-height:1.6;

}

.skills span{

    border:none;

    background:none;

    padding:0;

    color:#202124;

}

.skills span:not(:last-child)::after{

    content:" • ";

    color:#6b7280;

}

.simple-item{

    margin-bottom:10px;

    line-height:1.6;

}

.simple-item:last-child{

    margin-bottom:0;

}

.bullet-list{

    margin-left:18px;

}

.bullet-list li{

    margin-bottom:6px;

    text-align:justify;

}

.bullet-list li:last-child{

    margin-bottom:0;

}

a{

    word-break:break-all;

}

.page-break{

    page-break-before:always;

}

</style>

</head>

<body>

<div class="resume">
<header>

<h1>

    ${escapeHtml(fullName || "Professional Resume")}

</h1>

<div class="contact">

${[
    email
        ? `
        <span class="contact-item">
            ${escapeHtml(email)}
        </span>
        `
        : "",

    phone
        ? `
        <span class="contact-item">
            • ${escapeHtml(phone)}
        </span>
        `
        : "",

    location
        ? `
        <span class="contact-item">
            • ${escapeHtml(location)}
        </span>
        `
        : "",

    linkedin
        ? `
        <span class="contact-item">

            • <a href="${escapeHtml(
                linkedin.startsWith("http")
                    ? linkedin
                    : `https://${linkedin}`
            )}">

                ${escapeHtml(linkedin)}

            </a>

        </span>
        `
        : "",

    github
        ? `
        <span class="contact-item">

            • <a href="${escapeHtml(
                github.startsWith("http")
                    ? github
                    : `https://${github}`
            )}">

                ${escapeHtml(github)}

            </a>

        </span>
        `
        : "",

    portfolio
        ? `
        <span class="contact-item">

            • <a href="${escapeHtml(
                portfolio.startsWith("http")
                    ? portfolio
                    : `https://${portfolio}`
            )}">

                ${escapeHtml(portfolio)}

            </a>

        </span>
        `
        : ""

].filter(Boolean).join("")}

</div>

</header>

${renderSection(

    "Professional Summary",

    professionalSummary
        ? `
        <div class="summary">

            ${escapeHtml(professionalSummary)}

        </div>
        `
        : ""

)}

${renderSection(

    "Technical Skills",

    renderSkills(skills)

)}

${renderSection(

    "Professional Experience",

    (() => {

        const values = normalizeArray(experience)

        if (!values.length) {
            return ""
        }

        return values.map(item => `

            <div class="simple-item">

                ${item.includes("|")
                    ? item
                        .split("|")
                        .map(part => escapeHtml(part.trim()))
                        .map((part,index) => {

                            if(index===0){
                                return `<strong>${part}</strong>`
                            }

                            return part

                        })
                        .join(" &nbsp;|&nbsp; ")
                    : escapeHtml(item)
                }

            </div>

        `).join("")

    })()

)}

${renderSection(

    "Internships",

    (() => {

        const values = normalizeArray(internships)

        if (!values.length) {
            return ""
        }

        return values.map(item => `

            <div class="simple-item">

                ${item.includes("|")
                    ? item
                        .split("|")
                        .map(part => escapeHtml(part.trim()))
                        .map((part,index) => {

                            if(index===0){
                                return `<strong>${part}</strong>`
                            }

                            return part

                        })
                        .join(" &nbsp;|&nbsp; ")
                    : escapeHtml(item)
                }

            </div>

        `).join("")

    })()

)}

${renderSection(

    "Projects",

    (() => {

        const values = normalizeArray(projects)

        if (!values.length) {
            return ""
        }

        return values.map(item => `

            <div class="simple-item">

                ${item.includes("|")
                    ? item
                        .split("|")
                        .map(part => escapeHtml(part.trim()))
                        .map((part,index) => {

                            if(index===0){
                                return `<strong>${part}</strong>`
                            }

                            return part

                        })
                        .join(" &nbsp;|&nbsp; ")
                    : escapeHtml(item)
                }

            </div>

        `).join("")

    })()

)}

${renderSection(

    "Education",

    (() => {

        const values = normalizeArray(education)

        if (!values.length) {
            return ""
        }

        return values.map(item => `

            <div class="simple-item">

                ${item.includes("|")
                    ? item
                        .split("|")
                        .map(part => escapeHtml(part.trim()))
                        .map((part,index) => {

                            if(index===0){
                                return `<strong>${part}</strong>`
                            }

                            return part

                        })
                        .join(" &nbsp;|&nbsp; ")
                    : escapeHtml(item)
                }

            </div>

        `).join("")

    })()

)}

${renderSection(

    "Achievements",

    renderBulletList(achievements)

)}

${renderSection(

    "Certifications",

    renderBulletList(certifications)

)}

${renderSection(

    "Positions of Responsibility",

    renderBulletList(positionsOfResponsibility)

)}

${renderSection(

    "Publications",

    renderBulletList(publications)

)}

</div>

</body>

</html>

`

}

module.exports = generateResumeHtml