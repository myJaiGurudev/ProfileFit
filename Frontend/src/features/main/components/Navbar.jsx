import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

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
                    ? "bg-white/65 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-b border-white/30"
                    : "bg-white/30 backdrop-blur-xl"
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
                            className="h-10 w-auto transition-transform duration-500 hover:scale-105 sm:h-11 lg:h-12"
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

                    <div className="hidden lg:flex">

                        <Link
                            to="/login"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px]"
                        >

                            <span className="absolute inset-0 bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600 transition-all duration-700 group-hover:rotate-180" />

                            <span className="relative inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-slate-800">

                                Login/SignUp

                                <svg
                                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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

                            </span>

                        </Link>

                    </div>

                    <button
                        onClick={() => setMobileMenu(true)}
                        className="rounded-xl p-2 text-slate-800 transition-all duration-300 hover:bg-white/60 lg:hidden"
                        aria-label="OpenMenu"
                    >

                        <HiOutlineMenuAlt3 className="h-7 w-7" />

                    </button>

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
                    className={`absolute right-0 top-0 flex h-screen w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 ${mobileMenu
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
                            className="rounded-lg p-2 transition hover:bg-slate-100"
                            aria-label="CloseMenu"
                        >

                            <HiX className="h-7 w-7" />

                        </button>

                    </div>

                    <div className="flex flex-1 flex-col px-6 py-8">

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

                        <Link
                            to="/login"
                            onClick={closeMenu}
                            className="mt-8 inline-flex items-center justify-center rounded-full bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-blue-500/30"
                        >

                            Login/SignUp

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