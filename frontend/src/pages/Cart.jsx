import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useLangStore } from '../store/useLangStore';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCartStore();
  const { t } = useLangStore();

  if (cart.length === 0) return <div className="text-center py-20 font-serif text-xl text-gray-500">{t.empty}</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 min-h-screen">
      <h2 className="text-2xl font-serif font-bold text-[#2C5234] mb-6">{t.cart}</h2>
      <div className="space-y-4 bg-white p-6 rounded-xl border border-[#E6E1DA]">
        {cart.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#FAF8F5] pb-4">
            <div>
              <h4 className="font-semibold text-gray-800">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.price.toLocaleString()} {t.currency}</p>
            </div>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-50">-</button>
                <span className="px-3 text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-50">+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs hover:underline">Удалить</button>
            </div>
          </div>
        ))}
        <div className="pt-4 flex justify-between font-bold text-lg text-gray-800">
          <span>{t.total}:</span>
          <span>{getTotalPrice().toLocaleString()} {t.currency}</span>
        </div>
        <Link to="/checkout" className="block text-center w-full bg-[#2C5234] hover:bg-[#234229] text-white py-3 rounded-full font-medium transition mt-6">{t.order}</Link>
      </div>
    </div>
  );
}