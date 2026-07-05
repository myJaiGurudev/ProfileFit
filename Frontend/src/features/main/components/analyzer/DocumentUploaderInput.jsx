import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiFileText, FiTrash2, FiUploadCloud } from "react-icons/fi";

function TextPreview({ file }) {

    const [text, setText] = useState("");

    useEffect(() => {

        const reader = new FileReader();

        reader.onload = e => setText(e.target.result);

        reader.readAsText(file);

    }, [file]);

    return (
        <pre className="h-full overflow-auto whitespace-pre-wrap p-6 text-slate-800">
            {text}
        </pre>
    );

}

export default function DocumentUploaderInput({ title, description, placeholder, value, setValue, file, setFile }) {

    const previewRef = useRef(null);
    const [fileUrl, setFileUrl] = useState("");
    const [isClosing, setIsClosing] = useState(false);
    const storageKey = `document-text-${title}`;
    const [showPreview, setShowPreview] = useState(false);
    const inputRef = useRef(null);

    const handleFile = (selectedFile) => {
        if (!selectedFile) return;
        setFile(selectedFile);
        setFileUrl(URL.createObjectURL(selectedFile));
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const closePreview = () => {
        if (isClosing) return;

        setIsClosing(true);

        setTimeout(() => {
            setShowPreview(false);
            setIsClosing(false);
        }, 400);
    };

    useEffect(() => {
        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [fileUrl]);

    useEffect(() => {
        if (value.trim()) {
            localStorage.setItem(storageKey, value);
        } else {
            localStorage.removeItem(storageKey);
        }
    }, [value, storageKey]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                showPreview &&
                previewRef.current &&
                !previewRef.current.contains(e.target)
            ) {
                closePreview();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [showPreview, isClosing]);

    return (

        <motion.div

            whileHover={{
                y: -2
            }}

            transition={{
                type: "spring",
                stiffness: 300,
                damping: 18
            }}

            className="group rounded-3xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-xl"

        >

            <input

                ref={inputRef}

                hidden

                type="file"

                accept=".pdf,.doc,.docx,.txt"

                onChange={(e) => handleFile(e.target.files[0])}

            />

            <motion.div

                whileHover={{
                    scale: 1.01
                }}

                whileTap={{
                    scale: .995
                }}

                transition={{
                    type: "spring",
                    stiffness: 300
                }}

                onClick={() => {
                    if (file || value.trim()) return;
                    inputRef.current.click();
                }}

                className={`mt-8 rounded-3xl border-2 border-dashed p-8 transition-all duration-300 ${value.trim()
                    ? "cursor-not-allowed border-slate-800 bg-slate-900/30 opacity-60"
                    : "cursor-pointer border-slate-700 bg-slate-950/40 hover:border-sky-400 hover:bg-slate-900/60"
                    }`}

            >

                {

                    !file ?

                        (

                            <div className="flex flex-col items-center text-center">

                                <motion.div

                                    animate={{
                                        y: [0, -8, 0]
                                    }}

                                    transition={{
                                        duration: 2,
                                        repeat: Infinity
                                    }}

                                >

                                    <FiUploadCloud className="text-6xl text-sky-400" />

                                </motion.div>

                                <h3 className="mt-7 text-xl font-bold text-white">

                                    {`Upload ${title}`}

                                </h3>

                                <p className="mt-3 text-slate-400">
                                    {value.trim()
                                        ? "Clear the text to enable file upload"
                                        : description}
                                </p>


                                <div className="mt-7 flex flex-wrap justify-center gap-3">

                                    {

                                        [

                                            "PDF",

                                            "DOC",

                                            "DOCX",

                                            "TXT"

                                        ].map((item) => (

                                            <div

                                                key={item}

                                                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-400"

                                            >

                                                {item}

                                            </div>

                                        ))

                                    }

                                </div>

                            </div>

                        )

                        :
                        (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: .98
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1
                                }}
                                className="flex h-full flex-col justify-center"
                            >

                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowPreview(true);
                                    }}
                                    className="flex flex-col gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 transition hover:border-emerald-400 hover:bg-emerald-500/15 sm:flex-row sm:items-center sm:justify-between"
                                >

                                    <div className="flex min-w-0 flex-1 items-center gap-4">

                                        <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500">

                                            <FiFileText className="text-3xl text-white" />

                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <p
                                                className="truncate font-semibold text-white"
                                                title={file.name}
                                            >
                                                {file.name}
                                            </p>

                                            <p className="text-sm text-slate-400">
                                                {(file.size / 1024).toFixed(1)} KB
                                            </p>

                                        </div>

                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFile(null);
                                            setFileUrl("");
                                        }}
                                        className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 font-medium text-red-400 transition-all duration-200 hover:border-red-400 hover:bg-red-500/20 hover:text-red-300 active:scale-95 sm:w-auto"
                                    >

                                        <FiTrash2 className="text-lg" />

                                        <span>Remove</span>

                                    </button>

                                </div>

                            </motion.div>
                        )

                }


            </motion.div>

            {/* Warning 1 */}

            {value.trim() && (
                <div className="mt-3 flex justify-center">
                    <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-1 text-xs font-medium text-sky-300">
                        Upload is disabled while text is present
                    </span>
                </div>
            )}

            <div className="flex flex-col">
                <div className="my-8 flex items-center">

                    <div className="h-px flex-1 bg-slate-800" />

                    <span className="mx-5 text-sm font-semibold tracking-wider text-slate-500">

                        {`OR PASTE ${(title ?? "TEXT").toUpperCase()}`}

                    </span>

                    <div className="h-px flex-1 bg-slate-800" />

                </div>

                <textarea
                    rows={8}
                    value={value}
                    disabled={!!file}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    placeholder={file
                        ? `Remove the uploaded file to paste ${title.toLowerCase()}.`
                        : placeholder
                    }

                    className={`${file ? "min-h-110" : "min-h-88"} w-full resize-none overflow-y-auto rounded-2xl border p-5 text-[clamp(.95rem,1.5vw,1rem)] leading-7 outline-none transition-all duration-300 scrollbar scrollbar-thumb-sky-500 scrollbar-track-slate-900 scrollbar-thumb-rounded-full hover:scrollbar-thumb-cyan-400 ${file
                        ? "cursor-not-allowed border-slate-800 bg-slate-900/30 text-slate-500"
                        : "border-transparent bg-slate-950/60 text-slate-200 placeholder:text-slate-500 focus:border-sky-400/60 focus:ring-4 focus:ring-sky-500/10"
                        }`}
                />

                {/* Warning 2 */}

                {file && (
                    <div className="mt-3 flex justify-center">
                        <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-1 text-xs font-medium text-sky-300">
                            Text editor is disabled while a file is uploaded
                        </span>
                    </div>
                )}

            </div>

            {showPreview && file && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

                    <div
                        ref={previewRef}
                        className="relative flex h-[90vh] w-[88vw] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
                    >

                        <div className="flex items-center gap-4 border-b border-slate-200 px-6 py-4">

                            <h2 className="flex-1 truncate text-lg font-semibold text-slate-800">
                                {file.name}
                            </h2>

                            <button
                                onClick={closePreview}
                                disabled={isClosing}
                                className={`relative flex h-11 items-center justify-center rounded-xl border px-6 font-semibold select-none transition-all duration-100 ${isClosing
                                    ? "translate-y-1 border-red-950 bg-linear-to-b from-red-800 to-red-900 text-white shadow-[inset_0_4px_8px_rgba(0,0,0,.55),inset_0_1px_2px_rgba(255,255,255,.08)]"
                                    : "cursor-pointer border-red-700 bg-linear-to-b from-red-500 via-red-600 to-red-700 text-white shadow-[0_2px_0_rgb(185,28,28),0_4px_0_rgb(153,27,27),0_6px_0_rgb(127,29,29),0_8px_14px_rgba(0,0,0,.22),inset_0_1px_1px_rgba(255,255,255,.25),inset_0_-1px_1px_rgba(0,0,0,.15)] hover:brightness-105 active:translate-y-1 active:shadow-[inset_0_4px_8px_rgba(0,0,0,.45),inset_0_1px_2px_rgba(255,255,255,.08)]"
                                    }`}
                            >
                                {isClosing ? (
                                    <span className="flex items-center gap-2 text-white">
                                        <svg
                                            className="h-4 w-4 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-100"
                                                fill="currentColor"
                                                d="M22 12a10 10 0 0 1-10 10V18a6 6 0 0 0 6-6h4Z"
                                            />
                                        </svg>
                                        Closing...
                                    </span>
                                ) : (
                                    "Close"
                                )}
                            </button>

                        </div>

                        {file.type === "application/pdf" && (

                            <iframe
                                src={fileUrl}
                                title="PDF Preview"
                                className="h-full w-full"
                            />

                        )}

                        {(file.type === "application/msword" ||
                            file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") && (

                                <div className="flex h-full flex-col items-center justify-center gap-6">

                                    <FiFileText className="text-7xl text-sky-600" />

                                    <h2 className="text-2xl font-bold text-slate-800">
                                        {file.name}
                                    </h2>

                                    <p className="text-slate-500">
                                        Word preview is not supported by browsers.
                                    </p>

                                    <a
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-xl bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700"
                                    >
                                        Open Document
                                    </a>

                                </div>

                            )}

                        {file.type === "text/plain" && (

                            <TextPreview file={file} />

                        )}

                    </div>

                </div>

            )}

        </motion.div>

    );


}