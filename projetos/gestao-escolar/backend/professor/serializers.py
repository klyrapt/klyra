from rest_framework import serializers
from professor.models import Professor
from core.models import User
from ensino.models import Ensino


class ProfessorSerializer(serializers.ModelSerializer):
    usuario_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(tipo="professor"), source="usuario", write_only=True)
    nome = serializers.CharField(source="usuario.nome", read_only=True)
    email = serializers.EmailField(source="usuario.email", read_only=True)
    
    disciplinas_atribuidas = serializers.SerializerMethodField()
    turmas_atribuidas = serializers.SerializerMethodField()

    class Meta:
        model = Professor
        fields = [
            "id", "usuario_id", "nome", "email", "instituicao",
            "formacao", "especializacao", "biografia", "foto",
            "telefone", "data_nascimento", "genero",
            "nacionalidade", "naturalidade",
            "endereco_completo", "bairro", "cidade", "codigo_postal",
            "data_admissao", "regime_trabalho", "ativo", "usuario",
            "disciplinas_atribuidas", "turmas_atribuidas"
        ]
        read_only_fields = ["id"]

    def get_disciplinas_atribuidas(self, obj):
        disciplinas = Ensino.objects.filter(professor=obj).values_list("disciplina__nome", flat=True).distinct()
        return list(disciplinas)

    def get_turmas_atribuidas(self, obj):
        turmas = Ensino.objects.filter(professor=obj).values_list("turma__nome", flat=True).distinct()
        return list(turmas)

    def validate_usuario(self, usuario):
        if Professor.objects.filter(usuario=usuario).exists():
            raise serializers.ValidationError("Este usuário já está vinculado a um professor.")
        if usuario.tipo != "professor":
            raise serializers.ValidationError("O usuário selecionado não é do tipo professor.")
        return usuario

    def create(self, validated_data):
        user = self.context["request"].user

        if not hasattr(user, "instituicao"):
            raise serializers.ValidationError("Você não tem permissão para criar professores.")

        validated_data["instituicao"] = user.instituicao
        return super().create(validated_data)
