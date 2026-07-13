import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBookOpen, FiSearch, FiTrendingUp, FiTarget } from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";

export default function SkillGap({ data, collapsed, toggle }) {

    const [search, setSearch] = useState("");

    const skillGaps = data.skillGaps || [];

    const filtered = useMemo(() => {

        if (!search.trim()) return skillGaps;

        return skillGaps.filter(skill =>
            skill.toLowerCase().includes(search.toLowerCase())
        );

    }, [skillGaps, search]);

    const getPriority = (text) => {

        const value = text.toLowerCase();

        if (
            value.includes("required") ||
            value.includes("must") ||
            value.includes("critical") ||
            value.includes("mandatory")
        ) {
            return {
                label: "High",
                progress: 95,
                color: "from-red-500 to-red-400",
                badge: "bg-red-500/10 text-red-300"
            };
        }

        if (
            value.includes("experience") ||
            value.includes("improve") ||
            value.includes("knowledge") ||
            value.includes("understanding")
        ) {
            return {
                label: "Medium",
                progress: 70,
                color: "from-yellow-500 to-orange-400",
                badge: "bg-yellow-500/10 text-yellow-300"
            };
        }

        return {
            label: "Low",
            progress: 45,
            color: "from-cyan-500 to-blue-400",
            badge: "bg-cyan-500/10 text-cyan-300"
        };

    };

    return (

        <div>

            <SectionHeader
                icon={FiBookOpen}
                title="Skill Gap Analysis"
                subtitle={`${skillGaps.length} skills requiring improvement`}
                collapsed={collapsed}
                toggle={toggle}
                copyText={skillGaps.join("\n")}
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
                                placeholder="Search skills..."
                                className="w-full rounded-2xl border border-white/10 bg-white/4 py-4 pl-12 pr-5 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/40"
                            />

                        </div>

                        <div className="space-y-6">

                            {filtered.map((skill, index) => {

                                const priority = getPriority(skill);

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
                                            y: -4
                                        }}
                                        className="rounded-3xl border border-white/10 bg-white/4 p-6 transition-all duration-300 hover:border-cyan-400/30"
                                    >

                                        <div className="flex flex-col gap-6">

                                            <div className="flex flex-wrap items-center justify-between gap-4">

                                                <div>

                                                    <h3 className="text-xl font-bold text-white">

                                                        {skill}

                                                    </h3>

                                                    <p className="mt-2 text-sm text-slate-400">

                                                        Recommended learning priority

                                                    </p>

                                                </div>

                                                <span className={`rounded-full px-4 py-2 text-sm font-semibold ${priority.badge}`}>

                                                    {priority.label} Priority

                                                </span>

                                            </div>

                                            <div>

                                                <div className="mb-3 flex items-center justify-between">

                                                    <span className="text-sm text-slate-300">

                                                        Improvement Priority

                                                    </span>

                                                    <span className="font-bold text-white">

                                                        {priority.progress}%

                                                    </span>

                                                </div>

                                                <div className="h-3 overflow-hidden rounded-full bg-white/10">

                                                    <motion.div
                                                        initial={{
                                                            width: 0
                                                        }}
                                                        animate={{
                                                            width: `${priority.progress}%`
                                                        }}
                                                        transition={{
                                                            duration: 1.2
                                                        }}
                                                        className={`h-full rounded-full bg-linear-to-r ${priority.color}`}
                                                    />

                                                </div>

                                            </div>

                                            <div className="grid gap-4 md:grid-cols-2">

                                                <div className="rounded-2xl border border-white/10 bg-white/3 p-5">

                                                    <div className="flex items-center gap-3">

                                                        <FiTarget className="text-cyan-300" />

                                                        <p className="font-semibold text-white">

                                                            Interview Impact

                                                        </p>

                                                    </div>

                                                    <p className="mt-3 leading-7 text-slate-400">

                                                        Learning this skill can significantly improve interview performance and increase recruiter confidence.

                                                    </p>

                                                </div>

                                                <div className="rounded-2xl border border-white/10 bg-white/3 p-5">

                                                    <div className="flex items-center gap-3">

                                                        <FiTrendingUp className="text-emerald-300" />

                                                        <p className="font-semibold text-white">

                                                            Learning Recommendation

                                                        </p>

                                                    </div>

                                                    <p className="mt-3 leading-7 text-slate-400">

                                                        Practice projects, revise concepts thoroughly and solve interview-level problems before applying.

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </motion.div>

                                );

                            })}

                        </div>

                        {filtered.length === 0 && (

                            <div className="rounded-3xl border border-dashed border-white/10 py-16 text-center">

                                <p className="text-slate-400">

                                    No matching skills found.

                                </p>

                            </div>

                        )}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}