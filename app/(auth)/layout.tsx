const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className="bg-[#F9F8F6] text-slate-900 selection:bg-[#D4AF37] selection:text-white">
            {/* Grid Lines */}
            <div className="vertical-grid-line left-1/4"></div>
            <div className="vertical-grid-line left-2/4"></div>
            <div className="vertical-grid-line left-3/4"></div>
            <div className="relative min-h-screen flex flex-col z-10">
                {children}
            </div>
        </main>
    )
}

export default layout