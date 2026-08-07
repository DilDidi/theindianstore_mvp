import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // 1. Импортируем Link для кликабельности
import API from "../api/axios";
import { useCartStore } from "../store/useCartStore";
import { useLangStore } from "../store/useLangStore";

const BACKEND_URL = import.meta.env.PROD 
  ? "https://theindianstore-backend.onrender.com" 
  : "http://127.0.0.1:8000";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  // 2. Добавляем состояние для отслеживания выбранных емкостей { productId: index }
  const [selectedCaps, setSelectedCaps] = useState({});

  const addToCart = useCartStore((s) => s.addToCart);
  const { t, lang } = useLangStore();

  useEffect(() => {
    API.get("products/").then((res) => setProducts(res.data));
    API.get("products/categories/").then((res) => setCategories(res.data));
  }, []);

  const filtered = selectedCat
    ? products.filter((p) => p.category === selectedCat)
    : products;

  // 3. Функция для смены емкости конкретного товара
  const handleCapChange = (prodId, index) => {
    setSelectedCaps((prev) => ({ ...prev, [prodId]: index }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 min-h-screen">
      {/* Боковая панель категорий */}
      <div className="w-full md:w-48 shrink-0">
        <h3 className="font-serif font-bold text-lg text-[#2C5234] mb-3">
          {t.shop || "Магазин"}
        </h3>
        <div className="flex flex-wrap md:flex-col gap-2">
          <button
            onClick={() => setSelectedCat(null)}
            className={`text-left px-3 py-1.5 rounded-lg text-sm ${
              !selectedCat
                ? "bg-[#E8F0EC] text-[#2C5234] font-bold"
                : "text-gray-600"
            }`}
          >
            {t.home === "Home"
              ? "All"
              : t.home === "Bosh sahifa"
              ? "Barchasi"
              : "Все"}
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`text-left px-3 py-1.5 rounded-lg text-sm ${
                selectedCat === c.id
                  ? "bg-[#E8F0EC] text-[#2C5234] font-bold"
                  : "text-gray-600"
              }`}
            >
              {c[`name_${lang}`] || c.name_ru || c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Сетка товаров */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {filtered.map((prod) => {
          // 4. Вычисляем текущую цену и объем для каждого товара
          const capIndex = selectedCaps[prod.id] || 0;
          const hasCapacities = prod.capacities && prod.capacities.length > 0;
          const currentCapacity = hasCapacities
            ? prod.capacities[capIndex]
            : null;
          const displayPrice = currentCapacity
            ? currentCapacity.price
            : prod.price;

          const name = prod[`name_${lang}`] || prod.name;
          const desc = prod[`description_${lang}`] || prod.description;

          // 5. Обработчик добавления в корзину с учетом выбранной емкости
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
            <div
              key={prod.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-[#E6E1DA] flex flex-col justify-between"
            >
              {/* 6. Кликабельная картинка */}
              <Link to={`/product/${prod.id}`} className="block cursor-pointer">
                <img
                  src={
                    prod.image && prod.image.startsWith("http")
                      ? prod.image
                      : `${BACKEND_URL}${prod.image}`
                  }
                  alt={name}
                  className="w-full h-auto max-h-48 object-contain rounded-lg mb-3 mx-auto"
                />
              </Link>

              {/* 7. Кликабельный заголовок */}
              <Link
                to={`/product/${prod.id}`}
                className="block cursor-pointer hover:underline"
              >
                <h4 className="font-medium text-gray-800 text-sm mb-1">
                  {name}
                </h4>
              </Link>

              <p className="text-gray-500 text-xs mb-2 line-clamp-2">{desc}</p>

              {/* 8. Блок выбора емкости (появляется, если есть варианты) */}
              {hasCapacities && (
                <div className="mb-3">
                  <span className="text-xs text-gray-500 block mb-1">
                    {t.capacity}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {prod.capacities.map((cap, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCapChange(prod.id, idx);
                        }}
                        className={`text-xs px-2.5 py-1 rounded border transition cursor-pointer ${
                          capIndex === idx
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

              <p className="text-[#2C5234] font-bold text-sm mb-3">
                {displayPrice.toLocaleString()} {t.currency}
              </p>

              <button
                onClick={handleAddToCart}
                className="w-full bg-[#2C5234] text-white text-xs py-2 rounded-full hover:bg-[#234229] transition cursor-pointer"
              >
                {t.addToCart}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
