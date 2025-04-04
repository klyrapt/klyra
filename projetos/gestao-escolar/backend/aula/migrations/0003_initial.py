# Generated by Django 5.1.7 on 2025-04-04 07:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('aula', '0002_initial'),
        ('disciplina', '0001_initial'),
        ('escola', '0002_instituicao_inicio_teste_instituicao_plano'),
        ('sala', '0001_initial'),
        ('turma', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='aula',
            name='turma',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='aulas', to='turma.turma'),
        ),
        migrations.AddField(
            model_name='gradehoraria',
            name='disciplina',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='disciplina.disciplina'),
        ),
        migrations.AddField(
            model_name='gradehoraria',
            name='instituicao',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='escola.instituicao'),
        ),
        migrations.AddField(
            model_name='gradehoraria',
            name='professor',
            field=models.ForeignKey(limit_choices_to={'tipo': 'professor'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='gradehoraria',
            name='sala',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sala.sala'),
        ),
        migrations.AddField(
            model_name='gradehoraria',
            name='turma',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='grade_horaria', to='turma.turma'),
        ),
        migrations.AlterUniqueTogether(
            name='aula',
            unique_together={('instituicao', 'sala', 'dia', 'hora_inicio', 'hora_fim')},
        ),
        migrations.AlterUniqueTogether(
            name='gradehoraria',
            unique_together={('turma', 'dia', 'hora_inicio', 'hora_fim')},
        ),
    ]
