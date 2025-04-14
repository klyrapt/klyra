from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Matricula, NumeroAluno

@receiver(post_save, sender=Matricula)
def criar_numero_aluno(sender, instance, created, **kwargs):
    if created:
        numero_aluno = NumeroAluno(matricula=instance)
        numero_aluno.save()



