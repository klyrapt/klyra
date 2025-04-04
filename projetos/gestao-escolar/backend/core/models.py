import random
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from .managers import UserManager


def gerar_codigo_verificacao():
    return str(random.randint(100000, 999999))


class User(AbstractBaseUser, PermissionsMixin):
    tipo = [
        ("admin", "Administrador"),
        ("professor", "Professor"),
        ("aluno", "Aluno"),
        ("pai", "Pai"),
    ]
    email = models.EmailField(unique=True)
    nome = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)  # inativo até confirmar
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    codigo_verificacao = models.CharField(max_length=6, blank=True, null=True)
    tipo = models.CharField(max_length=20, choices=tipo, default='admin')

   

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    
    

    def gerar_novo_codigo(self):
        self.codigo_verificacao = gerar_codigo_verificacao()
        self.save()
