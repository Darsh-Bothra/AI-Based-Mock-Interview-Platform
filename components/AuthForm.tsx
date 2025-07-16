"use client";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signIn, signUp } from "@/lib/action/auth.action";
import { auth } from "@/firebase/client";

const authSchema = z.object({
    fullName: z.string().min(2, "Full name is required").optional(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormType = z.infer<typeof authSchema>;

type AuthCardProps = {
    type: "sign-in" | "sign-up";
};

export default function AuthCard({ type }: AuthCardProps) {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormType>({
        resolver: zodResolver(authSchema),
    });

    const onSubmit = async (data: AuthFormType) => {
        console.log("Form submitted", data);
        try {
            if (type === "sign-up") {
                const { fullName, email, password } = data;
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const res = await signUp({
                    uid: userCredential.user.uid,
                    name: fullName!,
                    email,
                    password
                })
                if(!res.success) {
                    toast.error(res.message)
                    return
                } 
                toast.success("Account created successfully! Sign in to continue");
                router.push("/sign-in")
            }
            else if (type === "sign-in") {
                const {email, password} = data;
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredential.user.getIdToken();
                if(!idToken) {
                    toast.error("Something went wrong")
                    return
                }
                await signIn({email, idToken});
                toast.success("Signed In successfully");
                router.push("/")
            }
        }
        catch (err) {
            console.log(err);
            toast.error(`There was an: ${err}`);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="w-full max-w-4xl bg-[#111] border border-gray-800 rounded-2xl shadow-xl">
                <CardContent className="py-10 px-10">
                    <div className="text-center mb-10">
                        <div className="text-3xl font-semibold text-white flex items-center justify-center gap-2">
                            <span className="text-purple-400">🧠 Mock</span>
                            <span className="text-white">Mate</span>
                        </div>
                        {/* Heading and description */}
                        <p className="text-white mt-2 text-lg">
                            Practice job interviews with AI
                        </p>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* SignUp component */}
                        {type === "sign-up" && (
                            <>
                                <div className="col-span-full">
                                    <Label htmlFor="fullname" className="text-white mb-3">Full name</Label>
                                    <Input id="fullname" placeholder="Full name" {...register("fullName")} className="bg-gray-800 text-white mt-1" />
                                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="email" className="text-white mb-3">Email</Label>
                                    <Input id="email" type="email" placeholder="Email" {...register("email")} className="bg-gray-800 text-white mt-1" />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="password" className="text-white mb-3">Password</Label>
                                    <Input id="password" type="password" placeholder="Enter your password" {...register("password")} className="bg-gray-800 text-white mt-1" />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="profilePic" className="text-white mb-3">Profile picture</Label>
                                    <Button variant="outline" className="w-full bg-gray-800 text-white border-gray-600 hover:bg-gray-700">
                                        <Upload className="w-4 h-4 mr-2" /> Upload an image
                                        <Input type="file" accept="image/*" className="hidden" id="profilePic" />
                                    </Button>
                                </div>

                                <div>
                                    <Label htmlFor="resume" className="text-white mb-3">Resume</Label>
                                    <Button variant="outline" className="w-full bg-gray-800 text-white border-gray-600 hover:bg-gray-700">
                                        <Upload className="w-4 h-4 mr-2" /> Upload a PDF
                                        <Input type="file" accept="application/pdf" className="hidden" id="resume" />
                                    </Button>
                                </div>
                                <div className="col-span-full">
                                    <Button type="submit" className="w-full bg-purple-400 hover:bg-purple-500 text-black font-semibold mt-2">
                                        Create an account
                                    </Button>
                                </div>
                                <div>
                                    <p className="text-white text-sm">
                                        Already have an account?{" "}
                                        <Link href={"/sign-in"} className="text-purple-400 hover:underline">Sign in</Link>
                                    </p>
                                </div>
                            </>
                        )}

                        {/* SignIn Component  */}
                        {type === "sign-in" && (
                            <>
                                <div className="flex flex-col gap-7 col-span-full">
                                    <div>
                                        <Label htmlFor="email" className="text-white mb-3">Email</Label>
                                        <Input id="email" type="email" placeholder="Email" {...register("email")} className="bg-gray-800 text-white mt-1" />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="password" className="text-white mb-3">Password</Label>
                                        <Input id="password" type="password" placeholder="Enter your password" {...register("password")} className="bg-gray-800 text-white mt-1" />
                                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <Button type="submit" className="w-full bg-purple-400 hover:bg-purple-500 text-black font-semibold mt-2">
                                        Sign In
                                    </Button>
                                </div>
                                <div>
                                    <p className="text-white text-sm">
                                        Don't have an account?{" "}
                                        <Link href={"/sign-up"} className="text-purple-400 hover:underline">Sign up</Link>
                                    </p>
                                </div>
                            </>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}