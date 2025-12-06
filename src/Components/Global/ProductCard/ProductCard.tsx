// ProductCard.jsx
import React, { useState } from 'react';
import './ProductCard.css';

interface Product {
    id: number;
    name: string;
    category: string;
    image: string;
    price: number;
    originalPrice: number;
    description: string;
    discount: number;
    countdown?: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
}

interface ProductCardProps {
    product: Product;
    onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onProductClick(product)}
        >
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />

                {/* Discount badge */}
                {product.discount && (
                    <div className="discount-badge">{product.discount}% off</div>
                )}

                {/* Action buttons (visible on hover) */}
                {isHovered && (
                    <div className="action-buttons">
                        <button className="action-btn"><i className="fas fa-heart"></i></button>
                        <button className="action-btn"><i className="fas fa-expand"></i></button>
                        <button className="action-btn"><i className="fas fa-shopping-bag"></i></button>
                    </div>
                )}

                {/* Countdown timer (if applicable) */}
                {product.countdown && (
                    <div className="countdown-timer">
                        <div className="timer-item">
                            <span className="timer-value">{product.countdown.days}</span>
                            <span className="timer-label">Days</span>
                        </div>
                        <div className="timer-item">
                            <span className="timer-value">{product.countdown.hours}</span>
                            <span className="timer-label">Hours</span>
                        </div>
                        <div className="timer-item">
                            <span className="timer-value">{product.countdown.minutes}</span>
                            <span className="timer-label">Mins</span>
                        </div>
                        <div className="timer-item">
                            <span className="timer-value">{product.countdown.seconds}</span>
                            <span className="timer-label">Sec</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                        <span className="original-price">${product.originalPrice}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;