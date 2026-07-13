import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    FiAward,
    FiCheckCircle,
    FiSearch
} from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";

export default function Strengths({
    data,
    collapsed,
    toggle
}) {

    const [search, setSearch] = useState("");

    const strengths = data.strengths || [];

    const filtered = useMemo(() => {

        if (!search.trim()) return strengths;

        return strengths.filter(item =>
            item.toLowerCase().includes(search.toLowerCase())
        );

    }, [strengths, search]);

    return (

        <div>

            <SectionHeader
                icon={FiAward}
                title="Key Strengths"
                subtitle={`${strengths.length} strengths identified by AI`}
                collapsed={collapsed}
                toggle={toggle}
                copyText={strengths.join("\n")}
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
                                placeholder="Search strengths..."
                                className="w-full rounded-2xl border border-white/10 bg-white/4 py-4 pl-12 pr-5 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/40"
                            />

                        </div>

                        <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-2">

                            {filtered.map((item, index) => (

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
                                    className="group rounded-3xl border border-white/10 bg-white/4 p-6 transition-all duration-300 hover:border-cyan-400/30"
                                >

                                    <div className="flex items-start gap-5">

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10">

                                            <span className="font-bold text-emerald-300">

                                                {index + 1}

                                            </span>

                                        </div>

                                        <div className="flex-1">

                                            <div className="mb-4 flex items-center justify-between">

                                                <div className="flex items-center gap-2">

                                                    <FiCheckCircle className="text-emerald-400" />

                                                    <p className="font-semibold text-white">

                                                        Strength

                                                    </p>

                                                </div>

                                                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">

                                                    Verified

                                                </span>

                                            </div>

                                            <p className="leading-8 text-slate-300">

                                                {item}

                                            </p>

                                        </div>

                                    </div>

                                </motion.div>

                            ))}

                        </div>

                        {filtered.length === 0 && (

                            <div className="rounded-3xl border border-dashed border-white/10 py-14 text-center">

                                <p className="text-slate-400">

                                    No matching strengths found.

                                </p>

                            </div>

                        )}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}