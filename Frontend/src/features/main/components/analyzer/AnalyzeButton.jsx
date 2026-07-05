import { motion } from "framer-motion";
import {
    FiCpu,
    FiArrowRight
} from "react-icons/fi";

export default function AnalyzeButton({ loading = false, disabled = false, onClick }) {

    const isDisabled = loading || disabled;

    return (

        <motion.button
            transition={{
                type: "spring",
                stiffness: 450,
                damping: 24
            }}
            onClick={onClick}
            disabled={isDisabled}
            className={`group relative w-full max-w-md ${isDisabled
                ? "pointer-events-none cursor-not-allowed opacity-80"
                : "cursor-pointer"
                }`}
        >

            {/* 3D Base */}

            <div
                className={`absolute inset-0 transition-all duration-150 ${isDisabled ? "opacity-0" : "opacity-100"
                    }`}
            >

                {/* Bottom */}

                <div className="absolute bottom-0 left-3 right-3 h-4 rounded-b-3xl bg-sky-950" />

                {/* Left */}

                <div className="absolute left-0 top-3 bottom-3 w-3 rounded-l-3xl bg-cyan-950" />

                {/* Right */}

                <div className="absolute right-0 top-3 bottom-3 w-3 rounded-r-3xl bg-sky-900" />

                {/* Outer Shadow */}

                <div className="absolute inset-0 rounded-3xl shadow-[0_12px_25px_rgba(0,0,0,.28)]" />

            </div>

            {/* Button Face */}

            <div
                className={`relative rounded-3xl border px-8 py-5 transition-all duration-150 ${isDisabled
                    ? "border-slate-700 bg-linear-to-b from-slate-700 via-slate-800 to-slate-900 text-slate-400 shadow-[inset_0_6px_12px_rgba(0,0,0,.5)]"
                    : "border-sky-300/20 bg-linear-to-b from-sky-400 via-sky-500 to-cyan-600 shadow-[0_2px_0_rgb(14,116,144),0_4px_0_rgb(8,47,73),0_6px_0_rgb(6,30,60),0_12px_22px_rgba(0,0,0,.25),inset_0_1px_1px_rgba(255,255,255,.28)]"
                    }`}
            >

                <div className="flex items-center justify-center gap-4">

                    {loading ? (

                        <svg
                            className="h-5 w-5 animate-spin text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="opacity-25"
                            />

                            <path
                                fill="currentColor"
                                d="M22 12a10 10 0 0 1-10 10v-4a6 6 0 0 0 6-6h4z"
                            />
                        </svg>

                    ) : (

                        <FiCpu className="text-2xl text-white" />

                    )}

                    <span className="text-[clamp(1rem,2vw,1.15rem)] font-semibold tracking-wide text-white">

                        {loading
                            ? "Analyzing..."
                            : "Analyze Resume"}

                    </span>

                    {!isDisabled && (

                        <motion.div

                            animate={{
                                x: [0, 4, 0]
                            }}

                            transition={{
                                repeat: Infinity,
                                duration: 1.2
                            }}

                        >

                            <FiArrowRight className="text-lg text-white" />

                        </motion.div>

                    )}

                </div>

            </div>

        </motion.button>

    );

}