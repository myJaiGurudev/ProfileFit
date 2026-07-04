import { motion } from "framer-motion";
import {
    FiCpu,
    FiArrowRight
} from "react-icons/fi";

export default function AnalyzeButton({
    loading = false,
    onClick
}) {

    return (

        <motion.button

            whileHover={{
                y: -3,
                scale: 1.01
            }}

            whileTap={{
                y: 1,
                scale: 0.985
            }}

            transition={{
                type: "spring",
                stiffness: 450,
                damping: 24
            }}

            onClick={onClick}

            disabled={loading}

            className="group relative w-full max-w-md cursor-pointer"

        >

            <div className="absolute inset-0 translate-y-1 rounded-3xl bg-sky-900/70 transition-all duration-300 group-hover:translate-y-2" />

            <div className="absolute inset-0 rounded-3xl bg-sky-500/20 blur-lg opacity-60 transition-all duration-300 group-hover:opacity-80" />

            <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-sky-500 to-cyan-600 px-8 py-5 shadow-[0_10px_28px_rgba(14,165,233,.18)] transition-shadow duration-300 group-hover:shadow-[0_14px_34px_rgba(14,165,233,.22)]">

                <motion.div

                    animate={{
                        x: ["-180%", "220%"]
                    }}

                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear"
                    }}

                    className="absolute inset-y-0 w-14 rotate-12 bg-white/15 blur-lg"

                />

                <div className="relative flex items-center justify-center gap-4">

                    <motion.div

                        animate={{
                            rotate: loading
                                ? 360
                                : 0
                        }}

                        transition={{
                            repeat: loading
                                ? Infinity
                                : 0,
                            duration: 1,
                            ease: "linear"
                        }}

                    >

                        <FiCpu className="text-2xl text-white" />

                    </motion.div>

                    <span className="text-[clamp(1rem,2vw,1.15rem)] font-semibold tracking-wide text-white">

                        {
                            loading
                                ? "Analyzing..."
                                : "Analyze Resume"
                        }

                    </span>

                    <motion.div

                        animate={{
                            x: [0, 4, 0]
                        }}

                        transition={{
                            repeat: Infinity,
                            duration: 1.4
                        }}

                    >

                        <FiArrowRight className="text-lg text-white" />

                    </motion.div>

                </div>

            </div>

        </motion.button>

    );

}