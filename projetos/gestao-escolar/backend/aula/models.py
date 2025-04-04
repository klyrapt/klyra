# models.py (refatorado para Aula com grade semanal)
from django.db import models
from escola.models import Instituicao
from sala.models import Sala
from turma.models import Turma
from disciplina.models import Disciplina
from core.models import User
from datetime import  timedelta

DIAS_SEMANA = (
    ("seg", "Segunda-feira"),
    ("ter", "Terça-feira"),
    ("qua", "Quarta-feira"),
    ("qui", "Quinta-feira"),
    ("sex", "Sexta-feira"),
    ("sab", "Sábado"),
)

TIPO_ATIVIDADE = (
    ('teorica', 'Aula Teórica'),
    ('pratica', 'Aula Prática'),
    ('reuniao', 'Reunião'),
)

class Aula(models.Model):
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE)
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE, related_name="aulas")
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)
    professor = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={"tipo": "professor"})
    sala = models.ForeignKey(Sala, on_delete=models.CASCADE)
    dia = models.CharField(max_length=10, choices=DIAS_SEMANA)
    hora_inicio = models.TimeField()
    hora_fim = models.TimeField()
    tipo = models.CharField(max_length=20, choices=TIPO_ATIVIDADE, default='teorica')

    class Meta:
        unique_together = ('instituicao', 'sala', 'dia', 'hora_inicio', 'hora_fim')

    
    


    @classmethod
    def gerar_aulas_semanais(cls, turma, data_inicio, data_fim):
        dias_grade = turma.grades.all()
        aulas_criadas = []

        data_atual = data_inicio
        while data_atual <= data_fim:
            dia_semana = data_atual.strftime('%a').lower()[:3]

            for grade in dias_grade:
                if grade.dia == dia_semana:
                    aula = cls.objects.create(
                        turma=turma,
                        disciplina=grade.disciplina,
                        sala=grade.sala,
                        professor=grade.professor,
                        instituicao=turma.instituicao,
                        data=data_atual,
                        hora_inicio=grade.hora_inicio,
                        hora_fim=grade.hora_fim,
                        tipo=grade.tipo,
                    )
                    aulas_criadas.append(aula)

            data_atual += timedelta(days=1)

        return aulas_criadas
    

    def __str__(self):
        return f"{self.turma.nome} - {self.disciplina.nome} ({self.dia} {self.hora_inicio}-{self.hora_fim})"




DIAS_SEMANA = (
    ("seg", "Segunda-feira"),
    ("ter", "Terça-feira"),
    ("qua", "Quarta-feira"),
    ("qui", "Quinta-feira"),
    ("sex", "Sexta-feira"),
    ("sab", "Sábado"),
)

TIPO_ATIVIDADE = (
    ('teorica', 'Aula Teórica'),
    ('pratica', 'Aula Prática'),
    ('reuniao', 'Reunião'),
)

class GradeHoraria(models.Model):
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE, related_name="grade_horaria")
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)
    professor = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={"tipo": "professor"})
    sala = models.ForeignKey(Sala, on_delete=models.CASCADE)
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE)
    dia = models.CharField(max_length=10, choices=DIAS_SEMANA)
    hora_inicio = models.TimeField()
    hora_fim = models.TimeField()
    tipo = models.CharField(max_length=20, choices=TIPO_ATIVIDADE, default='teorica')

    class Meta:
        unique_together = ('turma', 'dia', 'hora_inicio', 'hora_fim')

    def __str__(self):
        return f"{self.turma} - {self.disciplina} ({self.dia} {self.hora_inicio} - {self.hora_fim})"