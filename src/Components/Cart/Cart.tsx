import { useState } from 'react';
import { Link } from "react-router-dom";
import { useCart } from '../../Context/CartContext';
import type { CartItem } from '../../Types/product';
import Navbar from '../Home/Navbar/Navbar';
import './Cart.css';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../Context/AuthContext';
import { toast } from "react-toastify";
import { useOrder } from '../../Context/OrderContext';
import type { CheckoutRequest } from '../../Types/order';

interface UserInfo {
    fname: string;
    lname: string;
    email: string;
    password: string;
    address: string;
    city: string;
    Governorate: string;
    phone: string;
}

type actions = 'INCREASE' | 'DECREASE'

const CartPage = () => {
    const { checkout } = useOrder();

    const { items, increaseAmount, decreaseAmount, removeFromCart, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const { t } = useTranslation("Cart");

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        fname: '',
        lname: '',
        phone: '',
        Governorate: '',
        city: '',
        address: '',
        email: '',
        password: '',
    });

    const updateQuantity = (item: CartItem, action: actions) => {
        switch (action) {
            case "INCREASE":
                increaseAmount(item.variantId);
                break;
            case 'DECREASE':
                decreaseAmount(item.variantId);
                break;
            default:
                return;
        }
    };

    const removeItem = (item: CartItem) => {
        removeFromCart(item.variantId);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 30 ? 0 : 5;
    const total = subtotal + shipping;

    const handleCheckout = () => {
        if (items.length === 0) return;
        setIsCheckoutOpen(true);
    };

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (
            !userInfo.fname ||
            !userInfo.lname ||
            !userInfo.email ||
            !userInfo.address ||
            !userInfo.phone
        ) {
            toast.error(t("required_fields_alert"));
            return;
        }

        var orderNumber = '';
        const checoutRequest: CheckoutRequest = {
            firstName: userInfo.fname,
            lastName: userInfo.lname,
            phone: userInfo.phone,
            governorate: userInfo.Governorate,
            city: userInfo.city,
            address: userInfo.address,
            email: userInfo.email,
            password: userInfo.password ?? "",
            isAuthenticated: isAuthenticated,
            idempotencyKey: "",
            guestId: localStorage.getItem("guestId") ?? "",
        };

        try {
            const response = await checkout(checoutRequest);
            orderNumber = response.orderNumber;
            setOrderNumber(orderNumber);
            setOrderSuccess(true);
            setTotalPrice(response.totalPrice);
            clearCart();
        } catch (error) {
            console.error("Checkout error:", error);
        }

        setIsCheckoutOpen(false);
    };

    const handleCloseOrderSuccess = () => {
        setOrderSuccess(false);
        setOrderNumber('');
    };

    return (
        <div>
            <Navbar></Navbar>

            <div className="cart-container container">
                <header className="cart-header">
                    <h1 className="cart-title">{t("cart_title")}</h1>
                    <span className="cart-count">{t("products_count", { count: items.length })}</span>
                </header>

                <main className="cart-main">
                    <section className="cart-items">
                        {items.length === 0 ? (
                            <div className="cart-empty">
                                <p>{t("cart_empty")}</p>
                                <Link to="/products" className="cart-empty-link">{t("continue_shopping")}</Link>
                            </div>
                        ) : (
                            items.map(item => (
                                <div key={item.variantId} className="cart-item">
                                    <img src={item.imagesDtos.imageUrl} alt={item.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        <p className="cart-item-info">{t("color_label")} <span style={{ color: getColorHex(item.color) }}>{item.color}</span></p>
                                        <p className="cart-item-info">{t("size_label")} {item.size}</p>
                                        <div className="cart-item-quantity">
                                            <button
                                                onClick={() => updateQuantity(item, 'DECREASE')}
                                                className="cart-qty-btn"
                                                aria-label={t("decrease_quantity", { name: item.name })}
                                            >
                                                −
                                            </button>
                                            <span className="cart-qty-value">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item, 'INCREASE')}
                                                className="cart-qty-btn"
                                                aria-label={t("increase_quantity", { name: item.name })}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-item-actions">
                                        <button
                                            onClick={() => removeItem(item)}
                                            className="cart-delete-btn"
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                        <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </section>

                    <aside className="cart-summary">
                        <h2 className="cart-summary-title">{t("cart_summary_title")}</h2>

                        <div className="cart-summary-line">
                            <span>{t("product_price")}</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="cart-summary-line">
                            <span>{t("shipping_label")}</span>
                            <span>{shipping === 0 ? t("free_label") : `$${shipping.toFixed(2)}`}</span>
                        </div>

                        <div className="cart-summary-total">
                            <span>{t("total_label")}</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button
                            className="cart-checkout-btn"
                            onClick={handleCheckout}
                            disabled={items.length === 0}
                        >
                            {items.length === 0 ? t("cart_is_empty") : t("checkout_btn")}
                        </button>

                        <div className="cart-footer-info">
                            <div className="cart-footer-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003334" strokeWidth="2">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                                    <path d="M12 16V12M12 8H12.01"></path>
                                </svg>
                                <span>{t("safe_shopping")}</span>
                            </div>
                            <div className="cart-footer-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003334" strokeWidth="2">
                                    <path d="M12 12L12 20M12 12L8 8M12 12L16 8"></path>
                                    <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"></path>
                                </svg>
                                <span>{t("free_delivery_over", { amount: "30.00" })}</span>
                            </div>
                            <div className="cart-footer-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003334" strokeWidth="2">
                                    <path d="M12 8V12L15 15"></path>
                                    <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                                <span>{t("return_days")}</span>
                            </div>
                        </div>
                    </aside>
                </main>

                {/* Checkout Modal */}
                {isCheckoutOpen && (
                    <div className="checkout-modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
                        <div
                            className="checkout-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="checkout-modal-header">
                                <h2 className="checkout-modal-title">{t("checkout_title")}</h2>
                                <button
                                    className="checkout-modal-close"
                                    onClick={() => setIsCheckoutOpen(false)}
                                    aria-label={t("close_label")}
                                >
                                    ×
                                </button>
                            </div>

                            <form className="checkout-form" onSubmit={handleSubmitOrder}>
                                <div className="checkout-form-row">
                                    <div className="checkout-form-group">
                                        <label htmlFor="fname" className="checkout-label">{t("f_name_label")} <span className='asterisk'>*</span></label>
                                        <input
                                            type="text"
                                            id="fname"
                                            name="fname"
                                            value={userInfo.fname}
                                            onChange={handleInputChange}
                                            placeholder={t("f_name_placeholder")}
                                            className="checkout-input"
                                            required
                                        />
                                    </div>

                                    <div className="checkout-form-group">
                                        <label htmlFor="lname" className="checkout-label">{t("l_name_label")} <span className='asterisk'>*</span></label>
                                        <input
                                            type="text"
                                            id="lname"
                                            name="lname"
                                            value={userInfo.lname}
                                            onChange={handleInputChange}
                                            placeholder={t("l_name_placeholder")}
                                            className="checkout-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="checkout-form-row">
                                    <div className="checkout-form-group">
                                        <label htmlFor="email" className="checkout-label">{t("email_label")} <span className='asterisk'>*</span></label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={userInfo.email}
                                            onChange={handleInputChange}
                                            placeholder={t("email_placeholder")}
                                            className="checkout-input"
                                            required
                                        />
                                    </div>

                                    <div className="checkout-form-group">
                                        <label htmlFor="phone" className="checkout-label">{t("phone_label")} <span className='asterisk'>*</span></label>
                                        <input
                                            type="tel"
                                            autoComplete='off'
                                            id="phone"
                                            name="phone"
                                            value={userInfo.phone}
                                            onChange={handleInputChange}
                                            placeholder={t("phone_placeholder")}
                                            className="checkout-input"
                                            required
                                        />
                                    </div>
                                </div>

                                {!isAuthenticated && (
                                    <div className="checkout-form-group">
                                        <label htmlFor="password" className="checkout-label">{t("password_label")} <span className='asterisk'>*</span></label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={userInfo.password}
                                            onChange={handleInputChange}
                                            placeholder={t("password_placeholder")}
                                            className="checkout-input"
                                            required
                                        />
                                    </div>
                                )}

                                <div className="checkout-form-row">
                                    <div className="checkout-form-group">
                                        <label htmlFor="Governorate" className="checkout-label">{t("Governorate_label")} <span className='asterisk'>*</span></label>
                                        <input
                                            type="text"
                                            id="Governorate"
                                            name="Governorate"
                                            value={userInfo.Governorate}
                                            onChange={handleInputChange}
                                            placeholder={t("Governorate_placeholder")}
                                            className="checkout-input"
                                        />
                                    </div>
                                    <div className="checkout-form-group">
                                        <label htmlFor="city" className="checkout-label">{t("city_label")} <span className='asterisk'>*</span></label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={userInfo.city}
                                            onChange={handleInputChange}
                                            placeholder={t("city_placeholder")}
                                            className="checkout-input"
                                        />
                                    </div>
                                </div>

                                <div className="checkout-form-group">
                                    <label htmlFor="address" className="checkout-label">{t("address_label")} <span className='asterisk'>*</span></label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={userInfo.address}
                                        onChange={handleInputChange}
                                        placeholder={t("address_placeholder")}
                                        className="checkout-input"
                                        required
                                    />
                                </div>

                                <div className="checkout-order-summary">
                                    <h3 className="checkout-summary-title">{t("order_summary_title")}</h3>
                                    <div className="checkout-summary-line">
                                        <span>{t("subtotal_label")}</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="checkout-summary-line">
                                        <span>{t("shipping_label")}</span>
                                        <span>{shipping === 0 ? t("free_label") : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="checkout-summary-total">
                                        <span>{t("total_label")}</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button type="submit" className="checkout-submit-btn">
                                    {t("place_order_btn")}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Order Success Modal */}
                {orderSuccess && (
                    <div className="order-success-overlay" onClick={handleCloseOrderSuccess}>
                        <div
                            className="order-success-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="order-success-close"
                                onClick={handleCloseOrderSuccess}
                                aria-label={t("close_label")}
                            >
                                ×
                            </button>
                            <div className="order-success-hero">
                                <div className="order-success-sparkles" aria-hidden="true">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className="order-success-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" width="28" height="28">
                                        <path
                                            d="M20 6L9 17L4 12"
                                            fill="none"
                                            stroke="#fff"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="order-success-title">{t("order_success_title")}</h3>
                            <p className="order-success-message">{t("order_success_alert", {
                                name: userInfo.fname,
                                total: totalPrice.toFixed(2),
                            })}</p>
                            {orderNumber && (
                                <p className="order-success-number">
                                    {t("order_number_label")} <span>#{orderNumber}</span>
                                </p>
                            )}

                            <div className="order-success-actions">
                                <button
                                    type="button"
                                    className="order-success-btn secondary"
                                    onClick={handleCloseOrderSuccess}
                                >
                                    {t("view_order_btn")}
                                </button>
                                <Link
                                    to="/products"
                                    className="order-success-btn primary"
                                    onClick={handleCloseOrderSuccess}
                                >
                                    {t("continue_shopping")}
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function getColorHex(colorName: string) {
    const colors = {
        black: "#000000",
        cream: "#FFFDD0",
        brown: "#A52A2A",
        green: "#008000",
        blue: "#1E90FF",
        red: "#DC143C",
        yellow: "#FFD700",
        orange: "#FF8C00",
        purple: "#800080",
        pink: "#FF69B4",
        navy: "#000080",
        teal: "#008080",
        beige: "#F5F5DC",
        multicolor: "linear-gradient(45deg, #FF5733, #33FF57, #3357FF)"
    } as const;
    return colors[colorName as keyof typeof colors] || "#000000ff";
}

export default CartPage;

