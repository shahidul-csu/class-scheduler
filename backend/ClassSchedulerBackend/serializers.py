from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password',
                  'group', 'user_permissions', 'is_staff', 'is_active',
                  'is_superuser', 'last_login', 'data_joined']


class DayTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayTime
        fields = ['day_time_id', 'time']


class WeekDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = WeekDay
        fields = ['week_day_id', 'week_day']


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ['classroom_id', 'capacity']


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ['semester_id', 'year', 'name', 'duration_weeks']


class ParameterDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParameterData
        fields = ['parameter_id', 'approved', 'requirement', 'score']


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = ['time_slot_id', 'week_day_id', 'day_time_id']


class UserGroupClassParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGroupClassParameter
        fields = ['user_id', 'parameter_id']


class UserTimeParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTimeParameter
        fields = ['user_id', 'parameter_id', 'time_slot_id']


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['course_id', 'name', 'units', 'number_per_week', 'sync_time', 'capacity']


class TeachesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teaches
        fields = ['user_id', 'course_id', 'semester_id']


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['schedule_id', 'fitness_score']


class ScheduledCourseSerializers(serializers.ModelSerializer):
    class Meta:
        model = ScheduledCourse
        fields = ['schedule_id', 'user_id', 'course_id', 'time_slot_id',
                  'semester_id', 'classroom_id']


class CourseTimeParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseTimeParameter
        fields = ['parameter_id', 'course_id', 'time_slot_id']


class ClassroomParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassroomParameter
        fields = ['parameter_id', 'course_id', 'classroom_id']


class SemesterParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = SemesterParameter
        fields = ['parameter_id', 'course_id', 'semester_id']