import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiClipboard, FiSearch, FiArrowUpCircle, FiCheckCircle } from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";

export default function ResumeImprovements({ data, collapsed, toggle }) {

    const [search, setSearch] = useState("");

    const improvements = data.resumeImprovements || [];

    const filtered = useMemo(() => {

        if (!search.trim()) return improvements;

        return improvements.filter(item =>
            item.toLowerCase().includes(search.toLowerCase())
        );

    }, [improvements, search]);

    const getPriority = (text) => {

        const value = text.toLowerCase();

        if (
            value.includes("must") ||
            value.includes("required") ||
            value.includes("missing") ||
            value.includes("critical")
        ) {
            return {
                label: "High",
                color: "text-red-300",
                bg: "bg-red-500/10 border-red-500/20"
            };
        }

        if (
            value.includes("improve") ||
            value.includes("better") ||
            value.includes("optimize") ||
            value.includes("enhance")
        ) {
            return {
                label: "Medium",
                color: "text-yellow-300",
                bg: "bg-yellow-500/10 border-yellow-500/20"
            };
        }

        return {
            label: "Low",
            color: "text-emerald-300",
            bg: "bg-emerald-500/10 border-emerald-500/20"
        };

    };

    return (

        <div>

            <SectionHeader
                icon={FiClipboard}
                title="Resume Improvements"
                subtitle={`${improvements.length} AI recommendations`}
                collapsed={collapsed}
                toggle={toggle}
                copyText={improvements.join("\n")}
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

                        <div className="relative mb-8">

                            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search improvement..."
                                className="w-full rounded-2xl border border-white/10 bg-white/4 py-4 pl-12 pr-5 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/40"
                            />

                        </div>

                        <div className="space-y-5">

                            {filtered.map((item, index) => {

                                const priority = getPriority(item);

                                return (

                                    <motion.div
                                        key={index}
                                        initial={{
                                            opacity: 0,
                                            y: 20
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        viewport={{
                                            once: true
                                        }}
                                        whileHover={{
                                            y: -5
                                        }}
                                        className={`rounded-3xl border p-6 transition-all duration-300 ${priority.bg}`}
                                    >

                                        <div className="flex flex-col gap-5 lg:flex-row">

                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10">

                                                <span className="text-xl font-bold text-cyan-300">

                                                    {index + 1}

                                                </span>

                                            </div>

                                            <div className="flex-1">

                                                <div className="flex flex-wrap items-center gap-3">

                                                    <h3 className="text-lg font-bold text-white">

                                                        Recommendation #{index + 1}

                                                    </h3>

                                                    <span className={`rounded-full border border-white/10 px-3 py-1 text-xs font-semibold ${priority.color}`}>

                                                        {priority.label} Priority

                                                    </span>

                                                </div>

                                                <p className="mt-5 leading-8 text-slate-300">

                                                    {item}

                                                </p>

                                                <div className="mt-6 flex flex-wrap gap-3">

                                                    <div className="flex items-center gap-2 rounded-xl bg-cyan-500/10 px-4 py-2">

                                                        <FiArrowUpCircle className="text-cyan-300" />

                                                        <span className="text-sm text-cyan-300">

                                                            Can improve ATS score

                                                        </span>

                                                    </div>

                                                    <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2">

                                                        <FiCheckCircle className="text-emerald-300" />

                                                        <span className="text-sm text-emerald-300">

                                                            Recruiter Recommended

                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </motion.div>

                                );

                            })}

                        </div>

                        {filtered.length === 0 && (

                            <div className="rounded-3xl border border-dashed border-white/10 py-14 text-center">

                                <p className="text-slate-400">

                                    No improvements found.

                                </p>

                            </div>

                        )}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}