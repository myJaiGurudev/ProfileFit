import { createContext, useContext, useEffect, useState } from "react";
import api from "../features/auth/components/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        setLoading(true);
        try {
            const res = await api.get("/auth/get-details");
            if (res.data.user) {
                setUser(res.data.user);
            }
        } catch (error) {
            console.log(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getUser(); }, []);

    const logout = async () => {
        try {
            await api.get("/auth/logout");
        } catch (error) {
            console.log(error);
        } finally {
            setUser(null);
        }
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                refreshUser: getUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);