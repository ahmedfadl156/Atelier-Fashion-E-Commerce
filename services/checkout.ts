import { ShippingDetailsSchema } from "@/lib/Schemas";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const cashOrder = async (shippingDetails: ShippingDetailsSchema) => {
    try {
        const payload = {
            shippingAddress: {
                firstName: shippingDetails.firstName,
                lastName: shippingDetails.lastName,
                street: shippingDetails.street,
                phoneNumber: shippingDetails.phone,
                city: shippingDetails.city,
                country: shippingDetails.country
            }
        };

        const res = await fetch(`${API_URL}/order` , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(payload)
        });

        if(!res.ok){
            const errorData = await res.json();
            throw new Error(errorData.message || "Cannot Create Your Order! Pleae Try Again")
        }
        const orderData = await res.json();
        return orderData;
    } catch (error) {
        throw error;
    }
}


export const createCreditOrder = async (shippingDetails: ShippingDetailsSchema) => {
    try {
        const payload = {
            shippingAddress: {
                firstName: shippingDetails.firstName,
                lastName: shippingDetails.lastName,
                street: shippingDetails.street,
                phoneNumber: shippingDetails.phone,
                city: shippingDetails.city,
                country: shippingDetails.country
            }
        };

        const res = await fetch(`${API_URL}/order/checkout-session` , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(payload)
        });

        if(!res.ok){
            const errorData = await res.json();
            throw new Error(errorData.message || "Cannot Create Your Order! Pleae Try Again")
        }

        const orderPurchace = await res.json();
        return orderPurchace;
    } catch (error) {
        throw error;
    }
}