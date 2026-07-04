import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function SectionContainer({
    children,
    className = ""
}) {

    return (

        <motion.section

            initial={{
                opacity: 0,
                y: 30
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.7,
                ease: "easeOut"
            }}

            className={`relative mx-auto w-full max-w-360 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 ${className}`}

        >

            {children}

        </motion.section>

    );

}

SectionContainer.propTypes = {

    children: PropTypes.node,

    className: PropTypes.string

};