# Generated by Django 5.1.7 on 2025-04-06 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disciplina', '0001_initial'),
        ('professor', '0002_professor_ativo_professor_bairro_professor_cidade_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='disciplina',
            name='professores',
            field=models.ManyToManyField(related_name='disciplinas', to='professor.professor'),
        ),
    ]
