import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FiArrowUpRight } from "react-icons/fi";

export default function UploadCard({
    title,
    subtitle,
    icon,
    children
}) {

    const Icon = icon;

    return (

        <motion.div

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
                duration: 0.6
            }}

            whileHover={{
                y: -8,
                scale: 1.015
            }}

            className="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 backdrop-blur-2xl"

        >

            <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 via-cyan-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute inset-0 rounded-4xl border border-transparent transition-all duration-500 group-hover:border-sky-400/30" />

            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-sky-500/10 blur-[90px] transition-all duration-700 group-hover:scale-125" />

            <div className="relative flex h-full flex-col p-5 sm:p-6 lg:p-7">

                <div className="flex items-start justify-between">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/30">

                            <Icon className="text-2xl" />

                        </div>

                        <div>

                            <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-bold text-white">

                                {title}

                            </h2>

                            <p className="mt-1 text-sm text-slate-400">

                                {subtitle}

                            </p>

                        </div>

                    </div>

                </div>

                <div className="mt-8 flex-1">

                    {children}

                </div>

            </div>

        </motion.div>

    );

}

UploadCard.propTypes = {

    title: PropTypes.string.isRequired,

    subtitle: PropTypes.string.isRequired,

    icon: PropTypes.elementType.isRequired,

    children: PropTypes.node

};