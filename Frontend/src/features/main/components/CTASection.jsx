import { motion } from "framer-motion";
import { FiArrowRight, FiPlayCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function CTASection() {

    return (

        <section className="relative overflow-hidden py-32">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,.12),transparent_65%)]" />

            <motion.div

                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [.3, .5, .3]
                }}

                transition={{
                    duration: 6,
                    repeat: Infinity
                }}

                className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px]"

            />

            <div className="relative mx-auto max-w-6xl px-6">

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

                    transition={{
                        duration: .8
                    }}

                    className="overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-12 backdrop-blur-3xl"

                >

                    <div className="mx-auto max-w-3xl text-center">

                        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300">

                            READY TO GET STARTED?

                        </span>

                        <h2 className="mt-8 text-5xl font-black leading-tight text-white">

                            Land More Interviews With

                            <span className="block bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">

                                AI-Powered Resume Analysis

                            </span>

                        </h2>

                        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">

                            Upload your resume, compare it with your dream job, improve your ATS score, and receive personalized recommendations—all in minutes.

                        </p>

                    </div>

                    <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

                        <Link

                            to="/analyze-resume"

                            className="group relative inline-flex overflow-hidden rounded-2xl p-[1.5px]"

                        >

                            <span className="absolute inset-0 bg-[linear-gradient(90deg,#38bdf8,#3b82f6,#8b5cf6,#38bdf8)] bg-size-[300%_100%] animate-[gradient_5s_linear_infinite]" />

                            <span className="relative flex items-center gap-3 rounded-2xl bg-slate-950 px-9 py-4 font-semibold text-white">

                                Analyze Resume

                                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />

                            </span>

                        </Link>

                        <Link

                            to="/demo"

                            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10"

                        >

                            <FiPlayCircle className="text-xl transition-transform duration-300 group-hover:scale-110" />

                            Watch Demo

                        </Link>

                    </div>

                    <div className="mt-14 grid gap-6 text-center md:grid-cols-3">

                        <div>

                            <h3 className="text-3xl font-black text-white">

                                50K+

                            </h3>

                            <p className="mt-2 text-slate-400">

                                Resumes Analyzed

                            </p>

                        </div>

                        <div>

                            <h3 className="text-3xl font-black text-white">

                                94%

                            </h3>

                            <p className="mt-2 text-slate-400">

                                Average ATS Score

                            </p>

                        </div>

                        <div>

                            <h3 className="text-3xl font-black text-white">

                                4.9/5

                            </h3>

                            <p className="mt-2 text-slate-400">

                                User Satisfaction

                            </p>

                        </div>

                    </div>

                </motion.div>

            </div>

        </section>

    );

}