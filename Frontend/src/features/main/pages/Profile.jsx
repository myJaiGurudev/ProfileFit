import { useState, useEffect, useRef } from "react";
import { FiUser, FiMail, FiCheck, FiX, FiEdit2, FiCamera } from "react-icons/fi";
import api from "../../auth/components/api";
import { useAuth } from "../../../Context/AuthContext";

// Helper function to compress images before upload
const compressImage = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const scaleSize = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scaleSize;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    resolve(new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    }));
                }, 'image/jpeg', 0.7);
            };
        };
    });
};

export default function Profile() {
    const [user, setUser] = useState({ username: "", email: "", profilePicture: "" });
    const [loading, setLoading] = useState(true);
    const [isEditingName, setIsEditingName] = useState(false);
    const [draftName, setDraftName] = useState("");
    const [savingName, setSavingName] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

    const fileInputRef = useRef(null);
    const editContainerRef = useRef(null);

    const { setUser: setGlobalUser } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get("/auth/get-details");
                if (response.data.user) {
                    setUser(response.data.user);
                    setDraftName(response.data.user.username);
                    setPreviewImage(response.data.user.profilePicture || null);
                }
            } catch (error) {
                showToast("Failed to load profile.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    // Click outside to cancel editing
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isEditingName && editContainerRef.current && !editContainerRef.current.contains(event.target)) {
                setIsEditingName(false);
                setDraftName(user.username);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isEditingName, user.username]);

    const showToast = (message, type = "success") => {
        setToast({ visible: true, message, type });
        setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) return showToast("Only images are allowed.", "error");

        setIsUploadingPhoto(true);
        try {
            const compressedFile = await compressImage(file);

            const formData = new FormData();
            formData.append("profilePicture", compressedFile);

            const response = await api.put("/auth/update-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setUser(response.data.user);
            setPreviewImage(response.data.user.profilePicture);

            setGlobalUser(response.data.user);

            showToast("Photo updated successfully.", "success");
        } catch (error) {
            showToast("Failed to upload photo.", "error");
        } finally {
            setIsUploadingPhoto(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSaveName = async () => {
        if (!draftName.trim() || draftName.trim() === user.username) {
            setIsEditingName(false);
            setDraftName(user.username);
            return;
        }

        const originalUser = { ...user };
        const originalDraft = user.username;

        setUser((prev) => ({ ...prev, username: draftName.trim() }));
        setIsEditingName(false);
        setSavingName(true);

        try {
            const formData = new FormData();
            formData.append("username", draftName.trim());
            const response = await api.put("/auth/update-profile", formData);

            // Update local state with confirmed backend data
            setUser(response.data.user);

            // Update global state for Navbar to see immediately
            setGlobalUser(response.data.user);

            showToast("Username updated.", "success");
        } catch (error) {
            // Rollback to original if it failed
            setUser(originalUser);
            setDraftName(originalDraft);
            showToast(error.response?.data?.message || "Failed to update name.", "error");
        } finally {
            setSavingName(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#020617] text-slate-200 pt-24 pb-16 sm:py-24 px-4 sm:px-6 flex justify-center relative overflow-x-hidden selection:bg-cyan-500/30">

            {/* Tech Grid Background matching your image */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] opacity-60"></div>
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[50%] bg-cyan-900/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center sm:items-stretch">
                <header className="mb-8 sm:mb-12 text-center sm:text-left w-full">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                        Account <span className="text-cyan-400">Profile</span>
                    </h1>
                    <p className="text-slate-400 mt-2 sm:mt-3 text-sm sm:text-[15px]">Manage your intelligence profile and personal details.</p>
                </header>

                {loading ? (
                    <div className="bg-[#0B1120]/90 border border-slate-800 p-6 sm:p-12 rounded-2xl sm:rounded-4xl relative overflow-hidden shadow-2xl w-full max-w-[calc(100vw-2rem)] sm:max-w-none">
                        {/* Premium AI Scanner Shimmer */}
                        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-cyan-500/10 to-transparent animate-[shimmer_1.5s_infinite]"></div>

                        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-center sm:items-start w-full relative z-10">
                            <div className="h-32 w-32 rounded-full bg-slate-800/80 animate-pulse shrink-0 border border-slate-700"></div>
                            <div className="flex-1 w-full space-y-8 mt-2 flex flex-col items-center sm:items-start">
                                <div className="w-full max-w-sm space-y-3 flex flex-col items-center sm:items-start">
                                    <div className="h-3 w-20 bg-slate-800/80 rounded-full animate-pulse"></div>
                                    <div className="h-10 w-48 bg-slate-800/80 rounded-full animate-pulse"></div>
                                </div>
                                <div className="w-full max-w-sm space-y-3 flex flex-col items-center sm:items-start">
                                    <div className="h-3 w-24 bg-slate-800/80 rounded-full animate-pulse"></div>
                                    <div className="h-12 w-full bg-slate-800/80 rounded-xl animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-[#0B1120]/80 backdrop-blur-md border border-slate-800/80 p-6 sm:p-12 rounded-2xl sm:rounded-4xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full max-w-[calc(100vw-2rem)] sm:max-w-none">
                        <div className="flex flex-col sm:flex-row gap-10 sm:gap-12 items-center sm:items-start w-full">

                            {/* Avatar Section */}
                            <div className="relative group shrink-0">
                                <div
                                    className={`h-32 w-32 rounded-full p-0.5 bg-linear-to-br from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 ${!isUploadingPhoto ? 'cursor-pointer hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]' : 'cursor-wait scale-95 opacity-80'}`}
                                    onClick={() => !isUploadingPhoto && fileInputRef.current?.click()}
                                    title={!isUploadingPhoto ? "Change profile photo" : ""}
                                >
                                    <div className="h-full w-full rounded-full bg-[#020617] overflow-hidden relative flex items-center justify-center">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Profile"
                                                className={`h-full w-full object-cover transition-opacity duration-300 ${isUploadingPhoto ? 'opacity-10' : 'opacity-100'}`}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : (
                                            !isUploadingPhoto && <FiUser className="h-10 w-10 text-slate-500" />
                                        )}

                                        {!isUploadingPhoto && (
                                            <div className="absolute inset-0 bg-[#020617]/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer">
                                                <FiCamera className="h-6 w-6 text-cyan-400 mb-1.5" />
                                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Update</span>
                                            </div>
                                        )}

                                        {/* Tech Radar Loading Spinner */}
                                        {isUploadingPhoto && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-[#020617]/90 rounded-full">
                                                <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                            </div>

                            {/* Info Section */}
                            <div className="flex-1 w-full space-y-8 mt-1">

                                {/* Username Field */}
                                <div className="space-y-2 flex flex-col items-center sm:items-start w-full">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest cursor-default">Username</label>
                                    <div className="flex w-full justify-center sm:justify-start relative h-12 items-center">
                                        {isEditingName ? (
                                            <div ref={editContainerRef} className="relative w-full max-w-60 sm:max-w-sm">
                                                <input
                                                    value={draftName}
                                                    onChange={(e) => setDraftName(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                                                    disabled={savingName}
                                                    autoFocus
                                                    className="w-full bg-[#020617] border border-cyan-900/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 rounded-xl pl-4 pr-20 py-2.5 outline-none transition-all text-white placeholder-slate-600 text-[15px] cursor-text"
                                                />
                                                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                                    {savingName ? (
                                                        <div className="px-3">
                                                            <svg className="animate-spin h-4 w-4 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => {
                                                                    setIsEditingName(false);
                                                                    setDraftName(user.username);
                                                                }}
                                                                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                                                                title="Cancel"
                                                            >
                                                                <FiX className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={handleSaveName}
                                                                className="p-1.5 rounded-lg text-cyan-500 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors cursor-pointer"
                                                                title="Save"
                                                            >
                                                                <FiCheck className="h-4 w-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="group flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full">
                                                <span className="text-xl sm:text-2xl font-bold text-white cursor-default tracking-tight text-center sm:text-left break-all">{user.username}</span>
                                                <button
                                                    onClick={() => setIsEditingName(true)}
                                                    className="p-2 rounded-lg bg-slate-800/50 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 sm:opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 shrink-0 cursor-pointer border border-transparent hover:border-cyan-500/30"
                                                    title="Edit Username"
                                                >
                                                    <FiEdit2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2 flex flex-col items-center sm:items-start w-full">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest cursor-default">Email Address</label>
                                    <div className="text-[15px] text-slate-300 flex items-center justify-center sm:justify-start gap-3 cursor-default bg-[#020617] border border-slate-800 px-4 py-3 rounded-xl w-full max-w-sm break-all">
                                        <FiMail className="text-cyan-500 h-3.75 w-3.75 shrink-0" />
                                        {user.email}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Premium Tech Toast */}
            <div className={`fixed bottom-6 sm:bottom-10 right-0 left-0 sm:left-auto sm:right-10 z-50 flex justify-center sm:justify-end transition-all duration-400 transform px-4 sm:px-0 ${toast.visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'}`}>
                <div className={`px-4 py-3 rounded-xl border shadow-2xl flex items-center gap-3 w-full sm:w-auto max-w-sm ${toast.type === 'error'
                    ? 'bg-[#150a0a] border-red-500/40 text-red-100'
                    : 'bg-[#061121] border-emerald-500/40 text-emerald-50 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    }`}>
                    <div className={`flex items-center justify-center h-6 w-6 rounded-md shrink-0 ${toast.type === 'error'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                        {toast.type === 'error' ? <FiX className="h-3.5 w-3.5" /> : <FiCheck className="h-3.5 w-3.5" />}
                    </div>
                    <span className="font-medium text-[13px] pr-2">{toast.message}</span>
                </div>
            </div>

        </main>
    );
}