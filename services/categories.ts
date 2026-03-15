const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getCategory = async (slug: string) => {
    try {
        const res = await fetch(`${API_URL}/categories/${slug}`);

        if(!res.ok){
            throw new Error("Failed To Get Category Please Try Again");
        }

        const category = await res.json();
        return category;
    } catch (error) {
        console.error(error)
    }
}

export const getAllCategories = async () => {
    try {
        const res = await fetch(`${API_URL}/categories/subcategories`);

        if(!res.ok){
            throw new Error("Failed To Get Categories Please Try Again");
        }

        const data = await res.json();
        return data; 
    } catch (error) {
        console.error("Error while getting categories:", error);
    }
}