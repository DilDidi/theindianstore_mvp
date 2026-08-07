import React from "react";
import { Sparkles, ShieldCheck, Leaf } from "lucide-react";
import { useLangStore } from "../store/useLangStore";

export default function About() {
  const { t } = useLangStore();

  if (!t || !t.aboutPage) return null;

  // Массив иконок, соответствующих индексам фич
  const icons = [
    <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto mb-4 stroke-[1.5]" />,
    <ShieldCheck className="w-10 h-10 text-[#D4AF37] mx-auto mb-4 stroke-[1.5]" />,
    <Leaf className="w-10 h-10 text-[#D4AF37] mx-auto mb-4 stroke-[1.5]" />,
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#2D3748] min-h-screen py-16 px-6 md:px-12 lg:px-24 pt-[100px]">
      {/* Заголовок страницы */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="font-serif text-4xl md:text-6xl font-extrabold text-[#1A3320] mb-4 tracking-wider uppercase">
          {t.heroTitle}
        </h1>
        <div className="w-32 h-[2px] bg-[#D4AF37] mx-auto mb-6"></div>
        <p className="text-xl text-[#2C5234] font-medium tracking-widest uppercase">
          Beauty of Nature
        </p>
      </div>

      {/* Секция: Наша миссия */}
      <div className="max-w-5xl mx-auto mb-24">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-[#1A3320] mb-6 tracking-wide">
            {t.aboutPage.missionTitle}
          </h2>
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto whitespace-pre-line font-light">
            {t.aboutPage.missionText}
          </p>
        </div>

        {/* Премиальные элементы */}
        {t.features && (
          <div className="grid md:grid-cols-3 gap-8 mt-16 border-t border-b border-[#E6E1DA] py-12">
            {t.features.map((item, index) => (
              <div
                key={index}
                className={`text-center p-6 ${
                  index === 1 ? "md:border-l md:border-r border-[#E6E1DA]" : ""
                }`}
              >
                {icons[index]}
                <h3 className="font-serif text-xl font-semibold text-[#1A3320] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Секция: Наша история */}
      <div className="bg-white rounded-none p-10 md:p-20 border-t border-b border-[#E6E1DA] shadow-none max-w-6xl mx-auto mb-16">
        <h2 className="font-serif text-4xl font-bold text-[#1A3320] text-center mb-8 tracking-wide">
          {t.aboutPage.storyTitle}
        </h2>
        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mb-12"></div>
        <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line max-w-4xl mx-auto font-light text-justify md:text-center">
          {t.aboutPage.storyText}
        </p>
      </div>
    </div>
  );
}
