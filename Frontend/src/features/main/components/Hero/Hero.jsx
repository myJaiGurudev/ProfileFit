import HeroContent from "./HeroContent";
import Dashboard from "./Dashboard";

export default function Hero() {

    return (

        <section className="relative overflow-hidden">

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28 pb-16 sm:px-8 lg:px-8">

                <div className="grid w-full items-center gap-16 lg:grid-cols-[1.02fr_.98fr]">

                    <HeroContent />

                    <Dashboard />

                </div>

            </div>

        </section>

    );

}