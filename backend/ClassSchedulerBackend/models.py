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

    parameter_id = models.AutoField(primary_key=True)
    approved = models.BooleanField(default=False)
    requirement = models.BooleanField(default=False)
    score = models.IntegerField(default=None)


class TimeSlot(models.Model):
    class Meta:
        db_table = 'time_slot'

    time_slot_id = models.AutoField(primary_key=True)
    week_day_obj = models.ForeignKey(WeekDay, null=True, default=None, on_delete=models.CASCADE)
    day_time_obj = models.ForeignKey(DayTime, null=True, default=None, on_delete=models.CASCADE)


class UserGroupClassParameter(models.Model):
    class Meta:
        db_table = 'user_group_class_parameter'
        constraints = [
            models.UniqueConstraint(fields=['user_obj', 'parameter_obj'], name='unique_user_group_class_parameter')
        ]

    user_obj = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    parameter_obj = models.ForeignKey(ParameterData, default=None, on_delete=models.CASCADE)


class UserTimeParameter(models.Model):
    class Meta:
        db_table = 'user_time_parameter'
        constraints = [
            models.UniqueConstraint(fields=['user_obj', 'parameter_obj', 'time_slot_obj'],
                                    name='unique_user_time_parameter')
        ]

    user_obj = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    parameter_obj = models.ForeignKey(ParameterData, default=None, on_delete=models.CASCADE)
    time_slot_obj = models.ForeignKey(TimeSlot, default=None, on_delete=models.CASCADE)


class Course(models.Model):
    class Meta:
        db_table = 'course'

    course_id = models.AutoField(primary_key=True)
    name = models.CharField(default=None, max_length=100)
    units = models.IntegerField(default=None)
    number_per_week = models.IntegerField(default=None)
    sync_time = models.BooleanField(default=False)
    capacity = models.IntegerField(default=None)


class Teaches(models.Model):
    class Meta:
        db_table = 'teaches'
        constraints = [
            models.UniqueConstraint(fields=['user_obj', 'course_obj', 'semester_obj'],
                                    name='unique_teaches')
        ]

    user_obj = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    course_obj = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    semester_obj = models.ForeignKey(Semester, default=None, on_delete=models.CASCADE)


class Schedule(models.Model):
    class Meta:
        db_table = 'schedule'

    schedule_id = models.AutoField(primary_key=True)
    fitness_score = models.IntegerField(default=None)


class ScheduledCourse(models.Model):
    class Meta:
        db_table = 'scheduled_course'
        constraints = [
            models.UniqueConstraint(fields=['schedule_obj', 'user_obj', 'course_obj', 'time_slot_obj', 'semester_obj',
                                            'classroom_obj'],
                                    name='unique_scheduled_course')
        ]

    schedule_obj = models.ForeignKey(Schedule, default=None, on_delete=models.CASCADE)
    user_obj = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    course_obj = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    time_slot_obj = models.ForeignKey(TimeSlot, default=None, on_delete=models.CASCADE)
    semester_obj= models.ForeignKey(Semester, default=None, on_delete=models.CASCADE)
    classroom_obj = models.ForeignKey(Classroom, default=None, on_delete=models.CASCADE)


class CourseTimeParameter(models.Model):
    class Meta:
        db_table = 'course_time_parameter'
        constraints = [
            models.UniqueConstraint(fields=['parameter_obj', 'course_obj', 'time_slot_obj'],
                                    name='unique_course_time_parameter')
        ]

    parameter_obj = models.ForeignKey(ParameterData, default=None, on_delete=models.CASCADE)
    course_obj = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    time_slot_obj = models.ForeignKey(TimeSlot, default=None, on_delete=models.CASCADE)


class ClassroomParameter(models.Model):
    class Meta:
        db_table = 'classroom_parameter'
        constraints = [
            models.UniqueConstraint(fields=['parameter_obj', 'course_obj', 'classroom_obj'],
                                    name='unique_classroom_parameter')
        ]

    parameter_obj = models.ForeignKey(ParameterData, default=None, on_delete=models.CASCADE)
    course_obj = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    classroom_obj = models.ForeignKey(Classroom, default=None, on_delete=models.CASCADE)


class SemesterParameter(models.Model):
    class Meta:
        db_table = 'semester_parameter'
        constraints = [
            models.UniqueConstraint(fields=['parameter_obj', 'course_obj', 'semester_obj'],
                                    name='unique_semester_parameter')
        ]

    parameter_obj = models.ForeignKey(ParameterData, default=None, on_delete=models.CASCADE)
    course_obj = models.ForeignKey(Course, default=None, on_delete=models.CASCADE)
    semester_obj = models.ForeignKey(Semester, default=None, on_delete=models.CASCADE)