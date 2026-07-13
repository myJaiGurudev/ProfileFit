import { motion } from "framer-motion";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
import { FiCopy } from "react-icons/fi";

export default function SectionHeader({ icon: Icon, title, subtitle = "", collapsed = false, toggle, copyText = "" }) {

    const handleCopy = () => {
        if (!copyText) return;
        navigator.clipboard.writeText(copyText);
    };

    return (

        <div className="relative mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">

                    <Icon className="h-7 w-7 text-cyan-300" />

                </div>

                <div className="min-w-0">

                    <h2 className="truncate text-xl font-bold tracking-tight text-white lg:text-2xl">

                        {title}

                    </h2>

                    {subtitle && (

                        <p className="mt-1 text-sm text-slate-400">

                            {subtitle}

                        </p>

                    )}

                </div>

            </div>

            <div className="flex items-center gap-3">

                <button
                    onClick={handleCopy}
                    className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-slate-300 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-white active:scale-95"
                >

                    <FiCopy className="h-4 w-4" />

                    Copy

                </button>

                <button
                    onClick={toggle}
                    className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-slate-300 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-white active:scale-95"
                >

                    {collapsed ? (
                        <>
                            View
                            <HiOutlineChevronDown className="h-5 w-5" />
                        </>
                    ) : (
                        <>
                            Hide
                            <HiOutlineChevronUp className="h-5 w-5" />
                        </>
                    )}

                </button>

            </div>

            <motion.div
                layoutId={title}
                className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-cyan-400/30 to-transparent"
            />

        </div>

    );

}