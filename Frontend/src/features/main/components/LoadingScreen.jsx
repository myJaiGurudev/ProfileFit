import { motion } from "framer-motion";

export default function LoadingScreen() {

    return (

        <motion.div

            initial={{
                opacity: 1
            }}

            exit={{
                opacity: 0,
                scale: .985
            }}

            transition={{
                duration: .45,
                ease: "easeOut"
            }}

            className="fixed inset-0 z-99999 overflow-hidden bg-slate-950"

        >

            <div className="absolute inset-0">

                <motion.div

                    animate={{

                        backgroundPosition: [

                            "0% 50%",

                            "100% 50%",

                            "0% 50%"

                        ]

                    }}

                    transition={{

                        duration: 18,

                        repeat: Infinity,

                        ease: "linear"

                    }}

                    style={{

                        backgroundSize: "250% 250%",

                        backgroundImage: "radial-gradient(circle at top,#0ea5e920,transparent 40%),radial-gradient(circle at bottom right,#06b6d420,transparent 45%),linear-gradient(135deg,#020617,#0f172a,#111827,#020617)"

                    }}

                    className="absolute inset-0"

                />

            </div>

            <motion.div

                animate={{

                    scale: [

                        1,

                        1.08,

                        1

                    ],

                    opacity: [

                        .45,

                        .7,

                        .45

                    ]

                }}

                transition={{

                    duration: 3,

                    repeat: Infinity,

                    ease: "easeInOut"

                }}

                className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/20 blur-[120px]"

            />

            <div className="relative flex h-full items-center justify-center px-6">

                <motion.div

                    initial={{

                        opacity: 0,

                        y: 25

                    }}

                    animate={{

                        opacity: 1,

                        y: 0

                    }}

                    transition={{

                        duration: .7

                    }}

                    className="w-full max-w-md rounded-[34px] border border-white/10 bg-white/5 p-10 text-center shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl"

                >

                    <motion.div

                        animate={{

                            scale: [

                                1,

                                1.035,

                                1

                            ]

                        }}

                        transition={{

                            duration: 2.8,

                            repeat: Infinity,

                            ease: "easeInOut"

                        }}

                        className="relative mx-auto flex h-32 w-32 items-center justify-center"

                    >

                        <div className="absolute inset-0 rounded-full bg-sky-400/25 blur-3xl" />

                        <div className="absolute inset-3 rounded-full border border-sky-400/20" />

                        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/10 shadow-[0_0_45px_rgba(56,189,248,.35)] backdrop-blur-xl">

                            <img

                                src="/logo.png"

                                alt="ProfileFit"

                                className="h-16 w-16 object-contain select-none"

                                draggable="false"

                            />

                        </div>

                    </motion.div>

                    <motion.h1

                        initial={{

                            opacity: 0,

                            y: 12

                        }}

                        animate={{

                            opacity: 1,

                            y: 0

                        }}

                        transition={{

                            delay: .15,

                            duration: .5

                        }}

                        className="mt-8 bg-linear-to-r from-sky-300 via-cyan-300 to-blue-500 bg-clip-text text-5xl font-black tracking-tight text-transparent"

                    >

                        ProfileFit

                    </motion.h1>

                    <motion.p

                        animate={{

                            opacity: [

                                .45,

                                1,

                                .45

                            ]

                        }}

                        transition={{

                            duration: 1.8,

                            repeat: Infinity

                        }}

                        className="mt-3 text-[15px] text-slate-400"

                    >

                        Preparing your AI experience...

                    </motion.p>

                    <motion.div

                        animate={{

                            rotate: 360

                        }}

                        transition={{

                            duration: .9,

                            repeat: Infinity,

                            ease: "linear"

                        }}

                        className="mx-auto mt-10 h-10 w-10 rounded-full border-[3px] border-slate-700 border-t-sky-400"

                    />

                    <motion.p

                        animate={{

                            opacity: [.4, 1, .4]

                        }}

                        transition={{

                            duration: 1.5,

                            repeat: Infinity

                        }}

                        className="mt-5 text-sm font-medium tracking-[0.25em] uppercase text-slate-500"

                    >

                        Loading

                    </motion.p>

                </motion.div>

            </div>

        </motion.div>

    );

}