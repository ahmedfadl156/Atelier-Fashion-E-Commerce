import LoginForm from "@/components/shared/LoginForm";

const SignInPage = () => {
    return (
        <main className="flex flex-grow items-center justify-center px-8 py-16">
            <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                {/* Left Editorial Image */}
                <div className="hidden lg:block lg:col-span-5 relative group">
                    <div className="aspect-[3/4] overflow-hidden bg-slate-200">
                        <img
                            className="w-full h-full object-cover cursor-crosshair"
                            src="/images/Login Image.png"
                            alt="High-fashion editorial portrait"
                        />
                    </div>
                    {/* Quote Card */}
                    <div className="absolute -bottom-8 -right-8 bg-[#F9F8F6] p-6 max-w-[200px]">
                        <p className="font-serif italic text-sm leading-relaxed text-[#1A1A1A]/80">
                            &ldquo;The pursuit of timeless elegance begins with a single choice.&rdquo;
                        </p>
                    </div>
                </div>

                {/* Login Form */}
                <LoginForm />
            </div>
        </main>
    );
};

export default SignInPage;