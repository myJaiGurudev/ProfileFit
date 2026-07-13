import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiUsers, FiSearch, FiCopy, FiChevronDown, FiChevronUp, FiMessageCircle, FiStar } from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";

export default function BehavioralQuestions({ data, collapsed, toggle }) {

    const [search, setSearch] = useState("");

    const [openIndex, setOpenIndex] = useState(null);

    const questions = data.behavioralQuestions || [];

    const filtered = useMemo(() => {

        if (!search.trim()) return questions;

        return questions.filter(question =>
            question.toLowerCase().includes(search.toLowerCase())
        );

    }, [questions, search]);

    const copy = text => {
        navigator.clipboard.writeText(text);
    };

    return (

        <div>

            <SectionHeader
                icon={FiUsers}
                title="Behavioral Interview Questions"
                subtitle={`${questions.length} HR interview questions`}
                collapsed={collapsed}
                toggle={toggle}
                copyText={questions.join("\n\n")}
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
                                placeholder="Search behavioral question..."
                                className="w-full rounded-2xl border border-white/10 bg-white/4 py-4 pl-12 pr-5 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/40"
                            />

                        </div>

                        <div className="space-y-5">

                            {filtered.map((question, index) => {

                                const expanded = openIndex === index;

                                return (

                                    <motion.div
                                        layout
                                        key={index}
                                        className="overflow-hidden rounded-3xl border border-white/10 bg-white/4"
                                    >

                                        <button
                                            onClick={() =>
                                                setOpenIndex(
                                                    expanded ? null : index
                                                )
                                            }
                                            className="flex w-full items-center justify-between p-6 text-left transition-all duration-300 hover:bg-white/3"
                                        >

                                            <div className="flex items-center gap-5">

                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10">

                                                    <span className="font-bold text-violet-300">

                                                        {index + 1}

                                                    </span>

                                                </div>

                                                <div>

                                                    <h3 className="font-bold text-white">

                                                        Behavioral Question {index + 1}

                                                    </h3>

                                                    <div className="mt-2 flex items-center gap-3">

                                                        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">

                                                            STAR Method

                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                            {expanded ?

                                                <FiChevronUp className="text-xl text-slate-300" />

                                                :

                                                <FiChevronDown className="text-xl text-slate-300" />

                                            }

                                        </button>

                                        <AnimatePresence>

                                            {expanded && (

                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0
                                                    }}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0
                                                    }}
                                                    transition={{
                                                        duration: .25
                                                    }}
                                                    className="overflow-hidden"
                                                >

                                                    <div className="border-t border-white/10 p-6">

                                                        <div className="flex items-start gap-4">

                                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">

                                                                <FiMessageCircle className="text-violet-300" />

                                                            </div>

                                                            <p className="leading-8 text-slate-300">

                                                                {question}

                                                            </p>

                                                        </div>

                                                        <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

                                                            <div className="flex items-center gap-3">

                                                                <FiStar className="text-cyan-300" />

                                                                <h4 className="font-bold text-white">

                                                                    AI Interview Tip

                                                                </h4>

                                                            </div>

                                                            <p className="mt-4 leading-7 text-slate-300">

                                                                Answer using the STAR method. Explain the Situation, Task, Action and Result clearly. Keep the answer concise, measurable and focused on your contribution.

                                                            </p>

                                                        </div>

                                                        <div className="mt-6 flex flex-wrap gap-3">

                                                            <button
                                                                onClick={() =>
                                                                    copy(question)
                                                                }
                                                                className="flex items-center gap-2 rounded-xl bg-violet-500/10 px-4 py-3 text-sm font-medium text-violet-300 transition-all duration-300 hover:bg-violet-500/20"
                                                            >

                                                                <FiCopy />

                                                                Copy Question

                                                            </button>

                                                        </div>

                                                    </div>

                                                </motion.div>

                                            )}

                                        </AnimatePresence>

                                    </motion.div>

                                );

                            })}

                        </div>

                        {filtered.length === 0 && (

                            <div className="rounded-3xl border border-dashed border-white/10 py-16 text-center">

                                <p className="text-slate-400">

                                    No matching behavioral questions found.

                                </p>

                            </div>

                        )}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}