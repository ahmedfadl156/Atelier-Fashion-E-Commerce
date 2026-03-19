export interface UserProfile {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    atelierPoints: number;
    tier: string;
    wishlist: string[];
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
}

export interface GetUserProfileResponse {
    status: string;
    data: UserProfile;
}
