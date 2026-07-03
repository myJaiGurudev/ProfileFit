import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {

    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {

        stiffness: 120,

        damping: 25,

        mass: .3

    });

    return (

        <motion.div

            style={{
                scaleX
            }}

            className="fixed left-0 top-0 z-9999 h-0.75 w-full origin-left bg-linear-to-r from-sky-400 via-cyan-400 to-violet-500"

        />

    );

}