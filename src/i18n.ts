import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enNavbar from "./Local/EN/Navbar.json";
import enHome from "./Local/EN/Home.json";
import enProductDetails from "./Local/EN/Product-details.json";
import enProducts from "./Local/EN/Products.json";
import enAbout from "./Local/EN/About.json";
import enWhyUs from "./Local/EN/Why-us.json";
import enMessages from "./Local/EN/Why-us.json";
import enCart from "./Local/EN/Cart.json";
import enProductCard from "./Local/EN/ProductCard.json";
import enOrderHistory from "./Local/EN/OrderHistory.json";

import arNavbar from "./Local/AR/Navbar.json";
import arHome from "./Local/AR/Home.json";
import arProductDetails from "./Local/AR/Product-details.json";
import arProducts from "./Local/AR/Products.json";
import arAbout from "./Local/AR/About.json";
import arWhyUs from "./Local/AR/Why-us.json";
import arMessages from "./Local/AR/Why-us.json";
import arCart from "./Local/AR/Cart.json";
import arProductCard from "./Local/AR/ProductCard.json";
import arOrderHistory from "./Local/AR/OrderHistory.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        Navbar: arNavbar,
        Home: arHome,
        ProductDetails: arProductDetails,
        Products: arProducts,
        About: arAbout,
        WhyUs: arWhyUs,
        Messages: arMessages,
        Cart: arCart,
        ProductCard: arProductCard,
        OrderHistory: arOrderHistory,
      },
      en: {
        Navbar: enNavbar,
        Home: enHome,
        ProductDetails: enProductDetails,
        Products: enProducts,
        About: enAbout,
        WhyUs: enWhyUs,
        Messages: enMessages,
        Cart: enCart,
        ProductCard: enProductCard,
        OrderHistory: enOrderHistory,
      },
    },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
    fallbackLng: "en",
    ns: [
        "Navbar",
        "Home",
        "ProductDetails",
        "Products",
        "About",
        "WhyUs",
        "Messages",
        "Cart",
        "ProductCard",
        "OrderHistory"
    ],
    defaultNS: "home",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
