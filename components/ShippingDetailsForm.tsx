"use client";
import { useState } from "react";
import { shippingDetailsSchema, ShippingDetailsSchema } from "@/lib/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCashOrder, useCreditOrder } from "@/hooks/checkout/useCheckout";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ShippingDetailsForm = () => {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "credit">("cash");

    const cashOrderMutation = useCashOrder();
    const creditOrderMutation = useCreditOrder();

    const form = useForm<ShippingDetailsSchema>({
        resolver: zodResolver(shippingDetailsSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            street: "",
            city: "",
            country: "Egypt"
        }
    });

    const onSubmit = async (data: ShippingDetailsSchema) => {
        if (paymentMethod === "cash") {
            cashOrderMutation.mutate(data, {
                onSuccess: (orderData) => {
                    if (typeof window !== "undefined") {
                        sessionStorage.setItem("lastOrderData", JSON.stringify(orderData));
                    }
                    router.push("/checkout/success");
                }
            });
        } else {
            creditOrderMutation.mutate(data, {
                onSuccess: (paymobResponse: any) => {
                    if (paymobResponse?.sessionUrl) {
                        window.location.href = paymobResponse.sessionUrl;
                    } else {
                        toast.error("Invalid payment gateway response");
                    }
                }
            });
        }
    };

    const onError = (errors: any) => {
        toast.error("Please fill in all required fields correctly.");
    };

    const isPending = cashOrderMutation.isPending || creditOrderMutation.isPending;

    return (
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="flex flex-col gap-10">
            {/* Shipping Details Section */}
            <div className="bg-[#1A1A1A] p-6 lg:p-8 text-white flex flex-col gap-6 w-full">
                <div className="border-b border-white/10 pb-4">
                    <p className="text-[9px] uppercase tracking-[0.35em] text-white/40 mb-1">Step 1</p>
                    <h2 className="text-xl italic font-serif text-white">Shipping Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] uppercase tracking-widest text-white/60">First Name</label>
                        <input
                            {...form.register("firstName")}
                            className="bg-transparent border-b border-white/20 pb-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                            placeholder="Your First Name..."
                        />
                        {form.formState.errors.firstName && (
                            <span className="text-red-500 text-[10px]">{form.formState.errors.firstName.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] uppercase tracking-widest text-white/60">Last Name</label>
                        <input
                            {...form.register("lastName")}
                            className="bg-transparent border-b border-white/20 pb-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                            placeholder="Your Last Name..."
                        />
                        {form.formState.errors.lastName && (
                            <span className="text-red-500 text-[10px]">{form.formState.errors.lastName.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[11px] uppercase tracking-widest text-white/60">Phone Number</label>
                        <input
                            {...form.register("phone")}
                            className="bg-transparent border-b border-white/20 pb-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                            placeholder="010XXXXXXXX"
                        />
                        {form.formState.errors.phone && (
                            <span className="text-red-500 text-[10px]">{form.formState.errors.phone.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[11px] uppercase tracking-widest text-white/60">Street Address</label>
                        <input
                            {...form.register("street")}
                            className="bg-transparent border-b border-white/20 pb-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                            placeholder="Your Specific Address..."
                        />
                        {form.formState.errors.street && (
                            <span className="text-red-500 text-[10px]">{form.formState.errors.street.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] uppercase tracking-widest text-white/60">City</label>
                        <input
                            {...form.register("city")}
                            className="bg-transparent border-b border-white/20 pb-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                            placeholder="Your City..."
                        />
                        {form.formState.errors.city && (
                            <span className="text-red-500 text-[10px]">{form.formState.errors.city.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] uppercase tracking-widest text-white/60">Country</label>
                        <input
                            {...form.register("country")}
                            className="bg-transparent border-b border-white/20 pb-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                            placeholder="Your Country..."
                        />
                        {form.formState.errors.country && (
                            <span className="text-red-500 text-[10px]">{form.formState.errors.country.message}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-[#1A1A1A] p-6 lg:p-8 text-white flex flex-col gap-6 w-full">
                <div className="border-b border-white/10 pb-4">
                    <p className="text-[9px] uppercase tracking-[0.35em] text-white/40 mb-1">Step 2</p>
                    <h2 className="text-xl italic font-serif text-white">Payment Method</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setPaymentMethod("cash")}
                        className={`flex flex-col items-center justify-center p-6 border transition-all duration-300 ${
                            paymentMethod === "cash" 
                                ? "border-[#D4AF37] bg-white/5" 
                                : "border-white/10 hover:border-white/30"
                        }`}
                    >
                        <Truck className={`w-8 h-8 mb-3 ${paymentMethod === "cash" ? "text-[#D4AF37]" : "text-white/40"}`} />
                        <span className="text-sm font-medium tracking-wide">Cash on Delivery</span>
                        <span className="text-[10px] text-white/40 mt-1">Pay when you receive it</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setPaymentMethod("credit")}
                        className={`flex flex-col items-center justify-center p-6 border transition-all duration-300 ${
                            paymentMethod === "credit" 
                                ? "border-[#D4AF37] bg-white/5" 
                                : "border-white/10 hover:border-white/30"
                        }`}
                    >
                        <CreditCard className={`w-8 h-8 mb-3 ${paymentMethod === "credit" ? "text-[#D4AF37]" : "text-white/40"}`} />
                        <span className="text-sm font-medium tracking-wide">Secure Online Payment</span>
                        <span className="text-[10px] text-white/40 mt-1">Pay securely via Paymob</span>
                    </button>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#D4AF37] text-[#1A1A1A] py-5 text-[12px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3 hover:bg-[#C9A832] transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>Complete Order</>
                )}
            </button>
        </form>
    );
};

export default ShippingDetailsForm;