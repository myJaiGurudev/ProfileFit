import AnimatedBackground from "../components/analyzer/AnimatedBackground";
import Hero from "../components/analyzer/Hero";
import SectionContainer from "../components/analyzer/SectionContainer";
import { FiFileText, FiBriefcase } from "react-icons/fi";
import UploadCard from "../components/analyzer/UploadCard";
import AnalyzeButton from "../components/analyzer/AnalyzeButton";
import DocumentUploaderInput from "../components/analyzer/DocumentUploaderInput";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

export default function AnalyzeResume() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
    const [resumeText, setResumeText] = useState(
        () => localStorage.getItem("document-text-Resume") || ""
    );
    const [jobDescriptionText, setJobDescriptionText] = useState(
        () => localStorage.getItem("document-text-Job Description") || ""
    );

    // --- Error Toast State ---
    const [toast, setToast] = useState({ show: false, title: "", message: "" });

    const canAnalyze = (resumeText.trim() || resumeFile) && (jobDescriptionText.trim() || jobDescriptionFile);

    // --- Error Toast Logic ---
    const triggerError = useCallback((title, message) => {
        setToast({ show: false, title: "", message: "" });
        setTimeout(() => {
            setToast({ show: true, title, message });
        }, 50);
    }, []);

    useEffect(() => {
        if (!toast.show) return;

        const timer = setTimeout(() => {
            setToast((t) => ({ ...t, show: false }));
        }, 5000);

        return () => clearTimeout(timer);
    }, [toast.show]);

    const handleAnalyze = async () => {
        setLoading(true);

        // Temporary loading
        await new Promise(resolve => setTimeout(resolve, 3000));

        localStorage.removeItem("document-text-Resume");
        localStorage.removeItem("document-text-Job Description");

        setLoading(false);
        navigate("/resume-analysis");
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

            <AnimatedBackground />

            <SectionContainer className="flex min-h-[calc(100vh-5rem)] flex-col justify-center pt-24 pb-10 sm:pt-28 lg:pt-32">
                <Hero />

                <section className="mt-14 grid gap-6 lg:grid-cols-2">
                    <UploadCard
                        title="Resume"
                        subtitle="Upload your latest resume"
                        icon={FiFileText}
                    >
                        <DocumentUploaderInput
                            title="Resume"
                            description="Click or drag your resume here"
                            placeholder="Paste your resume here..."
                            value={resumeText}
                            setValue={setResumeText}
                            file={resumeFile}
                            setFile={setResumeFile}
                            // Pass the function down to trigger the error from inside the uploader
                            onError={(msg) => triggerError("Invalid File Type: Resume", msg || "Resume must be PDF or TXT.")}
                        />
                    </UploadCard>

                    <UploadCard
                        title="Job Description"
                        subtitle="Paste or upload a job description"
                        icon={FiBriefcase}
                    >
                        <DocumentUploaderInput
                            title="Job Description"
                            description="Click or drag your job description here"
                            placeholder="Paste the job description here..."
                            value={jobDescriptionText}
                            setValue={setJobDescriptionText}
                            file={jobDescriptionFile}
                            setFile={setJobDescriptionFile}
                            // Pass the function down to trigger the error from inside the uploader
                            onError={(msg) => triggerError("Invalid File Type: Job Description", msg || "Job Description must be PDF or TXT.")}
                        />
                    </UploadCard>
                </section>

                <div className="mt-10 flex justify-center">
                    <AnalyzeButton
                        loading={loading}
                        disabled={!canAnalyze}
                        onClick={handleAnalyze}
                    />
                </div>
            </SectionContainer>

            {/* Error Toast */}
            <div
                className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${toast.show
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex w-96 items-start gap-4 rounded-2xl border border-red-500/30 bg-[#1f0a0a]/95 p-4 shadow-[0_15px_40px_rgba(239,68,68,0.25)] backdrop-blur-xl">

                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-xl text-red-400">
                        <HiOutlineExclamationTriangle className="h-6 w-6" />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-red-300">
                            {toast.title}
                        </h3>

                        <p className="mt-1 text-sm leading-5 text-red-200/90">
                            {toast.message}
                        </p>
                    </div>

                    <button
                        onClick={() => setToast((t) => ({ ...t, show: false }))}
                        aria-label="Close warning"
                        className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-red-300 transition-all duration-200 hover:scale-110 hover:bg-red-500/15 hover:text-white active:scale-95"
                    >
                        <IoClose className="h-5 w-5" />
                    </button>

                </div>
            </div>
        </main>
    );
}