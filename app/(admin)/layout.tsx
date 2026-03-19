const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className="bg-[#F9F8F6] text-slate-900 selection:bg-[#D4AF37] selection:text-white">
            <div className="relative min-h-screen flex flex-col z-10">
                {children}
            </div>
        </main>
    )
}

export default layout