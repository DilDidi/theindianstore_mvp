import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useCartStore } from "../store/useCartStore";
import { useLangStore } from "../store/useLangStore";

const BACKEND_URL = "http://127.0.0.1:8000";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedCapIndex, setSelectedCapIndex] = useState(0);

  const addToCart = useCartStore((s) => s.addToCart);
  const { t, lang } = useLangStore();

  useEffect(() => {
    API.get(`products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        console.log("Загруженный товар:", res.data); // Поможет увидеть в консоли (F12) есть ли capacities
      })
      .catch((err) => console.error("Ошибка загрузки товара", err));
  }, [id]);

  if (!product) {
    return <div className="text-center py-20 text-gray-600">Загрузка...</div>;
  }

  const imageUrl =
    product.image && product.image.startsWith("http")
      ? product.image
      : `${BACKEND_URL}${product.image}`;

  const name = product[`name_${lang}`] || product.name;
  const desc = product[`description_${lang}`] || product.description;

  // Проверка наличия емкостей
  const hasCapacities = product.capacities && product.capacities.length > 0;
  const currentCapacity = hasCapacities
    ? product.capacities[selectedCapIndex]
    : null;
  const displayPrice = currentCapacity ? currentCapacity.price : product.price;

  const handleAddToCart = () => {
    const productToCart = {
      ...product,
      price: displayPrice,
      selectedSize: currentCapacity ? currentCapacity.size : "Стандарт",
    };
    addToCart(productToCart);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Контейнер фото: ограничили ширину и высоту, чтобы картинка не была гигантской */}
        <div className="w-full md:w-5/12 flex justify-center border border-gray-100 rounded-2xl p-6 bg-gray-50/50 h-[400px]">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        {/* Описание и контролы */}
        <div className="w-full md:w-7/12 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-3">
              {name}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{desc}</p>

            {/* Выбор емкости (объёма) */}
            {hasCapacities ? (
              <div className="mb-6">
                <span className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wider">
                  {t.capacity}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.capacities.map((cap, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCapIndex(index)}
                      className={`text-xs px-5 py-2.5 rounded-xl border transition cursor-pointer font-medium ${
                        selectedCapIndex === index
                          ? "bg-[#2C5234] border-[#2C5234] text-white"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {cap.size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400 mb-6 italic">
                У этого товара нет вариантов объема.
              </p>
            )}

            {/* Цена */}
            <div className="mb-8">
              <span className="text-xs text-gray-400 block mb-1">Цена:</span>
              <p className="text-[#2C5234] font-bold text-2xl">
                {displayPrice ? displayPrice.toLocaleString() : 0} {t.currency}
              </p>
            </div>
          </div>

          {/* Кнопка добавления в корзину */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#2C5234] hover:bg-[#234229] text-white py-4 rounded-xl transition font-medium cursor-pointer shadow-sm text-sm"
          >
            {t.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
