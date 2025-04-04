from rest_framework import serializers
from aula.models import Aula
from .models import GradeHoraria


class AulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aula
        fields = "__all__"





class GradeHorariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradeHoraria
        fields = '__all__'
