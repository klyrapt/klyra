# Generated by Django 5.1.7 on 2025-04-04 07:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('aula', '0001_initial'),
        ('sala', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='aula',
            name='sala',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sala.sala'),
        ),
    ]
