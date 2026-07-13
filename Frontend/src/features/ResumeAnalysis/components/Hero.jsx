import { motion } from "framer-motion";
import {
    FiCpu,
    FiClock,
    FiTrendingUp,
    FiCalendar
} from "react-icons/fi";
import CircularScore from "./CircularScore";

export default function Hero({
    report,
    stats
}) {

    const date = new Date(report.createdAt).toLocaleDateString(
        undefined,
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    return (

        <motion.section
            initial={{
                opacity: 0,
                y: 30
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: .6
            }}
            className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-2xl"
        >

            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/8 via-transparent to-violet-500/6" />

            <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[320px_1fr] lg:p-10">

                <div className="flex justify-center">

                    <CircularScore score={stats.hiring} />

                </div>

                <div className="flex flex-col justify-center">

                    <div className="flex flex-wrap items-center gap-3">

                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">

                            AI Resume Analysis

                        </span>

                        <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm font-semibold text-violet-300">

                            {report.generatedWith}

                        </span>

                    </div>

                    <h1 className="mt-6 text-3xl font-black leading-tight text-white sm:text-4xl xl:text-5xl">

                        {report.title}

                    </h1>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">

                        {report.recruiterSummary}

                    </p>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">

                        <StatCard
                            icon={FiTrendingUp}
                            title="Hiring"
                            value={`${stats.hiring}%`}
                        />

                        <StatCard
                            icon={FiCpu}
                            title="Confidence"
                            value={`${stats.confidence}%`}
                        />

                        <StatCard
                            icon={FiClock}
                            title="Processing"
                            value={`${Math.round(report.processingTime / 1000)} sec`}
                        />

                        <StatCard
                            icon={FiCalendar}
                            title="Generated"
                            value={date}
                        />

                    </div>

                </div>

            </div>

        </motion.section>

    );

}

function StatCard({
    icon: Icon,
    title,
    value
}) {

    return (

        <motion.div
            whileHover={{
                y: -6
            }}
            className="rounded-2xl border border-white/10 bg-white/4 p-5 transition-all duration-300 hover:border-cyan-400/30"
        >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">

                <Icon className="h-6 w-6 text-cyan-300" />

            </div>

            <p className="mt-5 text-sm text-slate-400">

                {title}

            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">

                {value}

            </h3>

        </motion.div>

    );

}