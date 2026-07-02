import React from 'react'
import Navbar from '../components/Navbar'
import Background from '../components/Background'
import Hero from '../components/Hero/Hero'
import FeatureSection from '../components/FeatureSection/FeatureSection'
import WorkflowSection from '../components/WorkFlowSection'
import TransformationSection from '../components/TransformationSection'
import HeroBackground from '../components/Hero/HeroBackground'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div>
            <Background />
            <Navbar />
            <div className="relative min-h-screen bg-slate-950">

                <HeroBackground />

                <div className="relative z-10">

                    <Hero />

                    <FeatureSection />

                    <WorkflowSection />

                    <TransformationSection />

                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Home