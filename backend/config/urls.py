from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.http import FileResponse, Http404
from pathlib import Path


def serve_media(request, path):
    file_path = Path(settings.MEDIA_ROOT) / path

    if not file_path.is_file():
        raise Http404("File not found")

    return FileResponse(open(file_path, "rb"))


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/products/", include("products.urls")),
    path("api/orders/", include("orders.urls")),
    path("media/<path:path>", serve_media),
]