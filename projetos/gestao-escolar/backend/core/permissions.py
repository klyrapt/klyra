from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAuthenticatedAndReadOnly(BasePermission):
    """
    Permite apenas leitura para usuários autenticados.
    """
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS and request.user and request.user.is_authenticated
        )


class AllowListCreateOnly(BasePermission):
    """
    Permite apenas métodos GET (listagem) e POST (criação).
    """
    def has_permission(self, request, view):
        return request.method in ["GET", "POST"] and request.user.is_authenticated


class AdminOnly(BasePermission):
    """
    Permissão apenas para administradores da escola (is_staff=True).
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True
        return request.user.is_authenticated and request.user.tipo == "admin"
    


class IsOwnerOrReadOnly(BasePermission):
    """
    Permite edição apenas se o usuário for o dono do recurso.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj == request.user





class IsAluno(BasePermission):
    """
    Permite acesso apenas se o usuário estiver associado ao modelo Aluno.
    """
    def has_permission(self, request, view):
        return hasattr(request.user, "aluno")




class IsProfessor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.tipo == "professor"


class IsResponsavel(BasePermission):
    """
    Permite acesso apenas se o usuário estiver associado ao modelo Pai/Mãe.
    """
    def has_permission(self, request, view):
        return hasattr(request.user, "responsavel")


class IsDonoDaEscola(BasePermission):
    """
    Permite acesso se o usuário for o administrador da instituição.
    Exige que o modelo Instituicao tenha um campo como: admin = ForeignKey(User)
    """
    def has_permission(self, request, view):
        return hasattr(request.user, "instituicao")  # Ex: user.instituicao para escola que ele administra
