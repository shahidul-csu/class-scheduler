# Generated by Django 3.2.8 on 2023-04-27 04:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ClassSchedulerBackend', '0005_auto_20230410_0624'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='usergroupclassparameter',
            name='unique_user_group_class_parameter',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='courseGroup',
            new_name='course_group',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='Section',
            new_name='section',
        ),
        migrations.AlterField(
            model_name='parameterdata',
            name='approved',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AddConstraint(
            model_name='usergroupclassparameter',
            constraint=models.UniqueConstraint(fields=('user_id', 'parameter_id'), name='unique_user_back_to_back_class_parameter'),
        ),
        migrations.AlterModelTable(
            name='usergroupclassparameter',
            table='user_back_to_back_class',
        ),
    ]
