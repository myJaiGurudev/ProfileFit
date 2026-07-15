const multer = require("multer")
const path = require("path")

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ALLOWED_MIME_TYPES = Object.freeze([
    "application/pdf",
    "text/plain",
    "image/jpeg",
    "image/png",
    "image/webp"
])

const ALLOWED_EXTENSIONS = Object.freeze([
    ".pdf",
    ".txt",
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
])

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {

    if (!file || !file.originalname) {
        return cb(new Error("No file was uploaded."))
    }

    const extension = path.extname(file.originalname).toLowerCase()

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
        return cb(
            new Error(
                "Unsupported file extension. Only PDF (.pdf) and TXT (.txt) files are allowed."
            )
        )
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(
            new Error(
                "Invalid file type. Only PDF and TXT files are supported."
            )
        )
    }

    cb(null, true)

}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE,
        files:2,
        fields:10
    }
})

module.exports = upload