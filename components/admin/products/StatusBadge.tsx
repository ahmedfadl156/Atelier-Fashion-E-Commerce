import { STATUS_CONFIG } from "./constants";

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.active;
    return (
        <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-medium tracking-wide"
            style={{ background: cfg.bg, color: cfg.color }}
        >
            <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: cfg.dot }}
            />
            {cfg.label}
        </span>
    );
}
