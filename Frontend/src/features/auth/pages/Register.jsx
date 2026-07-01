import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiMail, FiLock, FiArrowLeft, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
const Register = () => {

    const [step, setStep] = useState(1);

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

    };

    const nextStep = () => {

        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Invalid email address";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setStep(2);
        }

    };

    const prevStep = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const newErrors = {};

        if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = "Include at least one uppercase letter";
        }

        if (!/[0-9]/.test(formData.password)) {
            newErrors.password = "Include at least one number";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setLoading(true);

        try {

            console.log(formData);

            // API HERE

        }
        finally {

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

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6">

                <div className="w-full max-w-95 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">

                    {/* Logo */}

                    <div className="flex flex-col items-center">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 text-4xl font-bold text-white">
                            G
                        </div>

                        <h1 className="mt-3 text-2xl font-semibold text-white">
                            Create Account
                        </h1>

                        <p className="mt-1 text-center text-sm text-slate-300">
                            Join GateMentor and start your preparation
                        </p>

                    </div>

                    {/* Progress */}

                    <div className="mt-5">

                        <div className="mb-2 flex justify-between text-xs text-slate-400">

                            <span>
                                Step {step} of 2
                            </span>

                            <span>
                                {step === 1 ? "Basic Info" : "Security"}
                            </span>

                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">

                            <motion.div
                                animate={{
                                    width: step === 1 ? "50%" : "100%",
                                }}
                                transition={{
                                    duration: 0.35,
                                }}
                                className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-600"
                            />

                        </div>

                    </div>

                    {/* Google */}

                    <button
                        className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white transition-all duration-300 hover:border-indigo-400 hover:bg-white/10"
                    >

                        <FcGoogle size={20} />

                        Continue with Google

                    </button>

                    <div className="my-4 flex items-center">

                        <div className="h-px flex-1 bg-white/10"></div>

                        <span className="px-3 text-[11px] uppercase tracking-[0.25em] text-slate-400">
                            OR
                        </span>

                        <div className="h-px flex-1 bg-white/10"></div>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <AnimatePresence mode="wait">

                            {step === 1 && (

                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-3"
                                >

                                    <div>

                                        <label className="mb-1.5 block text-sm font-medium text-slate-200">
                                            Full Name
                                        </label>

                                        <div className="relative">

                                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className={`h-11 w-full rounded-xl border bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-300 ${errors.name
                                                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                    : "border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                                    }`}
                                            />
                                            {
                                                errors.name && (
                                                    <p className="mt-1 text-xs text-red-400">
                                                        {errors.name}
                                                    </p>
                                                )
                                            }

                                        </div>

                                    </div>

                                    <div>

                                        <label className="mb-1.5 block text-sm font-medium text-slate-200">
                                            Email
                                        </label>

                                        <div className="relative">

                                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="name@example.com"
                                                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white/10"
                                            />
                                            {
                                                errors.email &&
                                                <p className="mt-1 text-xs text-red-400">
                                                    {errors.email}
                                                </p>
                                            }

                                        </div>

                                    </div>
                                    <div className="flex justify-end pt-2">

                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 px-5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98]"
                                        >

                                            Next

                                            <FiArrowRight size={18} />

                                        </button>

                                    </div>

                                </motion.div>

                            )}

                            {step === 2 && (

                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-3"
                                >

                                    <div>

                                        <label className="mb-1.5 block text-sm font-medium text-slate-200">
                                            Password
                                        </label>

                                        <div className="relative">

                                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className={`h-11 w-full rounded-xl border bg-white/5 pl-10 pr-12 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-300 ${errors.password
                                                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                    : "border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                                    }`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-white"
                                            >
                                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                            </button>

                                        </div>

                                        {errors.password && (
                                            <p className="mt-1 text-xs text-red-400">
                                                {errors.password}
                                            </p>
                                        )}

                                    </div>

                                    <div>

                                        <label className="mb-1.5 block text-sm font-medium text-slate-200">
                                            Confirm Password
                                        </label>

                                        <div className="relative">

                                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className={`h-11 w-full rounded-xl border bg-white/5 pl-10 pr-12 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-300 ${errors.confirmPassword
                                                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                        : "border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                                    }`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-white"
                                            >
                                                {showConfirmPassword ? (
                                                    <FiEyeOff size={18} />
                                                ) : (
                                                    <FiEye size={18} />
                                                )}
                                            </button>

                                        </div>

                                        {errors.confirmPassword && (
                                            <p className="mt-1 text-xs text-red-400">
                                                {errors.confirmPassword}
                                            </p>
                                        )}

                                    </div>

                                    <div className="flex items-center justify-between pt-2">

                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-white transition hover:bg-white/10"
                                        >

                                            <FiArrowLeft size={18} />

                                            Back

                                        </button>

                                        <button
                                            type="submit"
                                            className="flex h-11 cursor-pointer items-center justify-center rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98]"
                                        >
                                            Create Account
                                        </button>

                                    </div>

                                </motion.div>

                            )}

                        </AnimatePresence>

                    </form>

                    <p className="mt-5 text-center text-sm text-slate-300">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-medium text-indigo-300 transition hover:text-indigo-200"
                        >
                            Sign In
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Register;