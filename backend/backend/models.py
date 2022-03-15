from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(default=None, max_length=100)
    first_name = models.CharField(default=None, max_length= 100)
    last_name = models.CharField(default=None, max_length=100)
    email = models.CharField(default=None, max_length=100)
    password = models.CharField(default=None, max_length=100)
    # groups =
    # user_permissions =
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    last_login = models.DateTimeField()
    date_joined = models.DateField(auto_now_add=True)

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
    week_day_id = models.ForeignKey(WeekDay, primary_key=True, null=True, default=None)
    day_time_id = models.ForeignKey(DayTime, primary_key=True, null=True, default=None)


class UserGroupClassParameter(models.Model):
    user_id = models.ForeignKey(User, primary_key=True, null=True, default=None)
    parameter_id = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)

class UserTimeParameter(models.Model):
    user_id = models.ForeignKey(User, primary_key=True, null=True, default=None)
    parameter_id = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    time_slot_id = models.ForeignKey(TimeSlot, primary_key=True, null=True, default=None)

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    name = models.CharField(default=None, max_length=100)
    units = models.IntegerField(default=None)
    number_per_week = models.IntegerField(default=None)
    # sync_time = models.DateTimeField()
    capacity = models.IntegerField(default=None)

class Teaches(models.Model):
    user_id = models.ForeignKey(User, primary_key=True, null=True, default=None)
    course_id = models.ForeignKey(Course, primary_key=True, null=True, default=None)
    semester_id = models.ForeignKey(Semester, primary_key=True, null=True, default=None)

class Schedule(models.Model):
    schedule_id = models.AutoField(primary_key=True)
    fitness_score = models.IntegerField(default=None)

class ScheduledCourse(models.Model):
    schedule_id = models.ForeignKey(Schedule, primary_key=True, null=True, default=None)
    user_id = models.ForeignKey(User, primary_key=True, null=True, default=None)
    course_id = models.ForeignKey(Course, primary_key=True, null=True, default=None)
    time_slot_id = models.ForeignKey(TimeSlot, primary_key=True, null=True, default=None)
    semester_id = models.ForeignKey(Semester, primary_key=True, null=True, default=None)
    classroom_id = models.ForeignKey(Classroom, primary_key=True, null=True, default=None)

class CourseTimeParameter(models.Model):
    parameter_id = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    course_id = models.ForeignKey(Course, primary_key=True, null=True, default=None)
    time_slot_id = models.ForeignKey(TimeSlot, primary_key=True, null=True, default=None)

class ClassRoomParameter(models.Model):
    parameter_id = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    course_id = models.ForeignKey(Course, primary_key=True, null=True, default=None)
    classroom_id = models.ForeignKey(Classroom, primary_key=True, null=True, default=None)

class SemesterParameter(models.Model):
    parameter_id = models.ForeignKey(ParameterData, primary_key=True, null=True, default=None)
    course_id = models.ForeignKey(Course, primary_key=True, null=True, default=None)
    semester_id = models.ForeignKey(Semester, primary_key=True, null=True, default=None)

