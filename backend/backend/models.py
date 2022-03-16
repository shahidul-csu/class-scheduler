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
    week_day = models.CharField(default=None)


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
    week_day_obj = models.ForeignKey(WeekDay, null=True, default=None)
    day_time_obj = models.ForeignKey(DayTime, null=True, default=None)


class UserGroupClassParameter(models.Model):
    class Meta:
        db_table = 'user_group_class_parameter'

    user_obj = models.ForeignKey(User, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    parameter_obj = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)


class UserTimeParameter(models.Model):
    class Meta:
        db_table = 'user_time_parameter'

    user_obj = models.ForeignKey(User, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    parameter_obj = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    time_slot_obj = models.ForeignKey(TimeSlot, primary_key=True, null=True, default=None)


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

    user_obj = models.ForeignKey(User, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    course_obj = models.ForeignKey(Course, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    semester_obj = models.ForeignKey(Semester, primary_key=True, null=True, default=None, on_delete=models.CASCADE)


class Schedule(models.Model):
    class Meta:
        db_table = 'schedule'

    schedule_id = models.AutoField(primary_key=True)
    fitness_score = models.IntegerField(default=None)


class ScheduledCourse(models.Model):
    class Meta:
        db_table = 'scheduled_course'

    schedule_obj = models.ForeignKey(Schedule, primary_key=True, null=True, default=None)
    user_obj = models.ForeignKey(User, primary_key=True, null=True, default=None)
    course_obj = models.ForeignKey(Course, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    time_slot_obj = models.ForeignKey(TimeSlot, primary_key=True, null=True, default=None)
    semester_obj= models.ForeignKey(Semester, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    classroom_obj = models.ForeignKey(Classroom, primary_key=True, null=True, default=None)


class CourseTimeParameter(models.Model):
    class Meta:
        db_table = 'course_time_parameter'

    parameter_obj = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    course_obj = models.ForeignKey(Course, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    time_slot_obj = models.ForeignKey(TimeSlot, primary_key=True, null=True, default=None)


class ClassroomParameter(models.Model):
    class Meta:
        db_table = 'classroom_parameter'

    parameter_obj = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    course_obj = models.ForeignKey(Course, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    classroom_obj = models.ForeignKey(Classroom, primary_key=True, null=True, default=None)


class SemesterParameter(models.Model):
    class Meta:
        db_table = 'semester_parameter'

    parameter_obj = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    course_obj = models.ForeignKey(Course, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    semester_obj = models.ForeignKey(Semester, primary_key=True, null=True, default=None, on_delete=models.CASCADE)

