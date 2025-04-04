from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Plano
from .serializers import PlanoSerializer

class PlanoListView(APIView):
    def get(self, request):
        planos = Plano.objects.all().order_by('id')
        serializer = PlanoSerializer(planos, many=True)
        return Response(serializer.data)
