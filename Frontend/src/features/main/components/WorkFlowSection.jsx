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

        <section className="relative overflow-hidden py-32">

            <div className="mx-auto max-w-7xl px-6">

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

                    className="mx-auto mb-20 max-w-3xl text-center"

                >

                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300">

                        SIMPLE PROCESS

                    </span>

                    <h2 className="mt-8 text-5xl font-black text-white">

                        From Upload

                        <span className="block bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">

                            To Interview Ready

                        </span>

                    </h2>

                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">

                        Optimize your resume with AI in four simple steps.

                    </p>

                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

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

                                    className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"

                                >

                                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${step.color}`}>

                                        <Icon className="text-3xl text-white" />

                                    </div>

                                    <div className="mt-8 text-5xl font-black text-white/10">

                                        0{index + 1}

                                    </div>

                                    <h3 className="mt-4 text-xl font-bold text-white">

                                        {step.title}

                                    </h3>

                                    <p className="mt-3 leading-7 text-slate-400">

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