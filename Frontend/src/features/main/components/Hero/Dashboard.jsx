import { motion, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FiFileText, FiBriefcase, FiCpu, FiCheckCircle } from "react-icons/fi";
import ScanAnimation from "./ScanAnimation";


export default function Dashboard() {

    const dashboardRef = useRef(null);
    const [atsScore, setAtsScore] = useState(0);
    const [keywords, setKeywords] = useState(0);
    const [tips, setTips] = useState(0);

    const [mousePosition, setMousePosition] = useState({
        x: 50,
        y: 50
    });

    const handleMouseMove = (e) => {

        const rect = dashboardRef.current.getBoundingClientRect();

        setMousePosition({

            x: ((e.clientX - rect.left) / rect.width) * 100,

            y: ((e.clientY - rect.top) / rect.height) * 100

        });

    };

    useEffect(() => {

        const ats = animate(0, 94, {
            duration: 2,
            onUpdate: value => setAtsScore(Math.round(value))
        });

        const key = animate(0, 39, {
            duration: 2.2,
            delay: .3,
            onUpdate: value => setKeywords(Math.round(value))
        });

        const ai = animate(0, 15, {
            duration: 2,
            delay: .6,
            onUpdate: value => setTips(Math.round(value))
        });

        return () => {

            ats.stop();

            key.stop();

            ai.stop();

        };

    }, []);

    return (

        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center"
        >

            <div
                ref={dashboardRef}
                onMouseMove={handleMouseMove}
                className="relative w-full max-w-md sm:max-w-xl lg:max-w-2xl rounded-[26px] sm:rounded-[34px] border border-white/10 bg-white/5 p-4 sm:p-5 md:p-7 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,.35)] overflow-hidden">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">

                    {/* Resume */}

                    <motion.div
                        whileHover={{
                            y: -6,
                            scale: 1.02
                        }}
                        className="min-w-0 rounded-3xl border border-sky-500/20 bg-sky-500/10 p-4 sm:p-5"
                    >

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">

                                <FiFileText className="text-xl sm:text-2xl" />

                            </div>

                            <div>

                                <h3 className="text-sm sm:text-base font-bold text-white wrap-break-word">

                                    Resume

                                </h3>

                                <p className="text-xs sm:text-sm text-slate-400 break-all">

                                    Resume.pdf

                                </p>

                            </div>

                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">

                            {
                                ["React", "Node.js", "MongoDB", "Express"].map(skill => (

                                    <span
                                        key={skill}
                                        className="rounded-full bg-sky-500/15 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-sky-300 whitespace-nowrap"
                                    >
                                        {skill}
                                    </span>

                                ))
                            }

                        </div>

                    </motion.div>

                    {/* Job Description */}

                    <motion.div
                        whileHover={{
                            y: -6,
                            scale: 1.02
                        }}
                        className="min-w-0 rounded-3xl border border-violet-500/20 bg-violet-500/10 p-4 sm:p-5"
                    >

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">

                                <FiBriefcase className="text-xl sm:text-2xl" />

                            </div>

                            <div>

                                <h3 className="text-sm sm:text-base font-bold text-white wrap-break-word">

                                    Job Description

                                </h3>

                                <p className="text-xs sm:text-sm text-slate-400 break-all">

                                    Google • SDE

                                </p>

                            </div>

                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">

                            {
                                ["React", "Docker", "AWS", "REST API"].map(skill => (

                                    <span
                                        key={skill}
                                        className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-300"
                                    >
                                        {skill}
                                    </span>

                                ))
                            }

                        </div>

                    </motion.div>

                </div>

                <div className="relative my-8 flex items-center justify-center">

                    <motion.div

                        animate={{
                            x: ["0%", "40%"]
                        }}

                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}

                        className="absolute left-[18%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_15px_#38bdf8]"

                    />

                    <motion.div

                        animate={{
                            x: ["0%", "-40%"]
                        }}

                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}

                        className="absolute right-[18%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-violet-400 shadow-[0_0_15px_#a855f7]"

                    />

                    <div className="absolute left-[22%] right-[50%] top-1/2 h-px bg-linear-to-r from-sky-500 via-cyan-400 to-transparent" />

                    <div className="absolute left-[50%] right-[22%] top-1/2 h-px bg-linear-to-l from-violet-500 via-fuchsia-400 to-transparent" />

                </div>

                {/* AI Engine */}

                <motion.div
                    animate={{
                        scale: [1, 1.02, 1]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity
                    }}
                    className="mt-6 rounded-3xl border border-cyan-500/20 bg-linear-to-r from-sky-500/10 to-cyan-500/10 p-4 sm:p-6"
                >

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">

                        <motion.div

                            animate={{
                                rotate: [0, 8, -8, 0],
                                scale: [1, 1.08, 1]
                            }}

                            transition={{
                                duration: 3,
                                repeat: Infinity
                            }}

                            className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center shrink-0 rounded-2xl bg-cyan-500/20 text-cyan-400"

                        >

                            <FiCpu className="text-2xl sm:text-3xl" />

                        </motion.div>

                        <div>

                            <h3 className="text-lg sm:text-xl font-bold text-white wrap-break-word">

                                ProfileFit AI Engine

                            </h3>

                            <p className="text-xs sm:text-sm text-slate-400 break-all">

                                Analyzing compatibility, keywords and skill gaps...

                            </p>

                        </div>

                    </div>

                    <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-700">

                        <motion.div
                            animate={{
                                width: ["15%", "82%", "100%"]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity
                            }}
                            className="h-full rounded-full bg-linear-to-r from-sky-400 to-cyan-400"
                        />

                    </div>

                </motion.div>

                <ScanAnimation />

                {/* Results */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 15
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        delay: 0.6
                    }}
                    className="mt-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 sm:p-5"
                >

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <FiCheckCircle className="text-2xl text-emerald-400" />

                            <h3 className="text-sm sm:text-base font-bold text-white wrap-break-word">

                                Analysis Ready

                            </h3>

                        </div>

                        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">

                            LIVE

                        </span>

                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">

                        <div className="min-w-0">

                            <p className="text-3xl font-black text-white">

                                {atsScore}%

                            </p>

                            <p className="mt-1 text-xs text-slate-400">

                                ATS Score

                            </p>

                        </div>

                        <div>

                            <p className="text-3xl font-black text-white">

                                {keywords}/42

                            </p>

                            <p className="mt-1 text-xs text-slate-400">

                                Keywords

                            </p>

                        </div>

                        <div>

                            <p className="text-3xl font-black text-white">

                                +{tips}

                            </p>

                            <p className="mt-1 text-xs text-slate-400">

                                AI Tips

                            </p>

                        </div>

                    </div>

                </motion.div>

            </div>

        </motion.div >

    );

}