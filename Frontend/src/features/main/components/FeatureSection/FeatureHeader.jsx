import { motion } from "framer-motion";

export default function FeatureHeader() {

    return (

        <motion.div

            initial={{
                opacity:0,
                y:30
            }}

            whileInView={{
                opacity:1,
                y:0
            }}

            viewport={{
                once:true
            }}

            transition={{
                duration:.8
            }}

            className="mx-auto mb-20 max-w-3xl text-center"

        >

            <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-300">

                WHY PROFILEFIT

            </span>

            <h2 className="mt-8 text-5xl font-black leading-tight text-white">

                Everything You Need

                <span className="block bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">

                    To Build a Job-Winning Resume

                </span>

            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">

                From ATS optimization to AI-powered recommendations,
                ProfileFit helps you craft resumes that stand out and
                match the expectations of modern recruiters.

            </p>

        </motion.div>

    );

}