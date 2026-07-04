import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiHome, FiUser, FiSettings, FiLogOut, FiChevronDown, FiGrid, FiHelpCircle, FiFileText } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../Context/AuthContext";
import { HiOutlineQueueList } from "react-icons/hi2";

export default function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [hovered, setHovered] = useState(null);
    const { user, logout } = useAuth();
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();

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

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {

                setProfileOpen(false);

            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);

    const closeMenu = () => setMobileMenu(false);

    const handleLogout = async () => {
        await logout();
        setProfileOpen(false);
        navigate("/login");
    };

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

                        </div>

                    </Link>

                    <div className="hidden items-center gap-8 lg:flex">
                        {/* Navigation Links */}
                        <div className="flex items-center gap-1">
                            {[
                                { label: "WorkFlow", href: "#workflow" },
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
                        {
                            !user ? (

                                <div className="transform transition-transform duration-100 hover:-translate-y-px active:scale-98">

                                    <Link
                                        to="/login"
                                        className="group relative inline-flex overflow-hidden rounded-full p-px"
                                    >

                                        <div className="absolute inset-0 bg-linear-to-r from-sky-500 via-cyan-500 to-blue-600 transition-transform duration-200 group-hover:scale-105" />

                                        <div className="relative flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-200 group-hover:bg-slate-800">

                                            <span>

                                                Login / Sign Up

                                            </span>

                                            <svg
                                                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
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

                            ) : (

                                <div
                                    ref={profileRef}
                                    className="relative"
                                >

                                    <button
                                        onClick={() => setProfileOpen(!profileOpen)}
                                        className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-2 py-2 transition-all duration-200 hover:border-sky-400 hover:shadow-lg"
                                    >

                                        {
                                            user.profilePicture ?

                                                <img
                                                    src={user.profilePicture}
                                                    alt={user.username}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />

                                                :

                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-cyan-500 text-lg font-bold text-white">

                                                    {user.username?.charAt(0).toUpperCase()}

                                                </div>

                                        }

                                        <FiChevronDown
                                            className={`transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                                        />

                                    </button>

                                    <AnimatePresence>

                                        {
                                            profileOpen && (

                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: 8,
                                                        scale: 0.96
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 1
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: 8,
                                                        scale: 0.96
                                                    }}
                                                    transition={{
                                                        duration: 0.18
                                                    }}
                                                    className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                                                >

                                                    <div className="border-b border-slate-100 px-5 py-4">

                                                        <p className="font-semibold text-slate-900">

                                                            {user.username}

                                                        </p>

                                                        <p className="truncate text-sm text-slate-500">

                                                            {user.email}

                                                        </p>

                                                    </div>

                                                    <Link
                                                        to="/profile"
                                                        onClick={() => setProfileOpen(false)}
                                                        className="flex items-center gap-3 px-5 py-3 text-slate-700 transition hover:bg-slate-50"
                                                    >

                                                        <FiUser />

                                                        Profile

                                                    </Link>

                                                    <Link
                                                        to="/settings"
                                                        onClick={() => setProfileOpen(false)}
                                                        className="flex items-center gap-3 px-5 py-3 text-slate-700 transition hover:bg-slate-50"
                                                    >

                                                        <FiSettings />

                                                        Settings

                                                    </Link>

                                                    <motion.button
                                                        whileHover={{
                                                            y: -2,
                                                            scale: 1.02
                                                        }}
                                                        whileTap={{
                                                            scale: 0.97
                                                        }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 500,
                                                            damping: 25
                                                        }}
                                                        onClick={async () => {

                                                            await handleLogout();

                                                            closeMenu();

                                                        }}
                                                        className="group relative flex w-full cursor-pointer items-center overflow-hidden rounded-2xl border border-red-200/70 bg-linear-to-r from-red-50 via-white to-red-50 px-4 py-3 text-left shadow-sm transition-all duration-300 hover:border-red-400 hover:shadow-lg hover:shadow-red-500/15"
                                                    >

                                                        <div className="absolute inset-0 bg-linear-to-r from-red-500 to-rose-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                                        <div className="relative flex w-full items-center justify-between">

                                                            <div className="flex items-center gap-3">

                                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500 transition-all duration-300 group-hover:bg-white/20 group-hover:text-white">

                                                                    <FiLogOut className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />

                                                                </div>

                                                                <div>

                                                                    <p className="font-semibold text-red-600 transition-colors duration-300 group-hover:text-white">

                                                                        Logout

                                                                    </p>

                                                                    <p className="text-xs text-red-400 transition-colors duration-300 group-hover:text-red-100">

                                                                        End your current session

                                                                    </p>

                                                                </div>

                                                            </div>

                                                            <svg
                                                                className="h-5 w-5 text-red-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
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

                                                        </div>

                                                    </motion.button>

                                                </motion.div>

                                            )
                                        }

                                    </AnimatePresence>

                                </div>

                            )
                        }
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

                        {
                            !user ? (

                                <>

                                    <NavLink
                                        to="/"
                                        onClick={closeMenu}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                                    >

                                        <FiHome />

                                        Home

                                    </NavLink>

                                    <NavLink
                                        to="/analyze-resume"
                                        onClick={closeMenu}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                                    >

                                        <FiFileText />

                                        Analyze Resume

                                    </NavLink>

                                    <a
                                        href="#workflow"
                                        onClick={closeMenu}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                                    >

                                        <HiOutlineQueueList />

                                        WorkFlow

                                    </a>

                                    <a
                                        href="#faq"
                                        onClick={closeMenu}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                                    >

                                        <FiHelpCircle />

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

                                </>

                            ) : (

                                <div>

                                    <div className="mb-5 flex items-center gap-4">

                                        {
                                            user.profilePicture ?

                                                <div className="relative shrink-0">

                                                    <div className="absolute inset-0 rounded-full bg-blue-500/25 blur-md" />

                                                    <img
                                                        src={user.profilePicture}
                                                        alt={user.username}
                                                        className="relative h-15 w-15 rounded-full border-3 border-white object-cover shadow-[0_10px_25px_rgba(59,130,246,0.25)]"
                                                    />

                                                </div>

                                                :

                                                <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-500 via-blue-600 to-indigo-700 text-2xl font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.35)]">

                                                    {user.username?.charAt(0).toUpperCase()}

                                                </div>

                                        }

                                        <div className="min-w-0 flex-1">

                                            <h3 className="truncate bg-linear-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-[18px] font-extrabold tracking-tight text-transparent">

                                                {user.username}

                                            </h3>

                                            <p className="mt-1 truncate text-[15px] font-medium text-zinc-700 tracking-wide">

                                                {user.email}

                                            </p>

                                        </div>

                                    </div>

                                    <div className="mb-5 h-px bg-linear-to-r from-transparent via-slate-300 to-transparent" />

                                    <div className="mt-5 space-y-2">

                                        <NavLink
                                            to="/"
                                            onClick={closeMenu}
                                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                                        >

                                            <FiHome />

                                            Home

                                        </NavLink>

                                        <NavLink
                                            to="/analyze-resume"
                                            onClick={closeMenu}
                                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                                        >

                                            <FiFileText />

                                            Analyze Resume

                                        </NavLink>

                                        <Link
                                            to="/profile"
                                            onClick={closeMenu}
                                            className="cursor-pointer flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                                        >

                                            <FiUser />

                                            Profile

                                        </Link>

                                        <Link
                                            to="/settings"
                                            onClick={closeMenu}
                                            className="cursor-pointer flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                                        >

                                            <FiSettings />

                                            Settings

                                        </Link>

                                        <a
                                            href="#workflow"
                                            onClick={closeMenu}
                                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                                        >

                                            <HiOutlineQueueList />

                                            WorkFlow

                                        </a>

                                        <a
                                            href="#faq"
                                            onClick={closeMenu}
                                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                                        >

                                            <FiHelpCircle />

                                            FAQs

                                        </a>

                                        <motion.button
                                            whileHover={{
                                                y: -2,
                                                scale: 1.02
                                            }}
                                            whileTap={{
                                                scale: 0.97
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 25
                                            }}
                                            onClick={async () => {
                                                closeMenu();
                                                await handleLogout();
                                            }}
                                            className="group relative flex w-full cursor-pointer items-center overflow-hidden rounded-2xl border border-red-200/70 bg-linear-to-r from-red-50 via-white to-red-50 px-4 py-3 text-left shadow-sm transition-all duration-300 hover:border-red-400 hover:shadow-lg hover:shadow-red-500/15"
                                        >

                                            <div className="absolute inset-0 bg-linear-to-r from-red-500 to-rose-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                            <div className="relative flex w-full items-center justify-between">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500 transition-all duration-300 group-hover:bg-white/20 group-hover:text-white">

                                                        <FiLogOut className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />

                                                    </div>

                                                    <div>

                                                        <p className="font-semibold text-red-600 transition-colors duration-300 group-hover:text-white">

                                                            Logout

                                                        </p>

                                                        <p className="text-xs text-red-400 transition-colors duration-300 group-hover:text-red-100">

                                                            End your current session

                                                        </p>

                                                    </div>

                                                </div>

                                                <svg
                                                    className="h-5 w-5 text-red-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
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

                                            </div>

                                        </motion.button>

                                    </div>

                                </div>

                            )
                        }

                    </div>

                </div>

            </div>

        </>

    );

}