import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useLangStore } from "../store/useLangStore";
import logo from "../assets/logo.svg";

export default function Footer() {
  const { t } = useLangStore();

  return (
    <footer className="bg-[#1A3320] text-[#FAF8F5]/80 text-sm font-light mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Столбец 1: Описание */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <img
              src={logo}
              alt="The Indian Store"
              className="h-18 w-auto object-contain self-start"
            />
          </div>
          <p className="text-xs leading-relaxed max-w-xs text-[#FAF8F5]/70">
            {t.footerDesc}
          </p>

          {/* Соцсети */}
          <div className="flex space-x-3 pt-2">
            <a
              href="https://www.instagram.com/theindianstore.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] hover:bg-[#E5C158] hover:text-[#1A3320] transition"
              aria-label="Instagram"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.305.292 3.108.598.85.327 1.477.757 2.118 1.398.641.641 1.071 1.268 1.398 2.118.306.803.536 1.742.598 3.108.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.292 2.305-.598 3.108-.327.85-.757 1.477-1.398 2.118-.641.641-1.268 1.071-2.118 1.398-.803.306-1.742.536-3.108.598-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.305-.292-3.108-.598-.85-.327-1.477-.757-2.118-1.398-.641-.641-1.071-1.268-1.398-2.118-.306-.803-.536-1.742-.598-3.108-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.292-2.305.598-3.108.327-.85.757-1.477 1.398-2.118.641-.641 1.268-1.071 2.118-1.398.803-.306 1.742-.536 3.108-.598.266-.058 1.646-.07 4.85-.07zm0 2.163c-3.138 0-3.51.011-4.764.068-1.155.052-1.788.23-2.207.39-.56.213-.963.47-1.389.896-.426.426-.683.83-.896 1.389-.16.419-.338 1.052-.39 2.207-.057 1.254-.068 1.626-.068 4.764s.011 3.51.068 4.764c.052 1.155.23 1.788.39 2.207.213.56.47.963.896 1.389.426.426.83.683 1.389.896.419.16 1.052.338 2.207.39 1.254.057 1.626.068 4.764.068s3.51-.011 4.764-.068c1.155-.052 1.788-.23 2.207-.39.56-.213.963-.47 1.389-.896.426-.426.683-.83.896-1.389.16-.419.338-1.052.39-2.207.057-1.254.068-1.626.068-4.764s-.011-3.51-.068-4.764c-.052-1.155-.23-1.788-.39-2.207-.213-.56-.47-.963-.896-1.389-.426-.426-.83-.683-1.389-.896-.419-.16-1.052-.338-2.207-.39-1.254-.057-1.626-.068-4.764-.068zm0 3.238a4.599 4.599 0 1 0 0 9.198 4.599 4.599 0 0 0 0-9.198zm0 2.163a2.436 2.436 0 1 1 0 4.872 2.436 2.436 0 0 1 0-4.872zm5.725-4.484a1.075 1.075 0 1 1 0-2.15 1.075 1.075 0 0 1 0 2.15z" />
              </svg>
            </a>
            <a
              href="https://t.me/the_indianstore"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] hover:bg-[#E5C158] hover:text-[#1A3320] transition"
              aria-label="Telegram"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M22.053 3.011c-.066-.041-.15-.051-.225-.028l-18.17 6.96c-.272.102-.303.465-.058.615l4.636 2.821 1.507 5.143c.066.226.345.302.483.118l2.656-3.483 4.306 3.003c.23.16.545.064.639-.214l5.374-17.58c.073-.238-.109-.446-.334-.436zM11.531 12.632l-3.327-2.025 10.151-6.191-1.36 5.861-5.464 2.355z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Столбец 2: Быстрые ссылки */}
        <div>
          <h4 className="font-serif font-semibold text-[#E5C158] mb-4 text-base">
            {t.fastLinks}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/" className="hover:text-[#E5C158] transition">
                {t.home}
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-[#E5C158] transition">
                {t.shop}
              </Link>
            </li>
            <li>
              <a href="/about" className="hover:text-[#E5C158] transition">
                {t.about}
              </a>
            </li>
          </ul>
        </div>

        {/* Столбец 3: Информация */}
        <div>
          <h4 className="font-serif font-semibold text-[#E5C158] mb-4 text-base">
            {t.info}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-[#E5C158] transition">
                {t.deliveryInfo}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#E5C158] transition">
                {t.payments}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#E5C158] transition">
                {t.faq}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#E5C158] transition">
                {t.policy}
              </a>
            </li>
          </ul>
        </div>

        {/* Столбец 4: Контакты */}
        <div className="flex flex-col gap-3">
          <h3 className="font-serif font-bold text-lg text-[#D4AF37] mb-1">
            {t.contacts || "Контакты"}
          </h3>

          <ul className="flex flex-col gap-3 text-sm text-[#E6E1DA]">
            {/* Телефон */}
            <li className="flex items-center gap-3 group">
              <Phone
                size={18}
                className="text-[#D4AF37] group-hover:scale-110 transition-transform"
              />
              <a
                href="tel:+998933953096"
                className="hover:text-[#D4AF37] transition-colors duration-200"
              >
                +998 93 395 30 96
              </a>
            </li>

            {/* Электронная почта */}
            <li className="flex items-center gap-3 group">
              <Mail
                size={18}
                className="text-[#D4AF37] group-hover:scale-110 transition-transform"
              />
              <a
                href="mailto:indianstorestore@gmail.com"
                className="hover:text-[#D4AF37] transition-colors duration-200"
              >
                indianstorestore@gmail.com
              </a>
            </li>

            {/* Адрес */}
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#D4AF37] mt-0.5 shrink-0" />
              <span className="cursor-default">
                {t.location || "Ташкент, Узбекистан"}
              </span>
            </li>

            {/* Режим работы */}
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-[#D4AF37]" />
              <span className="cursor-default">
                {t.workHours || "Пн – Сб: 10:00 – 19:00"}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Копирайт */}
      <div className="border-t border-[#FAF8F5]/10 text-center py-4 text-[10px] tracking-wide text-[#FAF8F5]/40">
        © 2026 The Indian Store. {t.rights}
      </div>
    </footer>
  );
}
