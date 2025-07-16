"use client";

import { createContext, useContext, useState, useEffect, use } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/client";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    showLoginModal: boolean;
    setShowLoginModal: (val: boolean) => void;
    requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);    

    useEffect(() => {
        const unsubscriber = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);  
        })
        return () => unsubscriber();
    }, [])

    const requireAuth = () => {
        if(!user) {
            setShowLoginModal(true);
            return false;
        }
        return true;
    }

    return (
        <AuthContext.Provider value={{user, loading, showLoginModal, setShowLoginModal, requireAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used inside AuthProvider");
    return context;
}