from django.db import models
from products.models import Product

class Order(models.Model):
    PAYMENT_METHODS = [('cash', 'Cash'), ('transfer', 'Transfer')]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    total_price = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)    

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        return f"Заказ #{self.id} — {self.first_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.IntegerField()
    size = models.CharField(max_length=50, default="Стандарт")