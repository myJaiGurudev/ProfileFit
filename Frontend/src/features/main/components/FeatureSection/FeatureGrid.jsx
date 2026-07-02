import { motion } from "framer-motion";
import { FiUpload, FiCpu, FiCheckCircle } from "react-icons/fi";

export default function FeatureGrid() {

    return (

        <div className="grid gap-8 lg:grid-cols-2">

            <motion.div

                initial={{
                    opacity: 0,
                    y: 40
                }}

                whileInView={{
                    opacity: 1,
                    y: 0
                }}

                viewport={{
                    once: true
                }}

                transition={{
                    duration: .8
                }}

                whileHover={{
                    y: -8,
                    scale: 1.02
                }}

                className="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl lg:col-span-2"

            >

                <motion.div

                    animate={{
                        x: ["-120%", "180%"]
                    }}

                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}

                    className="absolute top-0 h-full w-28 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent"

                />

                <div className="flex items-center justify-between">

                    <div>

                        <span className="rounded-full bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-300">

                            AI Resume Analysis

                        </span>

                        <h3 className="mt-5 text-3xl font-bold text-white">

                            See how ProfileFit improves your resume.

                        </h3>

                    </div>

                    <motion.div

                        animate={{
                            rotate: [0, 360]
                        }}

                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}

                        className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-400 lg:flex"

                    >

                        <FiCpu className="text-3xl" />

                    </motion.div>

                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-5">

                    <div className="rounded-2xl bg-white/5 p-5 text-center">

                        <FiUpload className="mx-auto text-3xl text-sky-400" />

                        <p className="mt-4 text-sm text-slate-300">

                            Upload

                        </p>

                    </div>

                    <div className="flex items-center justify-center text-3xl text-slate-600">

                        →

                    </div>

                    <div className="rounded-2xl bg-white/5 p-5 text-center">

                        <motion.div

                            animate={{
                                scale: [1, 1.15, 1]
                            }}

                            transition={{
                                duration: 2,
                                repeat: Infinity
                            }}

                        >

                            <FiCpu className="mx-auto text-3xl text-cyan-400" />

                        </motion.div>

                        <p className="mt-4 text-sm text-slate-300">

                            Analyze

                        </p>

                    </div>

                    <div className="flex items-center justify-center text-3xl text-slate-600">

                        →

                    </div>

                    <div className="rounded-2xl bg-white/5 p-5 text-center">

                        <FiCheckCircle className="mx-auto text-3xl text-emerald-400" />

                        <p className="mt-4 text-sm text-slate-300">

                            Resume Ready

                        </p>

                    </div>

                </div>

                <div className="mt-10 h-3 overflow-hidden rounded-full bg-slate-800">

                    <motion.div

                        animate={{
                            width: ["0%", "100%"]
                        }}

                        transition={{
                            duration: 3,
                            repeat: Infinity
                        }}

                        className="h-full rounded-full bg-linear-to-r from-sky-400 via-cyan-400 to-blue-500"

                    />

                </div>

            </motion.div>

            <motion.div

                initial={{
                    opacity: 0,
                    y: 30
                }}

                whileInView={{
                    opacity: 1,
                    y: 0
                }}

                viewport={{
                    once: true
                }}

                transition={{
                    delay: .2
                }}

                whileHover={{
                    y: -8,
                    scale: 1.02
                }}

                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl"

            >

                <motion.div

                    animate={{
                        x: ["-120%", "180%"]
                    }}

                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}

                    className="absolute top-0 h-full w-24 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent"

                />

                <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">

                    Keyword Matching

                </span>

                <h3 className="mt-5 text-2xl font-bold text-white">

                    Resume v/s Job Description

                </h3>

                <div className="mt-8 space-y-4">

                    {

                        [

                            ["React", true],

                            ["Node.js", true],

                            ["MongoDB", true],

                            ["Docker", false],

                            ["AWS", false]

                        ].map(([skill, matched]) => (

                            <div

                                key={skill}

                                className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"

                            >

                                <span className="text-sm text-slate-300">

                                    {skill}

                                </span>

                                <span className={`text-sm font-semibold ${matched ? "text-emerald-400" : "text-red-400"}`}>

                                    {matched ? "Matched" : "Missing"}

                                </span>

                            </div>

                        ))

                    }

                </div>

            </motion.div>

            <motion.div

                initial={{
                    opacity: 0,
                    y: 30
                }}

                whileInView={{
                    opacity: 1,
                    y: 0
                }}

                viewport={{
                    once: true
                }}

                transition={{
                    delay: .35
                }}

                whileHover={{
                    y: -8,
                    scale: 1.02
                }}

                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl"

            >

                <motion.div

                    animate={{
                        x: ["-120%", "180%"]
                    }}

                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}

                    className="absolute top-0 h-full w-24 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent"

                />

                <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">

                    ATS Improvement

                </span>

                <h3 className="mt-5 text-2xl font-bold text-white">

                    Before v/s After

                </h3>

                <div className="mt-8">

                    <div className="flex items-center justify-between">

                        <span className="text-slate-400">

                            Before

                        </span>

                        <span className="font-bold text-red-400">

                            61%

                        </span>

                    </div>

                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">

                        <div className="h-full w-[61%] rounded-full bg-linear-to-r from-red-500 to-orange-400" />

                    </div>

                    <div className="mt-8 flex items-center justify-between">

                        <span className="text-slate-400">

                            After

                        </span>

                        <span className="font-bold text-emerald-400">

                            94%

                        </span>

                    </div>

                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">

                        <motion.div

                            animate={{
                                width: ["0%", "94%"]
                            }}

                            transition={{
                                duration: 2.5,
                                repeat: Infinity
                            }}

                            className="h-full rounded-full bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500"

                        />

                    </div>

                </div>

            </motion.div>

        </div>

    );

}