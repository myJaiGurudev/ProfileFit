import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
    {
        question: "How does ProfileFit analyze my resume?",
        answer: "ProfileFit compares your resume with the job description, analyzes ATS compatibility, identifies missing keywords and skills, and provides personalized AI recommendations."
    },
    {
        question: "Can I upload both Resume and Job Description?",
        answer: "Yes. Upload your resume and either paste or upload the target job description. ProfileFit compares both documents to generate accurate insights."
    },
    {
        question: "What resume formats are supported?",
        answer: "Currently, ProfileFit supports PDF and DOCX formats for resume uploads."
    },
    {
        question: "How accurate is the ATS Score?",
        answer: "Our ATS score is generated using industry-standard resume parsing techniques, keyword matching, formatting analysis, and AI-driven evaluation."
    },
    {
        question: "Is my resume data secure?",
        answer: "Yes. Your files are processed securely and are never shared with third parties. Privacy and data security are our priorities."
    },
    {
        question: "Can I analyze multiple resumes?",
        answer: "Absolutely. You can upload and compare different resumes for different job roles."
    },
    {
        question: "Is ProfileFit free?",
        answer: "ProfileFit offers a free plan with essential features and premium plans for advanced AI analysis and resume optimization."
    }
];

export default function FAQSection() {

    const [open, setOpen] = useState(0);

    return (

        <section id="faq" className="relative py-32">

            <div className="mx-auto max-w-5xl px-6">

                <motion.div

                    initial={{ opacity: 0, y: 20 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    viewport={{ once: true }}

                    className="mb-16 text-center"

                >

                    <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-300">

                        FREQUENTLY ASKED QUESTIONS

                    </span>

                    <h2 className="mt-8 text-5xl font-black text-white">

                        Got Questions?

                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">

                        Everything you need to know before analyzing your resume.

                    </p>

                </motion.div>

                <div className="space-y-5">

                    {

                        faqs.map((faq, index) => (

                            <motion.div

                                key={faq.question}

                                initial={{ opacity: 0, y: 20 }}

                                whileInView={{ opacity: 1, y: 0 }}

                                viewport={{ once: true }}

                                transition={{ duration: 0.35, delay: index * 0.05 }}

                                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-none hover:shadow-[0_20px_40px_rgba(56,189,248,.12)] backdrop-blur-xl transition-all duration-75 hover:border-sky-400/40 hover:bg-white/10"

                            >
                                <div className="h-0.5 w-0 bg-linear-to-r from-sky-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                                <motion.button

                                    whileHover={{
                                        scale: 1.01
                                    }}

                                    whileTap={{
                                        scale: 0.99
                                    }}

                                    onClick={() => setOpen(open === index ? -1 : index)}

                                    className="flex w-full cursor-pointer items-center justify-between px-8 py-6 text-left"

                                >

                                    <span className="text-lg font-semibold text-white transition-colors duration-200 group-hover:text-sky-300">

                                        {faq.question}

                                    </span>

                                    <motion.div

                                        animate={{
                                            rotate: open === index ? 45 : 0
                                        }}

                                        transition={{
                                            duration: 0.2
                                        }}

                                    >

                                        <FiChevronDown className="text-2xl text-cyan-400"/>

                                    </motion.div>

                                </motion.button>

                                <AnimatePresence>

                                    {

                                        open === index && (

                                            <motion.div

                                                initial={{
                                                    opacity: 0,
                                                    y: -8
                                                }}

                                                animate={{
                                                    opacity: 1,
                                                    y: 0
                                                }}

                                                exit={{
                                                    opacity: 0,
                                                    y: -8
                                                }}

                                                transition={{
                                                    duration: 0.18
                                                }}

                                            >

                                                <p className="px-8 pb-6 leading-8 text-slate-400">

                                                    {faq.answer}

                                                </p>

                                            </motion.div>

                                        )

                                    }

                                </AnimatePresence>

                            </motion.div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}