from django.contrib import admin
from .models import Plano

@admin.register(Plano)
class PlanoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'preco', 'preco_anual', 'tipo', 'moeda', 'destaque', 'personalizado')
    list_filter = ('tipo', 'moeda', 'destaque', 'teste_gratis')
    search_fields = ('nome', 'descricao', 'recursos')
    ordering = ('ordem',)
