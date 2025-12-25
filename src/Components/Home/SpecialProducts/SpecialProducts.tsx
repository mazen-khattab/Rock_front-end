import { useState, useRef, useEffect } from 'react';
import ProductPopup from '../../Global/ProductPopup/ProductPopup';
import ProductCard from '../../Global/ProductCard/ProductCard';
import type { Product } from '../../../Types/product';
import './SpecialProducts.css'

const SpecialProducts = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    const products = [
        {
            id: 1,
            name: "Trendy Brown Coat",
            category: "Coats",
            image: "https://i.pinimg.com/1200x/8e/ea/13/8eea13aed6d66d753fb18a57f2f60693.jpg",
            price: 75.00,
            description: '',
            originalPrice: 150.00,
            discount: 50,
            rating: 4.8,
            size: 'L',
            color: 'black',
            quantity: 1,
            reserved: 0,
        },
        {
            id: 2,
            name: "Classy Light Coat",
            category: "Coats",
            image: "https://i.pinimg.com/1200x/52/34/f2/5234f25fa78fc103e303f3f9d93dfeee.jpg",
            price: 165.00,
            description: '',
            originalPrice: 220.00,
            discount: 25,
            rating: 4.9,
            size: 'M',
            color: 'black',
            quantity: 1,
            reserved: 0,
        },
        {
            id: 3,
            name: "Modern Brown Dress",
            category: "t-shirt",
            image: "https://i.pinimg.com/1200x/15/35/37/1535379e07b4b8a1dbf04a288763a71d.jpg",
            price: 90.00,
            description: '',
            originalPrice: 100.00,
            discount: 10,
            rating: 4.8,
            size: 'M',
            color: 'black',
            quantity: 1,
            reserved: 0,
        },
        {
            id: 4,
            name: "Modern Black T-Shirt",
            category: "t-shirt",
            image: "https://i.pinimg.com/1200x/27/b5/a1/27b5a1602087a7113d58118e357bdc54.jpg",
            price: 165.00,
            description: '',
            originalPrice: 220.00,
            discount: 25,
            rating: 4.9,
            size: 'M',
            color: 'black',
            quantity: 1,
            reserved: 0,
        },
        {
            id: 5,
            name: "Modern Black Dress",
            category: "t-shirt",
            image: "https://i.pinimg.com/736x/04/ba/46/04ba46bd3ecfe58f30f1c47820781227.jpg",
            price: 75.00,
            description: '',
            originalPrice: 100.00,
            discount: 25,
            rating: 4.7,
            size: 'L',
            color: 'black',
            quantity: 1,
            reserved: 0,
        },
        {
            id: 6,
            name: "Classy Light Coat",
            category: "Coats",
            image: "https://i.pinimg.com/736x/4c/d0/94/4cd094c4a57746a17cddf771a60b67db.jpg",
            price: 165.00,
            description: '',
            originalPrice: 220.00,
            discount: 25,
            rating: 4.9,
            size: 'M',
            color: 'black',
            quantity: 1,
            reserved: 0,
        },
        {
            id: 7,
            name: "Modern Black T-Shirt",
            category: "t-shirt",
            image: "https://i.pinimg.com/1200x/27/b5/a1/27b5a1602087a7113d58118e357bdc54.jpg",
            price: 165.00,
            description: '',
            originalPrice: 220.00,
            discount: 25,
            rating: 4.9,
            size: 'M',
            color: 'black',
            quantity: 1,
            reserved: 0,
        },
        {
            id: 8,
            name: "Modern pants",
            category: "Pants",
            image: "https://i.pinimg.com/1200x/65/bf/68/65bf68e8d9efa8a7129472953bc1a393.jpg",
            price: 165.00,
            description: '',
            originalPrice: 220.00,
            discount: 25,
            rating: 4.9,
            size: 'M',
            color: 'black',
            quantity: 1,
            reserved: 0,
        },
    ];

    // Filter products by category
    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(product =>
            product.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

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
    const translateX = -currentIndex * 100;

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="container special-products">
            <div className="section-header">
                <h1>Our Top Seller Products</h1>
                <div className="category-filters">
                    {['All', 'Coats', 'Pants', 't-shirt'].map(category => (
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
                className="carousel-arrow prev-arrow"
                onClick={prevSlide}
                aria-label="Previous products"
            >
                <i className="fas fa-chevron-left"></i>
            </button>
            <button
                className="carousel-arrow next-arrow"
                onClick={nextSlide}
                aria-label="Next products"
            >
                <i className="fas fa-chevron-right"></i>
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
                                        onProductClick={handleProductClick}
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
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedProduct && (
                <ProductPopup
                    product={selectedProduct}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    )
}

export default SpecialProducts;