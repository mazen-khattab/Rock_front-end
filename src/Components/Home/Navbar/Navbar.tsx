import './Navbar.css'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../../../Context/CartContext';
import { useTranslation } from "react-i18next";
import { useAuth } from '../../../Context/AuthContext';
import logo from '../../../assets/keef_navbar_logo.jpg';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const { cartCount } = useCart();
    const { i18n, t } = useTranslation("Navbar");

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const savedLang = localStorage.getItem("lang") || "en";

    const navLinks = [
        { name: t("home"), link: "/" },
        { name: t("product") || "Products", link: "/products" },
        { name: t("about"), link: "/about" },
        { name: t("why-us"), link: "/why-us" },
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const userLogout = async () => {
        try {
            await logout();
            navigate('/login', { replace: true });
        } catch (err: any) {
            console.error(err);
        }
    };

    const getInitials = (name?: string) => {
        if (!name) return "MK";
        const parts = name.trim().split(" ");
        if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        return name.slice(0, 2).toUpperCase();
    };

    useEffect(() => {
        if (savedLang) {
            i18n.changeLanguage(savedLang);
            document.documentElement.dir = savedLang.toLowerCase() === "ar" ? "rtl" : "ltr";
        }
    }, [savedLang, i18n]);

    const toggleLanguage = (lng: string) => {
        localStorage.setItem("lang", lng);
        window.location.reload();
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="site-header">
            {/* Navbar (Flush 100% width at top=0, smoothly contracts to 80% width at top=20px on scroll) */}
            <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
                <div className="navbar-container">
                    <div className="navbar-inner">
                        {/* Keef Logo */}
                        <Link to="/" className="logo" aria-label="Home">
                            <img src={logo} alt="Keef Logo" />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="desktop-menu">
                            {navLinks.map((link) => (
                                <Link
                                    to={link.link}
                                    className={`nav-link ${window.location.pathname === link.link ? 'active' : ''}`}
                                    key={link.name}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Header icons (cart, language, login/profile and mobile menu) */}
                        <div className="navbar-icons">
                            <Link to='/cart' className="cart-link" aria-label="Cart">
                                <i className="fa-solid fa-cart-shopping cart-icon"></i>
                                <span className="cart-count">{cartCount}</span>
                            </Link>

                            <button
                                className='nav-lang'
                                onClick={() => toggleLanguage(savedLang === 'en' ? 'ar' : 'en')}
                                title="Change Language"
                            >
                                {savedLang === 'en' ? 'EN' : 'AR'}
                            </button>

                            {isAuthenticated ? (
                                <div className="user-icon-container">
                                    <button className="user-icon" onClick={toggleDropdown} title={user?.userName}>
                                        <span>{getInitials(user?.userName)}</span>
                                    </button>

                                    <div className={`user-dropdown-menu ${savedLang} ${isOpen ? "open" : ""}`}>
                                        <div className="user-dropdown-header">
                                            <span className="user-name">{user?.userName}</span>
                                            {user?.role?.[0] && (
                                                <span className="user-role-badge">{user.role[0]}</span>
                                            )}
                                        </div>
                                        <ul>
                                            <li onClick={() => { setIsOpen(false); navigate('/user-profile'); }}>
                                                <i className="fa-regular fa-user"></i>
                                                <span>Profile</span>
                                            </li>
                                            <li onClick={() => { setIsOpen(false); navigate('/order-history'); }}>
                                                <i className="fa-solid fa-clock-rotate-left"></i>
                                                <span>Order History</span>
                                            </li>
                                            <li className="logout-item" onClick={userLogout}>
                                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                                <span>Log out</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className="login">
                                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                    <span>{t("login")}</span>
                                </Link>
                            )}

                            <div className="mobile-menu-btn">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    aria-label="Toggle navigation menu"
                                >
                                    {isMobileMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars-staggered"></i>}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
                        {navLinks.map((link) => (
                            <Link
                                to={link.link}
                                key={link.name}
                                className={`mobile-nav-link ${window.location.pathname === link.link ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
