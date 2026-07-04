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

            <div className="relative mx-auto max-w-7xl px-6 py-20">

                <div className="grid gap-16 md:grid-cols-3">

                    <div>

                        <motion.h2
                            whileHover={{ scale: 1.03 }}
                            className="inline-block bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-4xl font-black text-transparent"
                        >

                            ProfileFit

                        </motion.h2>

                        <p className="mt-6 max-w-md leading-7 text-slate-400">

                            Analyze your resume, improve ATS compatibility, identify missing skills, and receive AI-powered recommendations to maximize your interview success.

                        </p>

                        <div className="mt-8 flex items-center gap-2 text-slate-500">

                            <FiHeart className="text-sky-400" />

                            <span>Made with passion for job seekers.</span>

                        </div>

                    </div>

                    <div>

                        <h3 className="text-lg font-semibold text-white">

                            Quick Links

                        </h3>

                        <div className="mt-6 space-y-4">

                            <Link
                                to="/"
                                className="block text-slate-400 transition-colors duration-200 hover:text-sky-400"
                            >
                                Home
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

                        <h3 className="text-lg font-semibold text-white">

                            Connect

                        </h3>

                        <p className="mt-5 text-slate-400">

                            We'd love to hear your feedback.

                        </p>

                        <a
                            href="mailto:profilefit.app@gmail.com"
                            className="mt-6 inline-flex items-center gap-3 text-slate-300 transition-colors duration-200 hover:text-sky-400"
                        >

                            <FiMail />

                            profilefit.app@gmail.com

                        </a>

                        <div className="mt-10 flex gap-4">

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
                                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-none hover:shadow-[0_20px_40px_rgba(56,189,248,.12)] text-xl text-slate-300 transition-all duration-75 hover:border-sky-400 hover:bg-sky-500/10 hover:text-sky-400"
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
                                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-none hover:shadow-[0_20px_40px_rgba(56,189,248,.12)] text-xl text-slate-300 transition-all duration-75 hover:border-sky-400 hover:bg-sky-500/10 hover:text-sky-400"
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
                                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-none hover:shadow-[0_20px_40px_rgba(56,189,248,.12)] text-xl text-slate-300 transition-all duration-75 hover:border-sky-400 hover:bg-sky-500/10 hover:text-sky-400"
                            >

                                <FiTwitter />

                            </motion.a>

                        </div>

                    </div>

                </div>

                <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row">

                    <p>

                        © {new Date().getFullYear()} ProfileFit. All rights reserved.

                    </p>

                    <p>

                        Built with ❤️ to help candidates land more interviews.

                    </p>

                </div>

            </div>

        </footer>

    );

};

export default Footer;