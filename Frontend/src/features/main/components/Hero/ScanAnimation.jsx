import { motion } from "framer-motion";

export default function ScanAnimation() {

    return (

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-5">

            <div className="mb-5 flex items-center justify-between">

                <h3 className="font-semibold text-white">

                    Resume Preview

                </h3>

                <span className="rounded-full border border-cyan-400/30 bg-linear-to-r from-cyan-500/20 to-sky-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">

                    AI Scanning

                </span>

            </div>

            <motion.div
                animate={{
                    boxShadow: [
                        "0 0 20px rgba(34,211,238,0.06)",
                        "0 0 40px rgba(34,211,238,0.14)",
                        "0 0 20px rgba(34,211,238,0.06)"
                    ]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative overflow-hidden rounded-2xl border border-cyan-400/40 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-5"
            >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl transition-all duration-700 group-hover:scale-150" />

                <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative z-10">

                    <h2 className="text-lg font-bold text-white">

                        Anurag Singh

                    </h2>

                    <p className="mt-1 text-sm text-slate-400">

                        Full Stack Developer

                    </p>

                    <div className="mt-5">

                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">

                            Skills

                        </p>

                        <div className="flex flex-wrap gap-2">

                            {
                                [
                                    "React",
                                    "Node.js",
                                    "MongoDB",
                                    "Express",
                                    "Docker",
                                    "AWS"
                                ].map((skill, index) => (

                                    <motion.span

                                        key={skill}

                                        animate={{
                                            backgroundColor: index < 4
                                                ? [
                                                    "rgba(30,41,59,1)",
                                                    "rgba(34,197,94,.25)"
                                                ]
                                                : [
                                                    "rgba(30,41,59,1)",
                                                    "rgba(239,68,68,.18)"
                                                ]
                                        }}

                                        transition={{
                                            duration: 1,
                                            delay: index * .35,
                                            repeat: Infinity,
                                            repeatDelay: 2
                                        }}

                                        className={`rounded-full border px-3 py-1 text-xs font-medium ${index < 4
                                            ? "border-emerald-500/30 text-emerald-300"
                                            : "border-red-500/30 text-red-300"
                                            }`}

                                    >

                                        {skill}

                                    </motion.span>

                                ))
                            }

                        </div>

                    </div>

                    <div className="mt-6">

                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">

                            Projects

                        </p>

                        <div className="space-y-2">

                            <div className="h-2 rounded-full bg-slate-600"></div>

                            <div className="h-2 w-5/6 rounded-full bg-slate-600"></div>

                            <div className="h-2 w-4/5 rounded-full bg-slate-600"></div>

                        </div>

                    </div>

                </div>

                <motion.div

                    animate={{
                        top: ["-10%", "100%"]
                    }}

                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}

                    className="absolute left-0 h-24 w-full bg-linear-to-b from-transparent via-cyan-400/40 to-transparent blur-lg"

                />

                <motion.div
                    animate={{
                        top: ["-10%", "100%"]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute left-0 h-0.5 w-full bg-cyan-300 shadow-[0_0_25px_8px_rgba(34,211,238,0.8)]"
                />

            </motion.div>

        </div >

    );

}