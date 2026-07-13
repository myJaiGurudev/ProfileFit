import { AnimatePresence, motion } from "framer-motion";
import {
    FiMap,
    FiClock,
    FiCheckCircle
} from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";

export default function PreparationRoadmap({
    data,
    collapsed,
    toggle
}) {

    const roadmap = data.preparationPlan || [];

    const getPriority = index => {

        if (index === 0) {
            return {
                label: "Highest Priority",
                color: "bg-red-500",
                badge: "bg-red-500/10 text-red-300"
            };
        }

        if (index <= 2) {
            return {
                label: "High",
                color: "bg-yellow-400",
                badge: "bg-yellow-500/10 text-yellow-300"
            };
        }

        return {
            label: "Normal",
            color: "bg-cyan-400",
            badge: "bg-cyan-500/10 text-cyan-300"
        };

    };

    return (

        <div>

            <SectionHeader
                icon={FiMap}
                title="Preparation Roadmap"
                subtitle="Recommended interview preparation plan"
                collapsed={collapsed}
                toggle={toggle}
                copyText={roadmap.join("\n")}
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

                        <div className="relative ml-3 border-l border-cyan-500/20">

                            {roadmap.map((step, index) => {

                                const priority = getPriority(index);

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
                                        transition={{
                                            delay: index * .08
                                        }}
                                        className="relative mb-8 pl-10"
                                    >

                                        <div className={`absolute -left-2.25 top-3 h-4 w-4 rounded-full ${priority.color}`} />

                                        <div className="rounded-3xl border border-white/10 bg-white/4 p-6 transition-all duration-300 hover:border-cyan-400/30 hover:-translate-y-1">

                                            <div className="flex flex-wrap items-center justify-between gap-3">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">

                                                        <FiCheckCircle className="text-cyan-300" />

                                                    </div>

                                                    <div>

                                                        <h3 className="font-bold text-white">

                                                            Step {index + 1}

                                                        </h3>

                                                        <p className="text-sm text-slate-400">

                                                            Preparation Task

                                                        </p>

                                                    </div>

                                                </div>

                                                <span className={`rounded-full px-4 py-2 text-xs font-semibold ${priority.badge}`}>

                                                    {priority.label}

                                                </span>

                                            </div>

                                            <p className="mt-6 leading-8 text-slate-300">

                                                {step}

                                            </p>

                                            <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/3 px-4 py-3">

                                                <FiClock className="text-cyan-300" />

                                                <span className="text-sm text-slate-400">

                                                    Estimated Time :

                                                </span>

                                                <span className="font-semibold text-white">

                                                    1-2 Days

                                                </span>

                                            </div>

                                        </div>

                                    </motion.div>

                                );

                            })}

                        </div>

                        {roadmap.length === 0 && (

                            <div className="rounded-3xl border border-dashed border-white/10 py-16 text-center">

                                <p className="text-slate-400">

                                    Preparation roadmap unavailable.

                                </p>

                            </div>

                        )}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}