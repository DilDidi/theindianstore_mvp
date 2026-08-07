import React from "react";
import { useLangStore } from "../store/useLangStore";
import { Leaf, ShieldCheck, Headphones, HeartHandshake } from "lucide-react";

export default function Features() {
  const { t } = useLangStore();

  // Иконки для каждого блока
  const icons = [<Leaf />, <ShieldCheck />, <Headphones />, <HeartHandshake />];

  return (
    <div className="bg-[#F9F4EE] py-12 border-y border-[#E6E1DA]">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {t.features?.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="text-[#2C5234] mt-1">{icons[index]}</div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
