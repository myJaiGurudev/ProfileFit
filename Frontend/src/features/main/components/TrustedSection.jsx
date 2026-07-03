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

        <section className="relative overflow-hidden py-24">

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
                    className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl"
                />

            </div>

            <div className="mx-auto max-w-7xl px-6">

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

                    <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-300">

                        TRUSTED FOR MODERN CAREERS

                    </span>

                    <h2 className="mt-6 text-4xl font-black text-white">

                        Designed for Candidates Targeting

                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">

                        Whether you're applying to startups or global tech companies, ProfileFit helps optimize your resume for modern hiring systems.

                    </p>

                </motion.div>

                <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">

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

                                className="group relative flex h-20 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-lg font-bold text-slate-400 transition-all duration-300 hover:border-sky-400/40 hover:bg-white/10 hover:text-white hover:shadow-[0_15px_35px_rgba(56,189,248,.18)]"
                            >

                                <>
                                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-sky-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    <span className="relative">

                                        {company}

                                    </span>
                                </>

                            </motion.div>

                        ))

                    }

                </div>

                <div className="mt-20 grid grid-cols-2 gap-6 lg:grid-cols-4">

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

                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-sky-400/40 hover:bg-white/10 hover:shadow-[0_20px_45px_rgba(56,189,248,.18)]"

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
                                    className="text-4xl font-black bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent"
                                >

                                    {item.value}

                                </motion.h3>

                                <p className="mt-3 text-slate-400">

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