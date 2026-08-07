import React from "react";
import { useLangStore } from "../store/useLangStore";
import { Truck, Leaf, ShieldCheck } from "lucide-react";

export default function TopBar() {
  const { lang, setLang, t } = useLangStore();

  return (
    <div className="bg-[#2C5234] text-[#FAF8F5] text-xs h-10 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Левая часть: Доставка */}
      <div className="flex items-center font-medium">
        <Truck className="w-4 h-4 mr-2 animate-pulse" />
        <span>{t?.topBar?.delivery || "Бесплатная доставка"}</span>
      </div>

      {/* Правая часть: Аутентичность, Натуральность и Языки */}
      <div className="flex items-center space-x-6">
        {/* Дополнительные элементы */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center">
            <Leaf className="w-3.5 h-3.5 mr-1.5" />
            <span>{t?.topBar?.authentic || "100% Аутентично"}</span>
          </div>
          <span className="text-white/30">|</span>
          <div className="flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
            <span>{t?.topBar?.natural || "Натуральные ингредиенты"}</span>
          </div>
        </div>

        {/* Разделитель */}
        <span className="text-white/30">|</span>

        {/* Переключатель языков */}
        <div className="flex space-x-3 font-semibold">
          {["uz", "ru", "en"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`uppercase transition ${
                lang === l
                  ? "text-white underline underline-offset-4"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
