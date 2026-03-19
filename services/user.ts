import { GetUserProfileResponse } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserProfile = async (): Promise<GetUserProfileResponse> => {
    const res = await fetch(`${API_URL}/users/getMe`, {
        credentials: "include",
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch user profile");
    }

    return res.json();
};
