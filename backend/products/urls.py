from django.urls import path
from .views import product_list, product_detail, category_list, banner_list, get_bestsellers

urlpatterns = [
    path('', product_list),
    path('<int:pk>/', product_detail),
    path('categories/', category_list),
    path('banners/', banner_list),
    path('bestsellers/', get_bestsellers, name='bestsellers'),
]