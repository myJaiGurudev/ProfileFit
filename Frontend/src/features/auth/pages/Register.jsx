import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { FiUser, FiMail, FiLock, FiArrowLeft, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import api from "../components/api";
import { Check } from "lucide-react";
import { useAuth } from "../../../Context/AuthContext";

const Register = () => {

    const [step, setStep] = useState(1);

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [resendingOtp, setResendingOtp] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [countdown, setCountdown] = useState(30);
    const otpRefs = useRef([]);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const clearOtp = () => {

        setOtp(["", "", "", "", "", ""]);

        setErrors({});

        setCountdown(30);

    };

    const clearPassword = () => {

        setFormData(prev => ({
            ...prev,
            password: "",
            confirmPassword: ""
        }));

        setShowPassword(false);

        setShowConfirmPassword(false);

        setErrors({});

    };

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

            clearOtp();
            clearPassword();

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setErrors({});

            navigate("/");

        }, 1000);

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

        if (!/^[0-9]?$/.test(value)) return;

        const updated = [...otp];

        updated[index] = value;

        setOtp(updated);

        setErrors(prev => ({
            ...prev,
            otp: ""
        }));

        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }

    };

    const handlePaste = (e) => {

        e.preventDefault();

        const pastedData = e.clipboardData.getData("text").trim();

        if (!/^\d{6}$/.test(pastedData)) return;

        const updatedOtp = pastedData.split("");

        setOtp(updatedOtp);

        setErrors(prev => ({
            ...prev,
            otp: ""
        }));

        requestAnimationFrame(() => {
            otpRefs.current[5]?.focus();
        });

    };

    const handleBackspace = (e, index) => {

        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1].focus();
        }

    };

    const nextStep = async () => {

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
            setSendingOtp(true);

            try {

                await api.post("/otp/send", {
                    username: formData.name,
                    email: formData.email,
                    purpose: "register"
                });

                clearOtp();
                clearPassword();

                setStep(2);

                requestAnimationFrame(() => {
                    otpRefs.current[0]?.focus();
                });

            } catch (error) {

                const field = error.response?.data?.field;

                setErrors(prev => ({
                    ...prev,
                    [field || "email"]: error.response?.data?.message || "Failed to send OTP."
                }));

            } finally {

                setSendingOtp(false);

            }
        }

    };

    const resendOtp = async () => {

        setResendingOtp(true);

        try {

            await api.post("/otp/send", {
                username: formData.name,
                email: formData.email,
                purpose: "register"
            });

            clearOtp();

            requestAnimationFrame(() => {
                otpRefs.current[0]?.focus();
            });

        } catch (error) {

            const field = error.response?.data?.field;

            setErrors(prev => ({
                ...prev,
                [field || "email"]: error.response?.data?.message || "Failed to send OTP."
            }));

        } finally {

            setResendingOtp(false);

        }

    };

    const verifyOtp = async () => {

        if (otp.join("").length !== 6) {
            clearOtp();
            setErrors({
                otp: "Enter a valid OTP"
            });
            requestAnimationFrame(() => {
                otpRefs.current[0]?.focus();
            });

            return;

        }

        setVerifyingOtp(true);

        try {

            await api.post("/otp/verify", {

                email: formData.email,
                otp: otp.join(""),
                purpose: "register"

            });
            clearOtp();
            clearPassword();

            setStep(3);

        } catch (error) {

            clearOtp();
            setErrors({

                otp: error.response?.data?.message || "Invalid OTP"

            });
            requestAnimationFrame(() => {
                otpRefs.current[0]?.focus();
            });

        } finally {

            setVerifyingOtp(false);

        }

    };

    const prevStep = () => {
        clearPassword();
        clearOtp();
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

        setCreatingAccount(true);

        try {
            const res = await api.post("/auth/register", {
                username: formData.name,
                email: formData.email,
                password: formData.password
            });
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }
            if (res.data.user) {
                setUser(res.data.user);
            }
            clearOtp();
            clearPassword();
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setErrors({});

            setStep(4);

        } catch (error) {

            setErrors(prev => ({

                ...prev,

                password: error.response?.data?.message || "Registration failed."

            }));

        } finally {

            setCreatingAccount(false);

        }

    };

    const handleGoogleLogin = async (credentialResponse) => {

        try {

            setSendingOtp(true);

            const res = await api.post("/auth/google-login", {
                token: credentialResponse.credential
            });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }

            if (res.data.user) {
                setUser(res.data.user);
            }
            setCreatingAccount(true);
            setStep(4);

            navigate("/");

        } catch (error) {

            console.log(error);

            setErrors({
                email: error.response?.data?.message || "Google Sign-In failed."
            });

        } finally {

            setSendingOtp(false);

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
                                className="h-15 w-15 object-contain brightness-110 transition-all duration-75 group-hover:brightness-150"
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
                                    duration: .25
                                }}
                                className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-600"
                            />

                        </div>

                    </div>

                    {/* Google */}

                    {
                        step === 1 && (

                            <>

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
                                                className={`h-11 w-full rounded-xl border bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-300 ${errors.email
                                                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                    : "border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                                    }`}
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
                                            disabled={sendingOtp}
                                            className={`flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white shadow-lg transition-all duration-300 ${sendingOtp
                                                ? "cursor-not-allowed bg-slate-700 opacity-60"
                                                : "cursor-pointer bg-linear-to-r from-indigo-500 to-violet-600 hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98]"
                                                }`}
                                        >

                                            {sendingOtp ? (
                                                <>
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                    Sending OTP...
                                                </>
                                            ) : (
                                                <>
                                                    Next
                                                    <FiArrowRight size={18} />
                                                </>
                                            )}

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
                                                    disabled={verifyingOtp || resendingOtp}
                                                    value={digit}
                                                    onChange={(e) => handleOtp(e.target.value, index)}
                                                    onPaste={handlePaste}
                                                    onKeyDown={(e) => handleBackspace(e, index)}
                                                    className={`h-12 w-12 rounded-xl border bg-white/5 text-center text-lg font-semibold text-white outline-none transition-all duration-300 ${errors.otp
                                                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                        : "border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                                        }`}
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

                                                <div className="flex items-center justify-center gap-2 text-sm">

                                                    <span className="text-slate-400">
                                                        Resend OTP in
                                                    </span>

                                                    <span className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-semibold tracking-wide text-indigo-300 animate-pulse">
                                                        {countdown}s
                                                    </span>

                                                </div>

                                                :

                                                <button
                                                    type="button"
                                                    onClick={resendOtp}
                                                    disabled={resendingOtp || verifyingOtp}
                                                    className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-800/40 px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 active:translate-y-0 active:scale-95"
                                                >

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180"
                                                    >
                                                        <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                                                        <polyline points="21 3 21 9 15 9" />
                                                    </svg>

                                                    <span>
                                                        {resendingOtp ? "Resending..." : "Resend OTP"}
                                                    </span>

                                                </button>
                                        }

                                    </div>

                                    <div className="flex items-center justify-between pt-2">

                                        <button
                                            type="button"
                                            onClick={() => {
                                                clearOtp();
                                                clearPassword();
                                                setStep(1);
                                                setCountdown(30);
                                            }}
                                            disabled={verifyingOtp || resendingOtp}
                                            className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-white transition hover:bg-white/10"
                                        >

                                            <FiArrowLeft size={18} />

                                            Back

                                        </button>

                                        <button
                                            type="button"
                                            onClick={verifyOtp}
                                            disabled={resendingOtp || verifyingOtp || otp.join("").length !== 6}
                                            className={`flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-all duration-300 ${resendingOtp || verifyingOtp || otp.join("").length !== 6
                                                ? "cursor-not-allowed bg-slate-700 text-slate-400 opacity-60"
                                                : "cursor-pointer bg-linear-to-r from-indigo-500 to-violet-600 text-white hover:scale-[1.02] hover:shadow-indigo-500/40"
                                                }`}
                                        >

                                            {
                                                verifyingOtp
                                                    ?
                                                    <>
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                        Verifying...
                                                    </>
                                                    :
                                                    <>
                                                        Verify OTP
                                                        <FiArrowRight size={18} />
                                                    </>
                                            }

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
                                                disabled={creatingAccount}
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
                                                disabled={creatingAccount}
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
                                                disabled={creatingAccount}
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
                                                disabled={creatingAccount}
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
                                            disabled={creatingAccount}
                                            className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-white transition hover:bg-white/10"
                                        >

                                            <FiArrowLeft size={18} />

                                            Back

                                        </button>

                                        <button
                                            type="submit"
                                            disabled={creatingAccount || !isPasswordValid}
                                            className={`flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white transition-all duration-300 ${creatingAccount || !isPasswordValid
                                                ? "cursor-not-allowed bg-slate-700 opacity-60"
                                                : "cursor-pointer bg-linear-to-r from-indigo-500 to-violet-600 hover:scale-[1.02] hover:shadow-indigo-500/40"
                                                }`}
                                        >
                                            {
                                                creatingAccount
                                                    ?
                                                    <>
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                        Creating Account...
                                                    </>
                                                    :
                                                    "Create Account"
                                            }
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

                                            <Check size={34} />

                                        </div>

                                    </div>

                                    <h2 className="mt-6 text-2xl font-semibold text-white">
                                        Welcome to ProfileFit!
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-400">
                                        <>
                                            Your account is ready.
                                            <br />
                                            We're preparing your personalized workspace.
                                        </>
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Signing you in...
                                    </p>

                                    <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">

                                        <motion.div
                                            initial={{ width: "100%" }}
                                            animate={{ width: "0%" }}
                                            transition={{ duration: 1, ease: "linear" }}
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