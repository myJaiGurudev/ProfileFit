import { motion } from "framer-motion";

const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Adobe",
    "NVIDIA",
    "Atlassian"
];

const stats = [
    {
        value: "50K+",
        label: "Resumes Analyzed"
    },
    {
        value: "94%",
        label: "Average ATS Score"
    },
    {
        value: "150+",
        label: "Skills Tracked"
    },
    {
        value: "24/7",
        label: "AI Available"
    }
];

export default function TrustedSection() {

    return (

        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">

            <div className="absolute inset-0 overflow-hidden">

                <motion.div
                    animate={{
                        x: [-40, 40, -40],
                        y: [-20, 20, -20]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96"
                />

            </div>

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 25
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}

                    viewport={{
                        once: true
                    }}

                    transition={{
                        duration: .7
                    }}

                    className="text-center"

                >

                    <span className="inline-block rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-sky-300 sm:px-5 sm:text-sm">

                        TRUSTED FOR MODERN CAREERS

                    </span>

                    <h2 className="mt-6 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl text-balance">

                        Designed for Candidates Targeting

                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base lg:text-lg text-pretty">

                        Whether you're applying to startups or global tech companies, ProfileFit helps optimize your resume for modern hiring systems.

                    </p>

                </motion.div>

                <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">

                    {

                        companies.map((company, index) => (

                            <motion.div

                                key={company}

                                initial={{
                                    opacity: 0,
                                    y: 20
                                }}

                                whileInView={{
                                    opacity: 1,
                                    y: 0
                                }}

                                viewport={{
                                    once: true
                                }}

                                transition={{
                                    delay: index * .08,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 18
                                }}

                                whileHover={{
                                    y: -6,
                                    scale: 1.05
                                }}

                                whileTap={{
                                    scale: 0.98
                                }}

                                className="group relative flex min-h-16 sm:h-20 items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-2 text-center text-sm font-bold text-slate-400 transition-all duration-300 hover:border-sky-400/40 hover:bg-white/10 hover:text-white hover:shadow-[0_15px_35px_rgba(56,189,248,.18)] sm:text-base lg:text-lg"
                            >

                                <>
                                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-sky-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    <span className="relative wrap-break-word text-balance">

                                        {company}

                                    </span>
                                </>

                            </motion.div>

                        ))

                    }

                </div>

                <div className="mt-14 grid grid-cols-2 gap-4 sm:mt-20 sm:gap-6 lg:grid-cols-4">

                    {

                        stats.map((item, index) => (

                            <motion.div

                                key={item.label}

                                initial={{
                                    opacity: 0,
                                    scale: .9
                                }}

                                whileInView={{
                                    opacity: 1,
                                    scale: 1
                                }}

                                viewport={{
                                    once: true
                                }}

                                transition={{
                                    delay: .3 + (index * .1)
                                }}

                                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:p-8 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-sky-400/40 hover:bg-white/10 hover:shadow-[0_20px_45px_rgba(56,189,248,.18)]"

                            >
                                <div className="absolute inset-0 overflow-hidden rounded-3xl">

                                    <motion.div
                                        animate={{
                                            x: ["-120%", "220%"]
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            repeatDelay: 2,
                                            ease: "linear"
                                        }}
                                        className="absolute top-0 h-full w-20 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent"
                                    />

                                </div>

                                <motion.h3
                                    animate={{
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="text-2xl font-black bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent sm:text-3xl lg:text-4xl"
                                >

                                    {item.value}

                                </motion.h3>

                                <p className="mt-2 text-xs leading-6 text-slate-400 sm:mt-3 sm:text-sm lg:text-base">

                                    {item.label}

                                </p>

                            </motion.div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}