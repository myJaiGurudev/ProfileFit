import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCode, FiSearch, FiCopy, FiChevronDown, FiChevronUp } from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";

export default function TechnicalQuestions({ data, collapsed, toggle }) {

    const [search, setSearch] = useState("");

    const [openIndex, setOpenIndex] = useState(null);

    const questions = data.technicalQuestions || [];

    const filtered = useMemo(() => {

        if (!search.trim()) return questions;

        return questions.filter(question =>
            question.toLowerCase().includes(search.toLowerCase())
        );

    }, [questions, search]);

    const copyQuestion = text => {

        navigator.clipboard.writeText(text);

    };

    const getDifficulty = index => {

        if (index < 2) {
            return {
                label: "Easy",
                bg: "bg-emerald-500/10",
                text: "text-emerald-300"
            };
        }

        if (index < 5) {
            return {
                label: "Medium",
                bg: "bg-yellow-500/10",
                text: "text-yellow-300"
            };
        }

        return {
            label: "Hard",
            bg: "bg-red-500/10",
            text: "text-red-300"
        };

    };

    return (

        <div>

            <SectionHeader
                icon={FiCode}
                title="Technical Interview Questions"
                subtitle={`${questions.length} AI generated technical questions`}
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
                                placeholder="Search question..."
                                className="w-full rounded-2xl border border-white/10 bg-white/4 py-4 pl-12 pr-5 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/40"
                            />

                        </div>

                        <div className="space-y-5">

                            {filtered.map((question, index) => {

                                const difficulty = getDifficulty(index);

                                const expanded = openIndex === index;

                                return (

                                    <motion.div
                                        key={index}
                                        layout
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

                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">

                                                    <span className="font-bold text-cyan-300">

                                                        {index + 1}

                                                    </span>

                                                </div>

                                                <div>

                                                    <h3 className="font-bold text-white">

                                                        Question {index + 1}

                                                    </h3>

                                                    <div className="mt-2 flex items-center gap-3">

                                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${difficulty.bg} ${difficulty.text}`}>

                                                            {difficulty.label}

                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                            <div>

                                                {expanded ?

                                                    <FiChevronUp className="text-xl text-slate-300" />

                                                    :

                                                    <FiChevronDown className="text-xl text-slate-300" />

                                                }

                                            </div>

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

                                                    <div className="border-t border-white/10 px-6 pb-6 pt-5">

                                                        <p className="leading-8 text-slate-300">

                                                            {question}

                                                        </p>

                                                        <div className="mt-6 flex flex-wrap gap-3">

                                                            <button
                                                                onClick={() =>
                                                                    copyQuestion(question)
                                                                }
                                                                className="flex items-center gap-2 rounded-xl bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-300 transition-all duration-300 hover:bg-cyan-500/20"
                                                            >

                                                                <FiCopy />

                                                                Copy

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

                                    No matching questions found.

                                </p>

                            </div>

                        )}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );
}