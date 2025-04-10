# Generated by Django 5.1.7 on 2025-04-04 07:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('escola', '0002_instituicao_inicio_teste_instituicao_plano'),
        ('nivel', '0001_initial'),
        ('professor', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Turma',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('ano_letivo', models.PositiveIntegerField()),
                ('instituicao', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='turmas', to='escola.instituicao')),
                ('nivel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='turmas', to='nivel.nivel')),
                ('professores', models.ManyToManyField(blank=True, to='professor.professor')),
            ],
        ),
    ]
