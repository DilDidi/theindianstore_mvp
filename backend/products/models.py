from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)

    # Поля для разных языков
    name_ru = models.CharField(max_length=100, verbose_name="Название (RU)")
    name_uz = models.CharField(max_length=100, verbose_name="Название (UZ)")
    name_en = models.CharField(max_length=100, verbose_name="Название (EN)")

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название товара")
    price = models.IntegerField(verbose_name="Цена (сум)")
    image = models.ImageField(upload_to='products/',
                              verbose_name="Изображение товара")
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='products', verbose_name="Категория")
    description = models.TextField(blank=True, verbose_name="Описание")
    is_bestseller = models.BooleanField(default=False, verbose_name="Хит продаж")

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    def __str__(self):
        return self.name


class ProductVariant(models.Model):
    # Привязываем вариант к конкретному товару
    product = models.ForeignKey(
        Product, related_name='capacities', on_delete=models.CASCADE)
    size = models.CharField(max_length=50)  # Например: "50 мл", "100 мл"
    # Цена именно для этой емкости
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} - {self.size}"


class Banner(models.Model):
    title = models.CharField(max_length=255, blank=True,
                             verbose_name="Заголовок на баннере")
    image = models.ImageField(upload_to='banners/',
                              verbose_name="Изображение баннера")

    class Meta:
        verbose_name = "Баннер"
        verbose_name_plural = "Баннеры"

    def __str__(self):
        return self.title or f"Баннер #{self.id}"
