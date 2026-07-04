import { motion } from "framer-motion";
import {
    FiCpu,
    FiTarget,
    FiZap
} from "react-icons/fi";

const badges = [
    {
        icon: FiCpu,
        text: "AI Powered"
    },
    {
        icon: FiTarget,
        text: "ATS Optimized"
    },
    {
        icon: FiZap,
        text: "Instant Analysis"
    }
];

export default function Hero() {

    return (

        <section className="mx-auto flex w-full max-w-5xl flex-col items-center text-center px-2 sm:px-4">

            <motion.div

                initial={{
                    opacity: 0,
                    y: -20
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 0.6
                }}

                className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 backdrop-blur-xl"

            >

                <FiCpu className="text-sky-400" />

                <span className="text-sm font-medium text-sky-200">

                    AI Resume Intelligence

                </span>

            </motion.div>

            <motion.h1

                initial={{
                    opacity: 0,
                    y: 30
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    delay: 0.2,
                    duration: 0.8
                }}

                className="mt-8 text-[clamp(2.3rem,6vw,5rem)] font-black leading-tight tracking-tight"

            >

                Analyze Your{" "}

                <span className="bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">

                    Resume

                </span>

                <br />

                Like Never Before

            </motion.h1>

            <motion.p

                initial={{
                    opacity: 0,
                    y: 25
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    delay: 0.35,
                    duration: 0.8
                }}

                className="mt-6 max-w-3xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-slate-400"

            >

                Upload your resume and compare it against any job
                description using AI. Discover missing skills, improve ATS
                compatibility, and receive actionable recommendations to
                increase your interview chances.

            </motion.p>

            <motion.div

                initial="hidden"

                animate="visible"

                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.15
                        }
                    }
                }}

                className="mt-10 flex flex-wrap items-center justify-center gap-3"

            >

                {

                    badges.map((badge) => {

                        const Icon = badge.icon;

                        return (

                            <motion.div

                                key={badge.text}

                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0
                                    }
                                }}

                                whileHover={{
                                    y: -5,
                                    scale: 1.05
                                }}

                                transition={{
                                    type: "spring",
                                    stiffness: 350,
                                    damping: 18
                                }}

                                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl"

                            >

                                <Icon className="text-sky-400" />

                                <span className="text-sm font-medium text-slate-200">

                                    {badge.text}

                                </span>

                            </motion.div>

                        );

                    })

                }

            </motion.div>

        </section>

    );

}