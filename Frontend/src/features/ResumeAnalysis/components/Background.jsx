import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

function Background() {

    const shouldReduceMotion = useReducedMotion();

    return (

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

            <div className="absolute inset-0 bg-linear-to-b from-[#020617] via-[#030712] to-[#111827]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,.10),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,.08),transparent_40%),radial-gradient(circle_at_left,rgba(34,211,238,.06),transparent_35%)]" />

            <motion.div
                animate={
                    shouldReduceMotion ? {} : {
                        x: [0, 80, -60, 0],
                        y: [0, -60, 40, 0],
                        scale: [1, 1.15, .95, 1]
                    }
                }
                style={{
                    willChange: "transform"
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-40 -left-40 h-72 w-72 md:h-96 md:w-96 lg:h-125 lg:w-125 rounded-full bg-cyan-500/10 blur-[100px] md:blur-[120px] lg:blur-[140px]"
            />

            <motion.div
                animate={
                    shouldReduceMotion ? {} : {
                        x: [0, -80, 50, 0],
                        y: [0, 60, -50, 0],
                        scale: [1, .9, 1.1, 1]
                    }
                }
                style={{
                    willChange: "transform"
                }}
                transition={{
                    duration: 34,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/2 -right-52 h-80 w-80 md:h-107.5 md:w-107.5 lg:h-137.5 lg:w-137.5 rounded-full bg-violet-500/10 blur-[110px] md:blur-[130px] lg:blur-[150px]"
            />

            <motion.div
                animate={
                    shouldReduceMotion ? {} : {
                    opacity: [.15, .45, .15]
                }}
                style={{
                    willChange: "transform"
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity
                }}
                className="absolute bottom-0 left-1/3 h-64 w-64 md:h-80 md:w-80 lg:h-105 lg:w-105 rounded-full bg-cyan-400/10 blur-[90px] md:blur-[110px] lg:blur-[120px]"
            />

            <div className="absolute inset-0 opacity-[0.04] mask-[radial-gradient(circle,black_55%,transparent_100%)]">

                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `
linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),
linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)
`,
                        backgroundSize: "60px 60px"
                    }}
                />

            </div>

            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#030712]" />

        </div>

    );

}

export default memo(Background);