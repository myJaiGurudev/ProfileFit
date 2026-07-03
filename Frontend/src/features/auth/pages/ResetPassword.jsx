import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMail, FiLock, FiArrowLeft, FiArrowRight, FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../components/api";

const ResetPassword = () => {

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [resendingOtp, setResendingOtp] = useState(false);
    const [resettingPassword, setResettingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const navigate = useNavigate();

    const passwordScore = [
        newPassword.length >= 8,
        /[A-Z]/.test(newPassword),
        /[a-z]/.test(newPassword),
        /[0-9]/.test(newPassword),
        /[^A-Za-z0-9]/.test(newPassword)
    ].filter(Boolean).length;

    const missingRequirements = [];

    if (newPassword && !/[A-Z]/.test(newPassword)) {
        missingRequirements.push("One uppercase letter");
    }

    if (newPassword && !/[a-z]/.test(newPassword)) {
        missingRequirements.push("One lowercase letter");
    }

    if (newPassword && !/[0-9]/.test(newPassword)) {
        missingRequirements.push("One number");
    }

    if (newPassword && !/[^A-Za-z0-9]/.test(newPassword)) {
        missingRequirements.push("One special character");
    }

    if (newPassword && newPassword.length < 8) {
        missingRequirements.push("At least 8 characters");
    }

    const isPasswordValid = (
        missingRequirements.length === 0 &&
        newPassword === confirmPassword &&
        newPassword.length > 0
    );

    const otpRefs = useRef([]);

    const clearOtp = () => {

        setOtp(["", "", "", "", "", ""]);

        setErrors({});

        setCountdown(30);

    };

    const clearPassword = () => {

        setNewPassword("");

        setConfirmPassword("");

        setShowPassword(false);

        setShowConfirmPassword(false);

        setErrors({});

    };

    useEffect(() => {

        if (step !== 2 || countdown === 0) return;

        const timer = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);

    }, [step, countdown]);

    const sendOtp = async () => {

        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length) return;

        setSendingOtp(true);

        try {

            await api.post("/otp/send", {

                email,
                purpose: "reset"

            });

            clearOtp();

            setStep(2);

            requestAnimationFrame(() => {
                otpRefs.current[0]?.focus();
            });

        } catch (error) {

            setErrors({

                email: error.response?.data?.message || "Failed to send OTP."

            });

        } finally {

            setSendingOtp(false);

        }

    };

    const resendOtp = async () => {

        setResendingOtp(true);

        try {

            await api.post("/otp/send", {

                email,
                purpose: "reset"

            });

            clearOtp();

            requestAnimationFrame(() => {
                otpRefs.current[0]?.focus();
            });

        } catch (error) {

            setErrors({

                otp: error.response?.data?.message || "Failed to resend OTP."

            });

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

                email,

                otp: otp.join(""),

                purpose: "reset"

            });

            clearOtp();

            clearPassword();

            setStep(3);

        } catch (error) {

            setErrors({

                otp: error.response?.data?.message || "Invalid OTP."

            });

        } finally {

            setVerifyingOtp(false);

        }

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

    const resetPassword = async (e) => {

        e.preventDefault();

        const newErrors = {};

        if (missingRequirements.length > 0) {
            newErrors.password = "Password does not meet all requirements.";
        }

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length) return;

        setResettingPassword(true);

        try {

            await api.post("/auth/reset-password", {

                email,

                newPassword: newPassword

            });

            clearOtp();

            clearPassword();

            setStep(4);

        } catch (error) {

            setErrors({

                password: error.response?.data?.message || "Failed to reset password."

            });

        } finally {

            setResettingPassword(false);

        }

    };

    useEffect(() => {

        if (step !== 4) return;

        const timer = setTimeout(() => {
            clearOtp();
            clearPassword();
            setEmail("");
            navigate("/login");
        }, 3000);

        return () => clearTimeout(timer);

    }, [step, navigate]);

    return (

        <div className="relative min-h-screen bg-slate-950">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl"></div>

                <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl"></div>

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            </div>

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6">

                <div className="w-full max-w-97.5 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-[0_0_60px_rgba(79,70,229,.15)] backdrop-blur-xl">

                    <div className="text-center">

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
                            Reset Password
                        </h1>

                        <p className="mt-1 text-sm text-slate-300">
                            Recover your ProfileFit account
                        </p>

                    </div>

                    <div className="mt-5 h-1.5 rounded-full bg-white/10">

                        <motion.div
                            animate={{
                                width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%"
                            }}
                            transition={{
                                duration: .35
                            }}
                            className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-600"
                        />

                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (

                            <motion.div
                                key="email"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: .3 }}
                                className="mt-5"
                            >

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-slate-200">
                                        Email Address
                                    </label>

                                    <div className="relative">

                                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setErrors(prev => ({
                                                    ...prev,
                                                    email: ""
                                                }));
                                            }}
                                            placeholder="name@example.com"
                                            className={`h-11 w-full rounded-xl border bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-300 ${errors.email
                                                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                : "border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                                }`}
                                        />

                                    </div>

                                    {
                                        errors.email && (
                                            <p className="mt-1 text-xs text-red-400">
                                                {errors.email}
                                            </p>
                                        )
                                    }

                                </div>

                                <button
                                    type="button"
                                    onClick={sendOtp}
                                    disabled={sendingOtp}
                                    className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                                >

                                    {
                                        sendingOtp
                                            ?
                                            "Sending OTP..."
                                            :
                                            <>
                                                Send OTP
                                                <FiArrowRight />
                                            </>
                                    }

                                </button>

                                <div className="mt-5 text-center">

                                    <button
                                        type="button"
                                        disabled={sendingOtp}
                                        onClick={() => navigate("/login")}
                                        className="cursor-pointer text-sm text-indigo-300 transition hover:text-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Back to Login
                                    </button>

                                </div>

                            </motion.div>

                        )}

                        {step === 2 && (

                            <motion.div
                                key="otp"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: .3 }}
                                className="mt-5"
                            >

                                <h2 className="text-center text-lg font-semibold text-white">
                                    Verify OTP
                                </h2>

                                <p className="mt-2 text-center text-sm text-slate-400">
                                    Enter the 6-digit code sent to
                                </p>

                                <p className="mt-1 text-center text-indigo-300">
                                    {email}
                                </p>

                                <div className="mt-6 flex justify-center gap-2">

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
                                                className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 text-center text-lg font-semibold text-white outline-none transition-all duration-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                            />

                                        ))
                                    }

                                </div>

                                {
                                    errors.otp && (
                                        <p className="mt-2 text-center text-xs text-red-400">
                                            {errors.otp}
                                        </p>
                                    )
                                }

                                <div className="mt-5 flex justify-center">

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

                                <div className="mt-6 flex gap-3">

                                    <button
                                        type="button"
                                        onClick={() => {
                                            clearOtp();
                                            clearPassword();
                                            setCountdown(30);
                                            setStep(1);
                                        }}
                                        disabled={verifyingOtp || resendingOtp}
                                        className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                                    >

                                        <FiArrowLeft />

                                        Back

                                    </button>

                                    <button
                                        type="button"
                                        onClick={verifyOtp}
                                        disabled={resendingOtp || verifyingOtp || otp.join("").length !== 6}
                                        className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-xl transition-all duration-300 ${resendingOtp || verifyingOtp || otp.join("").length !== 6
                                            ? "cursor-not-allowed bg-slate-700 text-slate-400"
                                            : "cursor-pointer bg-linear-to-r from-indigo-500 to-violet-600 text-white hover:scale-[1.02]"
                                            }`}
                                    >

                                        {
                                            verifyingOtp
                                                ? "Verifying..."
                                                : <>
                                                    Verify
                                                    <FiArrowRight />
                                                </>
                                        }

                                    </button>

                                </div>

                            </motion.div>

                        )}
                        {step === 3 && (

                            <motion.div
                                key="password"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: .3 }}
                                className="mt-5"
                            >

                                <div className="mt-5">

                                    <label className="mb-1.5 block text-sm font-medium text-slate-200">
                                        New Password
                                    </label>

                                    <div className="relative">

                                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            disabled={resettingPassword}
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                setErrors(prev => ({
                                                    ...prev,
                                                    password: "",
                                                    confirmPassword: ""
                                                }));
                                            }}
                                            placeholder="••••••••"
                                            className={`h-11 w-full rounded-xl border bg-white/5 pl-10 pr-11 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-300 ${errors.password
                                                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                : "border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                                }`}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={resettingPassword}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
                                        >

                                            {
                                                showPassword
                                                    ?
                                                    <FiEyeOff />
                                                    :
                                                    <FiEye />
                                            }

                                        </button>

                                    </div>

                                    {
                                        errors.password && (
                                            <p className="mt-1 text-xs text-red-400">
                                                {errors.password}
                                            </p>
                                        )
                                    }

                                </div>

                                <div className="mt-4">

                                    <div className="mb-2 flex justify-between text-xs">

                                        <span className="text-slate-400">
                                            Password Strength
                                        </span>

                                        <span
                                            className={`font-medium ${passwordScore === 5
                                                ? "text-green-400"
                                                : passwordScore >= 3
                                                    ? "text-yellow-400"
                                                    : "text-red-400"
                                                }`}
                                        >

                                            {
                                                passwordScore === 5
                                                    ? "Strong Password"
                                                    : passwordScore >= 3
                                                        ? "Medium Password"
                                                        : "Weak Password"
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
                                        newPassword && (

                                            <div className="mt-3">

                                                {
                                                    missingRequirements.length > 0 ? (

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

                                                    ) : (

                                                        <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-3 text-sm text-green-400">

                                                            <FiCheckCircle size={18} />

                                                            <span>Password meets all security requirements</span>

                                                        </div>

                                                    )
                                                }

                                            </div>

                                        )
                                    }

                                </div>

                                <div className="mt-5">

                                    <label className="mb-1.5 block text-sm font-medium text-slate-200">
                                        Confirm Password
                                    </label>

                                    <div className="relative">

                                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            disabled={resettingPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                setErrors(prev => ({
                                                    ...prev,
                                                    confirmPassword: "",
                                                    password: ""
                                                }));
                                            }}
                                            placeholder="••••••••"
                                            className={`h-11 w-full rounded-xl border bg-white/5 pl-10 pr-11 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-300 ${errors.confirmPassword
                                                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                : "border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                                }`}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            disabled={resettingPassword}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
                                        >

                                            {
                                                showConfirmPassword
                                                    ?
                                                    <FiEyeOff />
                                                    :
                                                    <FiEye />
                                            }

                                        </button>

                                    </div>

                                    {
                                        errors.confirmPassword && (
                                            <p className="mt-1 text-xs text-red-400">
                                                {errors.confirmPassword}
                                            </p>
                                        )
                                    }

                                    {
                                        confirmPassword &&
                                        confirmPassword === newPassword && (

                                            <p className="mt-1 text-xs text-green-400">
                                                ✓ Passwords match
                                            </p>

                                        )
                                    }

                                </div>

                                <div className="mt-6 flex gap-3">

                                    <button
                                        type="button"
                                        onClick={() => {
                                            clearOtp();
                                            clearPassword();
                                            setCountdown(30);
                                            setStep(1);
                                        }}
                                        disabled={resettingPassword}
                                        className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                                    >

                                        <FiArrowLeft />

                                        Back

                                    </button>

                                    <button
                                        type="button"
                                        onClick={resetPassword}
                                        disabled={resettingPassword || !isPasswordValid}
                                        className={`flex h-11 flex-1 items-center justify-center rounded-xl font-medium text-white transition-all duration-300 ${resettingPassword || !isPasswordValid
                                            ? "cursor-not-allowed bg-slate-700 opacity-60"
                                            : "cursor-pointer bg-linear-to-r from-indigo-500 to-violet-600 hover:scale-[1.02]"
                                            }`}
                                    >

                                        {
                                            resettingPassword
                                                ? "Resetting..."
                                                : "Reset Password"
                                        }

                                    </button>

                                </div>

                            </motion.div>

                        )}

                        {step === 4 && (

                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: .9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: .4 }}
                                className="py-10 text-center"
                            >

                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">

                                    <FiCheckCircle
                                        size={44}
                                        className="text-green-400"
                                    />

                                </div>

                                <h2 className="mt-5 text-2xl font-semibold text-white">
                                    Password Reset Successful
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    Redirecting in 3 seconds...
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

                </div>

            </div>

        </div>

    );
};

export default ResetPassword;