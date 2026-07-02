import FeatureHeader from "./FeatureHeader";
import FeatureGrid from "./FeatureGrid";

export default function FeatureSection() {

    return (

        <section className="relative overflow-hidden py-32">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,.08),transparent_60%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-size-[45px_45px]" />

            <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-sky-400/30 to-transparent" />

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8">

                <FeatureHeader />

                <FeatureGrid />

            </div>

        </section>

    );

}