import { motion } from "framer-motion";
import { clsx } from "clsx";

export default function GlassCard({ children, className = "" }) {

    return (

        <motion.div
            initial={{
                opacity: 0,
                y: 20
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true,
                amount: .2
            }}
            transition={{
                duration: .45
            }}
            whileHover={{
                y: -6,
                scale: 1.01,
                transition: {
                    duration: .25
                }
            }}
            className={clsx(
                "relative overflow-hidden rounded-4xl",
                "border border-white/10",
                "bg-linear-to-br from-white/6 via-white/3 to-white/2",
                "backdrop-blur-3xl",
                "shadow-[0_20px_80px_rgba(0,0,0,.45)]",
                "transition-all duration-500",
                "hover:border-cyan-400/40",
                "hover:shadow-[0_40px_120px_rgba(34,211,238,.22)]",
                className
            )}
        >

            <div className="absolute inset-0 bg-linear-to-br from-white/6 via-transparent to-cyan-400/3" />

            <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />

            <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

            <div className="absolute inset-0 rounded-4xl ring-1 ring-inset ring-white/5" />

            <div className="relative p-6 sm:p-7 lg:p-8">

                {children}

            </div>

        </motion.div>

    );

}