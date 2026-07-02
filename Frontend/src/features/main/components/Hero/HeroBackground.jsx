import { motion } from "framer-motion";

export default function HeroBackground() {

    return (

        <div className="absolute inset-0 overflow-hidden">

            <div className="absolute inset-0 bg-slate-950" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,.14),transparent_55%)]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,.12),transparent_45%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-size-[60px_60px]" />

            <motion.div

                animate={{

                    x: [-40, 60, -40],

                    y: [-20, 30, -20],

                    scale: [1, 1.15, 1]

                }}

                transition={{

                    duration: 18,

                    repeat: Infinity,

                    ease: "easeInOut"

                }}

                className="absolute -left-40 top-10 h-125 w-125 rounded-full bg-sky-500/15 blur-[130px]"

            />

            <motion.div

                animate={{

                    x: [50, -60, 50],

                    y: [20, -30, 20],

                    scale: [1.1, 1, 1.1]

                }}

                transition={{

                    duration: 20,

                    repeat: Infinity,

                    ease: "easeInOut"

                }}

                className="absolute -right-30 top-32 h-130 w-130 rounded-full bg-cyan-500/12 blur-[150px]"

            />

            <motion.div

                animate={{

                    x: [0, 40, 0],

                    y: [0, -50, 0]

                }}

                transition={{

                    duration: 22,

                    repeat: Infinity,

                    ease: "easeInOut"

                }}

                className="absolute -bottom-45 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[160px]"

            />

            <motion.div

                animate={{

                    rotate: 360

                }}

                transition={{

                    duration: 120,

                    repeat: Infinity,

                    ease: "linear"

                }}

                className="absolute left-1/2 top-1/2 h-225 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/3"

            />

            <motion.div

                animate={{

                    rotate: -360

                }}

                transition={{

                    duration: 160,

                    repeat: Infinity,

                    ease: "linear"

                }}

                className="absolute left-1/2 top-1/2 h-162.5 w-162.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/3"

            />

            <motion.div

                animate={{

                    opacity: [0.2, 0.5, 0.2]

                }}

                transition={{

                    duration: 5,

                    repeat: Infinity

                }}

                className="absolute left-1/2 top-40 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]"

            />

            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-950" />

        </div>

    );

}