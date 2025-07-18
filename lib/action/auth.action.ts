'use server'

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: 60 * 60 * 24 * 5 * 1000,
    })
    cookieStore.set('session', sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 5,
    })
}

export async function signUp(params: SignUpParams) {
    const { uid, name, email, password } = params;

    try {
        const userCredential = await db.collection('users').doc(uid).get();
        if (userCredential.exists) {
            return {
                success: false,
                message: "User already exists. Please sign in"
            }
        }
        await db.collection('users').doc(uid).set({
            name,
            email
        });

        return {
            success: true,
            message: "Account created successfully"
        }
    } catch (error: any) {
        console.error("Error in creating a user", error);
        if (error.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: "This email is already in use"
            }
        }
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const user = await auth.getUserByEmail(email);
        if (!user) {
            return {
                success: false,
                message: "User does not exist. Create an account first"
            }
        }
        await setSessionCookie(idToken);
        return {
            success: true,
            message: "Signed In successfully"
        }
    } catch (error: any) {
        console.error("Error in signing in", error);
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if (!sessionCookie) {
        return null;
    }
    
    try {
        const decodeUser = await auth.verifySessionCookie(sessionCookie);
        const user = await db.collection('users').doc(decodeUser.uid).get();
        if (!user.exists) {
            return null;
        }
        return {
            ...user.data(),
            id : user.id
        } as User;
    } catch (error) {
        console.log(error);
        return null;
    } 


}

// TODO : Home page and interview button authentication
export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}

