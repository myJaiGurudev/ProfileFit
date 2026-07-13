import { AnimatePresence, motion } from "framer-motion";
import { FiTrendingUp, FiTarget, FiShield, FiAward } from "react-icons/fi";
import CountUp from "react-countup";
import SectionHeader from "../components/SectionHeader";

export default function HiringProbability({ data, collapsed, toggle }) {

    const probability = data.hiringProbability || 0;

    const confidence = data.confidenceScore || 0;

    const overall = data.overallScore || 0;

    const getStatus = () => {

        if (probability >= 85) {
            return {
                label: "Excellent",
                color: "text-emerald-300",
                bg: "bg-emerald-500/10"
            };
        }

        if (probability >= 70) {
            return {
                label: "Good",
                color: "text-cyan-300",
                bg: "bg-cyan-500/10"
            };
        }

        if (probability >= 50) {
            return {
                label: "Average",
                color: "text-yellow-300",
                bg: "bg-yellow-500/10"
            };
        }

        return {
            label: "Needs Improvement",
            color: "text-red-300",
            bg: "bg-red-500/10"
        };

    };

    const status = getStatus();

    return (

        <div>

            <SectionHeader
                icon={FiTrendingUp}
                title="Hiring Probability"
                subtitle="Overall recruiter hiring confidence"
                collapsed={collapsed}
                toggle={toggle}
                copyText={`Hiring Probability : ${probability}%`}
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

                        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

                            <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6">

                                <div className="relative mx-auto flex h-60 w-60 items-center justify-center rounded-full border-12 border-cyan-500/20">

                                    <motion.div
                                        initial={{
                                            scale: .8,
                                            opacity: 0
                                        }}
                                        animate={{
                                            scale: 1,
                                            opacity: 1
                                        }}
                                        transition={{
                                            duration: .6
                                        }}
                                        className="text-center"
                                    >

                                        <h2 className="text-6xl font-black text-white">

                                            <CountUp
                                                end={probability}
                                                duration={2}
                                            />

                                            <span className="text-cyan-300">

                                                %

                                            </span>

                                        </h2>

                                        <p className="mt-3 text-slate-400">

                                            Hiring Chance

                                        </p>

                                    </motion.div>

                                </div>

                                <div className={`mt-8 rounded-2xl px-5 py-4 text-center ${status.bg}`}>

                                    <p className={`font-bold ${status.color}`}>

                                        {status.label}

                                    </p>

                                </div>

                            </div>

                            <div className="space-y-5">

                                <Metric
                                    icon={FiTarget}
                                    title="Recruiter Confidence"
                                    value={confidence}
                                />

                                <Metric
                                    icon={FiAward}
                                    title="Overall Resume Score"
                                    value={overall}
                                />

                                <Metric
                                    icon={FiShield}
                                    title="Hiring Probability"
                                    value={probability}
                                />

                                <div className="rounded-3xl border border-white/10 bg-white/4 p-6">

                                    <h3 className="text-xl font-bold text-white">

                                        AI Recommendation

                                    </h3>

                                    <p className="mt-5 leading-8 text-slate-300">

                                        Continue improving the highlighted missing skills, optimize your resume using the recommended improvements, and prepare the suggested interview questions. These actions can substantially improve recruiter confidence and increase your hiring probability.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}

function Metric({
    icon: Icon,
    title,
    value
}) {

    return (

        <div className="rounded-3xl border border-white/10 bg-linear-to-br from-white/6 via-white/3 to-white/2 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30">

            <div className="mb-4 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">

                    <Icon className="text-cyan-300" />

                </div>

                <p className="font-semibold text-white">

                    {title}

                </p>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">

                <motion.div
                    initial={{
                        width: 0
                    }}
                    animate={{
                        width: `${value}%`
                    }}
                    transition={{
                        duration: 1.3
                    }}
                    className="h-full rounded-full bg-linear-to-r from-cyan-400 to-blue-500"
                />

            </div>

            <div className="mt-3 text-right">

                <span className="text-lg font-bold text-white">

                    {value}%

                </span>

            </div>

        </div>

    );

}