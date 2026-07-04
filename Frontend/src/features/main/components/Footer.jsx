import { motion } from "framer-motion";
import {
    FiMail,
    FiGithub,
    FiLinkedin,
    FiTwitter,
    FiArrowUpRight,
    FiHeart
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {

    return (

        <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,.08),transparent_65%)]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

                <div className="grid grid-cols-1 gap-12 sm:gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">

                    <div>

                        <motion.h2
                            whileHover={{ scale: 1.03 }}
                            className="inline-block bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-3xl sm:text-4xl lg:text-5xl font-black text-transparent leading-none"
                        >

                            ProfileFit

                        </motion.h2>

                        <p className="mt-5 max-w-md text-sm sm:text-base leading-7 text-slate-400">

                            Analyze your resume, improve ATS compatibility, identify missing skills, and receive AI-powered recommendations to maximize your interview success.

                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm sm:text-base text-slate-500">

                            <FiHeart className="text-sky-400" />

                            <span>Made with passion for job seekers.</span>

                        </div>

                    </div>

                    <div>

                        <h3 className="text-base sm:text-lg font-semibold text-white">

                            Quick Links

                        </h3>

                        <div className="mt-5 space-y-3 text-sm sm:text-base">

                            <Link
                                to="/"
                                className="block text-slate-400 transition-colors duration-200 hover:text-sky-400"
                            >
                                Home
                            </Link>

                            <Link
                                to="/analyze-resume"
                                className="block text-slate-400 transition-colors duration-200 hover:text-sky-400"
                            >
                                Analyze Resume
                            </Link>

                            <a
                                href="#workflow"
                                className="block text-slate-400 transition-colors duration-200 hover:text-sky-400"
                            >

                                WorkFlow

                            </a>

                            <a
                                href="#faq"
                                className="block text-slate-400 transition-colors duration-200 hover:text-sky-400"
                            >

                                FAQs

                            </a>

                            <a
                                href="mailto:profilefit.app@gmail.com"
                                className="inline-flex items-center gap-2 text-slate-400 transition-colors duration-200 hover:text-sky-400"
                            >

                                Contact

                                <FiArrowUpRight />

                            </a>

                        </div>

                    </div>

                    <div>

                        <h3 className="text-base sm:text-lg font-semibold text-white">

                            Connect

                        </h3>

                        <p className="mt-4 text-sm sm:text-base text-slate-400">

                            We'd love to hear your feedback.

                        </p>

                        <a
                            href="mailto:profilefit.app@gmail.com"
                            className="mt-6 inline-flex max-w-full items-center gap-3 break-all text-sm sm:text-base text-slate-300 transition-colors duration-200 hover:text-sky-400"
                        >

                            <FiMail />

                            profilefit.app@gmail.com

                        </a>

                        <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">

                            <motion.a
                                whileHover={{
                                    y: -5,
                                    scale: 1.08
                                }}
                                whileTap={{
                                    scale: 0.95
                                }}
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg sm:text-xl shadow-none hover:shadow-[0_20px_40px_rgba(56,189,248,.12)] text-slate-300 transition-all duration-200 hover:border-sky-400 hover:bg-sky-500/10 hover:text-sky-400"
                            >

                                <FiGithub />

                            </motion.a>

                            <motion.a
                                whileHover={{
                                    y: -5,
                                    scale: 1.08
                                }}
                                whileTap={{
                                    scale: 0.95
                                }}
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg sm:text-xl shadow-none hover:shadow-[0_20px_40px_rgba(56,189,248,.12)] text-slate-300 transition-all duration-200 hover:border-sky-400 hover:bg-sky-500/10 hover:text-sky-400"
                            >

                                <FiLinkedin />

                            </motion.a>

                            <motion.a
                                whileHover={{
                                    y: -5,
                                    scale: 1.08
                                }}
                                whileTap={{
                                    scale: 0.95
                                }}
                                href="https://x.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg sm:text-xl shadow-none hover:shadow-[0_20px_40px_rgba(56,189,248,.12)] text-slate-300 transition-all duration-200 hover:border-sky-400 hover:bg-sky-500/10 hover:text-sky-400"
                            >

                                <FiTwitter />

                            </motion.a>

                        </div>

                    </div>

                </div>

                <div className="mt-14 sm:mt-16 lg:mt-20 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:pt-8 text-center md:text-left text-xs sm:text-sm text-slate-500 md:flex-row">

                    <p className="leading-6">

                        © {new Date().getFullYear()} ProfileFit. All rights reserved.

                    </p>

                    <p className="leading-6">

                        Built with ❤️ to help candidates land more interviews.

                    </p>

                </div>

            </div>

        </footer>

    );

};

export default Footer;