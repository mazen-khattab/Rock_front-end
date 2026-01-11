import './Navbar.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from '../../../Context/CartContext';
import { useTranslation } from "react-i18next";
import logo from '../../../assets/Rock_logo.jpg'

const Navbar = () => {
    const { cartCount } = useCart();
    const { i18n, t } = useTranslation("Navbar");

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const savedLang = localStorage.getItem("lang");

    const navLinks = [
        { name: t("home"), link: "/" },
        { name: t("products"), link: "/products" },
        { name: t("about"), link: "/about" },
        { name: t("why-us"), link: "/why-us" },
    ];

    useEffect(() => {
        if (savedLang) {
            i18n.changeLanguage(savedLang);
            document.documentElement.dir = savedLang.toLowerCase() === "ar" ? "rtl" : "ltr";
        }
    }, []);

    const toggleLanguage = (lng: string) => {
        localStorage.setItem("lang", lng);
        window.location.reload();
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="container">
                <div className="navbar-inner">
                    <Link to="/" className="logo">
                        <img src={logo} alt="logo" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="desktop-menu">
                        {navLinks.map((link) => (
                            <Link to={link.link} className={window.location.pathname === link.link ? 'active' : ''} key={link.name}>{link.name}</Link>
                        ))}
                    </div>

                    <div className="navbar-icons">
                        <Link to='/cart' style={{ color: 'black', position: 'relative' }}>
                            <i className="fa-solid fa-cart-shopping cart-icon"></i>
                            <span className="cart-count">{cartCount}</span>
                        </Link>
                        <button className='nav-lang' onClick={() => toggleLanguage(savedLang === 'en' ? 'ar' : 'en')}>{savedLang === 'en' ? 'EN' : 'AR'}</button>
                        <Link to="/login" className="login">
                            <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            <span>{t("login")}</span>
                        </Link>

                        <div className="mobile-menu-btn">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                {isMobileMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars-staggered"></i>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
                    {navLinks.map((link) => (
                        <Link to={link.link} key={link.name} onClick={() => setIsMobileMenuOpen(false)}>{link.name}</Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;