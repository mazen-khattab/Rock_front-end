import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Pants from '../../../assets/pants.jpg';
import Shirt from '../../../assets/t-shirts2.jpg';
import Shirt2 from '../../../assets/t-shirt.jpg';
import './Hero.css'

const Hero = () => {
    const { t } = useTranslation("Home");
    const navigate = useNavigate();
    const heroRef = useRef<HTMLDivElement>(null);
    const savedLang = localStorage.getItem('lang');
    const direction = savedLang === 'ar' ? -1 : 1;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHover, setIsHover] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const categories = [
        { id: 1, name: t('Hero.shirts'), image: Shirt, description: t('Hero.shirts_description') },
        { id: 3, name: t('Hero.jackets'), image: Shirt2, description: t('Hero.jackets_description') },
        { id: 2, name: t('Hero.pants'), image: Pants, description: t('Hero.pants_description') },
        { id: 4, name: t('Hero.dresses'), image: Shirt2, description: t('Hero.dresses_description') },
    ];

    const heroImages = [
        "https://i.pinimg.com/736x/89/d5/c8/89d5c8141f094eb55fb051b66ea61ece.jpg",
        'https://i.pinimg.com/736x/62/06/b4/6206b4e72672217b1272425fb2207855.jpg',
        'https://i.pinimg.com/1200x/ba/26/17/ba26177dc019f9df2bb592310bcd365f.jpg',
        'https://i.pinimg.com/736x/ed/57/12/ed5712064c2372659df2a41364cdaa54.jpg',
    ];

    const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth > 768 ? 3 : 2);

    useEffect(() => {
        const handleResize = () => {
            const count = window.innerWidth > 768 ? 3 : 2;
            setItemsPerPage(count);
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate visible categories based on current index
    const startIndex = currentIndex * itemsPerPage;
    const visibleCategories = categories.slice(startIndex, startIndex + itemsPerPage);
    const maxIndex = Math.ceil(categories.length / itemsPerPage) - 1;

    const goToCateIndex = (index: number) => {
        setCurrentIndex(index);
    };

    const previousCate = () => {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
    };

    const nextCate = () => {
        setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
    };

    const goToHeroImage = (index: number) => {
        if (!heroRef.current) return;

        const clampedIndex = ((index % heroImages.length) + heroImages.length) % heroImages.length;
        const slideWidth = heroRef.current.scrollWidth / heroImages.length;

        heroRef.current.scrollTo({
            left: direction * clampedIndex * slideWidth,
            behavior: 'smooth'
        });

        setCurrentImageIndex(clampedIndex);
    };

    const nextSlide = () => goToHeroImage(currentImageIndex + direction);
    const prevSlide = () => goToHeroImage(currentImageIndex - direction);

    // Auto-slide for mobile hero images
    useEffect(() => {
        if (isHover || !isMobile) return;

        const slider = setInterval(() => {
            savedLang === 'ar' ? prevSlide() : nextSlide();
        }, 5000);

        return () => clearInterval(slider);
    }, [isHover, heroImages.length, currentImageIndex, isMobile]);

    return (
        <div className='hero container'>
            <section
                className="hero-wrapper"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <div className='hero-slider' ref={heroRef}>
                    {heroImages.map((image, index) => (
                        <img
                            src={image}
                            alt=""
                            key={image}
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                    ))}
                </div>

                <div className={savedLang === 'ar' ? "overlay ar" : "overlay"}></div>

                <button onClick={prevSlide} className='hero-nav-btn hero-left-arrow' aria-label="Previous slide">
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                <button onClick={nextSlide} className='hero-nav-btn hero-right-arrow' aria-label="Next slide">
                    <i className="fa-solid fa-angle-right"></i>
                </button>

                <div className={savedLang === 'ar' ? "hero-text-section ar" : "hero-text-section en"}>
                    <p className="hero-offer">{t("Hero.hero_offer")}</p>
                    <h1 className="hero-title">{t("Hero.hero_title")}</h1>
                    <p className="hero-description">
                        {t("Hero.hero_description")}
                    </p>

                    <div className="hero-buttons">
                        <button
                            onClick={() => navigate("/products")}
                            className="btn-primary"
                        >
                            {t("Hero.shop_now")} <ArrowRight className="icon-right" />
                        </button>
                    </div>
                </div>

                {/* Permanent Floating Hero Clothing Images */}
                <div className="hero-images">
                    <img src={Shirt} alt="Shirt" className="img img-top" />
                    <img src={Pants} alt="Pants" className="img img-bottom" />
                </div>
            </section>

            {/* Shop By Category Section */}
            <section className="container categories-section">
                <div className="slider-container">
                    <h2 className="slider-title">{t("Hero.shop_by")} <span>{t("Hero.category")}</span></h2>

                    <div className="categories-wrapper">
                        <div className={savedLang === 'ar' ? "navigation-controls ar" : "navigation-controls"}>
                            <button
                                className="nav-button left-arrow"
                                onClick={previousCate}
                                aria-label={t("Hero.previous_category") || "Previous category"}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            {/* All Category Cards Always Rendered & Visible */}
                            <div className={savedLang === 'ar' ? "categories-container ar" : "categories-container"}>
                                {visibleCategories.map((category) => (
                                    <div key={category.id} className="category-card">
                                        <Link
                                            to={`/products?category=${encodeURIComponent(category.name)}`}
                                            className="category-image-wrapper"
                                        >
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="category-image"
                                            />
                                            <div className="category-info">
                                                <h3>{category.name}</h3>
                                                <p className="category-description">{category.description}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="nav-button right-arrow"
                                onClick={nextCate}
                                aria-label={t("Hero.next_category") || "Next category"}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M9 6l6 6-6 6" />
                                </svg>
                            </button>
                        </div>

                        {/* Pagination indicator rectangles */}
                        <div className="pagination-rectangles">
                            {[...Array(maxIndex + 1)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`rectangle ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToCateIndex(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
