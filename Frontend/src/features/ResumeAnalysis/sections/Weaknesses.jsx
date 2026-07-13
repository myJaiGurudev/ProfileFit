import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    FiAlertTriangle,
    FiSearch,
    FiTrendingUp
} from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";

export default function Weaknesses({
    data,
    collapsed,
    toggle
}) {

    const [search, setSearch] = useState("");

    const weaknesses = data.weaknesses || [];

    const filtered = useMemo(() => {

        if (!search.trim()) return weaknesses;

        return weaknesses.filter(item =>
            item.toLowerCase().includes(search.toLowerCase())
        );

    }, [weaknesses, search]);

    const getPriority = (text) => {

        const value = text.toLowerCase();

        if (
            value.includes("missing") ||
            value.includes("lack") ||
            value.includes("required") ||
            value.includes("must")
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
            value.includes("limited")
        ) {
            return {
                label: "Medium",
                color: "text-yellow-300",
                bg: "bg-yellow-500/10 border-yellow-500/20"
            };
        }

        return {
            label: "Low",
            color: "text-orange-300",
            bg: "bg-orange-500/10 border-orange-500/20"
        };

    };

    return (

        <div>

            <SectionHeader
                icon={FiAlertTriangle}
                title="Weaknesses"
                subtitle={`${weaknesses.length} areas needing improvement`}
                collapsed={collapsed}
                toggle={toggle}
                copyText={weaknesses.join("\n")}
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
                                placeholder="Search weaknesses..."
                                className="w-full rounded-2xl border border-white/10 bg-white/4 py-4 pl-12 pr-5 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-orange-400/40"
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
                                            x: -20
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            x: 0
                                        }}
                                        viewport={{
                                            once: true
                                        }}
                                        whileHover={{
                                            x: 6,
                                            scale: 1.01
                                        }}
                                        className={`rounded-3xl border p-6 transition-all duration-300 ${priority.bg}`}
                                    >

                                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">

                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/10">

                                                <FiAlertTriangle className="h-7 w-7 text-red-300" />

                                            </div>

                                            <div className="flex-1">

                                                <div className="flex flex-wrap items-center gap-3">

                                                    <h3 className="text-lg font-bold text-white">

                                                        Issue #{index + 1}

                                                    </h3>

                                                    <span className={`rounded-full border border-white/10 px-3 py-1 text-xs font-semibold ${priority.color}`}>

                                                        {priority.label} Priority

                                                    </span>

                                                </div>

                                                <p className="mt-5 leading-8 text-slate-300">

                                                    {item}

                                                </p>

                                                <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-5">

                                                    <div className="flex items-center gap-3">

                                                        <FiTrendingUp className="text-cyan-300" />

                                                        <p className="font-semibold text-white">

                                                            Suggested Improvement

                                                        </p>

                                                    </div>

                                                    <p className="mt-3 text-slate-400 leading-7">

                                                        Improve this area before your next interview. Strengthening this point can increase recruiter confidence and ATS compatibility.

                                                    </p>

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

                                    No matching weaknesses found.

                                </p>

                            </div>

                        )}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );
}