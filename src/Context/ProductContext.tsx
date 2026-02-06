import React, { createContext, useContext, useState } from "react";
import type { Product } from "../Types/product";
import api from '../API'

type ProductContextType = {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;

    GetAllProducts: (pageNumber: number, pageSize: number, category: string, size: string, color: string) => Promise<Product[]>;
    GetById: (id: number) => Promise<Product | null>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

type ProductProviderProps = {
    children: React.ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const savedLang = localStorage.getItem("lang"); 
    const langId = savedLang === 'ar' ? 1 : 2;

    // =========================
    // 1) GetAllProducts
    // =========================
    const GetAllProducts = async (pageNumber: number, pageSize: number, category: string, size: string, color: string) => {
        try {
            setLoading(true);

            const response = await api.get(`/Product/Products/${langId}`, {
                params: {
                    pageNumber,
                    pageSize,
                    category,
                    size, 
                    color
                }
            });

            setProducts(response.data);
            return response.data.items;
        } catch (error) {
            console.error("GetAllProducts Error:", error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // 2) GetById
    // =========================
    const GetById = async (id: number) => {
        try {
            setLoading(true);

            const response = await api.get<Product>(`/Product/${id}/${langId}`);
            
            setSelectedProduct(response.data);
            return response.data;
        } catch (error) {
            console.error("GetById Error:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                selectedProduct,
                loading,
                GetAllProducts,
                GetById
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

// ✅ Custom hook for easy usage
export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used inside ProductProvider");
    }
    return context;
};
