import { AnimatePresence, motion } from "framer-motion";
import { FiMessageSquare, FiTrendingUp, FiMinusCircle, FiAlertCircle } from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";

export default function OverallFeedback({ data, collapsed, toggle }) {

    const feedback = data.overallFeedback || "";

    const lower = feedback.toLowerCase();

    let sentiment = "Neutral";
    let Icon = FiMinusCircle;
    let color = "text-yellow-300";
    let bg = "bg-yellow-400/10 border-yellow-400/20";

    if (
        lower.includes("excellent") ||
        lower.includes("strong") ||
        lower.includes("outstanding") ||
        lower.includes("impressive") ||
        lower.includes("great")
    ) {
        sentiment = "Positive";
        Icon = FiTrendingUp;
        color = "text-emerald-300";
        bg = "bg-emerald-400/10 border-emerald-400/20";
    }

    if (
        lower.includes("poor") ||
        lower.includes("weak") ||
        lower.includes("lacking") ||
        lower.includes("insufficient")
    ) {
        sentiment = "Needs Improvement";
        Icon = FiAlertCircle;
        color = "text-red-300";
        bg = "bg-red-400/10 border-red-400/20";
    }

    return (

        <div>

            <SectionHeader
                icon={FiMessageSquare}
                title="Overall Feedback"
                subtitle="Complete AI evaluation of your profile"
                collapsed={collapsed}
                toggle={toggle}
                copyText={feedback}
            />

            <AnimatePresence>

                {!collapsed && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto"
                        }}
                        exit={{
                            opacity: 0,
                            height: 0
                        }}
                        transition={{
                            duration: .35
                        }}
                        className="overflow-hidden"
                    >

                        <div className={`rounded-3xl border p-6 ${bg}`}>

                            <div className="flex flex-wrap items-center justify-between gap-4">

                                <div>

                                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400">

                                        Executive Review

                                    </p>

                                    <h3 className="mt-2 text-2xl font-bold text-white">

                                        Overall Resume Assessment

                                    </h3>

                                </div>

                                <div className={`flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-3 ${bg}`}>

                                    <Icon className={`h-6 w-6 ${color}`} />

                                    <span className={`font-semibold ${color}`}>

                                        {sentiment}

                                    </span>

                                </div>

                            </div>

                            <div className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-6">

                                <div className="mb-5 border-l-4 border-cyan-400 pl-5">

                                    <p className="text-lg font-semibold text-white">

                                        AI Executive Summary

                                    </p>

                                    <p className="mt-2 text-sm text-slate-400">

                                        Overall recruiter perspective after evaluating your resume.

                                    </p>

                                </div>

                                <p className="whitespace-pre-line text-[16px] leading-8 text-slate-300">

                                    {feedback}

                                </p>

                            </div>

                            <div className="mt-8 grid gap-4 md:grid-cols-3">

                                <InfoCard
                                    title="Words"
                                    value={feedback.split(/\s+/).filter(Boolean).length}
                                />

                                <InfoCard
                                    title="Characters"
                                    value={feedback.length}
                                />

                                <InfoCard
                                    title="Sentiment"
                                    value={sentiment}
                                />

                            </div>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}

function InfoCard({
    title,
    value
}) {

    return (

        <div className="rounded-2xl border border-white/10 bg-white/4 p-5 transition-all duration-300 hover:border-cyan-400/30 hover:-translate-y-1">

            <p className="text-sm text-slate-400">

                {title}

            </p>

            <h3 className="mt-3 wrap-break-word text-2xl font-bold text-white">

                {value}

            </h3>

        </div>

    );

}