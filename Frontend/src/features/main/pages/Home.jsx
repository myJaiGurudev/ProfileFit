import React from 'react'
import Navbar from '../components/Navbar'
import Background from '../components/Background'
import Hero from '../components/Hero/Hero'
import FeatureSection from '../components/FeatureSection/FeatureSection'
import WorkflowSection from '../components/WorkFlowSection'
import TransformationSection from '../components/TransformationSection'
import HeroBackground from '../components/Hero/HeroBackground'
import Footer from '../components/Footer'
import TrustedSection from '../components/TrustedSection'
import FAQSection from '../components/FAQSection'
import CTASection from '../components/CTASection'
import ScrollProgress from '../components/ScrollProgress'
import BackToTop from '../components/BackToTop'
import { useEffect, useState } from "react";
import LoadingScreen from '../components/LoadingScreen'

const Home = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {

            setLoading(false);

        }, 1300);

        return () => clearTimeout(timer);

    }, []);

    if (loading) {

        return <LoadingScreen />;

    }

    return (
        <div>
            <ScrollProgress />
            <BackToTop />
            <Background />
            <Navbar />
            <div className="relative min-h-screen bg-slate-950">

                <HeroBackground />

                <div className="relative z-10">

                    <Hero />

                    <TrustedSection />

                    <FeatureSection />

                    <WorkflowSection />

                    <TransformationSection />

                    <FAQSection />

                    <CTASection />

                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Home