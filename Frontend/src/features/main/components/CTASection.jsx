import { motion } from "framer-motion";
import { FiArrowRight, FiPlayCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function CTASection() {

    return (

        <section id="cta" className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32">

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

                className="absolute left-1/2 top-1/2 h-64 w-64 sm:h-80 sm:w-80 md:h-112 md:w-md lg:h-128 lg:w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[80px] sm:blur-[100px] lg:blur-[120px]"

            />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

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

                    className="overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10 lg:p-12 backdrop-blur-3xl"

                >

                    <div className="mx-auto max-w-3xl text-center">

                        <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-cyan-300">

                            READY TO GET STARTED?

                        </span>

                        <h2 className="mt-6 sm:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight wrap-break-word text-white">

                            Land More Interviews With

                            <span className="block bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">

                                AI-Powered Resume Analysis

                            </span>

                        </h2>

                        <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-slate-400">

                            Upload your resume, compare it with your dream job, improve your ATS score, and receive personalized recommendations—all in minutes.

                        </p>

                    </div>

                    <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">

                        <motion.div
                            className="w-full sm:w-64"
                            whileHover={{
                                y: -3,
                                scale: 1.02
                            }}
                            whileTap={{
                                y: 2,
                                scale: 0.985
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 450,
                                damping: 20
                            }}
                        >

                            <Link
                                to="/analyze-resume"
                                className="group relative flex w-full"
                            >

                                <span className="absolute inset-0 w-full rounded-2xl bg-sky-800 translate-y-1.25 transition-all duration-200 group-hover:translate-y-1.5 group-active:translate-y-0.5" />

                                <span className="relative flex flex-1 items-center justify-center gap-3 rounded-2xl border border-sky-400/20 bg-linear-to-b from-sky-500 via-sky-600 to-blue-700 px-8 py-4 text-sm sm:text-base font-semibold text-white transition-all duration-200 group-hover:-translate-y-px group-active:translate-y-0.75">

                                    <span className="relative z-10">

                                        Analyze Resume

                                    </span>

                                    <FiArrowRight className="relative z-10 transition-all duration-300 group-hover:translate-x-1.5" />

                                </span>

                            </Link>

                        </motion.div>

                        <Link

                            to="/demo"

                            className="group flex w-full sm:w-auto justify-center items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10"

                        >

                            <FiPlayCircle className="text-xl transition-transform duration-300 group-hover:scale-110" />

                            Watch Demo

                        </Link>

                    </div>

                    <div className="mt-10 sm:mt-12 lg:mt-14 flex items-center justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-center">

                        <div className="flex-1 min-w-0">

                            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-none wrap-break-word">

                                50K+

                            </h3>

                            <p className="mt-2 text-[11px] sm:text-sm md:text-base text-slate-400 leading-snug wrap-break-word">

                                Resumes Analyzed

                            </p>

                        </div>

                        <div className="flex-1 min-w-0">

                            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-none wrap-break-word">

                                94%

                            </h3>

                            <p className="mt-2 text-[11px] sm:text-sm md:text-base text-slate-400 leading-snug wrap-break-word">

                                Average ATS Score

                            </p>

                        </div>

                        <div className="flex-1 min-w-0">

                            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-none wrap-break-word">

                                4.9/5

                            </h3>

                            <p className="mt-2 text-[11px] sm:text-sm md:text-base text-slate-400 leading-snug wrap-break-word">

                                User Satisfaction

                            </p>

                        </div>

                    </div>

                </motion.div>

            </div>

        </section>

    );

}