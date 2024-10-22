import { create } from "zustand";

export const useProductStore = create((set) =>({
    products: [],
    setProducts: (products) => set({ products}),
    createProduct: async(newProduct) => {
        try {
            if(!newProduct.name || !newProduct.price || !newProduct.image) {
                return {success: false, message: "All fields are required"};
            }
            
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            set((state) => ({products: [...state.products, data.data]}));
            return {success: true, message: "Product created successfully"};
        } catch (error) {
            console.error('Error creating product:', error);
            return {success: false, message: error.message};
        }
    }
}));


