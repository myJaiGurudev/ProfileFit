import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FiChevronRight, FiClock, FiActivity, FiTarget, 
    FiFileText, FiTrash2, FiAlertCircle, FiCheckCircle, FiX 
} from "react-icons/fi";
import api from "../../auth/components/api"; // Adjust path as needed

export default function InterviewHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Custom UI States to replace alert() and confirm()
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get("/interview/");
                if (response.data.interviewReports) {
                    setHistory(response.data.interviewReports);
                }
            } catch (error) {
                console.error("Failed to fetch history:", error);
                showToast("Failed to load history. Please refresh.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    // Custom Toast Helper
    const showToast = (message, type = "success") => {
        setToast({ visible: true, message, type });
        setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 4000);
    };

    // Open Custom Confirm Modal
    const confirmDelete = (e, id) => {
        e.stopPropagation(); // Stop card click
        setDeleteModal({ isOpen: true, id });
    };

    // Execute Delete
    const handleDelete = async () => {
        if (!deleteModal.id) return;
        setIsDeleting(true);

        try {
            await api.delete(`/interview/${deleteModal.id}`);
            setHistory((prev) => prev.filter((report) => report._id !== deleteModal.id));
            showToast("Analysis deleted successfully.", "success");
        } catch (error) {
            console.error("Failed to delete report:", error);
            showToast("Failed to delete the report. Please try again.", "error");
        } finally {
            setIsDeleting(false);
            setDeleteModal({ isOpen: false, id: null });
        }
    };

    const getDifficultyTheme = (level) => {
        if (level === "Hard") return "text-rose-400 bg-rose-400/5 border-rose-500/20";
        if (level === "Medium") return "text-amber-400 bg-amber-400/5 border-amber-500/20";
        return "text-emerald-400 bg-emerald-400/5 border-emerald-500/20";
    };

    return (
        <main className="relative min-h-screen bg-[#05050A] text-slate-200 antialiased py-24 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500/30 overflow-hidden">
            
            {/* INJECTED PREMIUM STYLES */}
            <style>{`
                .premium-grid {
                    background-size: 40px 40px;
                    background-image: 
                        linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
                    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
                }
                @keyframes slideUpFade {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up { animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>

            {/* Premium Deep Space & Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 premium-grid"></div>
                <div className="absolute top-[-20%] left-[-10%] h-150 w-150 rounded-full bg-indigo-600/5 blur-[150px] opacity-60 mix-blend-screen"></div>
                <div className="absolute bottom-[-20%] right-[-10%] h-150 w-150 rounded-full bg-blue-600/5 blur-[150px] opacity-60 mix-blend-screen"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Header */}
                <header className="mb-14 flex flex-col items-center text-center sm:items-start sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 tracking-widest uppercase mb-6">
                        <FiTarget className="h-3.5 w-3.5" /> Workspace
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-400">
                        Interview History
                    </h1>
                    <p className="mt-4 text-[15px] text-slate-400 font-medium max-w-2xl leading-relaxed">
                        Access and manage your complete portfolio of AI-driven resume evaluations and technical preparation strategies.
                    </p>
                </header>

                <div className="grid gap-5">
                    {/* --- SKELETON LOADER --- */}
                    {loading ? (
                        [1, 2, 3].map((item) => (
                            <div key={item} className="p-7 rounded-3xl bg-white/1.5 border border-white/4 flex flex-col gap-6 animate-pulse backdrop-blur-xl">
                                <div className="flex justify-between items-start">
                                    <div className="w-1/2 h-8 bg-white/5 rounded-lg"></div>
                                    <div className="w-24 h-6 bg-white/5 rounded-full"></div>
                                </div>
                                <div className="w-full h-12 bg-white/5 rounded-lg"></div>
                                <div className="flex gap-4 border-t border-white/5 pt-5">
                                    <div className="w-20 h-8 bg-white/5 rounded-lg"></div>
                                    <div className="w-20 h-8 bg-white/5 rounded-lg"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        /* --- ACTUAL HISTORY CARDS --- */
                        <>
                            {history.map((report) => (
                                <div
                                    key={report._id}
                                    onClick={() => navigate(`/resume-analysis/${report._id}`)}
                                    className="group cursor-pointer relative p-7 rounded-3xl bg-white/1.5 border border-white/4 hover:bg-white/3 hover:border-indigo-500/20 transition-all duration-500 backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.1)] overflow-hidden"
                                >
                                    {/* Left Glow Bar on Hover */}
                                    <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Top Row: Title, Date, and Delete Button */}
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5 pr-12 sm:pr-0">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="flex items-center justify-center h-8 w-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                                    <FiFileText className="h-4 w-4" />
                                                </div>
                                                <h2 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors line-clamp-1">
                                                    {report.title}
                                                </h2>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 uppercase ml-11">
                                                <FiClock className="h-3.5 w-3.5" />
                                                {new Date(report.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {/* Difficulty Badge */}
                                            <div className={`px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${getDifficultyTheme(report.interviewDifficulty)}`}>
                                                <FiActivity className="h-3.5 w-3.5" />
                                                {report.interviewDifficulty || "Medium"}
                                            </div>

                                            {/* Custom Delete Action */}
                                            <button
                                                onClick={(e) => confirmDelete(e, report._id)}
                                                className="absolute top-6 right-6 sm:relative sm:top-0 sm:right-0 cursor-pointer flex items-center justify-center h-9 w-9 rounded-full bg-transparent border border-transparent text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all duration-300 z-20"
                                                title="Delete analysis"
                                            >
                                                <FiTrash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Context Snippet */}
                                    <div className="mb-6 ml-11">
                                        <p className="text-[14.5px] text-slate-400/90 leading-[1.7] line-clamp-2 pr-4 sm:pr-0 font-light">
                                            <strong className="text-slate-300 font-semibold mr-2 tracking-wide">AI Summary:</strong>
                                            {report.recruiterSummary || report.overallFeedback || "Detailed feedback available inside the report."}
                                        </p>
                                    </div>

                                    {/* Bottom Stats & Navigation */}
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-5 pt-5 border-t border-white/5 ml-11">
                                        
                                        <div className="flex items-center gap-3 w-full sm:w-auto">
                                            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-black/30 border border-white/3">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Overall</span>
                                                <span className="text-sm font-black text-slate-200">{report.overallScore}<span className="text-[10px] font-medium text-slate-500 ml-0.5">/100</span></span>
                                            </div>
                                            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-black/30 border border-white/3">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">ATS Match</span>
                                                <span className="text-sm font-black text-slate-200">{report.matchScore}<span className="text-[10px] font-medium text-slate-500 ml-0.5">%</span></span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-[13px] font-semibold text-indigo-400/80 group-hover:text-indigo-300 transition-colors w-full sm:w-auto justify-end">
                                            Open Full Report
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 group-hover:translate-x-1 transition-all duration-300">
                                                <FiChevronRight className="h-3.5 w-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* EMPTY STATE */}
                            {history.length === 0 && (
                                <div className="text-center py-20 px-6 bg-white/1.5 rounded-3xl border border-dashed border-white/10 backdrop-blur-xl">
                                    <div className="flex justify-center mb-5">
                                        <div className="h-16 w-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center shadow-inner">
                                            <FiTarget className="h-8 w-8 text-slate-500" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-200 mb-2">Workspace is Empty</h3>
                                    <p className="text-[15px] text-slate-400 max-w-sm mx-auto mb-8 font-light">
                                        You haven't run any resume analyses yet. Generate a new report to unlock AI-driven insights.
                                    </p>
                                    <button
                                        onClick={() => navigate('/analyze-resume')}
                                        className="cursor-pointer px-7 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95"
                                    >
                                        Start New Analysis
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* --- CUSTOM DELETE CONFIRMATION MODAL --- */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-[#0f0f16] border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] animate-slide-up relative overflow-hidden">
                        {/* Red glow accent */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-rose-500/50 to-transparent"></div>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
                                <FiAlertCircle className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Delete Analysis?</h3>
                        </div>
                        <p className="text-[15px] text-slate-400 leading-relaxed mb-8">
                            This action cannot be undone. This report and all its associated AI insights will be permanently removed from your workspace.
                        </p>
                        
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setDeleteModal({ isOpen: false, id: null })}
                                disabled={isDeleting}
                                className="cursor-pointer px-5 py-2.5 rounded-full font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="cursor-pointer flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white bg-rose-500 hover:bg-rose-600 border border-rose-400/50 shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all disabled:opacity-50 active:scale-95"
                            >
                                {isDeleting ? (
                                    <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : "Delete Permanently"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- CUSTOM TOAST NOTIFICATION --- */}
            {toast.visible && (
                <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-slide-up border ${
                    toast.type === "error" 
                    ? "bg-rose-950/80 border-rose-500/30 text-rose-200" 
                    : "bg-emerald-950/80 border-emerald-500/30 text-emerald-200"
                }`}>
                    {toast.type === "error" ? <FiX className="h-5 w-5 text-rose-400" /> : <FiCheckCircle className="h-5 w-5 text-emerald-400" />}
                    <span className="text-[14px] font-medium tracking-wide">{toast.message}</span>
                </div>
            )}

        </main>
    );
}