# Generated by Django 5.1.7 on 2025-03-31 21:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('disciplina', '0001_initial'),
        ('escola', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Nivel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('descricao', models.TextField(blank=True)),
                ('instituicao', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='niveis', to='escola.instituicao')),
            ],
        ),
        migrations.CreateModel(
            name='GradeCurricular',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('carga_horaria', models.PositiveIntegerField(help_text='Carga horária semanal (em horas)')),
                ('disciplina', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='disciplinas', to='disciplina.disciplina')),
                ('nivel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='grades', to='nivel.nivel')),
            ],
        ),
    ]
