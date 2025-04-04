# Generated by Django 5.1.7 on 2025-04-04 07:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('matricula', '0001_initial'),
        ('turma', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='matricula',
            name='turma',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='matriculas', to='turma.turma'),
        ),
    ]
