from rest_framework import serializers
from .models import Ensino
from escola.models import Instituicao


class EnsinoSerializer(serializers.ModelSerializer):
    professor_nome = serializers.SerializerMethodField()
    disciplina_nome = serializers.SerializerMethodField()
    turma_nome = serializers.SerializerMethodField()

    class Meta:
        model = Ensino
        fields = ['id', 'professor', 'professor_nome', 'disciplina', 'disciplina_nome', 'turma', 'turma_nome']



    
    
    def get_professor_nome(self, obj):
        return obj.professor.usuario.get_full_name()

    def get_disciplina_nome(self, obj):
        return obj.disciplina.nome

    def get_turma_nome(self, obj):
        return str(obj.turma)

    def validate(self, data):
        user = self.context['request'].user
        def get_instituicao_do_admin(user):
            return Instituicao.objects.filter(admin=user).first()

        instituicao = get_instituicao_do_admin(user)
       

        if not instituicao:
            raise serializers.ValidationError("Usuário não está vinculado a nenhuma instituição.")

        if data['professor'].instituicao != instituicao:
            raise serializers.ValidationError("Professor não pertence à sua instituição.")

        if data['disciplina'].instituicao != instituicao:
            raise serializers.ValidationError("Disciplina não pertence à sua instituição.")

        if data['turma'].instituicao != instituicao:
            raise serializers.ValidationError("Turma não pertence à sua instituição.")

        return data
