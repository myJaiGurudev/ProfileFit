import { motion } from "framer-motion";

export default function AnimatedBackground() {

    return (

        <div className="absolute inset-0 -z-10 overflow-hidden">

            <div className="absolute inset-0 bg-[#020617]" />

            <motion.div

                animate={{
                    scale: [1, 1.15, 1],
                    x: [0, 80, 0],
                    y: [0, -60, 0]
                }}

                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}

                className="absolute -left-48 -top-48 h-136 w-136 rounded-full bg-sky-500/20 blur-[120px]"

            />

            <motion.div

                animate={{
                    scale: [1.1, 0.9, 1.1],
                    x: [0, -60, 0],
                    y: [0, 70, 0]
                }}

                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}

                className="absolute -right-40 top-[20%] h-128 w-lg rounded-full bg-cyan-500/20 blur-[120px]"

            />

            <motion.div

                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                }}

                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear"
                }}

                className="absolute -bottom-56 left-1/2 h-152 w-152 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]"

            />

            <div

                className="absolute inset-0 opacity-[0.07]"

                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,.18) 1px,transparent 1px),
                        linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px)
                    `,
                    backgroundSize: "70px 70px"
                }}

            />

            <div

                className="absolute inset-0"

                style={{
                    background: "radial-gradient(circle at center, transparent 0%, rgba(2,6,23,.45) 60%, #020617 100%)"
                }}

            />

            <motion.div

                animate={{
                    opacity: [0.35, 0.7, 0.35]
                }}

                transition={{
                    duration: 5,
                    repeat: Infinity
                }}

                className="absolute left-1/2 top-0 h-180 w-180 -translate-x-1/2 rounded-full bg-linear-to-b from-sky-400/10 via-cyan-400/5 to-transparent blur-3xl"

            />

        </div>

    );

}