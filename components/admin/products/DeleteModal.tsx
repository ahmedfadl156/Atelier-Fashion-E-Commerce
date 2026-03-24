import { Trash2 } from "lucide-react";

interface DeleteModalProps {
    productTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteModal({ productTitle, onConfirm, onCancel }: DeleteModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
        >
            <div
                className="relative w-full max-w-sm mx-4 rounded-sm p-7 shadow-2xl"
                style={{ background: "#fff", border: "1px solid rgba(26,26,26,0.1)" }}
            >
                {/* Red accent top bar */}
                <span
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: "#C0392B" }}
                />

                {/* Icon */}
                <div
                    className="flex items-center justify-center w-11 h-11 rounded-sm mb-5"
                    style={{ background: "rgba(192,57,43,0.08)" }}
                >
                    <Trash2 size={20} style={{ color: "#C0392B" }} />
                </div>

                {/* Label */}
                <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: "rgba(26,26,26,0.4)" }}
                >
                    Confirm Deletion
                </p>

                {/* Title */}
                <p
                    className="text-base mb-2"
                    style={{
                        fontFamily: "'Liberation Serif', Georgia, serif",
                        color: "#1A1A1A",
                    }}
                >
                    Delete &ldquo;{productTitle}&rdquo;?
                </p>

                {/* Description */}
                <p className="text-sm mb-7" style={{ color: "rgba(26,26,26,0.55)" }}>
                    This action cannot be undone. The product and all its data will be permanently removed.
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2.5 rounded-sm text-sm font-medium transition-all duration-150"
                        style={{
                            background: "transparent",
                            border: "1px solid rgba(26,26,26,0.15)",
                            color: "rgba(26,26,26,0.7)",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 rounded-sm text-sm font-medium transition-all duration-150"
                        style={{ background: "#C0392B", color: "#fff", border: "none" }}
                    >
                        Delete product
                    </button>
                </div>
            </div>
        </div>
    );
}
