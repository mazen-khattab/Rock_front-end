import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import type { Product } from '../../../Types/product';
import { useCart } from '../../../Context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
    onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
    const navigate = useNavigate();

    // states and variables.
    const { addToCart } = useCart();
    const mainImage = product.variants[0].gallery[0]
    const uniqueColors = [...new Set(product.variants.map(v => v.color))];
    const [isHovered, setIsHovered] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string>();
    const [colorError, setColorError] = useState(false);
    const [uniqueSizes, setUniqueSizes] = useState([...new Set(product.variants.map(v => v.size))]);

    // added the variant to the cart when the user select a color and click on any size.
    const handleAddToCart = (size: string) => {
        if (isAdding) return;
        setIsAdding(true);

        if (!selectedColor) {
            setColorError(true)
        } else {
            const variant = getVariant(selectedColor, size);

            const cartItem = {
                productId: product.id,
                variantId: variant?.id,
                name: product.name,
                price: product.price,
                description: product.description,
                gallery: variant?.gallery,
                colorId: variant?.colorId,
                color: variant?.color,
                sizeId: variant?.sizeId,
                size: variant?.size,
                reserved: variant?.reserved,
                quantity: 1,
            }

            addToCart(cartItem);
            navigate('/cart');
        }

        setTimeout(() => {
            setIsAdding(false);
            setColorError(false)
        }, 1000);
    };

    // used to change the color of the variant.
    const handleSelectedColor = (color: string) => {
        setColorError(false);
        setSelectedColor(color);

        disableSizes(color);
    }

    // used to show only the sizes available of the selected color.
    const disableSizes = (color: string) => {
        const availableVariants = product.variants.filter(v => v.color === color)
        setUniqueSizes([...new Set(availableVariants.map(v => v.size))]);
    }

    // used to get the seleted variant to add it in the cart.
    const getVariant = (color: string, size: string) => {
        const selectedVariant = product.variants.filter(v => v.color === color && v.size === size)

        return selectedVariant[0];
    }

    return (
        <div
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            <div className="product-image-container">
                <img src={mainImage} alt={product.name} onClick={() => onProductClick(product)} className="product-image" />

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
                            {uniqueSizes.map((size, index) => (
                                <button className='size' key={size + index} onClick={() => handleAddToCart(size)}>{size}</button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="product-info">
                <div className={colorError ? "color-selector display-color-error" : "color-selector"}>
                    <div className="color-options">
                        {uniqueColors.map((color, index) => (
                            <button
                                key={color + index}
                                className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                                style={{ backgroundColor: color }}
                                onClick={() => handleSelectedColor(color)}
                            ></button>
                        ))}
                    </div>
                    <p className='color-error' style={colorError ? { opacity: "1" } : { opacity: '0' }}>Select a color first.</p>
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