# Generated by Django 3.2.9 on 2022-01-14 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('showkase_app', '0006_alter_profile_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
