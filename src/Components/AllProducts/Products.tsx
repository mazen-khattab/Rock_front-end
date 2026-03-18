import { useEffect, useState } from 'react';
import Navbar from '../Home/Navbar/Navbar';
import {
  Loader2,
} from "lucide-react";
import ProductCard from '../Global/ProductCard/ProductCard';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
// import ProductPopup from '../Global/ProductPopup/ProductPopup';
import type { Product } from '../../Types/product';
import { useProduct } from '../../Context/ProductContext';
import './Products.css';

type FilterKey = "category" | "size" | "color";

function ProductPage() {
  const { t } = useTranslation("Products");
  // React Router hook for reading and updating query parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([])
  const translatedSizes = [t('Products.xs'), t('Products.s'), t('Products.m'), t('Products.l'), t('Products.xl')];

  // Read selected filters directly from the URL
  const activeCategory = searchParams.get("category");
  const activeSize = searchParams.get("size");
  const activeColor = searchParams.get("color");

  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  // const handleProductClick = (product: Product) => {
  //   setSelectedProduct(product);
  // };

  // const handleClosePopup = () => {
  //   setSelectedProduct(null);
  // };

  // Generic function to update (toggle) a query parameter
  const updateSearchParameter = (key: FilterKey, value: string) => {
    // Create a mutable copy of the current URL search parameters
    const params = new URLSearchParams(searchParams);

    // If the same value is already selected, remove it (toggle off)
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      // Otherwise, set / update the parameter
      params.set(key, value);
    }

    // Update the URL with the new query parameters
    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchParams({});
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="product-page container">
        {loading ? (
          <div className="page-loading" aria-live="polite" aria-busy="true">
            <Loader2 className="page-loading-icon" size={48} />
          </div>
        ) : (
          <div className="page-content">
            {/* Sidebar */}
            <aside className="filter-sidebar">
              <div className="filter-section" style={{ marginBottom: '1rem' }}>
                <h3>{t('Products.filter')}</h3>
              </div>

              {/* Categories */}
              <div className="filter-section">
                <p>
                  <a className="collapsed-btn" data-bs-toggle="collapse" href="#cate" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {t('Products.categories')}
                  </a>
                </p>
                <div className="collapse" id="cate">
                  {translatedCategories.map((cat, idx) => (
                    <div
                      key={idx}
                      className={activeCategory === cat.slug ? "category-item active" : "category-item"}
                      onClick={() => updateSearchParameter('category', cat.slug)}
                    >
                      <span>{cat.name}</span>
                      {cat.subcategories.length > 0 && <span className="chevron">›</span>}
                    </div>
                  ))}
                </div>

              </div>

              {/* Sizes */}
              <div className="filter-section">
                <p>
                  <a className="collapsed-btn" data-bs-toggle="collapse" href="#sizes" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {t('Products.sizes')}
                  </a>
                </p>
                <div className="collapse" id="sizes">
                  <div className="size-grid">
                    {translatedSizes.map(size => (
                      <button
                        key={size}
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
                <p>
                  <a className="collapsed-btn" data-bs-toggle="collapse" href="#colors" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {t('Products.colors')}
                  </a>
                </p>
                <div className="collapse" id="colors">
                  <div className="color-grid">
                    {translatedColors.map(color => (
                      <label
                        key={color.value}
                        className={activeColor === color.name ? "color-option active" : "color-option"}
                        onClick={() => updateSearchParameter('color', color.name)}>
                        <input
                          type="checkbox"
                        />
                        <span className="color-swatch" style={{ backgroundColor: getColorHex(color.value) }}></span>
                        <span className="color-label">{color.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply & Reset */}
              <div className="filter-sidebar-footer">
                <button className="btn-clear" onClick={resetFilters}>{t('Products.reset')}</button>
              </div>
            </aside>

            {/* Mobile sidebar */}
            <div className="mobile-filter-container">
              {/* opening button */}
              <button
                className="moblie-filter-button"
                onClick={toggleSidebar}
                aria-label={isOpen && window.innerWidth <= 768 ? t('Products.close_filters') : t('Products.open_filters')}>
                {t('Products.filter')} <i className="fa-solid fa-filter" style={{ marginLeft: '.25rem' }}></i>
              </button>

              {/* overlay */}
              <div className={`moblie-sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar} />

              {/* Sidebar */}
              <aside className={`moblie-filter-sidebar ${isOpen ? 'open' : ''}`}>
                <p className='filter-sidebar-title'>{t('Products.filter')}</p>
                <div className="sidebar-content">

                  {/* Categories */}
                  <div className="filter-section">
                    <p>
                      <a className="collapsed-btn" data-bs-toggle="collapse" href="#cate" role="button" aria-expanded="false" aria-controls="collapseExample">
                        {t('Products.categories')}
                      </a>
                    </p>
                    <div className="collapse" id="cate">
                      {translatedCategories.map((cat, idx) => (
                        <div
                          key={idx}
                          className={activeCategory === cat.slug ? "category-item active" : "category-item"}
                          onClick={() => updateSearchParameter('category', cat.slug)}
                        >
                          <span>{cat.name}</span>
                          {cat.subcategories.length > 0 && <span className="chevron">›</span>}
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Sizes */}
                  <div className="filter-section">
                    <p>
                      <a className="collapsed-btn" data-bs-toggle="collapse" href="#sizes" role="button" aria-expanded="false" aria-controls="collapseExample">
                        {t('Products.sizes')}
                      </a>
                    </p>
                    <div className="collapse" id="sizes">
                      <div className="size-grid">
                        {translatedSizes.map(size => (
                          <button
                            key={size}
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
                    <p>
                      <a className="collapsed-btn" data-bs-toggle="collapse" href="#colors" role="button" aria-expanded="false" aria-controls="collapseExample">
                        {t('Products.colors')}
                      </a>
                    </p>
                    <div className="collapse" id="colors">
                      <div className="color-grid">
                        {translatedColors.map(color => (
                          <label
                            key={color.value}
                            className={activeColor === color.name ? "color-option active" : "color-option"}
                            onClick={() => updateSearchParameter('color', color.name)}
                          >
                            <input
                              type="checkbox"
                            />
                            <span className="color-swatch" style={{ backgroundColor: getColorHex(color.value) }}></span>
                            <span className="color-label">{color.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Apply & Reset */}
                <div className="filter-sidebar-footer">
                  <button className="btn-clear">{t('Products.reset')}</button>
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
                  // onProductClick={handleProductClick}
                  />
                ))}
              </div>
            </main>
          </div>
        )}

        {/* {selectedProduct && (
          <ProductPopup
            product={selectedProduct}
            // onClose={handleClosePopup}
          />
        )} */}
      </div>

    </div >
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