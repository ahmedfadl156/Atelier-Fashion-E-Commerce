export default function SkeletonRow() {
    return (
        <tr>
            {[40, 260, 120, 90, 80, 90, 80].map((w, i) => (
                <td key={i} className="px-4 py-4">
                    <div
                        className="h-4 rounded animate-pulse"
                        style={{
                            width: w,
                            background: "rgba(26,26,26,0.07)",
                            maxWidth: "100%",
                        }}
                    />
                </td>
            ))}
        </tr>
    );
}
