from django.db import models
from django.contrib.auth.models import User


class DayTime(models.Model):
    day_time_id = models.AutoField(primary_key=True)
    time = models.CharField(default=None, max_length=100)


class WeekDay(models.Model):
    week_day_id = models.AutoField(primary_key=True)
    week_day = models.CharField(default=None)


class Classroom(models.Model):
    classroom_id = models.AutoField(primary_key=True)
    capacity = models.IntegerField(default=None)


class Semester(models.Model):
    semester_id = models.AutoField(primary_key=True)
    year = models.IntegerField(default=None)
    name = models.CharField(default=None, max_length=100)
    duration_weeks = models.IntegerField(default=None)


class ParameterData(models.Model):
    parameter_id = models.AutoField(primary_key=True)
    approved = models.BooleanField(default=False)
    requirement = models.BooleanField(default=False)
    score = models.IntegerField(default=None)


class TimeSlot(models.Model):
    time_slot_id = models.AutoField(primary_key=True)
    week_day_obj = models.ForeignKey(WeekDay, null=True, default=None)
    # week_day_objs = models.ManyToManyField(WeekDay, blank=True)
    day_time_obj = models.ForeignKey(DayTime, null=True, default=None)
    # day_time_objs = models.ManyToManyField(WeekDay, blank=True)


class UserGroupClassParameter(models.Model):
    user_obj = models.ForeignKey(User, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    parameter_obj = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    # parameter_objs = models.ManyToManyField(WeekDay, blank=True)


# should param/timeslots have many to many fields?
class UserTimeParameter(models.Model):
    user_obj = models.ForeignKey(User, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    parameter_obj = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    time_slot_obj = models.ForeignKey(TimeSlot, primary_key=True, null=True, default=None)


class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    name = models.CharField(default=None, max_length=100)
    units = models.IntegerField(default=None)
    number_per_week = models.IntegerField(default=None)
    # sync_time = models.DateTimeField()
    capacity = models.IntegerField(default=None)


class Teaches(models.Model):
    user_obj = models.ForeignKey(User, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    course_obj = models.ForeignKey(Course, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    # course_objs = models.ManyToManyField(Course, blank=True)
    semester_obj = models.ForeignKey(Semester, primary_key=True, null=True, default=None, on_delete=models.CASCADE)


class Schedule(models.Model):
    schedule_id = models.AutoField(primary_key=True)
    fitness_score = models.IntegerField(default=None)


class ScheduledCourse(models.Model):
    schedule_obj = models.ForeignKey(Schedule, primary_key=True, null=True, default=None)
    user_obj = models.ForeignKey(User, primary_key=True, null=True, default=None)
    course_obj = models.ForeignKey(Course, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    time_slot_obj = models.ForeignKey(TimeSlot, primary_key=True, null=True, default=None)
    # time_slot_objs = models.ManyToManyField(TimeSlot, blank=True)
    semester_obj= models.ForeignKey(Semester, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    classroom_obj = models.ForeignKey(Classroom, primary_key=True, null=True, default=None)


class CourseTimeParameter(models.Model):
    parameter_obj = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    course_obj = models.ForeignKey(Course, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    time_slot_obj = models.ForeignKey(TimeSlot, primary_key=True, null=True, default=None)
    # time_slot_objs =models.ManyToManyField(TimeSlot, blank=True)


class ClassroomParameter(models.Model):
    parameter_obj = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    # parameter_objs = models.ManyToManyField(ParameterData, blank=True)
    course_obj = models.ForeignKey(Course, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    # course_objs = models.ManyToManyField(Course, blank=True)
    classroom_obj = models.ForeignKey(Classroom, primary_key=True, null=True, default=None)


class SemesterParameter(models.Model):
    # parameter_objs = models.ManyToManyField(ParameterData, blank=True)
    parameter_obj = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    # course_objs = models.ManyToManyField(Course, blank=True)
    course_obj = models.ForeignKey(Course, primary_key=True, null=True, default=None, on_delete=models.CASCADE)
    semester_obj = models.ForeignKey(Semester, primary_key=True, null=True, default=None, on_delete=models.CASCADE)

