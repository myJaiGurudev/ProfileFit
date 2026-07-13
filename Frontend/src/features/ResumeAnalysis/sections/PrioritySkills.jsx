import { AnimatePresence, motion } from "framer-motion";
import { FiZap, FiStar } from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";

export default function PrioritySkills({ data, collapsed, toggle }) {

    const skills = data.prioritySkills || [];

    return (

        <div>

            <SectionHeader
                icon={FiZap}
                title="Priority Skills"
                subtitle="Skills to learn first"
                collapsed={collapsed}
                toggle={toggle}
                copyText={skills.join("\n")}
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

                        <div className="flex flex-wrap gap-4">

                            {skills.map((skill, index) => (

                                <motion.div
                                    key={index}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -4
                                    }}
                                    className="group rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-4 transition-all duration-300 hover:border-cyan-400"
                                >

                                    <div className="flex items-center gap-3">

                                        <FiStar className="text-yellow-300" />

                                        <span className="font-semibold text-white">

                                            {skill}

                                        </span>

                                    </div>

                                </motion.div>

                            ))}

                        </div>

                        {skills.length === 0 && (

                            <div className="rounded-3xl border border-dashed border-white/10 py-16 text-center">

                                <p className="text-slate-400">

                                    No priority skills available.

                                </p>

                            </div>

                        )}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}