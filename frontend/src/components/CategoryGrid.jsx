import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useLangStore } from "../store/useLangStore";
import {
  Droplets,
  Sparkles,
  Wand2,
  Leaf,
  Baby,
  Gift,
  Layers,
} from "lucide-react";

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { lang, t } = useLangStore();

  useEffect(() => {
    // Делаем запрос к твоему API категорий
    API.get("products/categories/").then((res) => {
      setCategories(res.data);
    });
  }, []);

  // Функция для выбора иконки в зависимости от ID или имени (можно улучшить)
  const getIcon = (id) => {
    const icons = {
      1: <Droplets />,
      2: <Sparkles />,
      3: <Wand2 />,
      4: <Leaf />,
      5: <Baby />,
      6: <Gift />,
    };
    return icons[id] || <Layers />;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-center font-serif text-2xl text-[#2C5234] mb-12">
        {t.categoriesTitle}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/shop?category=${cat.id}`)}
            className="flex flex-col items-center justify-center p-6 bg-[#F9F4EE] border border-[#E6E1DA] rounded-lg cursor-pointer hover:shadow-md transition"
          >
            <div className="text-[#2C5234] mb-3">{getIcon(cat.id)}</div>
            <span className="text-sm text-center font-medium text-gray-700">
              {/* Динамический выбор языка из базы */}
              {cat[`name_${lang}`] || cat.name_ru || cat.name}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/shop")}
          className="bg-[#2C5234] text-white px-8 py-3 rounded-md hover:bg-[#1f3a24] transition"
        >          
          {t.viewAll || "ПОСМОТРЕТЬ ВСЕ ТОВАРЫ"}
        </button>
      </div>
    </div>
  );
}
