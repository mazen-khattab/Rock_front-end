import { useEffect, useState } from 'react';
import Navbar from '../Home/Navbar/Navbar';
import {
  Loader2,
} from "lucide-react";
import ProductCard from '../Global/ProductCard/ProductCard';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import type { Product } from '../../Types/product';
import { useProduct } from '../../Context/ProductContext';
import './Products.css';

type FilterKey = "category" | "size" | "color";

function ProductPage() {
  const { t } = useTranslation("Products");
  // React Router hook for reading and updating query parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const translatedSizes = [t('Products.xs'), t('Products.s'), t('Products.m'), t('Products.l'), t('Products.xl')];

  // Read selected filters directly from the URL
  const activeCategory = searchParams.get("category");
  const activeSize = searchParams.get("size");
  const activeColor = searchParams.get("color");

  const { GetAllProducts, loading } = useProduct();

  const translatedCategories = [
    { name: t('Products.coats_jackets'), subcategories: [], slug: 'Jackets' },
    { name: t('Products.jeans'), subcategories: [], slug: 'Jeans' },
    { name: t('Products.hoodies_sweatshirts'), subcategories: [], slug: 'Hoodies' },
    { name: t('Products.t_shirts'), subcategories: [], slug: 'T-shirts' }
  ];

  const translatedColors = [
    { name: t('Products.black'), value: "black" },
    { name: t('Products.white'), value: "white" },
    { name: t('Products.cream'), value: "cream" },
    { name: t('Products.grey'), value: "grey" },
    { name: t('Products.brown'), value: "brown" },
    { name: t('Products.green'), value: "green" },
  ];

  // Fetch products whenever the URL query parameters change
  useEffect(() => {
    const fetchProducts = async () => {
      const category = activeCategory ?? "";
      const size = activeSize ?? "";
      const color = activeColor ?? "";

      const response = await GetAllProducts(
        1,   // page number
        12,  // page size
        category,
        size,
        color
      );

      setProducts(response);
    };

    fetchProducts();
  }, [searchParams]);

  // Generic function to update (toggle) a query parameter
  const updateSearchParameter = (key: FilterKey, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar />

      <div className="product-page container">
        {loading ? (
          <div className="page-loading" aria-live="polite" aria-busy="true">
            <Loader2 className="page-loading-icon" size={44} />
          </div>
        ) : (
          <div className="page-content">
            {/* Desktop Filter Sidebar */}
            <aside className="filter-sidebar">
              <div className="filter-sidebar-header">
                <div className="filter-title-wrap">
                  <i className="fa-solid fa-sliders filter-title-icon"></i>
                  <h3>{t('Products.filter')}</h3>
                </div>
              </div>

              {/* Categories */}
              <div className="filter-section">
                <a
                  className="collapsed-btn"
                  data-bs-toggle="collapse"
                  href="#cate"
                  role="button"
                  aria-expanded="true"
                  aria-controls="cate"
                >
                  <span>{t('Products.categories')}</span>
                  <i className="fa-solid fa-chevron-down collapse-icon"></i>
                </a>
                <div className="collapse show" id="cate">
                  <div className="categories-list">
                    {translatedCategories.map((cat, idx) => (
                      <div
                        key={idx}
                        className={activeCategory === cat.slug ? "category-item active" : "category-item"}
                        onClick={() => updateSearchParameter('category', cat.slug)}
                      >
                        <span>{cat.name}</span>
                        {activeCategory === cat.slug ? (
                          <i className="fa-solid fa-check active-check"></i>
                        ) : (
                          cat.subcategories.length > 0 && <span className="chevron">›</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div className="filter-section">
                <a
                  className="collapsed-btn"
                  data-bs-toggle="collapse"
                  href="#sizes"
                  role="button"
                  aria-expanded="true"
                  aria-controls="sizes"
                >
                  <span>{t('Products.sizes')}</span>
                  <i className="fa-solid fa-chevron-down collapse-icon"></i>
                </a>
                <div className="collapse show" id="sizes">
                  <div className="size-grid">
                    {translatedSizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        className={activeSize === size ? "active" : ""}
                        onClick={() => updateSearchParameter('size', size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="filter-section">
                <a
                  className="collapsed-btn"
                  data-bs-toggle="collapse"
                  href="#colors"
                  role="button"
                  aria-expanded="true"
                  aria-controls="colors"
                >
                  <span>{t('Products.colors')}</span>
                  <i className="fa-solid fa-chevron-down collapse-icon"></i>
                </a>
                <div className="collapse show" id="colors">
                  <div className="color-grid">
                    {translatedColors.map(color => (
                      <label
                        key={color.value}
                        className={activeColor === color.name ? "color-option active" : "color-option"}
                        onClick={() => updateSearchParameter('color', color.name)}
                      >
                        <input
                          type="checkbox"
                          checked={activeColor === color.name}
                          readOnly
                        />
                        <span
                          className="color-swatch"
                          style={{ backgroundColor: getColorHex(color.value) }}
                        />
                        <span className="color-label">{color.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="filter-sidebar-footer">
                <button
                  type="button"
                  className="btn-clear"
                  onClick={resetFilters}
                >
                  <i className="fa-solid fa-rotate-left"></i>
                  <span>{t('Products.reset')}</span>
                </button>
              </div>
            </aside>

            {/* Mobile Filter Container */}
            <div className="mobile-filter-container">
              {/* Mobile Filter Toggle Button */}
              <button
                type="button"
                className="moblie-filter-button"
                onClick={toggleSidebar}
                aria-label={isOpen ? t('Products.close_filters') : t('Products.open_filters')}
              >
                <i className="fa-solid fa-sliders"></i>
                <span>{t('Products.filter')}</span>
              </button>

              {/* Overlay */}
              <div
                className={`moblie-sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={toggleSidebar}
              />

              {/* Mobile Sidebar */}
              <aside className={`moblie-filter-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="mobile-sidebar-header">
                  <div className="filter-title-wrap">
                    <i className="fa-solid fa-sliders filter-title-icon"></i>
                    <p className="filter-sidebar-title">{t('Products.filter')}</p>
                  </div>
                  <button
                    type="button"
                    className="mobile-close-btn"
                    onClick={toggleSidebar}
                    aria-label="Close filters"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <div className="sidebar-content">
                  {/* Categories */}
                  <div className="filter-section">
                    <a
                      className="collapsed-btn"
                      data-bs-toggle="collapse"
                      href="#mobile-cate"
                      role="button"
                      aria-expanded="true"
                      aria-controls="mobile-cate"
                    >
                      <span>{t('Products.categories')}</span>
                      <i className="fa-solid fa-chevron-down collapse-icon"></i>
                    </a>
                    <div className="collapse show" id="mobile-cate">
                      <div className="categories-list">
                        {translatedCategories.map((cat, idx) => (
                          <div
                            key={idx}
                            className={activeCategory === cat.slug ? "category-item active" : "category-item"}
                            onClick={() => updateSearchParameter('category', cat.slug)}
                          >
                            <span>{cat.name}</span>
                            {activeCategory === cat.slug ? (
                              <i className="fa-solid fa-check active-check"></i>
                            ) : (
                              cat.subcategories.length > 0 && <span className="chevron">›</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="filter-section">
                    <a
                      className="collapsed-btn"
                      data-bs-toggle="collapse"
                      href="#mobile-sizes"
                      role="button"
                      aria-expanded="true"
                      aria-controls="mobile-sizes"
                    >
                      <span>{t('Products.sizes')}</span>
                      <i className="fa-solid fa-chevron-down collapse-icon"></i>
                    </a>
                    <div className="collapse show" id="mobile-sizes">
                      <div className="size-grid">
                        {translatedSizes.map(size => (
                          <button
                            key={size}
                            type="button"
                            className={activeSize === size ? "active" : ""}
                            onClick={() => updateSearchParameter('size', size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="filter-section">
                    <a
                      className="collapsed-btn"
                      data-bs-toggle="collapse"
                      href="#mobile-colors"
                      role="button"
                      aria-expanded="true"
                      aria-controls="mobile-colors"
                    >
                      <span>{t('Products.colors')}</span>
                      <i className="fa-solid fa-chevron-down collapse-icon"></i>
                    </a>
                    <div className="collapse show" id="mobile-colors">
                      <div className="color-grid">
                        {translatedColors.map(color => (
                          <label
                            key={color.value}
                            className={activeColor === color.name ? "color-option active" : "color-option"}
                            onClick={() => updateSearchParameter('color', color.name)}
                          >
                            <input
                              type="checkbox"
                              checked={activeColor === color.name}
                              readOnly
                            />
                            <span
                              className="color-swatch"
                              style={{ backgroundColor: getColorHex(color.value) }}
                            />
                            <span className="color-label">{color.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reset */}
                <div className="filter-sidebar-footer">
                  <button
                    type="button"
                    className="btn-clear"
                    onClick={() => {
                      resetFilters();
                      setIsOpen(false);
                    }}
                  >
                    <i className="fa-solid fa-rotate-left"></i>
                    <span>{t('Products.reset')}</span>
                  </button>
                </div>
              </aside>
            </div>

            {/* Main content */}
            <main className="products-main">
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to get color hex codes
function getColorHex(colorName: string) {
  const colors = {
    black: "#000000",
    white: "#FFFFFF",
    cream: "#FFFDD0",
    grey: "#808080",
    brown: "#A52A2A",
    green: "#008000",
    multicolor: "linear-gradient(45deg, #FF5733, #33FF57, #3357FF)"
  } as const;
  return colors[colorName as keyof typeof colors] || "#CCCCCC";
}

export default ProductPage;
