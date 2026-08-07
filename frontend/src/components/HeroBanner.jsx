import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLangStore } from '../store/useLangStore';
import API from '../api/axios';

export default function HeroBanner() {
  const [images, setImages] = useState([]);
  const [idx, setIdx] = useState(0);
  const { t } = useLangStore();

  // Загружаем баннеры с бэкенда
  useEffect(() => {
    API.get('products/banners/')
      .then(res => setImages(res.data))
      .catch(err => console.error("Ошибка загрузки баннеров:", err));
  }, []);

  // Таймер переключения
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setIdx(p => (p + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, [images]);

  // Если баннеры еще не загрузились, показываем красивый зеленый фон заглушку
  if (images.length === 0) {
    return <div className="w-full h-[60vh] bg-[#2C5234]" />;
  }

  return (
    <div className="relative w-full h-[60vh] overflow-hidden bg-black">
      {images.map((img, i) => (
        <img 
          key={i} 
          src={img} 
          alt="banner" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === idx ? 'opacity-60' : 'opacity-0'}`} 
        />
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-2">{t.heroTitle}</h1>
        {/* <p className="text-md sm:text-lg text-white/90 mb-6 font-light">{t.heroSubtitle}</p> */}
        <Link to="/shop" className="bg-[#FAF8F5] hover:bg-[#2C5234] text-[#2C5234] hover:text-white px-8 py-3 rounded-full font-semibold transition transform hover:scale-105">
          {t.shop}
        </Link>
      </div>
    </div>
  );
}