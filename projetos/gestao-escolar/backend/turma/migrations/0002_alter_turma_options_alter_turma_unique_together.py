# Generated by Django 5.1.7 on 2025-04-05 00:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('escola', '0002_instituicao_inicio_teste_instituicao_plano'),
        ('turma', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='turma',
            options={'ordering': ['ano_letivo', 'nome']},
        ),
        migrations.AlterUniqueTogether(
            name='turma',
            unique_together={('nome', 'ano_letivo', 'instituicao')},
        ),
    ]
