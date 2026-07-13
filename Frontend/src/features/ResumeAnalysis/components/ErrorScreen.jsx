import { FiRefreshCcw } from "react-icons/fi";

export default function ErrorScreen({ message }) {

    return (

        <div className="flex min-h-screen items-center justify-center bg-[#030712] px-6">

            <div className="w-full max-w-xl rounded-3xl border border-red-500/20 bg-red-500/5 p-10 text-center backdrop-blur-xl">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">

                    <FiRefreshCcw className="h-9 w-9 text-red-400" />

                </div>

                <h2 className="mt-8 text-3xl font-bold text-white">

                    Something went wrong

                </h2>

                <p className="mt-4 text-slate-400">

                    {message}

                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="cursor-pointer mt-8 rounded-2xl bg-cyan-500 px-8 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400 active:scale-95"
                >

                    Try Again

                </button>

            </div>

        </div>

    );

}