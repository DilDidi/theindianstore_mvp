from rest_framework import serializers
from django.db import transaction
from products.models import Product
from .models import Order, OrderItem
from .services import send_telegram_order_notification


class OrderItemInputSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)
    size = serializers.CharField(required=False, allow_blank=True, allow_null=True)


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemInputSerializer(many=True, write_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'first_name', 'last_name', 'phone',
            'address', 'payment_method', 'total_price', 'items'
        ]
        read_only_fields = ['total_price']

    def create(self, validated_data):
        items_data = validated_data.pop('items')

        with transaction.atomic():
            order = Order.objects.create(**validated_data, total_price=0)
            total_price = 0

            for item_data in items_data:
                product_id = item_data.get('product_id') or item_data.get('id')

                if not product_id:
                    raise serializers.ValidationError(
                        "Укажите корректный id товара")

                product = Product.objects.get(id=product_id)
                qty = item_data['quantity']
                size = item_data.get('size') or "Стандарт"

                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=qty,
                    price=product.price,
                    size=size
                )
                total_price += product.price * qty

            order.total_price = total_price
            order.save()

        transaction.on_commit(lambda: send_telegram_order_notification(order))
        return order
