import ShippingDetailsForm from "@/components/ShippingDetailsForm"
import YourOrder from "@/components/checkout/YourOrder"

const page = () => {
    return (
        <main className="mx-auto max-w-[1600px] py-16 lg:py-20 px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-12">
                {/* Left Form For Shiiping Information */}
                <div className="lg:col-span-5 flex flex-col">
                    <ShippingDetailsForm />
                </div>
                {/* Right For Order Show up => Your Order */}
                <div className="lg:col-span-3">
                    <YourOrder />
                </div>
            </div>
        </main>
    )
}

export default page