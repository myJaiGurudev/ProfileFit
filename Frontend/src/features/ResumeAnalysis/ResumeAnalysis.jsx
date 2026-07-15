import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FiArrowLeft, FiClock, FiCpu, FiAlertTriangle,
    FiCheckCircle, FiTarget, FiXCircle, FiPlusCircle,
    FiTrendingUp, FiBriefcase, FiBookOpen, FiActivity,
    FiChevronDown
} from "react-icons/fi";
import api from "../auth/components/api";

export default function ResumeAnalysis() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Core states
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Section Visibility toggles
    const [sections, setSections] = useState({
        feedback: true,
        keywords: true,
        questions: false,
        actionPlan: false,
        recommendations: false
    });

    const toggleSection = (sectionKey) => {
        setSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
    };

    useEffect(() => {
        const fetchAnalysisReport = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/interview/report/${id}`);
                setReport(response.data.interviewReport);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to load the analysis report.");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchAnalysisReport();
    }, [id]);

    if (loading) {
        return (
            <div className="relative flex min-h-screen items-center justify-center bg-[#05050a] text-white overflow-hidden">
                {/* Background effects for loading */}
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

    // Dynamic color picker for metrics
    const getScoreTheme = (score) => {
        if (score >= 75) return { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-500/20", glow: "shadow-emerald-500/10", stroke: "stroke-emerald-400", hex: "#34d399" };
        if (score >= 50) return { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-500/20", glow: "shadow-amber-500/10", stroke: "stroke-amber-400", hex: "#fbbf24" };
        return { text: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-500/20", glow: "shadow-rose-500/10", stroke: "stroke-rose-400", hex: "#fb7185" };
    };

    return (
        <main className="relative min-h-screen bg-[#030308] text-slate-200 antialiased pb-24 selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">

            {/* INJECTED PREMIUM STYLES */}
            <style>{`
                /* Premium Scrollbar */
                .premium-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .premium-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .premium-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                    transition: all 0.3s ease;
                }
                .premium-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.15);
                }

                /* Animated Grid Background */
                .bg-grid-pattern {
                    background-size: 50px 50px;
                    background-image: 
                        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
                    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
                }

                /* Smooth Mount Animation */
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                    animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                
                /* Accordion Grid Animation */
                .accordion-content {
                    display: grid;
                    transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
                }
            `}</style>

            {/* Ambient Background Base */}
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
                        className="cursor-pointer group flex w-fit items-center gap-3 rounded-full border border-white/5 bg-white/2 px-5 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-md transition-all hover:bg-white/5 hover:text-white"
                    >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:-translate-x-1">
                            <FiArrowLeft className="h-3 w-3" />
                        </div>
                        Back to Workspace
                    </button>

                    <div className="flex items-center gap-3 rounded-full border border-white/5 bg-white/2 p-1.5 backdrop-blur-md">
                        <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300">
                            <FiCpu className="h-3.5 w-3.5 text-indigo-400" />
                            {report.generatedWith || "gemini-2.5-flash"}
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300">
                            <FiClock className="h-3.5 w-3.5 text-emerald-400" />
                            {(report.processingTime / 1000).toFixed(2)}s
                        </div>
                    </div>
                </div>

                {/* --- HERO PROFILE CARD --- */}
                <div className="animate-fade-up relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl shadow-2xl shadow-black/50">
                    {/* Top Gradient Line */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>

                    <div className="p-8 sm:p-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Analysis Complete
                            </div>
                            <h1 className="text-3xl font-light tracking-tight text-white sm:text-5xl lg:text-5xl">
                                {report.title}
                            </h1>
                            <p className="mt-4 text-base text-slate-400 max-w-2xl leading-relaxed font-light">
                                Comprehensive AI-driven competency matrix and alignment evaluation for optimal role positioning.
                            </p>
                        </div>

                        {/* Difficulty Badge */}
                        <div className="flex shrink-0 items-center gap-5 rounded-2xl border border-white/5 bg-black/20 p-5 shadow-inner">
                            <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-white/5 to-transparent border border-white/10 ${report.interviewDifficulty === "Hard" ? "text-rose-400" : report.interviewDifficulty === "Medium" ? "text-amber-400" : "text-emerald-400"}`}>
                                <FiActivity className="h-7 w-7 drop-shadow-md" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 font-medium tracking-widest uppercase mb-1">Interview Level</div>
                                <div className={`text-2xl font-semibold tracking-wide ${report.interviewDifficulty === "Hard" ? "text-rose-400" : report.interviewDifficulty === "Medium" ? "text-amber-400" : "text-emerald-400"}`}>
                                    {report.interviewDifficulty || "Medium"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- METRICS DASHBOARD --- */}
                <div className="animate-fade-up grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-16" style={{ animationDelay: '100ms' }}>
                    {[
                        { label: "Overall Rating", val: report.overallScore, sub: "Competency Index" },
                        { label: "ATS Readiness", val: report.atsScore, sub: "Parsing Match" },
                        { label: "JD Alignment", val: report.matchScore, sub: "Profile Match" },
                        { label: "Hiring Odds", val: report.hiringProbability, sub: "Conversion Rate" },
                        { label: "AI Certainty", val: report.confidenceScore, sub: "Model Confidence" }
                    ].map((metric, i) => {
                        const theme = getScoreTheme(metric.val);
                        return (
                            <div key={i} className="group relative flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/2 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/4 hover:border-white/10">
                                {/* Subtle Hover Glow */}
                                <div className={`absolute inset-0 -z-10 rounded-3xl bg-linear-to-b from-${theme.hex}/20 to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20`}></div>

                                <div className="relative flex items-center justify-center h-20 w-20 mb-5">
                                    {/* SVG Radial Progress */}
                                    <svg className="w-full h-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 36 36">
                                        <path className="text-white/5" strokeWidth="2.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <path className={`transition-all duration-1000 ease-out ${theme.stroke}`} strokeWidth="2.5" strokeLinecap="round" strokeDasharray={`${metric.val}, 100`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    </svg>
                                    <span className={`absolute text-xl font-medium tracking-tight ${theme.text}`}>{metric.val}<span className="text-xs text-slate-500">%</span></span>
                                </div>
                                <span className="text-[13px] font-semibold text-slate-200 tracking-wide uppercase">{metric.label}</span>
                                <span className="text-[11px] text-slate-500 mt-1 font-medium">{metric.sub}</span>
                            </div>
                        );
                    })}
                </div>

                {/* --- STRUCTURED REPORT SECTIONS --- */}
                <div className="animate-fade-up space-y-6" style={{ animationDelay: '200ms' }}>

                    {/* Section 1: Executive Summary */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div
                            onClick={() => toggleSection("feedback")}
                            className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500/20 to-transparent border border-emerald-500/20 text-emerald-400">
                                    <FiTarget className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Executive Summary & Feedback</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.feedback ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>

                        {/* CSS Grid Height Animation Wrapper */}
                        <div className={`accordion-content ${sections.feedback ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0 grid gap-6 md:grid-cols-2">
                                    <div className="rounded-2xl border border-white/5 bg-black/20 p-6 sm:p-8">
                                        <h3 className="flex items-center gap-3 text-[13px] font-semibold text-emerald-400 uppercase tracking-widest mb-6">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>
                                            Recruiter Assessment
                                        </h3>
                                        <div className="premium-scrollbar text-[15px] text-slate-300/90 leading-loose whitespace-pre-wrap max-h-100 overflow-y-auto pr-4">
                                            {report.recruiterSummary}
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-white/5 bg-black/20 p-6 sm:p-8">
                                        <h3 className="flex items-center gap-3 text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-6">
                                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]"></div>
                                            Technical Evaluation
                                        </h3>
                                        <div className="premium-scrollbar text-[15px] text-slate-300/90 leading-loose whitespace-pre-wrap max-h-100 overflow-y-auto pr-4">
                                            {report.overallFeedback}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Keywords & Gaps */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div
                            onClick={() => toggleSection("keywords")}
                            className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500/20 to-transparent border border-indigo-500/20 text-indigo-400">
                                    <FiTrendingUp className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Competence Gap Analysis</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.keywords ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>

                        <div className={`accordion-content ${sections.keywords ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0 space-y-6">

                                    {/* Keywords */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-emerald-900/30 bg-black/20 p-6 sm:p-8">
                                            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-6">
                                                <FiCheckCircle className="h-4 w-4" /> Matched Keywords ({report.matchedKeywords?.length || 0})
                                            </h3>
                                            <div className="premium-scrollbar flex flex-wrap gap-2.5 max-h-62.5 overflow-y-auto pr-2">
                                                {report.matchedKeywords?.map((kw, idx) => (
                                                    <span key={idx} className="rounded-full bg-emerald-500/10 px-4 py-1.5 text-[13px] font-medium text-emerald-300 border border-emerald-500/20">{kw}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="rounded-2xl border border-rose-900/30 bg-black/20 p-6 sm:p-8">
                                            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-400 mb-6">
                                                <FiXCircle className="h-4 w-4" /> Missing Keywords ({report.missingKeywords?.length || 0})
                                            </h3>
                                            <div className="premium-scrollbar flex flex-wrap gap-2.5 max-h-62.5 overflow-y-auto pr-2">
                                                {report.missingKeywords?.map((kw, idx) => (
                                                    <span key={idx} className="rounded-full bg-rose-500/10 px-4 py-1.5 text-[13px] font-medium text-rose-300 border border-rose-500/20">{kw}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Strengths & Weaknesses */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-white/5 bg-black/20 p-6 sm:p-8">
                                            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b border-white/5">Core Strengths</h3>
                                            <ul className="premium-scrollbar space-y-4 max-h-75 overflow-y-auto pr-4">
                                                {report.strengths?.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-4 text-[14.5px] text-slate-300/90 leading-relaxed">
                                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="rounded-2xl border border-white/5 bg-black/20 p-6 sm:p-8">
                                            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b border-white/5">Identified Weaknesses</h3>
                                            <ul className="premium-scrollbar space-y-4 max-h-75 overflow-y-auto pr-4">
                                                {report.weaknesses?.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-4 text-[14.5px] text-slate-300/90 leading-relaxed">
                                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400 shadow-[0_0_8px_#fb7185]" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Actionable Improvements */}
                                    <div className="rounded-2xl border border-indigo-900/30 bg-indigo-950/10 p-6 sm:p-8">
                                        <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-6 flex items-center gap-2">
                                            <FiPlusCircle className="h-4 w-4" /> Recommended Adjustments
                                        </h3>
                                        <div className="premium-scrollbar grid gap-4 sm:grid-cols-2 max-h-75 overflow-y-auto pr-4">
                                            {report.resumeImprovements?.map((imp, idx) => (
                                                <div key={idx} className="flex gap-4 rounded-xl border border-white/5 bg-black/20 p-4 text-[14.5px] text-slate-300/90 leading-relaxed">
                                                    <span className="text-indigo-400 font-semibold">{idx + 1}.</span>
                                                    <span>{imp}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Interview Questions */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div
                            onClick={() => toggleSection("questions")}
                            className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-amber-500/20 to-transparent border border-amber-500/20 text-amber-400">
                                    <FiBriefcase className="h-6 w-6" />
                                </div>
                                <h2 className="text-lg font-medium tracking-wide text-white">Simulated Interview Prompts</h2>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-black/20 text-slate-400 transition-transform duration-300 ${sections.questions ? 'rotate-180' : 'rotate-0'}`}>
                                <FiChevronDown size={20} />
                            </div>
                        </div>

                        <div className={`accordion-content ${sections.questions ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-6 sm:p-8 pt-0 grid gap-6 lg:grid-cols-2">
                                    <div className="rounded-2xl border border-white/5 bg-black/20 p-6 sm:p-8">
                                        <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-6 pb-4 border-b border-white/5 flex items-center gap-2">
                                            <FiCpu className="h-4 w-4" /> Technical Core Stack
                                        </h3>
                                        <div className="premium-scrollbar space-y-4 max-h-125 overflow-y-auto pr-4">
                                            {report.technicalQuestions?.map((q, idx) => (
                                                <div key={idx} className="flex gap-4 p-5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors">
                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 font-semibold text-xs border border-indigo-500/20">
                                                        {idx + 1}
                                                    </div>
                                                    <p className="text-[14.5px] text-slate-300/90 leading-relaxed pt-0.5">{q}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-white/5 bg-black/20 p-6 sm:p-8">
                                        <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-6 pb-4 border-b border-white/5 flex items-center gap-2">
                                            <FiTarget className="h-4 w-4" /> Behavioral & Cultural
                                        </h3>
                                        <div className="premium-scrollbar space-y-4 max-h-125 overflow-y-auto pr-4">
                                            {report.behavioralQuestions?.map((q, idx) => (
                                                <div key={idx} className="flex gap-4 p-5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors">
                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-semibold text-xs border border-emerald-500/20">
                                                        {idx + 1}
                                                    </div>
                                                    <p className="text-[14.5px] text-slate-300/90 leading-relaxed pt-0.5">{q}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: 7-Day Sprint Plan */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div
                            onClick={() => toggleSection("actionPlan")}
                            className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors"
                        >
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
                                    {/* Focus Areas Tag */}
                                    <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-white/5 bg-black/20 p-6">
                                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest shrink-0">Priority Focus Areas:</span>
                                        <div className="flex flex-wrap gap-2.5">
                                            {report.prioritySkills?.map((skill, i) => (
                                                <span key={i} className="text-xs border border-rose-500/20 bg-rose-500/10 text-rose-300 font-medium px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.1)]">{skill}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Flex-Based Timeline (Never clips numbers) */}
                                    <div className="premium-scrollbar max-h-150 overflow-y-auto pr-4 flex flex-col gap-0">
                                        {report.preparationPlan?.map((planStep, idx) => (
                                            <div key={idx} className="flex group w-full">
                                                {/* Vertical Line & Dot Column */}
                                                <div className="flex flex-col items-center mr-6">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#05050a] border-2 border-rose-500/40 text-sm font-bold text-rose-400 transition-all group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.15)] z-10">
                                                        {idx + 1}
                                                    </div>
                                                    {/* The connecting line - render on all except the last item */}
                                                    {idx < (report.preparationPlan.length - 1) && (
                                                        <div className="w-0.5 flex-1 bg-linear-to-b from-rose-500/30 to-white/5 my-2 rounded-full"></div>
                                                    )}
                                                </div>

                                                {/* Content Column */}
                                                <div className="flex-1 pb-8">
                                                    <div className="rounded-2xl border border-white/5 bg-black/20 p-6 transition-colors group-hover:bg-white/2 group-hover:border-white/10">
                                                        <h4 className="text-[13px] font-bold text-white mb-2 uppercase tracking-widest opacity-80">Day 0{idx + 1}</h4>
                                                        <p className="text-[15px] font-medium text-slate-300/90 leading-relaxed">{planStep}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Recommended Projects */}
                    <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                        <div
                            onClick={() => toggleSection("recommendations")}
                            className="cursor-pointer flex items-center justify-between p-6 sm:px-8 hover:bg-white/2 transition-colors"
                        >
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
                                <div className="p-6 sm:p-8 pt-0 premium-scrollbar max-h-150 overflow-y-auto grid gap-6 sm:grid-cols-2 pr-4">
                                    {report.recommendedProjects?.map((project, idx) => (
                                        <div key={idx} className="group rounded-2xl border border-white/5 bg-black/20 p-6 sm:p-8 transition-all hover:bg-white/2 hover:border-blue-500/30">
                                            <div className="flex items-center gap-4 mb-5 border-b border-white/5 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 font-bold text-sm border border-blue-500/20">0{idx + 1}</div>
                                                <div className="text-xs font-semibold uppercase tracking-widest text-blue-300">Portfolio Build</div>
                                            </div>
                                            <p className="text-[14.5px] text-slate-300/90 leading-relaxed">{project}</p>
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