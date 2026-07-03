import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 20);

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    useEffect(() => {

        if (mobileMenu) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "auto";

        }

    }, [mobileMenu]);

    const closeMenu = () => setMobileMenu(false);

    return (

        <>

            <header
                className={`fixed top-0 left-0 w-full z-1000 transition-all duration-500 ${scrolled
                    ? "bg-white/75 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-b border-white/30"
                    : "bg-white/85 backdrop-blur-3xl"
                    }`}
            >

                <div className="absolute inset-0 overflow-hidden pointer-events-none">

                    <div className="absolute left-1/2 -top-30 h-72 w-225 -translate-x-1/2 rounded-full bg-linear-to-r from-cyan-400/30 via-blue-500/20 to-indigo-500/30 blur-[120px]" />

                </div>

                <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    <Link
                        to="/"
                        className="flex items-center gap-3 shrink-0"
                    >

                        <img
                            src="/logo.png"
                            alt="ProfileFit"
                            className="h-10 w-auto transition-transform duration-200 hover:scale-105 sm:h-11 lg:h-12"
                        />

                        <div className="leading-none">

                            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">

                                <span className="text-slate-900">

                                    Profile

                                </span>

                                <span className="bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">

                                    Fit

                                </span>

                            </h1>

                            <p className="hidden text-xs text-white sm:block">

                                Build.Resume.Grow.

                            </p>

                        </div>

                    </Link>

                    <div className="hidden items-center gap-8 lg:flex">
                        {/* Navigation Links */}
                        <div className="flex items-center gap-1">
                            {[
                                { label: "Features", href: "#features" },
                                { label: "FAQs", href: "#faq" }
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onMouseEnter={() => setHovered(item.label)}
                                    onMouseLeave={() => setHovered(null)}
                                    className="relative px-5 py-2.5 text-[15px] font-semibold text-slate-700 transition-colors duration-100 hover:text-sky-600"
                                >
                                    <span className="relative z-10">{item.label}</span>

                                    {/* Instant Underline Indicator */}
                                    <AnimatePresence>
                                        {hovered === item.label && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.05 }} // Fast 50ms fade-in/out to prevent lag
                                                className="absolute bottom-0 left-4 right-4 h-0.75 rounded-full bg-linear-to-r from-sky-500 via-cyan-400 to-blue-600"
                                            />
                                        )}
                                    </AnimatePresence>
                                </a>
                            ))}
                        </div>

                        {/* Login / Sign Up Button */}
                        <div className="transform transition-transform duration-100 hover:-translate-y-px active:scale-98">
                            <Link
                                to="/login"
                                className="group relative inline-flex overflow-hidden rounded-full p-px"
                            >
                                {/* Animated Gradient Border */}
                                <div className="absolute inset-0 bg-linear-to-r from-sky-500 via-cyan-500 to-blue-600 transition-transform duration-200 group-hover:scale-105" />

                                {/* Button Content */}
                                <div className="relative flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-200 group-hover:bg-slate-800">
                                    <span>Login / Sign Up</span>

                                    {/* Instant CSS translation instead of Framer Motion for the arrow */}
                                    <svg
                                        className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 12h14m-6-6l6 6-6 6"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <motion.button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        whileHover={{
                            scale: 1.05
                        }}
                        whileTap={{
                            scale: 0.96
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 650,
                            damping: 28
                        }}
                        className="rounded-xl border border-white/30 bg-white/40 p-2 text-slate-800 backdrop-blur-xl shadow-sm transition-[background-color,border-color,box-shadow] duration-150 hover:border-sky-300 hover:bg-white/80 hover:shadow-lg lg:hidden"
                        aria-label="Toggle Menu"
                    >

                        <HiOutlineMenuAlt3 className="h-7 w-7" />

                    </motion.button>

                </div>

            </header>
            <div
                className={`fixed inset-0 z-999 bg-black/40 backdrop-blur-sm transition-all duration-500 lg:hidden ${mobileMenu
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                    }`}
                onClick={closeMenu}
            >

                <div
                    className={`absolute right-0 top-0 flex h-screen w-[88%] max-w-sm flex-col border-l border-white/20 bg-white/80 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,.18)] transition-transform duration-200 ${mobileMenu
                        ? "translate-x-0"
                        : "translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >

                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                        <div className="flex items-center gap-3">

                            <img
                                src="/logo.png"
                                alt="ProfileFit"
                                className="h-10 w-auto"
                            />

                            <div>

                                <h2 className="text-xl font-bold">

                                    <span className="text-slate-900">

                                        Profile

                                    </span>

                                    <span className="bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">

                                        Fit

                                    </span>

                                </h2>

                            </div>

                        </div>

                        <button
                            onClick={closeMenu}
                            className="rounded-xl p-2 transition-all duration-75 hover:bg-red-50 hover:text-red-500"
                            aria-label="CloseMenu"
                        >

                            <HiX className="h-7 w-7" />

                        </button>

                    </div>

                    <div className="flex flex-1 flex-col space-y-2 px-6 py-8">

                        <NavLink
                            to="/"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `rounded-xl px-4 py-3 text-lg font-semibold transition-all duration-300 ${isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-slate-700 hover:bg-slate-100"
                                }`
                            }
                        >

                            Home

                        </NavLink>

                        <a
                            href="#features"
                            onClick={closeMenu}
                            className="mt-2 rounded-xl px-4 py-3 text-lg font-semibold text-slate-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-600"
                        >

                            Features

                        </a>

                        <a
                            href="#faq"
                            onClick={closeMenu}
                            className="mt-2 rounded-xl px-4 py-3 text-lg font-semibold text-slate-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-600"
                        >

                            FAQs

                        </a>

                        <Link
                            to="/login"
                            onClick={closeMenu}
                            className="group relative mt-10 overflow-hidden rounded-2xl"
                        >

                            <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600 transition-all duration-500 group-hover:scale-105" />

                            <div className="relative flex items-center justify-center gap-3 px-6 py-4 text-lg font-semibold text-white">

                                Login / Sign Up

                                <svg
                                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 12h14m-6-6l6 6-6 6"
                                    />

                                </svg>

                            </div>

                        </Link>

                    </div>

                    <div className="border-t border-slate-200 px-6 py-5">

                        <p className="text-center text-sm text-slate-500">

                            Build.Resume.Grow.

                        </p>

                    </div>

                </div>

            </div>

        </>

    );

}