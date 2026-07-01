import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiMail, FiLock, FiArrowLeft, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
const Register = () => {

    const [step, setStep] = useState(1);

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [countdown, setCountdown] = useState(30);
    const otpRefs = useRef([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const passwordScore = [
        formData.password.length >= 8,
        /[A-Z]/.test(formData.password),
        /[a-z]/.test(formData.password),
        /[0-9]/.test(formData.password),
        /[^A-Za-z0-9]/.test(formData.password)
    ].filter(Boolean).length;

    const missingRequirements = [];

    if (formData.password.length < 8) {
        missingRequirements.push("8+ Characters");
    }

    if (!/[A-Z]/.test(formData.password)) {
        missingRequirements.push("Uppercase");
    }

    if (!/[a-z]/.test(formData.password)) {
        missingRequirements.push("Lowercase");
    }

    if (!/[0-9]/.test(formData.password)) {
        missingRequirements.push("Number");
    }

    if (!/[^A-Za-z0-9]/.test(formData.password)) {
        missingRequirements.push("Special Character");
    }

    const isPasswordValid = (
        missingRequirements.length === 0 &&
        formData.password === formData.confirmPassword &&
        formData.password.length > 0
    );

    useEffect(() => {

        if (step !== 2 || countdown === 0) return;

        const timer = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);

    }, [step, countdown]);

    useEffect(() => {

        if (step !== 4) return;

        const timer = setTimeout(() => {
            navigate("/login");
        }, 3000);

        return () => clearTimeout(timer);

    }, [step, navigate]);

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

    const handleOtp = (value, index) => {

        if (value.length > 1) {

            const pasted = value.slice(0, 6).split("");

            const updated = [...otp];

            pasted.forEach((digit, i) => {
                updated[i] = digit;
            });

            setOtp(updated);

            requestAnimationFrame(() => {
                otpRefs.current[Math.min(pasted.length - 1, 5)]?.focus();
            });

            return;

        }

        if (!/^[0-9]?$/.test(value)) return;

        const updated = [...otp];

        updated[index] = value;

        setOtp(updated);

        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }

    };

    const handleBackspace = (e, index) => {

        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1].focus();
        }

    };

    const nextStep = () => {

        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
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
            setLoading(true);

            setTimeout(() => {

                setLoading(false);

                setCountdown(30);

                setStep(2);

                requestAnimationFrame(() => {
                    otpRefs.current[0]?.focus();
                });

            }, 1200);
        }

    };

    const verifyOtp = () => {

        if (otp.join("").length !== 6) {

            setErrors({
                otp: "Enter a valid OTP"
            });

            return;

        }

        setErrors({});

        setStep(3);

    };

    const prevStep = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const newErrors = {};

        if (missingRequirements.length > 0) {
            newErrors.password = "Password does not meet all requirements.";
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
            setStep(4);
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
                            Create Account
                        </h1>

                        <p className="mt-1 text-center text-sm text-slate-300">
                            Join ProfileFit and start your preparation
                        </p>

                    </div>

                    {/* Progress */}

                    <div className="mt-5">

                        <div className="mb-2 flex justify-between text-xs text-slate-400">

                            <span>
                                Step {step} of 4
                            </span>

                            <span>
                                {
                                    step === 1
                                        ? "Basic Info"
                                        : step === 2
                                            ? "Verify Email"
                                            : step === 3
                                                ? "Security"
                                                : "Completed"
                                }
                            </span>

                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">

                            <motion.div
                                animate={{
                                    width:
                                        step === 1
                                            ? "25%"
                                            : step === 2
                                                ? "50%"
                                                : step === 3
                                                    ? "75%"
                                                    : "100%"
                                }}
                                transition={{
                                    duration: 0.35,
                                }}
                                className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-600"
                            />

                        </div>

                    </div>

                    {/* Google */}

                    {
                        step === 1 && (

                            <>

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

                            </>

                        )
                    }

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
                                            Name
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
                                    transition={{ duration: .25 }}
                                    className="space-y-4"
                                >

                                    <h2 className="text-center text-xl font-semibold text-white">
                                        Verify Email
                                    </h2>

                                    <p className="text-center text-sm text-slate-400">
                                        We've sent a verification code to
                                    </p>

                                    <p className="text-center text-sm font-medium text-indigo-300">
                                        {formData.email}
                                    </p>

                                    <div className="flex justify-center gap-3">

                                        {
                                            otp.map((digit, index) => (

                                                <input
                                                    key={index}
                                                    ref={(el) => otpRefs.current[index] = el}
                                                    type="text"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handleOtp(e.target.value, index)}
                                                    onKeyDown={(e) => handleBackspace(e, index)}
                                                    className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 text-center text-lg font-semibold text-white outline-none transition-all duration-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                                />

                                            ))
                                        }

                                    </div>

                                    {
                                        errors.otp && (

                                            <p className="text-center text-xs text-red-400">
                                                {errors.otp}
                                            </p>

                                        )
                                    }

                                    <div className="flex justify-center">

                                        {
                                            countdown > 0
                                                ?

                                                <p className="text-sm text-slate-400">

                                                    Resend OTP in{" "}

                                                    <span className="text-indigo-300">
                                                        {countdown}s
                                                    </span>

                                                </p>

                                                :

                                                <button
                                                    type="button"
                                                    onClick={() => {

                                                        setOtp(["", "", "", "", "", ""]);

                                                        setCountdown(30);

                                                        requestAnimationFrame(() => {
                                                            otpRefs.current[0]?.focus();
                                                        });

                                                    }}
                                                    className="cursor-pointer text-sm font-medium text-indigo-300 transition hover:text-indigo-200"
                                                >

                                                    Resend OTP

                                                </button>

                                        }

                                    </div>

                                    <div className="flex items-center justify-between pt-2">

                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-white transition hover:bg-white/10"
                                        >

                                            <FiArrowLeft size={18} />

                                            Back

                                        </button>

                                        <button
                                            type="button"
                                            onClick={verifyOtp}
                                            disabled={otp.join("").length !== 6}
                                            className={`flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-all duration-300 ${otp.join("").length !== 6
                                                ? "cursor-not-allowed bg-slate-700 text-slate-400 opacity-60"
                                                : "cursor-pointer bg-linear-to-r from-indigo-500 to-violet-600 text-white hover:scale-[1.02] hover:shadow-indigo-500/40"
                                                }`}
                                        >

                                            Verify OTP

                                            <FiArrowRight size={18} />

                                        </button>

                                    </div>

                                </motion.div>

                            )}

                            {step === 3 && (

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

                                        <div className="mt-4">

                                            <div className="mb-2 flex justify-between text-xs">

                                                <span className="text-slate-400">
                                                    Password Strength
                                                </span>

                                                <span className={`font-medium ${passwordScore === 5
                                                    ? "text-green-400"
                                                    : passwordScore >= 3
                                                        ? "text-yellow-400"
                                                        : "text-red-400"
                                                    }`}>

                                                    {
                                                        passwordScore === 5
                                                            ? "Strong"
                                                            : passwordScore >= 3
                                                                ? "Medium"
                                                                : "Weak"
                                                    }

                                                </span>

                                            </div>

                                            <div className="h-2 overflow-hidden rounded-full bg-white/10">

                                                <div
                                                    className={`h-full rounded-full transition-all duration-300 ${passwordScore === 5
                                                        ? "w-full bg-green-500"
                                                        : passwordScore >= 3
                                                            ? "w-2/3 bg-yellow-500"
                                                            : "w-1/3 bg-red-500"
                                                        }`}
                                                />

                                            </div>

                                            {
                                                formData.password && (

                                                    <div className="mt-3">

                                                        {
                                                            missingRequirements.length > 0
                                                                ?

                                                                <div>

                                                                    <p className="mb-2 text-xs font-medium text-amber-400">
                                                                        Missing Requirements
                                                                    </p>

                                                                    <div className="flex flex-wrap gap-2">

                                                                        {
                                                                            missingRequirements.map((item, index) => (

                                                                                <span
                                                                                    key={index}
                                                                                    className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300"
                                                                                >

                                                                                    {item}

                                                                                </span>

                                                                            ))
                                                                        }

                                                                    </div>

                                                                </div>

                                                                :

                                                                <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-3 text-sm text-green-400">

                                                                    ✓

                                                                    Password meets all security requirements

                                                                </div>

                                                        }

                                                    </div>

                                                )

                                            }

                                        </div>

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

                                        {
                                            isPasswordValid && (

                                                <p className="mt-2 text-xs text-green-400">
                                                    ✓ Passwords match
                                                </p>

                                            )
                                        }

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
                                            disabled={loading || !isPasswordValid}
                                            className={`flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold text-white transition-all duration-300 ${loading || !isPasswordValid
                                                ? "cursor-not-allowed bg-slate-700 opacity-60"
                                                : "cursor-pointer bg-linear-to-r from-indigo-500 to-violet-600 hover:scale-[1.02] hover:shadow-indigo-500/40"
                                                }`}
                                        >
                                            Create Account
                                        </button>

                                    </div>

                                </motion.div>

                            )}

                            {step === 4 && (

                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, scale: .9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: .35 }}
                                    className="py-8 text-center"
                                >

                                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">

                                            ✓

                                        </div>

                                    </div>

                                    <h2 className="mt-6 text-2xl font-semibold text-white">
                                        Registration Successful
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-400">
                                        Your ProfileFit account has been created successfully.
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Redirecting to Login in 3 seconds...
                                    </p>

                                    <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">

                                        <motion.div
                                            initial={{ width: "100%" }}
                                            animate={{ width: "0%" }}
                                            transition={{ duration: 3, ease: "linear" }}
                                            className="h-full rounded-full bg-linear-to-r from-green-400 to-emerald-500"
                                        />

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