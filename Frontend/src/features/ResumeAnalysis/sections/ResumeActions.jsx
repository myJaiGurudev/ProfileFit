import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiDownload, FiPrinter, FiCopy, FiShare2, FiRefreshCw, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import api from "../../auth/components/api";

export default function ResumeActions({ id, data, collapsed, toggle }) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const downloadResume = async () => {

        try {

            setLoading(true);

            const response = await api.post(
                `/interview/resume/pdf/${id}`,
                {},
                {
                    responseType: "blob"
                }
            );

            const blob = new Blob(
                [response.data],
                {
                    type: "application/pdf"
                }
            );

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download = `ATS_Resume_${data.title}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        }
        catch (error) {

            console.error(error);

            alert("Unable to generate resume.");

        }
        finally {

            setLoading(false);

        }

    };

    const printReport = () => {

        window.print();

    };

    const copyReport = () => {

        navigator.clipboard.writeText(
            JSON.stringify(
                data,
                null,
                2
            )
        );

    };

    const shareReport = async () => {

        const shareData = {

            title: "AI Resume Analysis",

            text: `My hiring probability is ${data.hiringProbability}%`,

            url: window.location.href

        };

        try {

            if (navigator.share) {

                await navigator.share(shareData);

            }
            else {

                navigator.clipboard.writeText(window.location.href);

                alert("Report link copied.");

            }

        }
        catch { }

    };

    return (

        <div>

            <SectionHeader
                icon={FiDownload}
                title="Report Actions"
                subtitle="Download, share and manage your report"
                collapsed={collapsed}
                toggle={toggle}
                copyText=""
            />

            <AnimatePresence>

                {!collapsed && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto"
                        }}
                        exit={{
                            opacity: 0,
                            height: 0
                        }}
                        transition={{
                            duration: .35
                        }}
                        className="overflow-hidden"
                    >

                        <div className="grid gap-5 md:grid-cols-2">

                            <ActionCard
                                icon={FiDownload}
                                title="Download ATS Resume"
                                description="Generate AI optimized PDF resume."
                                loading={loading}
                                onClick={downloadResume}
                            />

                            <ActionCard
                                icon={FiPrinter}
                                title="Print Report"
                                description="Print the complete analysis."
                                onClick={printReport}
                            />

                            <ActionCard
                                icon={FiCopy}
                                title="Copy Report"
                                description="Copy complete JSON report."
                                onClick={copyReport}
                            />

                            <ActionCard
                                icon={FiShare2}
                                title="Share Report"
                                description="Share this report."
                                onClick={shareReport}
                            />

                            <ActionCard
                                icon={FiRefreshCw}
                                title="Analyze Again"
                                description="Analyze another resume."
                                onClick={() =>
                                    navigate("/analyze-resume")
                                }
                            />

                            <ActionCard
                                icon={FiHome}
                                title="Dashboard"
                                description="Back to dashboard."
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                            />

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}

function ActionCard({
    icon: Icon,
    title,
    description,
    onClick,
    loading
}) {

    return (

        <motion.button
            whileHover={{
                y: -5,
                scale: 1.02
            }}
            whileTap={{
                scale: .98
            }}
            onClick={onClick}
            disabled={loading}
            className="rounded-3xl border border-white/10 bg-linear-to-br from-white/6 via-white/3 to-cyan-500/3 p-6 text-left transition-all duration-300 hover:border-cyan-400/30"
        >

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                <Icon className="text-2xl text-cyan-300" />

            </div>

            <h3 className="mt-6 text-xl font-bold text-white">

                {loading ? "Please wait..." : title}

            </h3>

            <p className="mt-3 leading-7 text-slate-400">

                {description}

            </p>

        </motion.button>

    );

}