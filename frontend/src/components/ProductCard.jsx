import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useLangStore } from "../store/useLangStore";

const BACKEND_URL = "http://127.0.0.1:8000";

export default function ProductCard({ prod }) {
  // Состояние для отслеживания выбранного объёма (по умолчанию 0 — первый вариант)
  const [selectedCapIndex, setSelectedCapIndex] = useState(0);

  const addToCart = useCartStore((s) => s.addToCart);
  const { t, lang } = useLangStore();

  // Безопасный путь к изображению
  const imageUrl =
    prod.image && prod.image.startsWith("http")
      ? prod.image
      : `${BACKEND_URL}${prod.image}`;

  // Перевод полей
  const name = prod[`name_${lang}`] || prod.name;
  const desc = prod[`description_${lang}`] || prod.description;

  // Логика выбора ёмкости и цены
  const hasCapacities = prod.capacities && prod.capacities.length > 0;
  const currentCapacity = hasCapacities
    ? prod.capacities[selectedCapIndex]
    : null;
  const displayPrice = currentCapacity ? currentCapacity.price : prod.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const productToCart = {
      ...prod,
      price: displayPrice,
      selectedSize: currentCapacity ? currentCapacity.size : "Стандарт",
    };
    addToCart(productToCart);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E6E1DA] flex flex-col justify-between transform hover:translate-y-[-4px] transition duration-300 h-full">
      {/* Кликабельная картинка, ведущая на страницу товара */}
      <Link to={`/product/${prod.id}`} className="block cursor-pointer">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-auto max-h-44 object-contain rounded-lg mb-3 mx-auto"
        />
      </Link>

      <div>
        {/* Кликабельный заголовок товара */}
        <Link
          to={`/product/${prod.id}`}
          className="block cursor-pointer hover:underline"
        >
          <h3 className="font-semibold text-gray-800 text-sm mb-1">{name}</h3>
        </Link>

        <p className="text-gray-500 text-xs mb-2 line-clamp-2">{desc}</p>

        {/* Блок выбора ёмкости / объёма */}
        {hasCapacities && (
          <div className="mb-3">
            <span className="text-xs text-gray-500 block mb-1">
              Объем / Емкость:
            </span>
            <div className="flex flex-wrap gap-2">
              {prod.capacities.map((cap, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedCapIndex(index);
                  }}
                  className={`text-xs px-3 py-1 rounded border transition cursor-pointer ${
                    selectedCapIndex === index
                      ? "bg-[#2C5234] border-[#2C5234] text-white font-semibold"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {cap.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Динамическая цена */}
        <p className="text-[#2C5234] font-bold text-sm mb-3">
          {displayPrice ? displayPrice.toLocaleString() : 0} {t.currency}
        </p>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-[#2C5234] hover:bg-[#234229] text-white text-xs py-2 rounded-full transition cursor-pointer"
      >
        {t.addToCart}
      </button>
    </div>
  );
}
