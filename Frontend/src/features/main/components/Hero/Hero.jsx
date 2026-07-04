import HeroContent from "./HeroContent";
import Dashboard from "./Dashboard";

export default function Hero() {

    return (

        <section className="relative overflow-hidden">

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8">

                <div className="grid w-full items-center gap-10 md:gap-12 lg:gap-16 lg:grid-cols-[1.02fr_.98fr]">

                    <HeroContent />

                    <Dashboard />

                </div>

            </div>

        </section>

    );

}