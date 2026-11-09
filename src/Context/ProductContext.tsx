import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import type { CategoryLookup, Product, ProductContextType, ProductDetails } from "../Types/product";
import api from "../API";
import type { ApiResponse } from "../Types/auth";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

type ProductProviderProps = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryLookup[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const categoriesRef = useRef<CategoryLookup[]>([]);

  // =========================
  // 1) GetAllProducts
  // =========================
  const GetAllProducts = async (pageNumber: number, pageSize: number, category?: string, size?: string, color?: string) => {
    try {
      setLoading(true);

      const response = await api.get(`/Products`, {
        params: {
          pageNumber,
          pageSize,
          category,
          size,
          color,
        },
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

      const response = await api.get<ApiResponse<ProductDetails>>(`/Products/${id}`);

      setSelectedProduct(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("GetById Error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const GetAllCategories = useCallback(async () => {
    if (categoriesRef.current.length > 0) {
      return categoriesRef.current;
    }

    try {
      setCategoriesLoading(true);
      const response = await api.get<ApiResponse<CategoryLookup[]>>(`/Categories/lookup`);
      const data = response.data.data ?? [];
      setCategories(data);
      categoriesRef.current = data;
      return data;
    } catch (error) {
      console.error("GetAllCategories Error:", error);
      return [];
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        selectedProduct,
        loading,
        categoriesLoading,
        GetAllProducts,
        GetById,
        GetAllCategories,
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
