import { AnimatePresence, motion } from "framer-motion";
import { FiActivity, FiCheckCircle, FiTarget } from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";

export default function ATSSection({ data, collapsed, toggle }) {

    const metrics = [
        {
            title: "Overall Score",
            value: data.overallScore,
            color: "from-cyan-500 to-sky-400"
        },
        {
            title: "ATS Score",
            value: data.atsScore,
            color: "from-emerald-500 to-green-400"
        },
        {
            title: "Keyword Match",
            value: data.matchScore,
            color: "from-violet-500 to-fuchsia-500"
        }
    ];

    const getProgressColor = (value) => {

        if (value >= 85) return "bg-emerald-400";

        if (value >= 70) return "bg-cyan-400";

        if (value >= 50) return "bg-yellow-400";

        return "bg-red-400";

    };

    return (

        <div>

            <SectionHeader
                icon={FiActivity}
                title="ATS Analysis"
                subtitle="AI evaluation of resume compatibility"
                collapsed={collapsed}
                toggle={toggle}
                copyText={`Overall Score : ${data.overallScore}
                ATS Score : ${data.atsScore}
                Keyword Match : ${data.matchScore}`}
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

                        <div className="grid gap-5 md:grid-cols-3">

                            {metrics.map(metric => (

                                <div
                                    key={metric.title}
                                    className="rounded-3xl border border-white/10 bg-white/4 p-6 transition-all duration-300 hover:border-cyan-400/30 hover:-translate-y-1"
                                >

                                    <div className="flex items-center justify-between">

                                        <p className="text-sm font-medium text-slate-400">

                                            {metric.title}

                                        </p>

                                        <FiTarget className="text-cyan-300" />

                                    </div>

                                    <h3 className="mt-5 text-5xl font-black text-white">

                                        {metric.value}

                                        <span className="text-cyan-300 text-2xl">

                                            %

                                        </span>

                                    </h3>

                                    <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">

                                        <motion.div
                                            initial={{
                                                width: 0
                                            }}
                                            animate={{
                                                width: `${metric.value}%`
                                            }}
                                            transition={{
                                                duration: 1
                                            }}
                                            className={`h-full rounded-full bg-linear-to-r ${metric.color}`}
                                        />

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div className="mt-8 rounded-3xl border border-white/10 bg-white/3 p-6">

                            <div className="mb-6 flex items-center gap-3">

                                <FiCheckCircle className="text-emerald-400" />

                                <h3 className="text-xl font-bold text-white">

                                    Performance Breakdown

                                </h3>

                            </div>

                            <div className="space-y-6">

                                {metrics.map(metric => (

                                    <div key={metric.title}>

                                        <div className="mb-2 flex items-center justify-between">

                                            <span className="text-slate-300">

                                                {metric.title}

                                            </span>

                                            <span className="font-bold text-white">

                                                {metric.value}%

                                            </span>

                                        </div>

                                        <div className="h-3 overflow-hidden rounded-full bg-white/10">

                                            <motion.div
                                                initial={{
                                                    width: 0
                                                }}
                                                animate={{
                                                    width: `${metric.value}%`
                                                }}
                                                transition={{
                                                    duration: 1.2
                                                }}
                                                className={`h-full ${getProgressColor(metric.value)}`}
                                            />

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}