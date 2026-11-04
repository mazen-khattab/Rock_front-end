import { useEffect, useState } from 'react';
import type { ProductDetails as ProductDetailsType, VariantImages } from '../../../Types/product';
import './ProductDetails.css';
import { useCart } from '../../../Context/CartContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../../Context/ProductContext';
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import Navbar from '../../Home/Navbar/Navbar';

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { GetById } = useProduct();
    const [product, setProduct] = useState<ProductDetailsType | null>(null);
    const [pageLoading, setPageLoading] = useState(true);
    const { t } = useTranslation("ProductDetails");

    const savedLang = localStorage.getItem("lang") || "en";

    // calling the endpoint that returns the product by id
    useEffect(() => {
        const getSelectedProduct = async () => {
            try {
                setPageLoading(true);
                const response = await GetById(id ? parseInt(id) : 0);
                setProduct(response);
            } catch (err) {
                console.error("[ProductDetails] Error fetching product:", err);
            } finally {
                setPageLoading(false);
            }
        };

        getSelectedProduct();
    }, [id]);

    // states and variables.
    const { addToCart } = useCart();
    const allSizes = [...new Set(product?.variants.map(v => v.sizeName) || [])];
    const [mainImage, setMainImage] = useState<string>();
    const [gallery, setGallery] = useState<VariantImages[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string>();
    const [selectedSize, setSelectedSize] = useState<string>();
    const [colorError, setColorError] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [uniqueColors, setUniqueColors] = useState<string[]>([]);

    useEffect(() => {
        if (product && product.variants && product.variants.length > 0) {
            setMainImage(product.variants[0].imagesDtos[0]?.imageUrl);
            setGallery(product.variants[0].imagesDtos || []);
            setSelectedColor(product.variants[0].hexCode);
            setSelectedSize(product.variants[0].sizeName);
            setUniqueColors([...new Set(product.variants.filter(v => v.sizeName === product.variants[0].sizeName).map(v => v.hexCode))]);
        }
    }, [product]);

    const handleAddToCart = () => {
        if (isAdding) return;
        setIsAdding(true);

        if (!selectedColor || !selectedSize) {
            if (!selectedColor) setColorError(true);
            if (!selectedSize) setSizeError(true);
        } else {
            const variant = getVariant(selectedColor, selectedSize);

            if (!product?.id || !variant?.id) {
                setIsAdding(false);
                return;
            }

            const cartItem = {
                productId: product.id,
                variantId: variant.id,
                name: product.name,
                price: product.price,
                description: product.description,
                imagesDtos: variant.imagesDtos[0],
                color: variant.colorName,
                hexCode: variant.hexCode,
                size: variant.sizeName,
                reserved: variant.reserved,
                quantity: 1,
            };

            addToCart(cartItem);
            toast.success(t("add_to_cart_message"));
        }

        setTimeout(() => {
            setIsAdding(false);
            setColorError(false);
            setSizeError(false);
        }, 1000);
    };

    const handleSelectedSize = (size: string) => {
        setSelectedSize(size);
        const availableVariants = product?.variants.filter(v => v.sizeName === size) || [];
        setUniqueColors([...new Set(availableVariants.map(v => v.hexCode))]);

        if (availableVariants.length > 0) {
            setSelectedColor(availableVariants[0].hexCode);
            if (availableVariants[0].imagesDtos && availableVariants[0].imagesDtos.length > 0) {
                setMainImage(availableVariants[0].imagesDtos[0].imageUrl);
                setGallery(availableVariants[0].imagesDtos);
            }
        }
    };

    const handleSelectedColor = (color: string) => {
        const variant = getVariantByColor(color);
        setSelectedColor(color);
        if (variant && variant.imagesDtos && variant.imagesDtos.length > 0) {
            setMainImage(variant.imagesDtos[0].imageUrl);
            setGallery(variant.imagesDtos);
        }
    };

    const getVariant = (color: string, size: string) => {
        const selected = product?.variants.filter(v => v.hexCode === color && v.sizeName === size);
        return selected && selected.length > 0 ? selected[0] : undefined;
    };

    const getVariantByColor = (color: string) => {
        return product?.variants.filter(v => v.hexCode === color)[0];
    };

    const handleExit = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/products');
        }
    };

    return (
        <div className="product-details-page">
            <Navbar />

            <main className="product-details-container">
                <div className={`product-details-card ${savedLang === 'ar' ? 'rtl' : 'ltr'}`}>
                    {/* Exit Button */}
                    <button
                        className="product-exit-btn"
                        onClick={handleExit}
                        aria-label="Exit product details"
                        title="Back"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    {pageLoading ? (
                        <div className="product-details-loading">
                            <i className="fa-solid fa-circle-notch fa-spin"></i>
                        </div>
                    ) : (
                        <div className="product-details-grid">
                            {/* Images Section */}
                            <div className="product-images-section">
                                <div className="main-image-wrapper">
                                    <img
                                        src={mainImage}
                                        alt={product?.name || "Product"}
                                        className="main-product-image"
                                    />
                                </div>

                                {/* Thumbnail Gallery */}
                                {gallery && gallery.length > 1 && (
                                    <div className="additional-images">
                                        {gallery.map((img, index) => (
                                            <button
                                                key={img.imageUrl + index}
                                                type="button"
                                                onClick={() => setMainImage(img.imageUrl)}
                                                className={`thumbnail-btn ${mainImage === img.imageUrl ? "selected" : ""}`}
                                                aria-label={`View image ${index + 1}`}
                                            >
                                                <img
                                                    src={img.imageUrl}
                                                    alt={img.altText || `View ${index + 1}`}
                                                    className="thumbnail"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Details Section */}
                            <div className="product-details-section">
                                <div className="product-badge">{t("primary_quantity")}</div>
                                <h1 className="product-title">{product?.name}</h1>

                                <div
                                    className="product-description"
                                    dangerouslySetInnerHTML={{
                                        __html: product?.description || ""
                                    }}
                                />

                                <div className="product-price">
                                    <span className="price-label">{t("price")}:</span>{" "}
                                    <span className="price-value">{product?.price} {t("egp")}</span>
                                </div>

                                {/* Sizes Selector */}
                                <div className={sizeError ? "size-selector display-color-error" : "size-selector"}>
                                    <label>{t("sizes")}</label>
                                    <div className="size-options">
                                        {allSizes.map(size => (
                                            <button
                                                key={size}
                                                type="button"
                                                className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                                onClick={() => handleSelectedSize(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                        <button type="button" className="size-guide">
                                            {t("size_guide")}
                                        </button>
                                    </div>
                                    <p className='size-error' style={sizeError ? { opacity: "1" } : { opacity: '0' }}>
                                        Select a size first.
                                    </p>
                                </div>

                                {/* Colors Selector */}
                                <div className={colorError ? "color-selector display-color-error" : "color-selector"}>
                                    <label>
                                        {t("color")}{selectedColor ? " | " + (getVariantByColor(selectedColor)?.colorName || "") : ""}
                                    </label>
                                    <div className="color-options">
                                        {uniqueColors.map(color => (
                                            <button
                                                key={color}
                                                type="button"
                                                className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => handleSelectedColor(color)}
                                                aria-label={`Select color ${color}`}
                                            ></button>
                                        ))}
                                    </div>
                                    <p className='color-error' style={colorError ? { opacity: "1" } : { opacity: '0' }}>
                                        Select a color first.
                                    </p>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    type="button"
                                    className="add-to-cart-btn"
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                >
                                    <i className="fa-solid fa-cart-shopping"></i> {t("add_to_cart")}
                                </button>

                                {/* Delivery Info */}
                                <div className="delivery-info">
                                    <i className="fa-solid fa-truck-fast"></i> Free delivery on orders over 500 EGP
                                </div>

                                {/* Key Features */}
                                <div className="features-section">
                                    <h3>KEY FEATURES</h3>
                                    <ul>
                                        <li><i className="fa-solid fa-check"></i> High stand-up collar</li>
                                        <li><i className="fa-solid fa-check"></i> Metal zipper and hidden button fastening</li>
                                        <li><i className="fa-solid fa-check"></i> Two slit pockets with buttons</li>
                                        <li><i className="fa-solid fa-check"></i> Long sleeves with hidden elastic cuffs</li>
                                        <li><i className="fa-solid fa-check"></i> Premium inner lining</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;
