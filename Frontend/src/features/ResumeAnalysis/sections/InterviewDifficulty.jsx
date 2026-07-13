import { AnimatePresence, motion } from "framer-motion";
import { FiBarChart2, FiAward } from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";

export default function InterviewDifficulty({ data, collapsed, toggle }) {

    const difficulty = data.interviewDifficulty || "Medium";

    const config = {

        Easy: {
            progress: 35,
            color: "from-emerald-400 to-green-500",
            bg: "bg-emerald-500/10",
            text: "text-emerald-300"
        },

        Medium: {
            progress: 65,
            color: "from-yellow-400 to-orange-500",
            bg: "bg-yellow-500/10",
            text: "text-yellow-300"
        },

        Hard: {
            progress: 92,
            color: "from-red-500 to-pink-500",
            bg: "bg-red-500/10",
            text: "text-red-300"
        }

    };

    const current = config[difficulty] || config.Medium;

    return (

        <div>

            <SectionHeader
                icon={FiBarChart2}
                title="Interview Difficulty"
                subtitle="Expected interview level"
                collapsed={collapsed}
                toggle={toggle}
                copyText={difficulty}
            />

            <AnimatePresence>

                {!collapsed && (

                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: .35 }}
                        className="overflow-hidden"
                    >

                        <div className={`rounded-3xl border border-white/10 p-6 ${current.bg}`}>

                            <div className="flex items-center gap-4">

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">

                                    <FiAward className={`h-8 w-8 ${current.text}`} />

                                </div>

                                <div>

                                    <h2 className={`text-3xl font-black ${current.text}`}>

                                        {difficulty}

                                    </h2>

                                    <p className="mt-2 text-slate-400">

                                        AI estimated interview difficulty

                                    </p>

                                </div>

                            </div>

                            <div className="mt-8">

                                <div className="mb-3 flex items-center justify-between">

                                    <span className="text-slate-300">

                                        Difficulty Meter

                                    </span>

                                    <span className="font-bold text-white">

                                        {current.progress}%

                                    </span>

                                </div>

                                <div className="h-4 overflow-hidden rounded-full bg-white/10">

                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${current.progress}%` }}
                                        transition={{ duration: 1.2 }}
                                        className={`h-full rounded-full bg-linear-to-r ${current.color}`}
                                    />

                                </div>

                            </div>

                            <div className="mt-8 rounded-2xl border border-white/10 bg-white/4 p-5">

                                <p className="leading-8 text-slate-300">

                                    Prepare according to this estimated difficulty level. Focus on DSA, system design, core subjects, projects, and behavioral interviews to maximize your chances.

                                </p>

                            </div>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}