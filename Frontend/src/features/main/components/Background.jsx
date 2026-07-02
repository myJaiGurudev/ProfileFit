import { motion } from "framer-motion";

export default function Background() {

    return (

        <div className="fixed inset-0 -z-50 overflow-hidden bg-slate-950">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,.06),transparent_45%)]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,.05),transparent_45%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-size-[52px_52px]" />

            <motion.div

                animate={{
                    x:[-60,60,-60],
                    y:[-30,30,-30],
                    scale:[1,1.15,1]
                }}

                transition={{
                    duration:25,
                    repeat:Infinity,
                    ease:"easeInOut"
                }}

                className="absolute -left-45 top-20 h-105 w-105 rounded-full bg-sky-500/8 blur-[120px]"

            />

            <motion.div

                animate={{
                    x:[40,-60,40],
                    y:[20,-20,20],
                    scale:[1.1,1,1.1]
                }}

                transition={{
                    duration:30,
                    repeat:Infinity,
                    ease:"easeInOut"
                }}

                className="absolute -right-30 top-[30%] h-105 w-105 rounded-full bg-cyan-500/8 blur-[140px]"

            />

            <motion.div

                animate={{
                    rotate:360
                }}

                transition={{
                    duration:180,
                    repeat:Infinity,
                    ease:"linear"
                }}

                className="absolute left-1/2 top-1/2 h-300 w-300 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/2.5"

            />

            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-950" />

        </div>

    );

}