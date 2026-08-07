import React, { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { useLangStore } from "../store/useLangStore";
import API from "../api/axios";

export default function Checkout() {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const { t } = useLangStore();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    payment_method: "cash",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      items: cart.map((i) => ({
        product_id: i.id,
        quantity: i.quantity,
        size: i.selectedSize || i.size || "Стандарт",
      })),
    };
    try {
      await API.post("orders/", payload);
      clearCart();
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании заказа.");
    }
  };

  if (success)
    return (
      <div className="text-center py-20 px-4 min-h-screen">
        <h2 className="text-3xl font-serif font-bold text-[#2C5234] mb-2">
          {t.thanks}
        </h2>
        <p className="text-gray-600">{t.managerContact}</p>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto px-4 py-10 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border border-[#E6E1DA] space-y-4 shadow-sm"
      >
        <h2 className="text-xl font-serif font-bold text-[#2C5234]">
          {t.order}
        </h2>
        <input
          required
          type="text"
          placeholder={t.name}
          className="w-full p-2 border border-[#E6E1DA] rounded"
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder={t.lastName}
          className="w-full p-2 border border-[#E6E1DA] rounded"
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
        />
        <input
          required
          type="tel"
          placeholder={t.phone}
          className="w-full p-2 border border-[#E6E1DA] rounded"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <textarea
          required
          placeholder={t.address}
          className="w-full p-2 border border-[#E6E1DA] rounded"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <select
          className="w-full p-2 border border-[#E6E1DA] rounded bg-white"
          onChange={(e) => setForm({ ...form, payment_method: e.target.value })}
        >
          <option value="cash">{t.cash}</option>
          <option value="transfer">{t.transfer}</option>
        </select>
        <button
          type="submit"
          className="w-full bg-[#2C5234] hover:bg-[#234229] text-white py-3 rounded-full font-bold transition"
        >
          {t.sendOrder} ({getTotalPrice().toLocaleString()} {t.currency})
        </button>
      </form>
    </div>
  );
}
