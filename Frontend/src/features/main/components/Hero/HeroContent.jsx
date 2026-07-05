import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlayCircle } from "react-icons/fi";
import { HiSparkles, HiShieldCheck, HiMagnifyingGlass, HiLightBulb } from "react-icons/hi2";

const container = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18
        }
    }
};

const item = {
    hidden: {
        opacity: 0,
        y: 30
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export default function HeroContent() {

    return (

        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full max-w-2xl min-w-0 text-center lg:text-left"
        >

            <motion.div
                variants={item}
                className="inline-flex items-center gap-3 rounded-full border border-sky-500/20 bg-sky-500/10 px-5 py-2 backdrop-blur-xl"
            >

                <HiSparkles className="text-sky-400 animate-pulse text-lg" />

                <span className="text-sm font-semibold text-sky-300">

                    AI Powered Resume Intelligence

                </span>

            </motion.div>

            <motion.h1
                variants={item}
                className="mt-8 text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            >

                Land More Interviews

                <span className="mt-2 block bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">

                    With Smarter Resume Optimization

                </span>

            </motion.h1>

            <motion.p
                variants={item}
                className="mt-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
            >

                Upload your resume and a job description.

                ProfileFit compares both using AI, identifies missing skills,
                improves ATS compatibility, optimizes keywords, and generates
                personalized strategies to maximize your interview success.

            </motion.p>

            <motion.div
                variants={item}
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >

                <Link
                    to="/analyze-resume"
                    className="group inline-flex w-full sm:w-64 items-center justify-center rounded-2xl border border-sky-500/40 bg-linear-to-r from-sky-500 via-sky-600 to-blue-700 py-4 font-semibold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:border-sky-300/60 hover:shadow-xl hover:shadow-sky-500/30"
                >

                    <span className="mr-3">

                        Analyze Resume

                    </span>

                    <FiArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1.5" />

                </Link>

                <Link
                    to="/demo"
                    className="group inline-flex w-full sm:w-64 items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-sky-500/50 hover:bg-white/10"
                >

                    <FiPlayCircle className="mr-3 text-xl transition-transform duration-300 group-hover:scale-110" />

                    Watch Demo

                </Link>

            </motion.div>

            <motion.div
                id="features"
                variants={item}
                className="mt-14 grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
            >

                <motion.div
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
                    transition={{
                        duration: 0.5,
                        ease: "easeOut"
                    }}
                    whileHover={{
                        y: -8,
                        scale: 1.02,
                    }}
                    whileTap={{
                        scale: 0.99
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-150 ease-out hover:border-sky-400/50 hover:bg-white/10 hover:shadow-[0_20px_45px_rgba(56,189,248,.18)]"
                >

                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">

                        <motion.div
                            initial={{
                                x: -120,
                                opacity: 0
                            }}
                            whileHover={{
                                x: 600,
                                opacity: 1
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut"
                            }}
                            className="absolute top-0 h-full w-20 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
                        />

                    </div>

                    <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative">

                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-400 transition-transform duration-150 group-hover:scale-110">

                            <HiShieldCheck className="text-3xl" />

                        </div>

                        <h3 className="mt-5 text-lg font-bold text-white">

                            ATS Optimization

                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-300">

                            Beat ATS filters with an optimized resume.

                        </p>

                    </div>

                </motion.div>

                <motion.div
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
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.1
                    }}
                    whileHover={{
                        y: -8,
                        scale: 1.02,
                    }}
                    whileTap={{
                        scale: 0.99
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-[0_20px_45px_rgba(34,211,238,.18)]"
                >

                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">

                        <motion.div
                            initial={{
                                x: -120,
                                opacity: 0
                            }}
                            whileHover={{
                                x: 600,
                                opacity: 1
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut"
                            }}
                            className="absolute top-0 h-full w-20 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
                        />

                    </div>

                    <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative">

                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400 transition-transform duration-200 group-hover:scale-110">

                            <HiMagnifyingGlass className="text-3xl" />

                        </div>

                        <h3 className="mt-5 text-lg font-bold text-white">

                            Skill Gap Analysis

                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-300">

                            Discover missing skills before recruiters do.

                        </p>

                    </div>

                </motion.div>

                <motion.div
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
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.2
                    }}
                    whileHover={{
                        y: -8,
                        scale: 1.02,
                    }}
                    whileTap={{
                        scale: 0.99
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/50 hover:bg-white/10 hover:shadow-[0_20px_45px_rgba(168,85,247,.18)]"
                >

                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">

                        <motion.div
                            initial={{
                                x: -120,
                                opacity: 0
                            }}
                            whileHover={{
                                x: 600,
                                opacity: 1
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut"
                            }}
                            className="absolute top-0 h-full w-20 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
                        />

                    </div>

                    <div className="absolute inset-0 bg-linear-to-br from-violet-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative">

                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400 transition-transform duration-200 group-hover:scale-110">

                            <HiLightBulb className="text-3xl" />

                        </div>

                        <h3 className="mt-5 text-lg font-bold text-white">

                            AI Career Strategy

                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-300">

                            Get a personalized roadmap to land interviews.

                        </p>

                    </div>

                </motion.div>

            </motion.div>

        </motion.div>

    );

}