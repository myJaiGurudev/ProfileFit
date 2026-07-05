import AnimatedBackground from "../components/analyzer/AnimatedBackground";
import Hero from "../components/analyzer/Hero";
import SectionContainer from "../components/analyzer/SectionContainer";
import { FiFileText, FiBriefcase } from "react-icons/fi";
import UploadCard from "../components/analyzer/UploadCard";
import AnalyzeButton from "../components/analyzer/AnalyzeButton";
import DocumentUploaderInput from "../components/analyzer/DocumentUploaderInput";
import { useState } from "react";

export default function AnalyzeResume() {
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {

        setLoading(true);

        // Replace this with your actual API call later
        await new Promise(resolve => setTimeout(resolve, 3000));

        setLoading(false);

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
                        />

                    </UploadCard>

                </section>

                <div className="mt-10 flex justify-center">

                    <AnalyzeButton
                        loading={loading}
                        onClick={handleAnalyze}
                    />

                </div>

            </SectionContainer>

        </main>

    );

}