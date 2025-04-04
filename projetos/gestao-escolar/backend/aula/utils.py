
# utils.py (gerador de agendamento baseado na grade semanal)
import datetime
from .models import Aula

DIAS_MAPPING = {
    'seg': 0,
    'ter': 1,
    'qua': 2,
    'qui': 3,
    'sex': 4,
    'sab': 5,
}

def gerar_aulas_semanais(instituicao, turma, data_inicio, data_fim):
    aulas_base = Aula.objects.filter(turma=turma, instituicao=instituicao)
    agendadas = []

    for aula in aulas_base:
        dia_semana = DIAS_MAPPING[aula.dia]
        data_atual = data_inicio

        while data_atual <= data_fim:
            if data_atual.weekday() == dia_semana:
                agendadas.append({
                    "data": data_atual,
                    "hora_inicio": aula.hora_inicio,
                    "hora_fim": aula.hora_fim,
                    "disciplina": aula.disciplina.nome,
                    "professor": aula.professor.nome,
                    "sala": aula.sala.nome
                })
            data_atual += datetime.timedelta(days=1)

    return agendadas
