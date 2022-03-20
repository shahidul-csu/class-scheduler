# Generated by Django 3.2.7 on 2022-03-20 21:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Classroom',
            fields=[
                ('classroom_id', models.AutoField(primary_key=True, serialize=False)),
                ('capacity', models.IntegerField(default=None)),
            ],
            options={
                'db_table': 'classroom',
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(default=None, max_length=100)),
                ('units', models.IntegerField(default=None)),
                ('number_per_week', models.IntegerField(default=None)),
                ('sync_time', models.BooleanField(default=False)),
                ('capacity', models.IntegerField(default=None)),
            ],
            options={
                'db_table': 'course',
            },
        ),
        migrations.CreateModel(
            name='DayTime',
            fields=[
                ('day_time_id', models.AutoField(primary_key=True, serialize=False)),
                ('time', models.CharField(default=None, max_length=100)),
            ],
            options={
                'db_table': 'day_time',
            },
        ),
        migrations.CreateModel(
            name='ParameterData',
            fields=[
                ('parameter_id', models.AutoField(primary_key=True, serialize=False)),
                ('approved', models.BooleanField(default=False)),
                ('requirement', models.BooleanField(default=False)),
                ('score', models.IntegerField(default=None)),
            ],
            options={
                'db_table': 'parameter_data',
            },
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('schedule_id', models.AutoField(primary_key=True, serialize=False)),
                ('fitness_score', models.IntegerField(default=None)),
            ],
            options={
                'db_table': 'schedule',
            },
        ),
        migrations.CreateModel(
            name='Semester',
            fields=[
                ('semester_id', models.AutoField(primary_key=True, serialize=False)),
                ('year', models.IntegerField(default=None)),
                ('name', models.CharField(default=None, max_length=100)),
                ('duration_weeks', models.IntegerField(default=None)),
            ],
            options={
                'db_table': 'semester',
            },
        ),
        migrations.CreateModel(
            name='TimeSlot',
            fields=[
                ('time_slot_id', models.AutoField(primary_key=True, serialize=False)),
                ('day_time_obj', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.daytime')),
            ],
            options={
                'db_table': 'time_slot',
            },
        ),
        migrations.CreateModel(
            name='WeekDay',
            fields=[
                ('week_day_id', models.AutoField(primary_key=True, serialize=False)),
                ('week_day', models.CharField(default=None, max_length=100)),
            ],
            options={
                'db_table': 'week_day',
            },
        ),
        migrations.CreateModel(
            name='UserTimeParameter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parameter_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.parameterdata')),
                ('time_slot_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.timeslot')),
                ('user_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'user_time_parameter',
            },
        ),
        migrations.CreateModel(
            name='UserGroupClassParameter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parameter_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.parameterdata')),
                ('user_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'user_group_class_parameter',
            },
        ),
        migrations.AddField(
            model_name='timeslot',
            name='week_day_obj',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.weekday'),
        ),
        migrations.CreateModel(
            name='Teaches',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.course')),
                ('semester_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.semester')),
                ('user_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'teaches',
            },
        ),
        migrations.CreateModel(
            name='SemesterParameter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.course')),
                ('parameter_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.parameterdata')),
                ('semester_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.semester')),
            ],
            options={
                'db_table': 'semester_parameter',
            },
        ),
        migrations.CreateModel(
            name='ScheduledCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('classroom_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.classroom')),
                ('course_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.course')),
                ('schedule_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.schedule')),
                ('semester_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.semester')),
                ('time_slot_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.timeslot')),
                ('user_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'scheduled_course',
            },
        ),
        migrations.CreateModel(
            name='CourseTimeParameter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.course')),
                ('parameter_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.parameterdata')),
                ('time_slot_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.timeslot')),
            ],
            options={
                'db_table': 'course_time_parameter',
            },
        ),
        migrations.CreateModel(
            name='ClassroomParameter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('classroom_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.classroom')),
                ('course_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.course')),
                ('parameter_obj', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='ClassSchedulerBackend.parameterdata')),
            ],
            options={
                'db_table': 'classroom_parameter',
            },
        ),
        migrations.AddConstraint(
            model_name='usertimeparameter',
            constraint=models.UniqueConstraint(fields=('user_obj', 'parameter_obj', 'time_slot_obj'), name='unique_user_time_parameter'),
        ),
        migrations.AddConstraint(
            model_name='usergroupclassparameter',
            constraint=models.UniqueConstraint(fields=('user_obj', 'parameter_obj'), name='unique_user_group_class_parameter'),
        ),
        migrations.AddConstraint(
            model_name='teaches',
            constraint=models.UniqueConstraint(fields=('user_obj', 'course_obj', 'semester_obj'), name='unique_teaches'),
        ),
        migrations.AddConstraint(
            model_name='semesterparameter',
            constraint=models.UniqueConstraint(fields=('parameter_obj', 'course_obj', 'semester_obj'), name='unique_semester_parameter'),
        ),
        migrations.AddConstraint(
            model_name='scheduledcourse',
            constraint=models.UniqueConstraint(fields=('schedule_obj', 'user_obj', 'course_obj', 'time_slot_obj', 'semester_obj', 'classroom_obj'), name='unique_scheduled_course'),
        ),
        migrations.AddConstraint(
            model_name='coursetimeparameter',
            constraint=models.UniqueConstraint(fields=('parameter_obj', 'course_obj', 'time_slot_obj'), name='unique_course_time_parameter'),
        ),
        migrations.AddConstraint(
            model_name='classroomparameter',
            constraint=models.UniqueConstraint(fields=('parameter_obj', 'course_obj', 'classroom_obj'), name='unique_classroom_parameter'),
        ),
    ]
