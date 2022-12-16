from django.db import models
from django.contrib.auth.models import User


class DayTime(models.Model):
    class Meta:
        db_table = 'day_time'

    day_time_id = models.AutoField(primary_key=True)
    time = models.CharField(default=None, max_length=100)


class WeekDay(models.Model):
    class Meta:
        db_table = 'week_day'

    week_day_id = models.AutoField(primary_key=True)
    week_day = models.CharField(default=None, max_length=100)


class Classroom(models.Model):
    class Meta:
        db_table = 'classroom'

    classroom_id = models.AutoField(primary_key=True)
    classroom_name = models.CharField(default=None, max_length=100)
    capacity = models.IntegerField(default=None)


class Semester(models.Model):
    class Meta:
        db_table = 'semester'

    semester_id = models.AutoField(primary_key=True)
    year = models.IntegerField(default=None)
    name = models.CharField(default=None, max_length=100)
    duration_weeks = models.IntegerField(default=None)


class ParameterData(models.Model):
    class Meta:
        db_table = 'parameter_data'

        # this is only allowing one entry in the DB. other entires were rejected
        # constraints = [
        #     models.UniqueConstraint(
        #         fields=['parameter_id', 'approved', 'requirement'], name='unique_parameter_data')
        # ]

    parameter_id = models.AutoField(primary_key=True)
    approved = models.BooleanField(default=False)
    requirement = models.BooleanField(default=False)
    score = models.IntegerField(default=None)
    semester_id = models.ForeignKey(
        Semester, null=True, default=None, on_delete=models.CASCADE)


class TimeSlot(models.Model):
    class Meta:
        db_table = 'time_slot'

    time_slot_id = models.AutoField(primary_key=True)
    week_day_id = models.ForeignKey(
        WeekDay, null=True, default=None, on_delete=models.CASCADE)
    day_time_id = models.ForeignKey(
        DayTime, null=True, default=None, on_delete=models.CASCADE)


class UserGroupClassParameter(models.Model):
    class Meta:
        db_table = 'user_group_class_parameter'
        constraints = [
            models.UniqueConstraint(
                fields=['user_id', 'parameter_id'], name='unique_user_group_class_parameter')
        ]

    user_id = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    parameter_id = models.ForeignKey(
        ParameterData, default=None, on_delete=models.CASCADE)


class UserTimeParameter(models.Model):
    class Meta:
        db_table = 'user_time_parameter'
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'parameter_id', 'time_slot_id'],
                                    name='unique_user_time_parameter')
        ]

    user_id = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    parameter_id = models.ForeignKey(
        ParameterData, default=None, on_delete=models.CASCADE)
    time_slot_id = models.ForeignKey(
        TimeSlot, default=None, on_delete=models.CASCADE)


class Course(models.Model):
    class Meta:
        db_table = 'course'

    course_id = models.AutoField(primary_key=True)
    name = models.CharField(default=None, max_length=100)
    units = models.IntegerField(default=None)
    number_per_week = models.IntegerField(default=None)
    sync_time = models.BooleanField(default=False)
    capacity = models.IntegerField(default=None)
    courseGroup = models.CharField(default=None, max_length=100)
    Section = models.CharField(default=None, max_length=100)


class Teaches(models.Model):
    class Meta:
        db_table = 'teaches'
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'course_id', 'semester_id'],
                                    name='unique_teaches')
        ]

    user_id = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    course_id = models.ForeignKey(
        Course, default=None, on_delete=models.CASCADE)
    semester_id = models.ForeignKey(
        Semester, default=None, on_delete=models.CASCADE)


class Schedule(models.Model):
    class Meta:
        db_table = 'schedule'

    schedule_id = models.AutoField(primary_key=True)
    fitness_score = models.IntegerField(default=None)


class ScheduledCourse(models.Model):
    class Meta:
        db_table = 'scheduled_course'
        constraints = [
            models.UniqueConstraint(fields=['schedule_id', 'user_id', 'course_id', 'time_slot_id', 'semester_id',
                                            'classroom_id'],
                                    name='unique_scheduled_course')
        ]

    schedule_id = models.ForeignKey(
        Schedule, default=None, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    course_id = models.ForeignKey(
        Course, default=None, on_delete=models.CASCADE)
    time_slot_id = models.ForeignKey(
        TimeSlot, default=None, on_delete=models.CASCADE)
    semester_id = models.ForeignKey(
        Semester, default=None, on_delete=models.CASCADE)
    classroom_id = models.ForeignKey(
        Classroom, default=None, on_delete=models.CASCADE)


class CourseTimeParameter(models.Model):
    class Meta:
        db_table = 'course_time_parameter'
        constraints = [
            models.UniqueConstraint(fields=['parameter_id', 'course_id', 'time_slot_id'],
                                    name='unique_course_time_parameter')
        ]

    parameter_id = models.ForeignKey(
        ParameterData, default=None, on_delete=models.CASCADE)
    course_id = models.ForeignKey(
        Course, default=None, on_delete=models.CASCADE)
    time_slot_id = models.ForeignKey(
        TimeSlot, default=None, on_delete=models.CASCADE)


class ClassroomParameter(models.Model):
    class Meta:
        db_table = 'classroom_parameter'
        constraints = [
            models.UniqueConstraint(fields=['parameter_id', 'course_id', 'classroom_id'],
                                    name='unique_classroom_parameter')
        ]

    parameter_id = models.ForeignKey(
        ParameterData, default=None, on_delete=models.CASCADE)
    course_id = models.ForeignKey(
        Course, default=None, on_delete=models.CASCADE)
    classroom_id = models.ForeignKey(
        Classroom, default=None, on_delete=models.CASCADE)


class SemesterParameter(models.Model):
    class Meta:
        db_table = 'semester_parameter'
        constraints = [
            models.UniqueConstraint(fields=['parameter_id', 'course_id', 'semester_id'],
                                    name='unique_semester_parameter')
        ]

    parameter_id = models.ForeignKey(
        ParameterData, default=None, on_delete=models.CASCADE)
    course_id = models.ForeignKey(
        Course, default=None, on_delete=models.CASCADE)
    semester_id = models.ForeignKey(
        Semester, default=None, on_delete=models.CASCADE)
