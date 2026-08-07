from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Category, Banner
from .serializers import ProductSerializer, CategorySerializer

@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        return Response(ProductSerializer(product).data)
    except Product.DoesNotExist:
        return Response({'detail': 'Товар не найден'}, status=404)

@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()
    return Response(CategorySerializer(categories, many=True).data)

@api_view(['GET'])
def banner_list(request):
    banners = Banner.objects.all()
    # Так как модель простая, отдадим только ссылки на картинки списком
    return Response([request.build_absolute_uri(b.image.url) for b in banners])

@api_view(['GET'])
def get_bestsellers(request):
    # Берем только те товары, у которых is_bestseller=True, и ограничиваем до 4 штук
    bestsellers = Product.objects.filter(is_bestseller=True)[:4]
    serializer = ProductSerializer(bestsellers, many=True)
    return Response(serializer.data)