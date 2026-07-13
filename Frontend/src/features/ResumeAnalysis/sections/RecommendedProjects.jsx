import { AnimatePresence, motion } from "framer-motion";
import { FiFolder, FiCode, FiClock, FiArrowRight } from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";

export default function RecommendedProjects({ data, collapsed, toggle }) {

    const projects = data.recommendedProjects || [];

    return (

        <div>

            <SectionHeader
                icon={FiFolder}
                title="Recommended Projects"
                subtitle={`${projects.length} AI recommended projects`}
                collapsed={collapsed}
                toggle={toggle}
                copyText={projects.join("\n")}
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

                        <div className="grid gap-5">

                            {projects.map((project, index) => (

                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="rounded-3xl border border-white/10 bg-linear-to-br from-white/5 via-white/3 to-cyan-500/3 p-6 transition-all duration-300 hover:border-cyan-400/30"
                                >

                                    <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

                                        <div className="flex-1">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">

                                                    <FiCode className="text-cyan-300" />

                                                </div>

                                                <div>

                                                    <h3 className="text-xl font-bold text-white">

                                                        Project {index + 1}

                                                    </h3>

                                                    <p className="text-sm text-slate-400">

                                                        Portfolio Recommendation

                                                    </p>

                                                </div>

                                            </div>

                                            <p className="mt-6 leading-8 text-slate-300">

                                                {project}

                                            </p>

                                        </div>

                                        <div className="flex flex-col gap-3">

                                            <div className="rounded-xl bg-cyan-500/10 px-4 py-3">

                                                <div className="flex items-center gap-2">

                                                    <FiClock className="text-cyan-300" />

                                                    <span className="text-sm text-cyan-300">

                                                        2-3 Weeks

                                                    </span>

                                                </div>

                                            </div>

                                            <div className="rounded-xl bg-violet-500/10 px-4 py-3">

                                                <div className="flex items-center gap-2">

                                                    <FiArrowRight className="text-violet-300" />

                                                    <span className="text-sm text-violet-300">

                                                        High Resume Impact

                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </motion.div>

                            ))}

                        </div>

                        {projects.length === 0 && (

                            <div className="rounded-3xl border border-dashed border-white/10 py-16 text-center">

                                <p className="text-slate-400">

                                    No project recommendations available.

                                </p>

                            </div>

                        )}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}