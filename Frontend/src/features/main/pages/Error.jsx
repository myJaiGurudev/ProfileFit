import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link, useNavigate, useRouteError } from "react-router-dom";

export default function Error() {

    const error = useRouteError();

    const navigate = useNavigate();

    const mouseX = useMotionValue(0);

    const mouseY = useMotionValue(0);

    const rotateX = useSpring(
        useTransform(mouseY, [-250, 250], [6, -6]),
        {
            stiffness: 120,
            damping: 18
        }
    );

    const rotateY = useSpring(
        useTransform(mouseX, [-250, 250], [-6, 6]),
        {
            stiffness: 120,
            damping: 18
        }
    );

    const handleMouseMove = (e) => {

        const rect = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - rect.width / 2);

        mouseY.set(e.clientY - rect.height / 2);

    };

    const handleMouseLeave = () => {

        mouseX.set(0);

        mouseY.set(0);

    };

    const status = error?.status || 404;

    return (

        <div className="relative min-h-screen overflow-x-hidden bg-slate-950">

            {/* Background */}

            <div className="absolute inset-0">

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-size-[48px_48px]" />

                <motion.div

                    animate={{
                        x: [0, 50, -20, 0],
                        y: [0, -35, 20, 0],
                        scale: [1, 1.08, .95, 1]
                    }}

                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}

                    className="absolute -left-40 -top-40 h-112 w-md rounded-full bg-cyan-500/15 blur-[130px]"
                />

                <motion.div

                    animate={{
                        x: [0, -60, 25, 0],
                        y: [0, 25, -20, 0]
                    }}

                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}

                    className="absolute -right-44 -top-36 h-120 w-120 rounded-full bg-blue-600/15 blur-[150px]"
                />

                <motion.div

                    animate={{
                        y: [0, -30, 0]
                    }}

                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}

                    className="absolute left-1/2 -bottom-48 h-96 w-[24rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[160px]"
                />

            </div>

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 lg:py-8 sm:px-6 lg:px-8">

                <div className="mx-auto flex w-full max-w-7xl flex-col">

                    <div className="flex flex-1 items-center">

                        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">

                            {/* Left Section */}

                            <motion.div

                                initial={{
                                    opacity: 0,
                                    x: -40
                                }}

                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}

                                transition={{
                                    duration: .7
                                }}

                                className="mx-auto flex h-full w-full max-w-xl flex-col justify-center text-center lg:mx-0 lg:max-w-none lg:text-left"

                            >

                                <motion.div

                                    initial={{
                                        opacity: 0,
                                        y: 20
                                    }}

                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}

                                    transition={{
                                        delay: .15
                                    }}

                                    className="mx-auto mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 lg:mx-0"

                                >

                                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />

                                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">

                                        Error {status}

                                    </span>

                                </motion.div>

                                <motion.h1

                                    animate={{
                                        y: [0, -8, 0]
                                    }}

                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}

                                    className="select-none text-[3.8rem] font-black leading-none sm:text-[5rem] lg:text-[7rem] xl:text-[8rem]"

                                >

                                    <span className="text-white">

                                        4

                                    </span>

                                    <span className="mx-2 bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">

                                        0

                                    </span>

                                    <span className="text-white">

                                        4

                                    </span>

                                </motion.h1>

                                <motion.h2

                                    initial={{
                                        opacity: 0,
                                        y: 15
                                    }}

                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}

                                    transition={{
                                        delay: .25
                                    }}

                                    className="mx-auto mt-3 max-w-xl text-2xl font-black leading-tight text-white sm:text-3xl lg:mx-0 lg:text-4xl"

                                >

                                    Oops!

                                    <br />

                                    This page doesn't exist.

                                </motion.h2>

                                <motion.p

                                    initial={{
                                        opacity: 0,
                                        y: 20
                                    }}

                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}

                                    transition={{
                                        delay: .35
                                    }}

                                    className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:text-base lg:mx-0"

                                >

                                    The page you are looking for may have been moved,
                                    deleted,
                                    or the address you entered is incorrect.

                                    You can return to the homepage,
                                    go back to the previous page,
                                    or reload this page.

                                </motion.p>

                                <motion.div

                                    initial={{
                                        opacity: 0
                                    }}

                                    animate={{
                                        opacity: 1
                                    }}

                                    transition={{
                                        delay: .5
                                    }}

                                    className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start"

                                >

                                    <div className="rounded-xl border border-cyan-400/15 bg-white/5 px-4 py-3 backdrop-blur-xl">

                                        <p className="text-xs uppercase tracking-widest text-slate-400">

                                            Status

                                        </p>

                                        <p className="mt-1 text-lg font-bold text-cyan-400">

                                            {status}

                                        </p>

                                    </div>

                                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">

                                        <p className="text-xs uppercase tracking-widest text-slate-400">

                                            Response

                                        </p>

                                        <p className="mt-1 text-lg font-bold text-white">

                                            Not Found

                                        </p>

                                    </div>

                                </motion.div>

                            </motion.div>

                            {/* Right Section */}

                            <motion.div

                                initial={{
                                    opacity: 0,
                                    x: 40
                                }}

                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}

                                transition={{
                                    duration: .7,
                                    delay: .2
                                }}

                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}

                                className="hidden items-center justify-center lg:flex"

                            >

                                <motion.div

                                    style={{
                                        rotateX,
                                        rotateY,
                                        transformPerspective: 1200
                                    }}

                                    whileHover={{
                                        scale: 1.02
                                    }}

                                    transition={{
                                        duration: .2
                                    }}

                                    className="relative w-full max-w-md"

                                >

                                    {/* Glow */}

                                    <div className="absolute inset-0 rounded-4xl bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 blur-3xl" />

                                    {/* Card */}

                                    <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-5 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,.45)]">

                                        {/* Top Glow */}

                                        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-500/15 blur-3xl" />

                                        <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-indigo-500/15 blur-3xl" />

                                        {/* Browser */}

                                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">

                                            {/* Browser Header */}

                                            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

                                                <div className="flex gap-2">

                                                    <span className="h-3 w-3 rounded-full bg-red-400" />

                                                    <span className="h-3 w-3 rounded-full bg-yellow-400" />

                                                    <span className="h-3 w-3 rounded-full bg-green-400" />

                                                </div>

                                                <div className="h-2 w-24 rounded-full bg-white/10" />

                                            </div>

                                            {/* Browser Body */}

                                            <div className="relative flex h-72 items-center justify-center overflow-hidden">

                                                {/* Center Glow */}

                                                <motion.div

                                                    animate={{
                                                        scale: [1, 1.15, 1],
                                                        opacity: [.35, .65, .35]
                                                    }}

                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}

                                                    className="absolute h-52 w-52 rounded-full bg-cyan-500/20 blur-[70px]"

                                                />

                                                {/* Outer Ring */}

                                                <motion.div

                                                    animate={{
                                                        rotate: 360
                                                    }}

                                                    transition={{
                                                        duration: 18,
                                                        repeat: Infinity,
                                                        ease: "linear"
                                                    }}

                                                    className="absolute h-52 w-52 rounded-full border border-cyan-400/20"

                                                >

                                                    <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />

                                                </motion.div>

                                                {/* Middle Ring */}

                                                <motion.div

                                                    animate={{
                                                        rotate: -360
                                                    }}

                                                    transition={{
                                                        duration: 14,
                                                        repeat: Infinity,
                                                        ease: "linear"
                                                    }}

                                                    className="absolute h-40 w-40 rounded-full border border-blue-400/25"

                                                >

                                                    <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_18px_#60a5fa]" />

                                                </motion.div>

                                                {/* Inner Glass Sphere */}

                                                <motion.div

                                                    animate={{
                                                        y: [0, -10, 0],
                                                        scale: [1, 1.03, 1]
                                                    }}

                                                    transition={{
                                                        duration: 5,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}

                                                    className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-linear-to-br from-cyan-400/20 via-white/10 to-indigo-500/20 backdrop-blur-2xl shadow-[0_25px_60px_rgba(34,211,238,.25)]"

                                                >

                                                    <motion.div

                                                        animate={{
                                                            rotate: 360
                                                        }}

                                                        transition={{
                                                            duration: 12,
                                                            repeat: Infinity,
                                                            ease: "linear"
                                                        }}

                                                        className="absolute h-20 w-20 rounded-full border border-dashed border-cyan-300/30"

                                                    />

                                                    <svg

                                                        className="relative h-12 w-12"

                                                        viewBox="0 0 24 24"

                                                        fill="none"

                                                    >

                                                        <path

                                                            d="M12 3L4 7V12C4 17 7.4 21.4 12 22C16.6 21.4 20 17 20 12V7L12 3Z"

                                                            stroke="#22d3ee"

                                                            strokeWidth="1.8"

                                                        />

                                                        <path

                                                            d="M9.5 12L11.3 13.8L15.2 10"

                                                            stroke="#22d3ee"

                                                            strokeWidth="2"

                                                            strokeLinecap="round"

                                                            strokeLinejoin="round"

                                                        />

                                                    </svg>

                                                </motion.div>

                                                {/* Bottom Text */}

                                                <div className="absolute bottom-8 text-center">

                                                    <h3 className="text-xl font-bold text-white">

                                                        Secure Portal

                                                    </h3>

                                                    <p className="mt-2 text-sm text-slate-400">

                                                        The page doesn't exist anymore.

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                        {/* Floating Chips */}

                                        <motion.div

                                            animate={{
                                                y: [0, -8, 0]
                                            }}

                                            transition={{
                                                duration: 4,
                                                repeat: Infinity
                                            }}

                                            className="absolute left-4 top-16 rounded-xl border border-cyan-400/20 bg-slate-900/70 px-4 py-2 backdrop-blur-xl"

                                        >

                                            <div className="flex items-center gap-2">

                                                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />

                                                <span className="text-xs font-semibold text-cyan-300">

                                                    Protected

                                                </span>

                                            </div>

                                        </motion.div>

                                        <motion.div

                                            animate={{
                                                y: [0, 8, 0]
                                            }}

                                            transition={{
                                                duration: 5,
                                                repeat: Infinity
                                            }}

                                            className="absolute bottom-6 right-4 rounded-xl border border-indigo-400/20 bg-slate-900/70 px-4 py-2 backdrop-blur-xl"

                                        >

                                            <div className="flex items-center gap-2">

                                                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />

                                                <span className="text-xs font-semibold text-indigo-300">

                                                    ProfileFit

                                                </span>

                                            </div>

                                        </motion.div>

                                    </div>

                                </motion.div>

                            </motion.div>

                        </div>

                    </div>

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
                            delay: .35,
                            duration: .6
                        }}

                        className="mt-auto pt-10"

                    >

                        {/* Action Buttons */}

                        <div className="flex flex-wrap items-center justify-center gap-4">

                            <Link

                                to="/"

                                className="group relative overflow-hidden rounded-2xl"

                            >

                                <div className="absolute inset-0 bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-600 transition-transform duration-300 group-hover:scale-110" />

                                <div className="relative flex items-center gap-3 px-6 py-3 font-semibold text-white">

                                    <svg

                                        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"

                                        fill="none"

                                        stroke="currentColor"

                                        strokeWidth="2.5"

                                        viewBox="0 0 24 24"

                                    >

                                        <path

                                            strokeLinecap="round"

                                            strokeLinejoin="round"

                                            d="M15 19l-7-7 7-7"

                                        />

                                    </svg>

                                    Home

                                </div>

                            </Link>

                            <button

                                onClick={() => navigate(-1)}

                                className="cursor-pointer group rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400 hover:bg-white/10"

                            >

                                <span className="flex items-center gap-3">

                                    Go Back

                                    <svg

                                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"

                                        fill="none"

                                        stroke="currentColor"

                                        strokeWidth="2.5"

                                        viewBox="0 0 24 24"

                                    >

                                        <path

                                            strokeLinecap="round"

                                            strokeLinejoin="round"

                                            d="M9 5l7 7-7 7"

                                        />

                                    </svg>

                                </span>

                            </button>

                            <button

                                onClick={() => window.location.reload()}

                                className="cursor-pointer group rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-300 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400 hover:bg-white/10 hover:text-white"

                            >

                                <span className="flex items-center gap-3">

                                    <svg

                                        className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180"

                                        fill="none"

                                        stroke="currentColor"

                                        strokeWidth="2.5"

                                        viewBox="0 0 24 24"

                                    >

                                        <path

                                            strokeLinecap="round"

                                            strokeLinejoin="round"

                                            d="M4 4v6h6"

                                        />

                                        <path

                                            strokeLinecap="round"

                                            strokeLinejoin="round"

                                            d="M20 20v-6h-6"

                                        />

                                        <path

                                            strokeLinecap="round"

                                            strokeLinejoin="round"

                                            d="M20 9A8 8 0 005.3 5.3"

                                        />

                                        <path

                                            strokeLinecap="round"

                                            strokeLinejoin="round"

                                            d="M4 15a8 8 0 0014.7 3.7"

                                        />

                                    </svg>

                                    Reload

                                </span>

                            </button>

                        </div>

                        {/* Footer */}

                        <motion.p

                            animate={{
                                opacity: [.45, 1, .45]
                            }}

                            transition={{
                                duration: 3,
                                repeat: Infinity
                            }}

                            className="mt-6 text-center text-xs font-medium uppercase tracking-[0.35em] text-slate-500"

                        >

                            ProfileFit • Learn • Practice • Succeed

                        </motion.p>

                    </motion.div>
                </div>

            </div>

        </div>

    );

}