"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface User {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    atelierPoints: number,
    tier: string,
    isVerified: boolean,
    lastLogin: Date,
    profileImage?: string
}

interface AuthContextType {
    user: User | null,
    isLoading: boolean,
    isAuthenticated: boolean,
    signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
    signIn: (email: string , password: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user , setUser] = useState<User | null>(null);
    const [isLoading , setIsLoading] = useState(true);
    const queryClient = useQueryClient();

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const res = await fetch(`${API_URL}/users/getMe` , {
                credentials: "include"
            });

            if(res.ok){
                const userData = await res.json();
                setUser(userData.data);
            }else{
                setUser(null);
                queryClient.clear();
            }
        } catch (error) {
            console.error(error);
            setUser(null);
            queryClient.clear();
        } finally {
            setIsLoading(false)
        }
    }

    const signIn = async (email: string , password: string) => {
        try {
            setIsLoading(true);
            const res = await fetch(`${API_URL}/auth/sign-in` , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({email , password})
            })

            if(res.ok){
                await checkAuth();
            }else{
                const errorData = await res.json();
                throw new Error(errorData.message || "Login Failed Please Try Again!")
            }
        } catch (error) {
            console.error("Login Failed", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
        try {
            setIsLoading(true);
            const res = await fetch(`${API_URL}/auth/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            if (res.ok) {
                await checkAuth();
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || "Sign up failed. Please try again!");
            }
        } catch (error) {
            console.error("Sign up failed", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const signOut = async () => {
        try {
            await fetch(`${API_URL}/auth/sign-out`, {
                method: "POST",
                credentials: "include"
            });
        } catch (error) {
            console.error("Sign out failed", error);
        } finally {
            setUser(null);
            queryClient.clear();
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated: !!user,
            signIn,
            signUp,
            signOut,
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
