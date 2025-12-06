// ProductPopup.jsx
import React, { useState } from 'react';
import './ProductPopup.css';

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

interface ProductPopupProps {
    product: Product,
    onClose: () => void
}

const ProductPopup: React.FC<ProductPopupProps> = ({ product, onClose }) => {
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('cream');

    if (!product) return null;

    return (
        <div className="product-popup-overlay" onClick={onClose}>
            <div className="product-popup" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="product-popup-content">
                    <div className="product-images-section">
                        <img src={product.image} alt={product.name} className="main-product-image" />

                        {/* Additional images could be added here */}
                        <div className="additional-images">
                            <img src={product.image} alt="Product view 1" className="thumbnail" />
                            <img src={product.image} alt="Product view 2" className="thumbnail" />
                            <img src={product.image} alt="Product view 3" className="thumbnail" />
                        </div>
                    </div>

                    <div className="product-details-section">
                        <div className="product-badge">PREMIUM QUALITY</div>
                        <h1 className="product-title">{product.name}</h1>

                        <p className="product-description">
                            {product.description || "Prepare to embrace the cold in style and warmth with our Premium Quality Down Jacket. Crafted with the utmost attention to detail and featuring the finest materials, this jacket is designed to keep you cozy in even the harshest winter conditions."}
                        </p>

                        <div className="product-price">${product.price}</div>

                        <div className="size-selector">
                            <label>Select size</label>
                            <div className="size-options">
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                                <button className="size-guide">Size Guide</button>
                            </div>
                        </div>

                        <div className="color-selector">
                            <label>Color | {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}</label>
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
                                        onClick={() => setSelectedColor(color)}
                                    ></button>
                                ))}
                            </div>
                        </div>

                        <button className="add-to-cart-btn">
                            <i className="fas fa-shopping-cart"></i> Add to cart
                        </button>

                        <div className="delivery-info">
                            <i className="fas fa-truck"></i> Free delivery on orders over $30.00
                        </div>

                        <div className="features-section">
                            <h3>KEY FEATURES</h3>
                            <ul>
                                <li><i className="fas fa-check"></i> High stand-up collar</li>
                                <li><i className="fas fa-check"></i> Metal zipper and hidden button fastening</li>
                                <li><i className="fas fa-check"></i> Two slit pockets with buttons</li>
                                <li><i className="fas fa-check"></i> Long sleeves with hidden elastic cuffs</li>
                                <li><i className="fas fa-check"></i> Lining inside</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPopup;