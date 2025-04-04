# Generated by Django 5.1.7 on 2025-04-04 07:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('escola', '0002_instituicao_inicio_teste_instituicao_plano'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sala',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('capacidade', models.PositiveIntegerField(blank=True, null=True)),
                ('descricao', models.TextField(blank=True)),
                ('bloco', models.CharField(blank=True, max_length=100)),
                ('instituicao', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='salas', to='escola.instituicao')),
            ],
        ),
    ]
