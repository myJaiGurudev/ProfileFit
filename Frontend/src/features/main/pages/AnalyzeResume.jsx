import AnimatedBackground from "../components/analyzer/AnimatedBackground";
import Hero from "../components/analyzer/Hero";
import SectionContainer from "../components/analyzer/SectionContainer";
import { FiFileText, FiBriefcase } from "react-icons/fi";
import UploadCard from "../components/analyzer/UploadCard";
import AnalyzeButton from "../components/analyzer/AnalyzeButton";
import DocumentUploaderInput from "../components/analyzer/DocumentUploaderInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnalyzeResume() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
    const [resumeText, setResumeText] = useState(
        () => localStorage.getItem("document-text-Resume") || ""
    );
    const [jobDescriptionText, setJobDescriptionText] = useState(
        () => localStorage.getItem("document-text-Job Description") || ""
    );
    const canAnalyze = (resumeText.trim() || resumeFile) && (jobDescriptionText.trim() || jobDescriptionFile);

    const handleAnalyze = async () => {

        setLoading(true);

        // Temporary loading
        await new Promise(resolve => setTimeout(resolve, 3000));

        localStorage.removeItem("document-text-Resume");
        localStorage.removeItem("document-text-Job Description");

        setLoading(false);

        navigate("/resume-analysis");

    };

    return (

        <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

            <AnimatedBackground />

            <SectionContainer className="flex min-h-[calc(100vh-5rem)] flex-col justify-center pt-24 pb-10 sm:pt-28 lg:pt-32">

                <Hero />

                <section className="mt-14 grid gap-6 lg:grid-cols-2">

                    <UploadCard
                        title="Resume"
                        subtitle="Upload your latest resume"
                        icon={FiFileText}
                    >

                        <DocumentUploaderInput
                            title="Resume"
                            description="Click or drag your resume here"
                            placeholder="Paste your resume here..."
                            value={resumeText}
                            setValue={setResumeText}
                            file={resumeFile}
                            setFile={setResumeFile}
                        />

                    </UploadCard>

                    <UploadCard
                        title="Job Description"
                        subtitle="Paste or upload a job description"
                        icon={FiBriefcase}
                    >

                        <DocumentUploaderInput
                            title="Job Description"
                            description="Click or drag your job description here"
                            placeholder="Paste the job description here..."
                            value={jobDescriptionText}
                            setValue={setJobDescriptionText}
                            file={jobDescriptionFile}
                            setFile={setJobDescriptionFile}
                        />

                    </UploadCard>

                </section>

                <div className="mt-10 flex justify-center">

                    <AnalyzeButton
                        loading={loading}
                        disabled={!canAnalyze}
                        onClick={handleAnalyze}
                    />

                </div>

            </SectionContainer>

        </main>

    );

}