import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play } from "lucide-react";
import { useAsyncError, useNavigate } from "react-router-dom";
import Pants from '../../../assets/pants.jpg';
import Shirt from '../../../assets/t-shirts2.jpg';
import Shirt2 from '../../../assets/t-shirt.jpg';
// import heroBanner from "@/assets/hero-banner.jpg";
import './Hero.css'

const Hero = () => {
    const navigate = useNavigate();
    const imgRef = useRef<HTMLImageElement>(null);
    const targetRef = useRef<HTMLImageElement>(null);
    const parentRef = useRef<HTMLImageElement>(null);
    const heroRef = useRef<HTMLImageElement>(null);

    const [startPos, setStartPos] = useState<DOMRect | null>(null);
    const [targetPos, setTargetPos] = useState<DOMRect | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHover, setIsHover] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const categories = [
        { id: 1, name: 'Shirts', image: Shirt, description: 'Classic & Modern Styles', ref: targetRef, parentRef: parentRef },
        { id: 3, name: 'Jackets', image: Shirt2, description: 'Warm & Fashionable' },
        { id: 2, name: 'Pants', image: Pants, description: 'Comfortable & Stylish' },
        { id: 4, name: 'Dresses', image: Shirt2, description: 'Elegant & Versatile' },
    ];

    const heroImages = [
        "https://i.pinimg.com/736x/89/d5/c8/89d5c8141f094eb55fb051b66ea61ece.jpg",
        'https://i.pinimg.com/736x/62/06/b4/6206b4e72672217b1272425fb2207855.jpg',
        'https://i.pinimg.com/1200x/ba/26/17/ba26177dc019f9df2bb592310bcd365f.jpg',
        'https://i.pinimg.com/736x/ed/57/12/ed5712064c2372659df2a41364cdaa54.jpg',
    ]

    var itemsPerPage;

    if (window.innerWidth > 768) {
        itemsPerPage = 3
    } else {
        itemsPerPage = 2
    }

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
        if (!heroRef.current) return

        const clampedIndex = ((index % heroImages.length) + heroImages.length) % heroImages.length;
        const slideWidth = heroRef.current.scrollWidth / heroImages.length;

        heroRef.current.scrollTo({
            left: clampedIndex * slideWidth,
            behavior: 'smooth'
        });

        setCurrentImageIndex(clampedIndex);
    }

    const nextSlide = () => goToHeroImage(currentImageIndex + 1);
    const prevSlide = () => goToHeroImage(currentImageIndex - 1);

    // this used to check if isMobile is true of false
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);

        checkMobile(); // initial check
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // this is used to move the silder each 5s
    useEffect(() => {
        if (isHover || !isMobile) return

        const slider = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(slider);
    }, [isHover, heroImages.length, currentImageIndex, isMobile])

    // this is used to update the position of the target and moving images
    useEffect(() => {
        const updatePositions = () => {
            if (!imgRef.current || !targetRef.current) return;

            const moving = imgRef.current.getBoundingClientRect();
            const target = targetRef.current.getBoundingClientRect();

            setStartPos(moving);
            setTargetPos(target);
        };

        updatePositions();
        window.addEventListener("resize", updatePositions);

        return () => window.removeEventListener("resize", updatePositions);
    }, []);

    // this is used to move the image until it reach to the target
    useEffect(() => {
        if (!startPos || !targetPos) return;

        const handleScroll = () => {
            const requiredScroll = targetPos.top - startPos.top;
            const scrollY = window.scrollY;

            let progress = scrollY / requiredScroll;
            progress = Math.max(0, Math.min(1, progress));

            const newY = startPos.top + (targetPos.top - startPos.top) * progress;
            const newX = startPos.left + (targetPos.left - startPos.left) * progress;

            // const width = startPos.width === targetPos.width ? 1 : startPos.width + (targetPos.width - startPos.width) * progress;
            // const height = startPos.height === targetPos.height ? 1 : startPos.height + (targetPos.height - startPos.height) * progress;

            if (imgRef.current && parentRef.current) {
                imgRef.current.style.transform = `translate(${newX - startPos.left}px, ${newY - startPos.top}px)`;

                // imgRef.current.style.width = `${width}px`;
                // imgRef.current.style.height = `${height}px`;

                if (window.innerWidth > 1024) {
                    if (progress === 1) {
                        imgRef.current.style.opacity = '0';
                        imgRef.current.style.zIndex = "-1";
                        parentRef.current.style.opacity = '1';
                    } else {
                        imgRef.current.style.opacity = '1'
                        imgRef.current.style.zIndex = "10";
                        parentRef.current.style.opacity = '0';
                    }
                } else {
                    parentRef.current.style.opacity = '1';
                }

            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [startPos, targetPos]);

    return (
        <div className='hero'>
            <section className="hero-wrapper container"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}>

                <div className='hero-slider' ref={heroRef}>
                    {heroImages.map((image, index) => {
                        return (
                            <img src={image}
                                alt=""
                                key={image}
                                loading={index === 0 ? "eager" : "lazy"} />
                        )
                    })}
                </div>

                <div className="overlay"></div>

                <button onClick={prevSlide} className='hero-nav-btn hero-left-arrow'>
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                <button onClick={nextSlide} className='hero-nav-btn hero-right-arrow'>
                    <i className="fa-solid fa-angle-right"></i>
                </button>

                <div className="hero-text-section">
                    <p className="hero-offer">Get up to 30% off</p>
                    <h1 className="hero-title">New Arrivals</h1>
                    <p className="hero-description">
                        Shop the latest looks, wear your confidence.
                    </p>

                    <div className="hero-buttons">
                        <button
                            onClick={() => navigate("/products")}
                            className="btn-primary"
                        >
                            SHOP NOW <ArrowRight className="icon-right" />
                        </button>

                        <button className="btn-outline">
                            <Play className="icon-left" />
                        </button>
                    </div>
                </div>

                <div className="hero-images">
                    <img src={Shirt} ref={imgRef} alt="Shirt" className="img img-top" />
                    <img src={Pants} alt="Pants" className="img img-bottom" />
                </div>

            </section>

            <section className="container categories-section">
                <div className="slider-container">
                    {/* Title positioned next to cards */}
                    <h2 className="slider-title">Shop By <span>Category</span></h2>

                    <div className="categories-wrapper">
                        <div className="navigation-controls">
                            <button
                                className="nav-button left-arrow"
                                onClick={previousCate}
                                aria-label="Previous category"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            <div className="categories-container">
                                {visibleCategories.map((category) => (
                                    <div key={category.id} className="category-card" ref={category.parentRef}>
                                        <div className="category-image-wrapper">
                                            <img
                                                ref={category.ref}
                                                src={category.image}
                                                alt={category.name}
                                                className="category-image"
                                            />
                                            <div className="category-info">
                                                <h3>{category.name}</h3>
                                                <p className="category-description">{category.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="nav-button right-arrow"
                                onClick={nextCate}
                                aria-label="Next category"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 6l6 6-6 6" />
                                </svg>
                            </button>
                        </div>

                        {/* Rectangular pagination indicators instead of dots */}
                        <div className="pagination-rectangles">
                            {[...Array(maxIndex + 1)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`rectangle ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToCateIndex(index)}
                                    aria-label={`Go to page ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero;