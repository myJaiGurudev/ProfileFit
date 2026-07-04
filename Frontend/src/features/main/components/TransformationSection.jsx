import { motion } from "framer-motion";

export default function TransformationSection() {

    return (

        <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 30
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}

                    viewport={{
                        once: true
                    }}

                    className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20"

                >

                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 sm:px-5 sm:py-2 sm:text-sm">

                        BEFORE & AFTER

                    </span>

                    <h2 className="mt-6 wrap-break-word text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">

                        Resume

                        <span className="block bg-linear-to-r from-emerald-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">

                            Transformation

                        </span>

                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">

                        Watch how AI transforms an average resume into a recruiter-ready resume.

                    </p>

                </motion.div>

                <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">

                    <motion.div

                        whileHover={{
                            y: -8,
                            scale: 1.02
                        }}

                        className="rounded-2xl sm:rounded-3xl border border-red-500/20 bg-red-500/5 p-5 sm:p-6 lg:p-8 backdrop-blur-2xl"

                    >

                        <span className="rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 sm:px-4 sm:py-2 sm:text-sm">

                            Before

                        </span>

                        <div className="mt-8">

                            <div className="h-2.5 sm:h-3 rounded-full bg-slate-700"></div>

                            <div className="mt-4 h-2.5 sm:h-3 w-5/6 rounded-full bg-slate-700"></div>

                            <div className="mt-4 h-2.5 sm:h-3 w-4/5 rounded-full bg-slate-700"></div>

                            <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">

                                <span className="rounded-full bg-red-500/15 px-3 py-1.5 text-xs text-red-300 sm:px-4 sm:py-2 sm:text-sm">

                                    Missing Docker

                                </span>

                                <span className="rounded-full bg-red-500/15 px-3 py-1.5 text-xs text-red-300 sm:px-4 sm:py-2 sm:text-sm">

                                    Weak Summary

                                </span>

                            </div>

                        </div>

                        <div className="mt-8">

                            <p className="text-3xl font-black text-red-400 sm:text-4xl md:text-5xl">

                                61%

                            </p>

                            <p className="mt-2 text-sm sm:text-base text-slate-400">

                                ATS Score

                            </p>

                        </div>

                    </motion.div>

                    <motion.div

                        whileHover={{
                            y: -8,
                            scale: 1.02
                        }}

                        className="rounded-2xl sm:rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-5 sm:p-6 lg:p-8 backdrop-blur-2xl"

                    >

                        <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:px-4 sm:py-2 sm:text-sm">

                            After AI Optimization

                        </span>

                        <div className="mt-8">

                            <div className="h-2.5 sm:h-3 rounded-full bg-emerald-400" />

                            <div className="mt-4 h-2.5 sm:h-3 w-5/6 rounded-full bg-emerald-400" />

                            <div className="mt-4 h-2.5 sm:h-3 w-4/5 rounded-full bg-emerald-400" />

                            <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">

                                <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs text-emerald-300 sm:px-4 sm:py-2 sm:text-sm">

                                    Docker Added

                                </span>

                                <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs text-emerald-300 sm:px-4 sm:py-2 sm:text-sm">

                                    Better Summary

                                </span>

                                <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs text-emerald-300 sm:px-4 sm:py-2 sm:text-sm">

                                    ATS Optimized

                                </span>

                            </div>

                        </div>

                        <div className="mt-8">

                            <motion.p

                                animate={{
                                    scale: [1, 1.08, 1]
                                }}

                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}

                                className="text-3xl font-black text-emerald-400 sm:text-4xl md:text-5xl"

                            >

                                94%

                            </motion.p>

                            <p className="mt-2 text-sm sm:text-base text-slate-400">

                                ATS Score

                            </p>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>

    );

}