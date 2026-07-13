import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CountUp from "react-countup";

export default function CircularScore({ score }) {

    return (

        <div className="relative">

            <div className="h-65 w-65">

                <CircularProgressbar
                    value={score}
                    strokeWidth={7}
                    styles={{
                        path: {
                            stroke: "#22d3ee",
                            strokeLinecap: "round"
                        },
                        trail: {
                            stroke: "rgba(255,255,255,.08)"
                        },
                        background: {
                            fill: "transparent"
                        }
                    }}
                />

            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

                <div className="text-6xl font-black text-white">

                    <CountUp
                        end={score}
                        duration={2}
                    />

                    <span className="text-cyan-300">

                        %

                    </span>

                </div>

                <p className="mt-3 text-lg text-slate-400">

                    Hiring Score

                </p>

            </div>

        </div>

    );

}