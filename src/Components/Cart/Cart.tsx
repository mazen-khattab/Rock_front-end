import { useState } from 'react';
import { Link } from "react-router-dom";
import { useCart } from '../../Context/CartContext';
import Navbar from '../Home/Navbar/Navbar';
import './cart.css';

interface CartItem {
    id: number;
    name: string;
    color: string;
    size: string;
    price: number;
    image: string;
    quantity: number;
}

interface UserInfo {
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
}

type actions = 'INCREASE' | 'DECREASE'

const CartPage = () => {
    const { items, increaseAmount, decreaseAmount, removeFromCart } = useCart();

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        phone: ''
    });

    const updateQuantity = (item: CartItem, action: actions) => {
        switch (action) {
            case "INCREASE":
                increaseAmount(item.id, item.color, item.size);
                break;
            case 'DECREASE':
                decreaseAmount(item.id, item.color, item.size);
                break;
            default:
                return;
        }
    };

    const removeItem = (item: CartItem) => {
        removeFromCart(item.id, item.color, item.size);
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

    const handleSubmitOrder = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!userInfo.name || !userInfo.email || !userInfo.address || !userInfo.phone) {
            alert('Please fill in all required fields.');
            return;
        }

        alert(`✅ Order placed successfully!\nThank you, ${userInfo.name}!\nTotal: $${total.toFixed(2)}`);
        setIsCheckoutOpen(false);
        // In real app: call API → reset cart → redirect to success page
    };

    return (
        <div>
            <Navbar></Navbar>

            <div className="cart-container container">
                <header className="cart-header">
                    <h1 className="cart-title">Shopping cart</h1>
                    <span className="cart-count">{items.length} products</span>
                </header>

                <main className="cart-main">
                    <section className="cart-items">
                        {items.length === 0 ? (
                            <div className="cart-empty">
                                <p>Your cart is empty.</p>
                                <Link to="/products" className="cart-empty-link">Continue shopping</Link>
                            </div>
                        ) : (
                            items.map(item => (
                                <div key={item.id + item.color + item.size} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        <p className="cart-item-info">Color: <span style={{ color: getColorHex(item.color) }}>{item.color}</span></p>
                                        <p className="cart-item-info">Size: {item.size}</p>
                                        <div className="cart-item-quantity">
                                            <button
                                                onClick={() => updateQuantity(item, 'DECREASE')}
                                                className="cart-qty-btn"
                                                aria-label={`Decrease ${item.name} quantity`}
                                            >
                                                −
                                            </button>
                                            <span className="cart-qty-value">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item, 'INCREASE')}
                                                className="cart-qty-btn"
                                                aria-label={`Increase ${item.name} quantity`}
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
                        <h2 className="cart-summary-title">Cart summary</h2>

                        <div className="cart-summary-line">
                            <span>Product's price</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="cart-summary-line">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                        </div>

                        <div className="cart-summary-total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button
                            className="cart-checkout-btn"
                            onClick={handleCheckout}
                            disabled={items.length === 0}
                        >
                            {items.length === 0 ? 'Cart is empty' : 'Checkout'}
                        </button>

                        <div className="cart-footer-info">
                            <div className="cart-footer-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003334" strokeWidth="2">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                                    <path d="M12 16V12M12 8H12.01"></path>
                                </svg>
                                <span>Safe shopping at DressHome</span>
                            </div>
                            <div className="cart-footer-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003334" strokeWidth="2">
                                    <path d="M12 12L12 20M12 12L8 8M12 12L16 8"></path>
                                    <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"></path>
                                </svg>
                                <span>Free delivery on orders over $30.00</span>
                            </div>
                            <div className="cart-footer-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003334" strokeWidth="2">
                                    <path d="M12 8V12L15 15"></path>
                                    <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                                <span>365 days for return</span>
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
                                <h2 className="checkout-modal-title">Complete Your Order</h2>
                                <button
                                    className="checkout-modal-close"
                                    onClick={() => setIsCheckoutOpen(false)}
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                            </div>

                            <form className="checkout-form" onSubmit={handleSubmitOrder}>
                                <div className="checkout-form-group">
                                    <label htmlFor="name" className="checkout-label">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={userInfo.name}
                                        onChange={handleInputChange}
                                        className="checkout-input"
                                        required
                                    />
                                </div>

                                <div className="checkout-form-group">
                                    <label htmlFor="email" className="checkout-label">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={userInfo.email}
                                        onChange={handleInputChange}
                                        className="checkout-input"
                                        required
                                    />
                                </div>

                                <div className="checkout-form-group">
                                    <label htmlFor="address" className="checkout-label">Address *</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={userInfo.address}
                                        onChange={handleInputChange}
                                        className="checkout-input"
                                        required
                                    />
                                </div>

                                <div className="checkout-form-row">
                                    <div className="checkout-form-group">
                                        <label htmlFor="city" className="checkout-label">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={userInfo.city}
                                            onChange={handleInputChange}
                                            className="checkout-input"
                                        />
                                    </div>
                                    <div className="checkout-form-group">
                                        <label htmlFor="zipCode" className="checkout-label">ZIP Code</label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            value={userInfo.zipCode}
                                            onChange={handleInputChange}
                                            className="checkout-input"
                                        />
                                    </div>
                                </div>

                                <div className="checkout-form-group">
                                    <label htmlFor="phone" className="checkout-label">Phone *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={userInfo.phone}
                                        onChange={handleInputChange}
                                        className="checkout-input"
                                        required
                                    />
                                </div>

                                <div className="checkout-order-summary">
                                    <h3 className="checkout-summary-title">Order Summary</h3>
                                    <div className="checkout-summary-line">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="checkout-summary-line">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="checkout-summary-total">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button type="submit" className="checkout-submit-btn">
                                    Place Order
                                </button>
                            </form>
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