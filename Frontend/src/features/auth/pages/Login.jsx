import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="relative min-h-screen bg-slate-950">

            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl"></div>

                <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-3xl"></div>

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            </div>

            {/* Login Card */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6">

                <div className="w-full max-w-95 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">

                    {/* Logo */}
                    <div className="flex flex-col items-center">

                        <Link
                            to="/"
                            aria-label="Go to Home"
                            className="group mx-auto flex w-fit cursor-pointer justify-center"
                        >
                            <img
                                src="/logo.png"
                                alt="ProfileFit Logo"
                                className="h-15 w-15 object-contain brightness-110 transition-all duration-200 group-hover:brightness-150"
                            />
                        </Link>

                        <h1 className="mt-3 text-2xl font-semibold text-white">
                            Welcome Back
                        </h1>

                        <p className="mt-1 text-center text-sm text-slate-300">
                            Sign in to continue to ProfileFit
                        </p>

                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white transition-all duration-300 hover:border-indigo-400 hover:bg-white/10"
                    >
                        <FcGoogle size={20} />
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="my-4 flex items-center">

                        <div className="h-px flex-1 bg-white/10"></div>

                        <span className="px-3 text-[11px] uppercase tracking-[0.25em] text-slate-400">
                            OR
                        </span>

                        <div className="h-px flex-1 bg-white/10"></div>

                    </div>

                    {/* Form */}
                    <form className="space-y-3">

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-200">
                                Email
                            </label>

                            <div className="relative">

                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white/10"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-200">
                                Password
                            </label>

                            <div className="relative">

                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white/10"
                                />

                            </div>

                        </div>

                        <div className="flex justify-end">

                            <Link
                                to="/reset-password"
                                type="button"
                                className="cursor-pointer text-sm text-indigo-300 transition hover:text-indigo-200"
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        <button
                            type="submit"
                            className="h-11 w-full cursor-pointer rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98]"
                        >
                            Sign In
                        </button>

                    </form>

                    <p className="mt-4 text-center text-sm text-slate-300">

                        Don't have an account?{" "}

                        <Link to="/register" className="cursor-pointer font-medium text-indigo-300 transition hover:text-indigo-200">
                            Sign Up
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;