import { motion } from "framer-motion";

export default function TransformationSection() {

    return (

        <section className="relative overflow-hidden py-32">

            <div className="mx-auto max-w-7xl px-6">

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

                    className="mx-auto mb-20 max-w-3xl text-center"

                >

                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-300">

                        BEFORE & AFTER

                    </span>

                    <h2 className="mt-8 text-5xl font-black text-white">

                        Resume

                        <span className="block bg-linear-to-r from-emerald-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">

                            Transformation

                        </span>

                    </h2>

                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">

                        Watch how AI transforms an average resume into a recruiter-ready resume.

                    </p>

                </motion.div>

                <div className="grid gap-8 lg:grid-cols-2">

                    <motion.div

                        whileHover={{
                            y: -8,
                            scale: 1.02
                        }}

                        className="rounded-[30px] border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-2xl"

                    >

                        <span className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">

                            Before

                        </span>

                        <div className="mt-8">

                            <div className="h-3 rounded-full bg-slate-700"></div>

                            <div className="mt-4 h-3 w-5/6 rounded-full bg-slate-700"></div>

                            <div className="mt-4 h-3 w-4/5 rounded-full bg-slate-700"></div>

                            <div className="mt-10 flex flex-wrap gap-3">

                                <span className="rounded-full bg-red-500/15 px-4 py-2 text-sm text-red-300">

                                    Missing Docker

                                </span>

                                <span className="rounded-full bg-red-500/15 px-4 py-2 text-sm text-red-300">

                                    Weak Summary

                                </span>

                            </div>

                        </div>

                        <div className="mt-10">

                            <p className="text-5xl font-black text-red-400">

                                61%

                            </p>

                            <p className="mt-2 text-slate-400">

                                ATS Score

                            </p>

                        </div>

                    </motion.div>

                    <motion.div

                        whileHover={{
                            y: -8,
                            scale: 1.02
                        }}

                        className="rounded-[30px] border border-emerald-500/20 bg-emerald-500/5 p-8 backdrop-blur-2xl"

                    >

                        <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">

                            After AI Optimization

                        </span>

                        <div className="mt-8">

                            <div className="h-3 rounded-full bg-emerald-400"></div>

                            <div className="mt-4 h-3 w-5/6 rounded-full bg-emerald-400"></div>

                            <div className="mt-4 h-3 w-4/5 rounded-full bg-emerald-400"></div>

                            <div className="mt-10 flex flex-wrap gap-3">

                                <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-300">

                                    Docker Added

                                </span>

                                <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-300">

                                    Better Summary

                                </span>

                                <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-300">

                                    ATS Optimized

                                </span>

                            </div>

                        </div>

                        <div className="mt-10">

                            <motion.p

                                animate={{
                                    scale: [1, 1.08, 1]
                                }}

                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}

                                className="text-5xl font-black text-emerald-400"

                            >

                                94%

                            </motion.p>

                            <p className="mt-2 text-slate-400">

                                ATS Score

                            </p>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>

    );

}