import { useEffect,useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTop(){

    const[show,setShow]=useState(false);

    useEffect(()=>{

        const scroll=()=>{

            setShow(window.scrollY>600);

        };

        window.addEventListener("scroll",scroll);

        return()=>window.removeEventListener("scroll",scroll);

    },[]);

    return(

        <AnimatePresence>

            {

                show&&(

                    <motion.button

                        initial={{
                            opacity:0,
                            scale:.7,
                            y:30
                        }}

                        animate={{
                            opacity:1,
                            scale:1,
                            y:0
                        }}

                        exit={{
                            opacity:0,
                            scale:.7,
                            y:30
                        }}

                        whileHover={{
                            scale:1.1
                        }}

                        whileTap={{
                            scale:.95
                        }}

                        onClick={()=>window.scrollTo({

                            top:0,

                            behavior:"smooth"

                        })}

                        className="cursor-pointer fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900/80 text-cyan-300 shadow-[0_0_30px_rgba(56,189,248,.25)] backdrop-blur-xl"

                    >

                        <FiArrowUp className="text-xl"/>

                    </motion.button>

                )

            }

        </AnimatePresence>

    );

}