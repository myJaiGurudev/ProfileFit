import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    FiSearch,
    FiCheckCircle,
    FiXCircle,
    FiTag
} from "react-icons/fi";
import CountUp from "react-countup";
import SectionHeader from "../components/SectionHeader";

export default function KeywordAnalysis({
    data,
    collapsed,
    toggle
}) {

    const [search, setSearch] = useState("");

    const matched = data.matchedKeywords || [];

    const missing = data.missingKeywords || [];

    const filteredMatched = useMemo(() => {

        if (!search.trim()) return matched;

        return matched.filter(item =>
            item.toLowerCase().includes(search.toLowerCase())
        );

    }, [matched, search]);

    const filteredMissing = useMemo(() => {

        if (!search.trim()) return missing;

        return missing.filter(item =>
            item.toLowerCase().includes(search.toLowerCase())
        );

    }, [missing, search]);

    const total = matched.length + missing.length;

    const percentage = total === 0 ? 0 : Math.round((matched.length / total) * 100);

    return (

        <div>

            <SectionHeader
                icon={FiTag}
                title="Keyword Analysis"
                subtitle="ATS keyword matching analysis"
                collapsed={collapsed}
                toggle={toggle}
                copyText={[
                    "Matched Keywords",
                    ...matched,
                    "",
                    "Missing Keywords",
                    ...missing
                ].join("\n")}
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

                        <div className="mb-8 grid gap-6 lg:grid-cols-[260px_1fr]">

                            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-6">

                                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">

                                    Keyword Match

                                </p>

                                <div className="mt-6 flex items-end gap-2">

                                    <h2 className="text-6xl font-black text-white">

                                        <CountUp
                                            end={percentage}
                                            duration={2}
                                        />

                                    </h2>

                                    <span className="pb-2 text-2xl text-cyan-300">

                                        %

                                    </span>

                                </div>

                                <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">

                                    <motion.div
                                        initial={{
                                            width: 0
                                        }}
                                        animate={{
                                            width: `${percentage}%`
                                        }}
                                        transition={{
                                            duration: 1.5
                                        }}
                                        className="h-full rounded-full bg-linear-to-r from-cyan-400 to-emerald-400"
                                    />

                                </div>

                                <div className="mt-8 space-y-3">

                                    <Stat
                                        label="Matched"
                                        value={matched.length}
                                        color="text-emerald-300"
                                    />

                                    <Stat
                                        label="Missing"
                                        value={missing.length}
                                        color="text-red-300"
                                    />

                                    <Total
                                        value={total}
                                    />

                                </div>

                            </div>

                            <div>

                                <div className="relative mb-8">

                                    <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />

                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search keyword..."
                                        className="w-full rounded-2xl border border-white/10 bg-white/4 py-4 pl-12 pr-5 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/40"
                                    />

                                </div>

                                <div className="grid gap-6 lg:grid-cols-2">

                                    <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">

                                        <div className="mb-6 flex items-center gap-3">

                                            <FiCheckCircle className="text-emerald-400" />

                                            <h3 className="text-xl font-bold text-white">

                                                Matched Keywords

                                            </h3>

                                        </div>

                                        <div className="flex flex-wrap gap-3">

                                            {filteredMatched.length === 0 && (

                                                <p className="text-slate-400">

                                                    No keywords found.

                                                </p>

                                            )}

                                            {filteredMatched.map((item, index) => (

                                                <motion.span
                                                    key={index}
                                                    whileHover={{
                                                        scale: 1.05
                                                    }}
                                                    className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300"
                                                >

                                                    {item}

                                                </motion.span>

                                            ))}

                                        </div>

                                    </div>

                                    <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">

                                        <div className="mb-6 flex items-center gap-3">

                                            <FiXCircle className="text-red-400" />

                                            <h3 className="text-xl font-bold text-white">

                                                Missing Keywords

                                            </h3>

                                        </div>

                                        <div className="flex flex-wrap gap-3">

                                            {filteredMissing.length === 0 && (

                                                <p className="text-slate-400">

                                                    No missing keywords.

                                                </p>

                                            )}

                                            {filteredMissing.map((item, index) => (

                                                <motion.span
                                                    key={index}
                                                    whileHover={{
                                                        scale: 1.05
                                                    }}
                                                    className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300"
                                                >

                                                    {item}

                                                </motion.span>

                                            ))}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}

function Stat({
    label,
    value,
    color
}) {

    return (

        <div className="flex items-center justify-between">

            <span className="text-slate-300">

                {label}

            </span>

            <span className={`font-bold ${color}`}>

                {value}

            </span>

        </div>

    );

}

function Total({
    value
}) {

    return (

        <div className="mt-4 rounded-xl border border-white/10 bg-white/4 p-4">

            <div className="flex items-center justify-between">

                <span className="text-slate-300">

                    Total Keywords

                </span>

                <span className="text-xl font-bold text-white">

                    {value}

                </span>

            </div>

        </div>

    );

}