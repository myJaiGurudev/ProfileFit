import React, { useState, useEffect } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import api from "../components/api";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../../Context/AuthContext";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const { setUser } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await api.post("/auth/login", {
                email,
                password
            });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }

            if (res.data.user) {
                setUser(res.data.user);
            }

            setLoginSuccess(true);
            setStep(2);

        } catch (error) {

            setEmail("");
            setPassword("");

            setLoginSuccess(false);
            setStep(2);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (step !== 2) return;

        const timer = setTimeout(() => {

            if (loginSuccess) {

                navigate("/");

            } else {

                setPassword("");
                setStep(1);

            }

        }, loginSuccess ? 1000 : 2000);

        return () => clearTimeout(timer);

    }, [step, loginSuccess, navigate]);

    const handleGoogleLogin = async (credentialResponse) => {

        try {

            setLoading(true);

            const res = await api.post("/auth/google-login", {
                token: credentialResponse.credential
            });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }

            if (res.data.user) {
                setUser(res.data.user);
            }

            setLoginSuccess(true);
            setStep(2);

        } catch (error) {

            console.log(error);

            console.log(error.response);

            console.log(error.response?.data);

            setLoginSuccess(false);
            setStep(2);

        } finally {

            setLoading(false);

        }

    };

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
                    {
                        step === 1 && (
                            <>
                                {/* Logo */}
                                < div className="flex flex-col items-center">

                                    <Link
                                        to="/"
                                        aria-label="Go to Home"
                                        className="group mx-auto flex w-fit cursor-pointer justify-center"
                                    >
                                        <img
                                            src="/logo.png"
                                            alt="ProfileFit Logo"
                                            className="h-15 w-15 object-contain brightness-110 transition-all duration-75 group-hover:brightness-150"
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
                                <div className="mt-5 flex justify-center">

                                    <GoogleLogin
                                        theme="outline"
                                        shape="pill"
                                        size="large"
                                        width="250"
                                        text="continue_with"
                                        onSuccess={handleGoogleLogin}
                                        onError={() => {
                                            setLoginSuccess(false);
                                            setStep(2);
                                        }}
                                    />

                                </div>

                                {/* Divider */}
                                <div className="my-4 flex items-center">

                                    <div className="h-px flex-1 bg-white/10"></div>

                                    <span className="px-3 text-[11px] uppercase tracking-[0.25em] text-slate-400">
                                        OR
                                    </span>

                                    <div className="h-px flex-1 bg-white/10"></div>

                                </div>

                                {/* Form */}

                                <form className="space-y-3" onSubmit={handleLogin}>

                                    <div>

                                        <label className="mb-1.5 block text-sm font-medium text-slate-200">
                                            Email
                                        </label>

                                        <div className="relative">

                                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
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
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
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
                                        disabled={
                                            loading ||
                                            !email.trim() ||
                                            !password.trim()
                                        }
                                        type="submit"
                                        className={`h-11 w-full rounded-xl text-sm font-semibold text-white transition-all duration-300 ${loading || !email.trim() || !password.trim()
                                            ? "cursor-not-allowed bg-slate-700 opacity-60"
                                            : "cursor-pointer bg-linear-to-r from-indigo-500 to-violet-600 hover:scale-[1.02] hover:shadow-indigo-500/40"
                                            }`}
                                    >
                                        {loading ? "Signing In..." : "Sign In"}
                                    </button>

                                </form>
                            </>
                        )
                    }

                    {
                        step === 2 && (

                            <motion.div
                                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="py-4 text-center"
                            >
                                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">

                                    ProfileFit

                                </p>
                                <div
                                    className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${loginSuccess
                                        ? "bg-green-500/10 ring-8 ring-green-500/5"
                                        : "bg-red-500/10 ring-8 ring-red-500/5"
                                        }`}
                                >

                                    <div
                                        className={`flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold text-white ${loginSuccess
                                            ? "bg-green-500 shadow-lg shadow-green-500/30"
                                            : "bg-red-500 shadow-lg shadow-red-500/30"
                                            }`}
                                    >

                                        {loginSuccess ?
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-8 w-8"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={3}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg> :
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-8 w-8"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={3}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        }

                                    </div>

                                </div>

                                <h2 className="mt-8 text-3xl font-bold tracking-tight text-white">

                                    {
                                        loginSuccess
                                            ? "Welcome Back!"
                                            : "Login Failed"
                                    }

                                </h2>

                                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-400">

                                    {
                                        loginSuccess
                                            ? "We're preparing your personalized ProfileFit dashboard."
                                            : (
                                                <>
                                                    The email or password you entered is incorrect.
                                                    <br />
                                                    Please try again.
                                                </>
                                            )
                                    }

                                </p>

                                <div
                                    className={`mx-auto mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium ${loginSuccess
                                        ? "border-green-500/20 bg-green-500/10 text-green-300"
                                        : "border-red-500/20 bg-red-500/10 text-red-300"
                                        }`}
                                >

                                    <span className="h-2 w-2 rounded-full bg-current animate-pulse"></span>

                                    {
                                        loginSuccess
                                            ? "Preparing your workspace..."
                                            : "Returning to Sign In..."
                                    }

                                </div>

                                <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">

                                    <motion.div
                                        initial={{ width: "100%" }}
                                        animate={{ width: "0%" }}
                                        transition={{
                                            duration: loginSuccess ? 1 : 2,
                                            ease: "linear"
                                        }}
                                        className={`h-full rounded-full ${loginSuccess
                                            ? "bg-linear-to-r from-green-400 via-emerald-500 to-green-600"
                                            : "bg-linear-to-r from-red-400 via-rose-500 to-red-600"
                                            }`}
                                    />

                                </div>

                                <p className="mt-3 text-xs tracking-wide text-slate-500">

                                    You'll be there in just a moment.

                                </p>

                            </motion.div>

                        )
                    }

                    {
                        step === 1 && (

                            <p className="mt-4 text-center text-sm text-slate-300">

                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    className="cursor-pointer font-medium text-indigo-300 transition hover:text-indigo-200"
                                >
                                    Sign Up
                                </Link>

                            </p>

                        )
                    }

                </div>

            </div>

        </div >
    );
};

export default Login;