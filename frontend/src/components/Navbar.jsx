import React from "react";
import { Link } from "react-router-dom";
import { useLangStore } from "../store/useLangStore";
import { useCartStore } from "../store/useCartStore";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const { t } = useLangStore();
  const { cart } = useCartStore();

  return (
    <nav className="bg-[#FAF8F5] border-b border-[#E6E1DA] fixed top-10 left-0 w-full z-50 px-6 py-3 flex justify-between items-center shadow-sm">
      {/* Логотип */}
      <Link to="/" className="text-xl font-serif font-bold text-[#2C5234]">
        <img
          src={logo}
          alt="The Indian Store"
          className="h-12 w-auto object-contain"
        />
      </Link>

      {/* Меню навигации */}
      <div className="flex space-x-6 font-medium text-gray-700">        
        <Link to="/" className="hover:text-[#2C5234] transition">
          {t.home || "Главная"}
        </Link>
        <Link to="/about" className="hover:text-[#2C5234] transition">
          {t.about}
        </Link>
        <Link to="/shop" className="hover:text-[#2C5234] transition">
          {t.shop || "Магазин"}
        </Link>
        <Link to="/cart" className="hover:text-[#2C5234] transition relative">
          {t.cart || "Корзина"}
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-[#2C5234] text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
