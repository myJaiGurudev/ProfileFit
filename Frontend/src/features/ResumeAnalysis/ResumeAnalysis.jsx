import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../auth/components/api.js";

import Background from "./components/Background";
import Navbar from "../main/components/Navbar";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";
import GlassCard from "./components/GlassCard";

import RecruiterSummary from "./sections/RecruiterSummary";
import OverallFeedback from "./sections/OverallFeedback";
import Strengths from "./sections/Strengths";
import Weaknesses from "./sections/Weaknesses";
import KeywordAnalysis from "./sections/KeywordAnalysis";
import ATSSection from "./sections/ATSSection";
import ResumeImprovements from "./sections/ResumeImprovements";
import SkillGap from "./sections/SkillGap";
import HiringProbability from "./sections/HiringProbability";
import InterviewDifficulty from "./sections/InterviewDifficulty";
import PreparationRoadmap from "./sections/PreparationRoadmap";
import RecommendedProjects from "./sections/RecommendedProjects";
import PrioritySkills from "./sections/PrioritySkills";
import TechnicalQuestions from "./sections/TechnicalQuestions";
import BehavioralQuestions from "./sections/BehavioralQuestions";
import ResumeActions from "./sections/ResumeActions";

export default function ResumeAnalysis() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [report, setReport] = useState(null);

    const [collapsed, setCollapsed] = useState({
        summary: false,
        feedback: false,
        strengths: false,
        weaknesses: false,
        keywords: false,
        ats: false,
        improvements: false,
        skillGap: false,
        probability: false,
        difficulty: false,
        roadmap: false,
        projects: false,
        priority: false,
        technical: false,
        behavioral: false,
        resume: false
    });

    const toggleSection = (section) => {
        setCollapsed(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    useEffect(() => {

        let mounted = true;

        async function fetchReport() {

            try {

                setLoading(true);

                const { data } = await api.get(`/interview/report/${id}`);

                if (!mounted) return;

                setReport(data.interviewReport);

            }
            catch (err) {

                if (!mounted) return;

                setError(
                    err.response?.data?.message ||
                    "Unable to load interview report."
                );

            }
            finally {

                if (mounted) {
                    setLoading(false);
                }

            }

        }

        fetchReport();

        return () => {
            mounted = false;
        };

    }, [id]);

    const stats = useMemo(() => {

        if (!report) {
            return {};
        }

        return {

            confidence: report.confidenceScore || 0,

            hiring: report.hiringProbability || 0,

            difficulty: report.interviewDifficulty || "Medium",

            strengths: report.strengths?.length || 0,

            weaknesses: report.weaknesses?.length || 0,

            matched: report.matchedKeywords?.length || 0,

            missing: report.missingKeywords?.length || 0

        };

    }, [report]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <ErrorScreen message={error} />;
    }

    return (

        <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

            <Background />

            <Navbar />

            <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 pb-20 pt-28 sm:px-6 lg:px-10">

                <Hero report={report} stats={stats} />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6 }}
                    className="mt-10 grid gap-6 xl:grid-cols-12"
                >

                    <div className="space-y-6 xl:col-span-8">

                        <GlassCard>
                            <RecruiterSummary
                                data={report}
                                collapsed={collapsed.summary}
                                toggle={() => toggleSection("summary")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <OverallFeedback
                                data={report}
                                collapsed={collapsed.feedback}
                                toggle={() => toggleSection("feedback")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <Strengths
                                data={report}
                                collapsed={collapsed.strengths}
                                toggle={() => toggleSection("strengths")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <Weaknesses
                                data={report}
                                collapsed={collapsed.weaknesses}
                                toggle={() => toggleSection("weaknesses")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <KeywordAnalysis
                                data={report}
                                collapsed={collapsed.keywords}
                                toggle={() => toggleSection("keywords")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <ResumeImprovements
                                data={report}
                                collapsed={collapsed.improvements}
                                toggle={() => toggleSection("improvements")}
                            />
                        </GlassCard>

                    </div>

                    <div className="space-y-6 xl:col-span-4">
                        <GlassCard>
                            <ATSSection
                                data={report}
                                collapsed={collapsed.ats}
                                toggle={() => toggleSection("ats")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <HiringProbability
                                data={report}
                                collapsed={collapsed.probability}
                                toggle={() => toggleSection("probability")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <InterviewDifficulty
                                data={report}
                                collapsed={collapsed.difficulty}
                                toggle={() => toggleSection("difficulty")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <SkillGap
                                data={report}
                                collapsed={collapsed.skillGap}
                                toggle={() => toggleSection("skillGap")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <PrioritySkills
                                data={report}
                                collapsed={collapsed.priority}
                                toggle={() => toggleSection("priority")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <PreparationRoadmap
                                data={report}
                                collapsed={collapsed.roadmap}
                                toggle={() => toggleSection("roadmap")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <RecommendedProjects
                                data={report}
                                collapsed={collapsed.projects}
                                toggle={() => toggleSection("projects")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <TechnicalQuestions
                                data={report}
                                collapsed={collapsed.technical}
                                toggle={() => toggleSection("technical")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <BehavioralQuestions
                                data={report}
                                collapsed={collapsed.behavioral}
                                toggle={() => toggleSection("behavioral")}
                            />
                        </GlassCard>

                        <GlassCard>
                            <ResumeActions
                                id={id}
                                data={report}
                                collapsed={collapsed.resume}
                                toggle={() => toggleSection("resume")}
                            />
                        </GlassCard>

                    </div>

                </motion.div>

                <AnimatePresence>

                    <button
                        onClick={() => window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })}
                        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/20"
                    >

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-6 w-6"
                        >
                            <path d="M12 19V5" />
                            <path d="M5 12l7-7 7 7" />
                        </svg>

                    </button>

                </AnimatePresence>

            </div>

        </main>

    );

}