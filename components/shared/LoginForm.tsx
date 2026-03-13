"use client"
import { useAuth } from "@/context/authContext";
import { SignInSchema , signInSchema } from "@/lib/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
    const {signIn , isLoading} = useAuth();
    const router = useRouter();
    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(data: SignInSchema) {
        try {
            await signIn(data.email , data.password);
            toast.success("You Logged In Successfully");
            router.push('/')
        } catch (error: any) {
            toast.error(error.message || "Login Failed Please Try Again Later!")
        }
    }
    return (
        <div className="lg:col-span-7 lg:pl-12 flex flex-col">
            <div className="mb-16">
                <span className="text-primary text-xs uppercase tracking-[0.4em] font-bold block mb-4">Membership</span>
                <h1 className="font-serif text-7xl md:text-8xl font-black leading-tight text-[#1A1A1A] -ml-1">
                    Join <br />the Circle
                </h1>
                <p className="text-[#1A1A1A]/60 mt-6 max-w-md font-light leading-relaxed">
                    Experience the pinnacle of luxury fashion editorial. Curated collections, early access, and the whispers of the industry.
                </p>
            </div>

            <form className="space-y-12 max-w-md" onSubmit={form.handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="relative">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-2 block">
                        Email Address
                    </label>
                    <input
                        id="email"
                        className="underline-input italic-placeholder w-full py-4 text-lg focus:ring-0 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity duration-300"
                        placeholder="Your email address..."
                        type="email"
                        disabled={isLoading}
                        {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                        <p className="text-red-500 text-[10px] mt-2 tracking-wide">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="relative">
                    <label htmlFor="password" className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-2 block">
                        Secret Password
                    </label>
                    <input
                        id="password"
                        className="underline-input italic-placeholder w-full py-4 text-lg focus:ring-0 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity duration-300"
                        placeholder="Your secret password..."
                        type="password"
                        disabled={isLoading}
                        {...form.register("password")}
                    />
                    {form.formState.errors.password && (
                        <p className="text-red-500 text-[10px] mt-2 tracking-wide">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-col gap-6">
                    <button
                        className="gold-button w-full py-5 text-[11px] uppercase tracking-[0.4em] font-bold z-10 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4 shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12" cy="12" r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                                <span>Signning In...</span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </button>

                    <div className="flex items-center justify-between">
                        <Link
                            className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/40 hover:text-primary transition-colors"
                            href="/forget-password"
                        >
                            Forgot Password?
                        </Link>
                        <div className="h-px w-12 bg-[#1A1A1A]/10"></div>
                        <Link
                            className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] font-bold hover:text-primary transition-colors"
                            href="/sign-up"
                        >
                            Not Have Account Yet?
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
