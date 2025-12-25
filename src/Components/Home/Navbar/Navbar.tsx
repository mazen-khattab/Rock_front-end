import './Navbar.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from '../../../Context/CartContext';
import logo from '../../../assets/Rock_logo.jpg'

const Navbar = () => {
    const { cartCount } = useCart();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [language, setLanguage] = useState<'en' | 'ar'>('en');

    const navLinks = [
        { name: 'Home', link: "/" },
        { name: 'Products', link: "/products" },
        { name: 'About', link: "/about" },
        { name: 'Why us', link: "/why-us" },
    ];

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
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
                        <button className='nav-lang' onClick={toggleLanguage}>{language === 'en' ? 'AR' : 'EN'}</button>
                        <Link to="/login" className="login">
                            <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            <span>Login</span>
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
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
                    <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                    <Link to="/why-us" onClick={() => setIsMobileMenuOpen(false)}>Why Us</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;