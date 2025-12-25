import React, { useState } from 'react';
import { Link } from "react-router-dom";
import type { Product } from '../../../Types/product';
import { useCart } from '../../../Context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
    onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
    const { addToCart } = useCart();

    const [isHovered, setIsHovered] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedColor, setSelectedColor] = useState('black');

    const sizes = ["XS", "S", "M", "L", "XL", "2XL"];

    const handleAddToCart = (size: string) => {
        if (isAdding) return;
        product.size = size;

        setIsAdding(true);
        addToCart(product);

        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    const handleSelectedColor = (color: string) => {
        setSelectedColor(color);
        product.color = color;
    }

    return (
        <div
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            <div className="product-image-container">
                <img src={product.image} alt={product.name} onClick={() => onProductClick(product)} className="product-image" />

                {/* Discount badge */}
                {product.discount && (
                    <div className="discount-badge">{product.discount}% off</div>
                )}

                {/* Action buttons (visible on hover) */}
                {isHovered && (
                    <div className="action-buttons">
                        <div className="sizes-overlay"></div>
                        <p className='buy-now'>Buy now</p>
                        <div className='sizes'>
                            {sizes.map((size) => (
                                <Link to={'/cart'} className='size' key={size} onClick={() => handleAddToCart(size)}>{size}</Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="product-info">
                <div className="color-selector">
                    <div className="color-options">
                        {['black', 'white', 'gray', 'brown'].map(color => (
                            <button
                                key={color}
                                className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                                style={{
                                    backgroundColor: color === 'black' ? '#000' :
                                        color === 'white' ? '#fff' :
                                            color === 'gray' ? '#888' : '#a57c52'
                                }}
                                onClick={() => handleSelectedColor(color)}
                            ></button>
                        ))}
                    </div>
                </div>
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