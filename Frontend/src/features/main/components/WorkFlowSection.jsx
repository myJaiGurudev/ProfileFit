import { motion } from "framer-motion";
import {
    FiUploadCloud,
    FiBriefcase,
    FiCpu,
    FiCheckCircle
} from "react-icons/fi";

const steps = [
    {
        icon: FiUploadCloud,
        title: "Upload Resume",
        desc: "Upload your latest resume in PDF format.",
        color: "from-sky-500 to-cyan-500"
    },
    {
        icon: FiBriefcase,
        title: "Add Job Description",
        desc: "Paste the target job description.",
        color: "from-violet-500 to-fuchsia-500"
    },
    {
        icon: FiCpu,
        title: "AI Analysis",
        desc: "AI compares skills, keywords and ATS compatibility.",
        color: "from-cyan-500 to-blue-500"
    },
    {
        icon: FiCheckCircle,
        title: "Get Recommendations",
        desc: "Receive personalized improvements instantly.",
        color: "from-emerald-500 to-teal-500"
    }
];

export default function WorkflowSection() {

    return (

        <section id="workflow" className="relative overflow-hidden py-16 sm:py-20 lg:py-32">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 30
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}

                    viewport={{
                        once: true
                    }}

                    className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20"

                >

                    <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-cyan-300">

                        SIMPLE PROCESS

                    </span>

                    <h2 className="mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight wrap-break-word">

                        From Upload

                        <span className="block bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent wrap-break-word">

                            To Interview Ready

                        </span>

                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-400 wrap-break-word">

                        Optimize your resume with AI in four simple steps.

                    </p>

                </motion.div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

                    {

                        steps.map((step, index) => {

                            const Icon = step.icon;

                            return (

                                <motion.div

                                    key={step.title}

                                    initial={{
                                        opacity: 0,
                                        y: 40
                                    }}

                                    whileInView={{
                                        opacity: 1,
                                        y: 0
                                    }}

                                    viewport={{
                                        once: true
                                    }}

                                    transition={{
                                        delay: index * .15
                                    }}

                                    whileHover={{
                                        y: -10,
                                        scale: 1.03
                                    }}

                                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:p-8 backdrop-blur-2xl"

                                >

                                    <div className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-linear-to-br ${step.color}`}>

                                        <Icon className="text-2xl sm:text-3xl text-white shrink-0" />

                                    </div>

                                    <div className="mt-6 text-4xl sm:text-5xl font-black text-white/10">

                                        0{index + 1}

                                    </div>

                                    <h3 className="mt-4 text-lg sm:text-xl font-bold text-white wrap-break-word">

                                        {step.title}

                                    </h3>

                                    <p className="mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-slate-400 wrap-break-word">

                                        {step.desc}

                                    </p>

                                </motion.div>

                            );

                        })

                    }

                </div>

            </div>

        </section>

    );

}