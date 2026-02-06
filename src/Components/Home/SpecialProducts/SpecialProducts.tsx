import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductPopup from '../../Global/ProductPopup/ProductPopup';
import ProductCard from '../../Global/ProductCard/ProductCard';
import type { Product } from '../../../Types/product';
import { useProduct } from '../../../Context/ProductContext';
import './SpecialProducts.css'

const SpecialProducts = () => {
    const { t } = useTranslation("Home");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const carouselRef = useRef(null);
    const savedLang = localStorage.getItem('lang');

    const { GetAllProducts } = useProduct();

    // const handleProductClick = (product: Product) => {
    //     setSelectedProduct(product);
    // };

    // calling the endpoint that get all products
    useEffect(() => {
        const GetAll = async () => {
            const response = await GetAllProducts(1, 9);
            setProducts(response);
        }

        GetAll();
    }, [])

    // Filter products by category
    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(product =>
            product.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

    const categories = [...new Set(products.map(p => p.category))];
    const categoriesWithAll = ["All", ...categories];

    // Calculate how many products to show per slide based on screen size
    const [productsPerSlide, setProductsPerSlide] = useState(4);

    useEffect(() => {
        const updateProductsPerSlide = () => {
            if (window.innerWidth < 640) {
                setProductsPerSlide(1);
            } else if (window.innerWidth < 768) {
                setProductsPerSlide(2);
            } else if (window.innerWidth < 1024) {
                setProductsPerSlide(2);
            } else {
                setProductsPerSlide(3);
            }

            setCurrentIndex(0);
        };

        updateProductsPerSlide();
        window.addEventListener('resize', updateProductsPerSlide);
        return () => window.removeEventListener('resize', updateProductsPerSlide);
    }, []);

    // Calculate total slides needed
    const totalSlides = Math.ceil(filteredProducts.length / productsPerSlide);

    // Handle navigation
    const nextSlide = () => {
        setCurrentIndex(prev => (prev === totalSlides - 1 ? prev : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev === 0 ? 0 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // Calculate translateX value for carousel
    const direction = savedLang === 'ar' ? 1 : -1;
    const translateX = direction * currentIndex * 100;

    // const handleClosePopup = () => {
    //     setSelectedProduct(null);
    // };

    return (
        <div className="container special-products">
            <div className="section-header">
                <h1>{t("specialProducts.title")}</h1>
                <div className="category-filters">
                    {categoriesWithAll.map((category) => (
                        <button
                            key={category}
                            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => {
                                setActiveCategory(category);
                                setCurrentIndex(0); // Reset to first slide when changing category
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <button
                className="carousel-arrow"
                style={savedLang === 'ar' ? { right: "1rem" } : { left: "1rem" }}
                onClick={prevSlide}
                aria-label={t("specialProducts.previous_products")}
            >
                {savedLang === 'ar' ? <i className="fas fa-chevron-right"></i> : <i className="fas fa-chevron-left"></i>}
            </button>
            <button
                className="carousel-arrow"
                style={savedLang === 'ar' ? { left: "1rem" } : { right: "1rem" }}
                onClick={nextSlide}
                aria-label={t("specialProducts.next_products")}
            >
                {savedLang === 'ar' ? <i className="fas fa-chevron-left"></i> : <i className="fas fa-chevron-right"></i>}
            </button>
            <div className="carousel-container">
                {/* Navigation arrows */}

                {/* Carousel track */}
                <div
                    className="carousel-track"
                    ref={carouselRef}
                    style={{ transform: `translateX(${translateX}%)` }}
                >
                    {/* Create slides */}
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                        <div key={slideIndex} className="carousel-slide">
                            {/* Products for this slide */}
                            {filteredProducts
                                .slice(slideIndex * productsPerSlide, (slideIndex + 1) * productsPerSlide)
                                .map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    // onProductClick={handleProductClick}
                                    />
                                ))}
                        </div>
                    ))}
                </div>

                {/* Slide indicators */}
                {totalSlides > 1 && (
                    <div className="carousel-dots">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                                aria-label={t("specialProducts.go_to_slide", { slide: index + 1 })}
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedProduct && (
                <ProductPopup
                    product={selectedProduct}
                // onClose={handleClosePopup}
                />
            )}
        </div>
    )
}

export default SpecialProducts;