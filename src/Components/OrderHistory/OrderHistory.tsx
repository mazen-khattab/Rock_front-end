import { useEffect, useState } from "react";
import {
    Package,
    Calendar,
    ChevronDown,
    ChevronUp,
    Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import "./OrderHistory.css";
import Footer from "../Home/Footer/Footer";
import Navbar from "../Home/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useOrder } from "../../Context/OrderContext";
import type { OrderHistoryItem } from "../../Types/order";


const OrderHistory = () => {
    const { getOrderHistory, loading } = useOrder();

    const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
    const [orders, setOrders] = useState<OrderHistoryItem[]>([]);

    const { t } = useTranslation("OrderHistory");

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const orderHistory = await getOrderHistory();
                setOrders(orderHistory);
            } catch (error) {
                console.error("Error fetching order history:", error);
            }
        };

        fetchOrderHistory();
    }, []);

    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrders((prev) =>
            prev.includes(orderId)
                ? prev.filter((id) => id !== orderId)
                : [...prev, orderId]
        );
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered":
                return "status-delivered";
            case "Shipped":
                return "status-shipped";
            case "Processing":
                return "status-processing";
            case "Cancelled":
                return "status-cancelled";
            default:
                return "status-processing";
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div>
            <Navbar></Navbar>

            <div className="order-history-page">
                <div className="order-history-container">
                    {loading ? (
                        <div className="page-loading" aria-live="polite" aria-busy="true">
                            <Loader2 className="page-loading-icon" size={48} />
                        </div>
                    ) : (
                        <>
                            <div className="page-header">
                                <div className="header-content">
                                    <Package className="header-icon" size={100} />
                                    <div>
                                        <h1 className="page-title">{t("order_history")}</h1>
                                        <p className="page-subtitle">{t("view_and_track_orders")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="orders-list">
                                {orders.map((order) => (
                                    <div key={order.orderNumber} className="order-card">
                                        <div
                                            className="order-header"
                                            onClick={() => toggleOrderExpansion(order.orderNumber)}
                                        >
                                            <div className="order-info">
                                                <div className="order-id">
                                                    <Package size={20} />
                                                    <span>
                                                        {t("order")} <strong>#{order.orderNumber}</strong>
                                                    </span>
                                                </div>
                                                <div className="order-meta">
                                                    <div className="order-date">
                                                        <Calendar size={16} />
                                                        <span>{formatDate(order.createdAt)}</span>
                                                    </div>
                                                    <div className={`order-status ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-summary">
                                                <div className="order-total">
                                                    <span>
                                                        {order.totalPrice.toFixed(2)}{" "}
                                                        <span className="currency">{t("currency")}</span>{" "}
                                                    </span>
                                                </div>
                                                <button className="expand-btn">
                                                    {expandedOrders.includes(order.orderNumber) ? (
                                                        <ChevronUp size={20} />
                                                    ) : (
                                                        <ChevronDown size={20} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {expandedOrders.includes(order.orderNumber) && (
                                            <div className="order-details">
                                                <div className="products-list">
                                                    {order.orderDetails.map((product) => (
                                                        <div key={product.name} className="product-item">
                                                            <div className="product-image">
                                                                <img src={product.image} alt={product.name} />
                                                            </div>
                                                            <div className="product-info">
                                                                <h3 className="product-name">{product.name}</h3>
                                                                <p className="product-description">
                                                                    {product.description}
                                                                </p>
                                                                <div className="product-meta">
                                                                    <span className="product-meta-info">
                                                                        <strong>{t("color")}: </strong> {product.colorName}{" "}
                                                                    </span>
                                                                    <span className="product-meta-info">
                                                                        <strong>{t("size")}: </strong> {product.sizeName}{" "}
                                                                    </span>
                                                                    <span className="product-meta-info">
                                                                        <strong>{t("price")}: </strong> {product.price * product.quantity}{" "}
                                                                        <span className="currency">{t("currency")}</span>
                                                                    </span>
                                                                    <span className="product-meta-info">
                                                                        <strong>{t("quantity")}: </strong>{product.quantity}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {orders.length === 0 && (
                                <div className="empty-orders">
                                    <Package className="empty-icon" size={64} />
                                    <h2>{t("no_orders_yet")}</h2>
                                    <p>{t("no_orders_message")}</p>
                                    <Link to="/products" className="shop-now-btn">
                                        {t("start_shopping")}
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default OrderHistory;
