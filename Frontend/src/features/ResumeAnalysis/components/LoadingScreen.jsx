import { motion } from "framer-motion";

export default function LoadingScreen() {

    return (

        <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[#030712]">

            <div className="relative">

                <motion.div
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear"
                    }}
                    className="h-24 w-24 rounded-full border-4 border-cyan-400/20 border-t-cyan-400"
                />

                <motion.div
                    animate={{
                        scale: [1, .9, 1]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.6
                    }}
                    className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white"
                >

                    AI

                </motion.div>

            </div>

            <div className="absolute bottom-24 text-center">

                <motion.h2
                    animate={{
                        opacity: [.5, 1, .5]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2
                    }}
                    className="text-2xl font-bold text-white"
                >

                    Analyzing Resume

                </motion.h2>

                <p className="mt-3 text-slate-400">

                    Generating recruiter insights...

                </p>

            </div>

        </div>

    );

}