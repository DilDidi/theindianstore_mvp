import requests
from django.conf import settings

def send_telegram_order_notification(order):
    token = settings.TELEGRAM_BOT_TOKEN
    chat_id = settings.TELEGRAM_CHAT_ID
    
    if not token or not chat_id:
        print("Ошибка: Настройки Telegram не найдены в .env")
        return False

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    
    payment_map = {'cash': '💵 Наличными', 'transfer': '💳 Перевод'}
    
    items_text = ""
    for item in order.items.all():        
        size_text = f" ({item.size})" if hasattr(item, 'size') and item.size else ""        
        items_text += f"- {item.product.name}{size_text} x{item.quantity} — {item.price * item.quantity:,} сум\n"
        
    message = (
        f"🛒 **НОВЫЙ ЗАКАЗ №{order.id}**\n\n"
        f"👤 **Клиент:** {order.first_name} {order.last_name}\n"
        f"📞 **Телефон:** {order.phone}\n"
        f"📍 **Адрес:** {order.address}\n"
        f"💳 **Оплата:** {payment_map.get(order.payment_method, order.payment_method)}\n\n"
        f"📦 **Товары:**\n{items_text}\n"
        f"💰 **ИТОГО:** **{order.total_price:,} сум**"
    )
    
    try:
        requests.post(url, json={"chat_id": chat_id, "text": message, "parse_mode": "Markdown"}, timeout=10)
    except Exception as e:
        print(f"Ошибка отправки сообщения боту: {e}")