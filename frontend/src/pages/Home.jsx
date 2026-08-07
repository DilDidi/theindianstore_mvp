import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CategoryGrid";
import Features from "../components/Features";
import API from "../api/axios";
import { useCartStore } from "../store/useCartStore";
import { useLangStore } from "../store/useLangStore";

// URL Django бэкенда
const BASE_URL = "http://127.0.0.1:8000";

export default function Home() {
  const [hits, setHits] = useState([]);
  // Состояние для выбранного индекса емкости { id_товара: индекс_емкости }
  const [selectedCap, setSelectedCap] = useState({});

  const addToCart = useCartStore((s) => s.addToCart);
  const { t, lang } = useLangStore();

  useEffect(() => {
    API.get("products/bestsellers/")
      .then((res) => setHits(res.data.slice(0, 4)))
      .catch((err) => console.log(err));
  }, []);

  // Функция добавления товара в корзину с учетом выбранного объема
  const handleAddToCart = (prod) => {
    const capIndex = selectedCap[prod.id] || 0;
    const hasCapacities = prod.capacities && prod.capacities.length > 0;
    const currentCapacity = hasCapacities ? prod.capacities[capIndex] : null;

    const productToCart = {
      ...prod,
      price: currentCapacity ? currentCapacity.price : prod.price,
      selectedSize: currentCapacity ? currentCapacity.size : "Стандарт",
    };

    addToCart(productToCart);
  };

  // Функция выбора объема
  const handleSelectCap = (prodId, index) => {
    setSelectedCap((prev) => ({ ...prev, [prodId]: index }));
  };

  return (
    <div>
      <HeroBanner />

      <CategoryGrid />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-serif font-bold text-[#2C5234] mb-8 text-center">
          {t.bestSellers}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {hits.map((prod) => {
            const imageUrl =
              prod.image && prod.image.startsWith("http")
                ? prod.image
                : `${BASE_URL}${prod.image}`;

            const name = prod[`name_${lang}`] || prod.name;
            const desc = prod[`description_${lang}`] || prod.description;

            // Определяем текущую выбранную емкость и цену для отображения
            const capIndex = selectedCap[prod.id] || 0;
            const hasCapacities = prod.capacities && prod.capacities.length > 0;
            const currentCapacity = hasCapacities
              ? prod.capacities[capIndex]
              : null;
            const displayPrice = currentCapacity
              ? currentCapacity.price
              : prod.price;

            return (
              <div
                key={prod.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-[#E6E1DA] flex flex-col justify-between transform hover:translate-y-[-4px] transition duration-300"
              >
                <Link to={`/product/${prod.id}`}>
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-auto max-h-44 object-contain rounded-lg mb-3 cursor-pointer"
                  />
                </Link>

                <div>
                  <Link to={`/product/${prod.id}`}>
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 hover:underline cursor-pointer">
                      {name}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-xs mb-2 line-clamp-2">
                    {desc}
                  </p>

                  {/* Вывод доступных объемов/емкостей (теперь это кликабельные кнопки) */}
                  {hasCapacities && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {prod.capacities.map((cap, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectCap(prod.id, index)}
                          className={`text-[10px] px-2 py-0.5 rounded border font-medium cursor-pointer transition ${
                            capIndex === index
                              ? "bg-[#2C5234] border-[#2C5234] text-white"
                              : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100"
                          }`}
                        >
                          {cap.size}
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="text-[#2C5234] font-bold text-sm mb-3">
                    {displayPrice ? displayPrice.toLocaleString() : 0}{" "}
                    {t.currency}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(prod)}
                  className="w-full bg-[#2C5234] hover:bg-[#234229] text-white text-xs py-2 rounded-full transition cursor-pointer"
                >
                  {t.addToCart}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <Features />
    </div>
  );
}
