# from django.contrib import admin
# from .models import Product, Category, Banner

# admin.site.register(Product)
# admin.site.register(Category)
# admin.site.register(Banner)

from django.contrib import admin
from .models import Category, Product, ProductVariant, Banner

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'name_ru', 'name_uz', 'name_en']

# Блок для добавления емкостей внутри товара
class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1 # Сколько пустых строчек показывать для добавления

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'category', 'is_bestseller']
    search_fields = ['name', 'name_ru', 'name_uz', 'name_en']    
    inlines = [ProductVariantInline]

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']