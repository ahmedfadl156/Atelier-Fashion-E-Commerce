const KPISkeleton = () => {
    return (
        <div
            className="rounded-sm p-6 flex flex-col gap-4 animate-pulse"
            style={{ background: "#fff", border: "1px solid rgba(26,26,26,0.07)" }}
        >
            <div className="flex items-center justify-between">
                <div className="h-2.5 w-28 rounded-full" style={{ background: "rgba(26,26,26,0.08)" }} />
                <div className="w-9 h-9 rounded-sm" style={{ background: "rgba(26,26,26,0.06)" }} />
            </div>
            <div className="h-7 w-20 rounded-full" style={{ background: "rgba(26,26,26,0.08)" }} />
            <div className="h-px w-full" style={{ background: "rgba(26,26,26,0.05)" }} />
        </div>
    )
}

export default KPISkeleton