const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDashboardStats = async () => {
    try {
        const response = await fetch(`${API_URL}/analytics/dashboard`, {
            credentials: "include",
        });
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch dashboard stats");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        throw error;
    }
}