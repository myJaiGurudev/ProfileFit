import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
    FiArrowLeft, FiClock, FiCpu, FiAlertTriangle,
    FiCheckCircle, FiTarget, FiXCircle, FiPlusCircle,
    FiTrendingUp, FiBriefcase, FiBookOpen, FiActivity,
    FiChevronDown, FiDownload
} from "react-icons/fi";
import api from "../auth/components/api";

export default function ResumeAnalysis() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // Captured to read immediate redirect payloads

    // Core states
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // PDF Generation State
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [pdfError, setPdfError] = useState("");

    // Section Visibility toggles
    const [sections, setSections] = useState({
        recruiter: true,
        technical: true,
        matchedKw: false,
        missingKw: false,
        strengths: false,
        weaknesses: false,
        adjustments: false,
        techQs: false,
        behavioralQs: false,
        actionPlan: false,
        recommendations: false
    });

    const toggleSection = (sectionKey) => {
        setSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
    };

    // Unified Processing: Handles both loading old reports AND analyzing fresh inputs
    useEffect(() => {
        const processAnalysisReport = async () => {
            try {
                setLoading(true);
                setError("");

                // Scenario A: User clicked "Analyze" in workspace and redirected here immediately
                if (id === "new" && location.state) {
                    const { resumeFile, resumeText, jobDescriptionFile, jobDescriptionText } = location.state;

                    const formData = new FormData();

                    if (resumeFile) {
                        formData.append("resume", resumeFile);
                    } else {
                        formData.append("resume", resumeText);
                    }

                    if (jobDescriptionFile) {
                        formData.append("jobDescriptionFile", jobDescriptionFile);
                    } else {
                        formData.append("jobDescription", jobDescriptionText);
                    }

                    // Execute long-running computational analysis inside this screen
                    const response = await api.post("/interview", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    const dynamicReport = response.data.interviewReport;
                    setReport(dynamicReport);

                    // Rewrite browser address bar query from /new to /:id silently
                    if (dynamicReport?._id) {
                        window.history.replaceState(null, "", `/resume-analysis/${dynamicReport._id}`);
                    }
                } 
                // Scenario B: Traditional mounting loop via standard historical ID path
                else if (id && id !== "new") {
                    const response = await api.get(`/interview/report/${id}`);
                    setReport(response.data.interviewReport);
                } else {
                    // Fallback boundary check if state is missing on /new
                    throw new Error("Missing document vectors. Please re-upload inside the workspace.");
                }
            } catch (err) {
                console.error("Analysis Pipeline Error:", err);
                setError(err.response?.data?.message || err.message || "Failed to parse document matching indices.");
            } finally {
                setLoading(false);
            }
        };

        processAnalysisReport();
    }, [id, location.state]);

    // PDF Generation Handler
    const handleGenerateResume = async () => {
        try {
            setIsGeneratingPdf(true);
            setPdfError("");
            
            const currentId = report?._id || id;
            const response = await api.post(`/interview/resume/pdf/${currentId}`, {}, {
                responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `Optimized_Resume_${currentId}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Failed to generate resume:", err);
            setPdfError("Premium resume generation temporarily unavailable. Please try again shortly.");
            setTimeout(() => setPdfError(""), 5000);
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    if (loading) {
        return (
            <div className="relative flex min-h-screen items-center justify-center bg-[#05050a] text-white overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-125 w-125 rounded-full bg-emerald-500/10 blur-[120px]"></div>
                <div className="z-10 flex flex-col items-center gap-8">
                    <div className="relative flex h-24 w-24 items-center justify-center">
                        <div className="absolute h-full w-full animate-ping rounded-full border border-emerald-500/40"></div>
                        <div className="absolute h-16 w-16 animate-spin rounded-full border-y-2 border-emerald-400"></div>
                        <FiCpu className="h-8 w-8 text-emerald-300 animate-pulse" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-light tracking-widest text-slate-200">ANALYZING PROFILE</h2>
                        <p className="mt-2 text-sm text-emerald-400/60 font-mono">Running high-dimensional vectors...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#05050a] text-white px-4">
                <div className="w-full max-w-lg rounded-3xl border border-rose-500/20 bg-rose-500/5 p-10 text-center backdrop-blur-2xl shadow-[0_0_40px_rgba(225,29,72,0.1)]">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-rose-500/10 mb-6 border border-rose-500/20">
                        <FiAlertTriangle className="h-10 w-10 text-rose-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-rose-200 tracking-wide">Analysis Halted</h3>
                    <p className="mt-4 text-[15px] text-slate-400 leading-relaxed">{error}</p>
                    <button
                        onClick={() => navigate("/analyze-resume")}
                        className="cursor-pointer mt-10 inline-flex items-center gap-3 rounded-full bg-white/5 px-8 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 border border-white/10"
                    >
                        <FiArrowLeft className="h-5 w-5" /> Return to Workspace
                    </button>
                </div>
            </div>
        );
    }

    const getScoreTheme = (score) => {
        if (score >= 75) return { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-500/20", glow: "shadow-emerald-500/10", stroke: "stroke-emerald-400", hex: "#34d399" };
        if (score >= 50) return { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-500/20", glow: "shadow-amber-500/10", stroke: "stroke-amber-400", hex: "#fbbf24" };
        return { text: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-500/20", glow: "shadow-rose-500/10", stroke: "stroke-rose-400", hex: "#fb7185" };
    };

    return (
        <main className="relative min-h-screen bg-[#030308] text-slate-200 antialiased pb-24 selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">
            <style>{`
                .premium-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .premium-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .premium-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; transition: all 0.3s ease; }
                .premium-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); }
                .bg-grid-pattern { background-size: 50px 50px; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px); mask-image: radial-gradient(circle at center, black 40%, transparent 100%); }
                @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-up { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .accordion-content { display: grid; transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease; }
            `}</style>

            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-pattern"></div>
                <div className="absolute top-[-20%] left-[-10%] h-175 w-175 rounded-full bg-emerald-600/10 blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute top-[20%] right-[-10%] h-150 w-150 rounded-full bg-indigo-600/10 blur-[150px] opacity-70 mix-blend-screen"></div>
            </div>

            <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8 relative z-10">
                
                {/* --- HEADER ACTIONS --- */}
                <div className="animate-fade-up flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-10">
                    <button
                        onClick={() => navigate("/analyze-resume")}
                        className="cursor-pointer group flex w-fit items-center gap-3 rounded-full border border-white/10 bg-black/40 px-6 py-2.5 text-sm font-semibold text-slate-300 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
                    >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:bg-white/20">
                            <FiArrowLeft className="h-3.5 w-3.5" />
                        </div>
                        Back to Workspace
                    </button>

                    <div className="flex flex-col sm:flex-row items-center gap-4 relative">
                        {pdfError && (
                            <div className="absolute right-0 -top-12 flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 backdrop-blur-md animate-fade-up shadow-[0_4px_20px_rgba(225,29,72,0.15)]">
                                <FiAlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                <span>{pdfError}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-xl shadow-inner select-none cursor-default">
                            <div className="flex items-center gap-2.5 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-200 shadow-sm">
                                <FiCpu className="h-4 w-4 text-indigo-400" />
                                {report?.generatedWith || "gemini-2.5-flash"}
                            </div>
                            <div className="flex items-center gap-2.5 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-200 shadow-sm">
                                <FiClock className="h-4 w-4 text-emerald-400" />
                                {report ? (report.processingTime / 1000).toFixed(2) : "0.00"}s
                            </div>
                        </div>

                        <button
                            onClick={handleGenerateResume}
                            disabled={isGeneratingPdf}
                            className={`group relative flex items-center justify-center gap-2.5 px-7 py-2.5 text-sm font-semibold text-slate-100 transition-all duration-300 rounded-full border backdrop-blur-md shadow-lg overflow-hidden
                            ${isGeneratingPdf
                                ? "cursor-not-allowed opacity-60 border-indigo-500/10 bg-indigo-500/5"
                                : "cursor-pointer bg-indigo-500/10 border-indigo-500/30 hover:bg-indigo-500/20 hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] active:scale-95"
                            }`}
                        >
                            {!isGeneratingPdf && <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite_linear]" />}

                            {isGeneratingPdf ? (
                                <>
                                    <svg className="w-4 h-4 text-indigo-300 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className="text-indigo-200">Generating PDF...</span>
                                </>
                            ) : (
                                <>
                                    <FiDownload className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                                    <span>Generate Resume</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* --- HERO PROFILE CARD --- */}
                <div className="animate-fade-up relative mb-14 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/80 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] group">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-70 group-hover:via-emerald-400 transition-colors duration-700"></div>
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-emerald-500/5 pointer-events-none"></div>

                    <div className="relative z-10 p-8 sm:p-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Analysis Complete
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-400 sm:text-5xl lg:text-6xl pb-2">
                                {report?.title}
                            </h1>
                            <p className="mt-4 text-[16px] text-slate-400 max-w-2xl leading-relaxed font-medium">
                                Comprehensive AI-driven competency matrix and alignment evaluation for optimal role positioning.
                            </p>
                        </div>

                        <div className="relative flex shrink-0 items-center gap-5 rounded-3xl border border-white/10 bg-white/3 p-6 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/5">
                            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-20 ${report?.interviewDifficulty === "Hard" ? "bg-rose-500" : report?.interviewDifficulty === "Medium" ? "bg-amber-500" : "bg-emerald-500"}`}></div>
                            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-white/10 to-transparent border border-white/10 shadow-inner z-10 ${report?.interviewDifficulty === "Hard" ? "text-rose-400" : report?.interviewDifficulty === "Medium" ? "text-amber-400" : "text-emerald-400"}`}>
                                <FiActivity className="h-8 w-8 drop-shadow-lg" />
                            </div>
                            <div className="z-10 pr-2">
                                <div className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-1.5">Interview Level</div>
                                <div className={`text-3xl font-extrabold tracking-tight drop-shadow-md ${report?.interviewDifficulty === "Hard" ? "text-rose-400" : report?.interviewDifficulty === "Medium" ? "text-amber-400" : "text-emerald-400"}`}>
                                    {report?.interviewDifficulty || "Medium"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- METRICS DASHBOARD --- */}
                <div className="animate-fade-up grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 mb-16" style={{ animationDelay: '100ms' }}>
                    {[
                        { label: "Resume Score", val: report?.overallScore || 0, sub: "Overall Quality" },
                        { label: "ATS Score", val: report?.atsScore || 0, sub: "Format Readability" },
                        { label: "Job Match", val: report?.matchScore || 0, sub: "Requirement Fit" },
                        { label: "Hire Chance", val: report?.hiringProbability || 0, sub: "Interview Odds" },
                        { label: "AI Certainty", val: report?.confidenceScore || 0, sub: "Analysis Confidence" }
                    ].map((metric, i) => {
                        const theme = getScoreTheme(metric.val) || { hex: "#ffffff" };
                        return (
                            <div key={i} className="group relative flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#0a0a10]/60 p-4 sm:p-5 backdrop-blur-md transition-transform duration-300 ease-in-out hover:-translate-y-1">
                                <div className="relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 mb-4 sm:mb-5">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <path className="text-white/10" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <path style={{ stroke: theme.hex, transition: 'stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} strokeWidth="3.5" strokeLinecap="round" strokeDasharray={`${metric.val}, 100`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    </svg>
                                    <div className="absolute flex flex-col items-center justify-center mt-0.5">
                                        <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                                            {metric.val}
                                            <span className="text-xs sm:text-sm font-normal text-white/50 ml-0.5">%</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="text-center w-full">
                                    <div className="text-[11px] sm:text-[12px] font-bold text-white/90 uppercase tracking-wider mb-1 truncate">
                                        {metric.label}
                                    </div>
                                    <div className="text-[9px] sm:text-[10px] font-medium text-white/40 uppercase tracking-widest truncate">
                                        {metric.sub}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* --- STRUCTURED REPORT SECTIONS --- */}
                <div className="animate-fade-up space-y-6" style={{ animationDelay: '200ms' }}>
                    {/* 1. Recruiter Assessment */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div onClick={() => toggleSection("recruiter")} className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500/20 to-transparent border border-emerald-500/20 text-emerald-400">
                                    <FiTarget className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Recruiter Assessment</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.recruiter ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>
                        <div className={`accordion-content ${sections.recruiter ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0">
                                    <div className="relative rounded-2xl border border-emerald-500/10 bg-emerald-500/3 p-6 sm:p-10 transition-colors hover:bg-emerald-500/5 hover:border-emerald-500/20 overflow-hidden shadow-inner">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-linear-to-b from-emerald-400 to-emerald-600 shadow-[0_0_12px_#34d399]"></div>
                                        <p className="text-[15.5px] text-slate-300/90 leading-[1.8] whitespace-pre-wrap relative z-10 pl-2">
                                            {report?.recruiterSummary}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Technical Evaluation */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div onClick={() => toggleSection("technical")} className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500/20 to-transparent border border-indigo-500/20 text-indigo-400">
                                    <FiCpu className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Technical Evaluation</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.technical ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>
                        <div className={`accordion-content ${sections.technical ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0">
                                    <div className="relative rounded-2xl border border-indigo-500/10 bg-indigo-500/3 p-6 sm:p-10 transition-colors hover:bg-indigo-500/5 hover:border-indigo-500/20 overflow-hidden shadow-inner">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-linear-to-b from-indigo-400 to-indigo-600 shadow-[0_0_12px_#818cf8]"></div>
                                        <p className="text-[15.5px] text-slate-300/90 leading-[1.8] whitespace-pre-wrap relative z-10 pl-2">
                                            {report?.overallFeedback}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Matched Keywords */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div onClick={() => toggleSection("matchedKw")} className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500/20 to-transparent border border-emerald-500/20 text-emerald-400">
                                    <FiCheckCircle className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Matched ATS Keywords</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.matchedKw ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>
                        <div className={`accordion-content ${sections.matchedKw ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0">
                                    <div className="rounded-2xl border border-emerald-900/30 bg-black/20 p-6 sm:p-8">
                                        <div className="premium-scrollbar flex flex-wrap gap-2.5 max-h-62.5 overflow-y-auto pr-2">
                                            {report?.matchedKeywords?.map((kw, idx) => (
                                                <span key={idx} className="rounded-full bg-emerald-500/10 px-4 py-1.5 text-[13px] font-medium text-emerald-300 border border-emerald-500/20">{kw}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Missing Keywords */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div onClick={() => toggleSection("missingKw")} className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-rose-500/20 to-transparent border border-rose-500/20 text-rose-400">
                                    <FiXCircle className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Missing ATS Keywords</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.missingKw ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>
                        <div className={`accordion-content ${sections.missingKw ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0">
                                    <div className="rounded-2xl border border-rose-900/30 bg-black/20 p-6 sm:p-8">
                                        <div className="premium-scrollbar flex flex-wrap gap-2.5 max-h-62.5 overflow-y-auto pr-2">
                                            {report?.missingKeywords?.map((kw, idx) => (
                                                <span key={idx} className="rounded-full bg-rose-500/10 px-4 py-1.5 text-[13px] font-medium text-rose-300 border border-rose-500/20">{kw}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Core Strengths */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div onClick={() => toggleSection("strengths")} className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500/20 to-transparent border border-emerald-500/20 text-emerald-400">
                                    <FiTrendingUp className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Core Strengths</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.strengths ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>
                        <div className={`accordion-content ${sections.strengths ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {report?.strengths?.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/2 p-5 transition-all hover:bg-emerald-500/5 hover:border-emerald-500/30">
                                                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    <FiCheckCircle className="h-3.5 w-3.5" />
                                                </div>
                                                <span className="text-[14.5px] text-slate-300/90 leading-relaxed flex-1">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 6. Identified Weaknesses */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div onClick={() => toggleSection("weaknesses")} className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-rose-500/20 to-transparent border border-rose-500/20 text-rose-400">
                                    <FiAlertTriangle className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Identified Weaknesses</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.weaknesses ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>
                        <div className={`accordion-content ${sections.weaknesses ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {report?.weaknesses?.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 rounded-2xl border border-rose-500/10 bg-rose-500/2 p-5 transition-all hover:bg-rose-500/5 hover:border-rose-500/30">
                                                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                                    <FiXCircle className="h-3.5 w-3.5" />
                                                </div>
                                                <span className="text-[14.5px] text-slate-300/90 leading-relaxed flex-1">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 7. Recommended Adjustments */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div onClick={() => toggleSection("adjustments")} className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500/20 to-transparent border border-indigo-500/20 text-indigo-400">
                                    <FiPlusCircle className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Recommended Adjustments</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.adjustments ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>
                        <div className={`accordion-content ${sections.adjustments ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0">
                                    <div className="rounded-2xl border border-indigo-900/30 bg-indigo-950/10 p-6 sm:p-8">
                                        <div className="premium-scrollbar grid gap-4 sm:grid-cols-2 max-h-75 overflow-y-auto pr-4">
                                            {report?.resumeImprovements?.map((imp, idx) => (
                                                <div key={idx} className="flex gap-4 rounded-xl border border-white/5 bg-black/20 p-4 text-[14.5px] text-slate-300/90 leading-relaxed transition-all hover:bg-white/4">
                                                    <span className="text-indigo-400 font-semibold">{idx + 1}.</span>
                                                    <span className="flex-1">{imp}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 8. Technical Competency Assessment */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div onClick={() => toggleSection("techQs")} className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500/20 to-transparent border border-indigo-500/20 text-indigo-400">
                                    <FiBriefcase className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Technical Competency Assessment</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.techQs ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>
                        <div className={`accordion-content ${sections.techQs ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0">
                                    <div className="grid gap-4">
                                        {report?.technicalQuestions?.map((q, idx) => (
                                            <div key={idx} className="group relative flex gap-5 rounded-2xl border border-indigo-500/10 bg-indigo-500/2 p-6 transition-all hover:bg-indigo-500/5 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.05)] overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20 group-hover:bg-indigo-400 transition-colors duration-300"></div>
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 font-bold text-sm border border-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-[15.5px] text-slate-300/90 leading-relaxed pt-1.5 flex-1">{q}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 9. Cultural Alignment & Behavioral Scenarios */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div onClick={() => toggleSection("behavioralQs")} className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-amber-500/20 to-transparent border border-amber-500/20 text-amber-400">
                                    <FiActivity className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Cultural Alignment & Behavioral Scenarios</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.behavioralQs ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>
                        <div className={`accordion-content ${sections.behavioralQs ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0">
                                    <div className="grid gap-4">
                                        {report?.behavioralQuestions?.map((q, idx) => (
                                            <div key={idx} className="group relative flex gap-5 rounded-2xl border border-amber-500/10 bg-amber-500/2 p-6 transition-all hover:bg-amber-500/5 hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)] overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/20 group-hover:bg-amber-400 transition-colors duration-300"></div>
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 font-bold text-sm border border-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-[15.5px] text-slate-300/90 leading-relaxed pt-1.5 flex-1">{q}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 10. 7-Day Acceleration Sprint */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div onClick={() => toggleSection("actionPlan")} className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-rose-500/20 to-transparent border border-rose-500/20 text-rose-400">
                                    <FiBookOpen className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">7-Day Acceleration Sprint</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.actionPlan ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>
                        <div className={`accordion-content ${sections.actionPlan ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0">
                                    <div className="mb-12 flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 shadow-inner">
                                        <span className="text-xs font-semibold text-rose-200 uppercase tracking-widest shrink-0">Sprint Focus Areas:</span>
                                        <div className="flex flex-wrap gap-2.5">
                                            {report?.prioritySkills?.map((skill, i) => (
                                                <span key={i} className="text-[13px] border border-rose-500/30 bg-rose-500/20 text-white font-medium px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(225,29,72,0.2)]">{skill}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative flex flex-col gap-0">
                                        <div className="absolute left-6.75 top-6 bottom-6 w-0.5 bg-linear-to-b from-rose-500/50 via-rose-500/20 to-transparent rounded-full z-0" />
                                        {report?.preparationPlan?.map((planStep, idx) => (
                                            <div key={idx} className="flex group w-full relative z-10 mb-8 last:mb-0">
                                                <div className="flex flex-col items-center mr-6 sm:mr-8">
                                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#05050a] border-2 border-rose-500/30 text-[15px] font-bold text-rose-400 transition-all duration-300 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.15)] group-hover:shadow-[0_0_25px_rgba(225,29,72,0.5)]">
                                                        {idx + 1}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="rounded-2xl border border-rose-500/10 bg-rose-500/2 p-6 sm:p-8 transition-all duration-300 group-hover:bg-rose-500/5 group-hover:border-rose-500/30 group-hover:-translate-y-1 group-hover:shadow-xl">
                                                        <h4 className="text-[14px] font-bold text-rose-300 mb-3 uppercase tracking-widest flex items-center gap-2">
                                                            Day 0{idx + 1}
                                                            <div className="h-px flex-1 bg-linear-to-r from-rose-500/20 to-transparent ml-2" />
                                                        </h4>
                                                        <p className="text-[15.5px] font-medium text-slate-300/90 leading-relaxed">{planStep}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 11. Recommended Architectural Projects */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div onClick={() => toggleSection("recommendations")} className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500/20 to-transparent border border-blue-500/20 text-blue-400">
                                    <FiCpu className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Recommended Architectural Projects</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.recommendations ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>
                        <div className={`accordion-content ${sections.recommendations ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0 grid gap-6 lg:grid-cols-2">
                                    {report?.recommendedProjects?.map((project, idx) => (
                                        <div key={idx} className="group relative rounded-2xl border border-blue-500/10 bg-blue-500/2 p-8 transition-all duration-300 hover:bg-blue-500/4 hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.2)] overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-0.75 bg-linear-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="flex items-center gap-4 mb-6 border-b border-blue-500/10 pb-5">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 font-bold text-lg border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                                                    0{idx + 1}
                                                </div>
                                                <div className="text-sm font-semibold uppercase tracking-widest text-blue-300">Architecture Blueprint</div>
                                            </div>
                                            <p className="text-[15.5px] text-slate-300/90 leading-[1.7]">{project}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}