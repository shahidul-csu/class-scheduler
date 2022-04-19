from django.shortcuts import render

# Create your views here.
from .models import *
from .serializers import *
from .view_manager import *


class UserView(DataAccessView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    model = User


class DayTimeView(DataAccessView):
    serializer_class = DayTimeSerializer
    queryset = DayTime.all()
    model = DayTime


class WeekDayView(DataAccessView):
    serializer_class = WeekDaySerializer
    queryset = WeekDay.all()
    model = WeekDay


class SemesterView(DataAccessView):
    serializer_class = SemesterSerializer
    queryset = Semester.all()
    model = Semester


class ClassroomView(DataAccessView):
    serializer_class = ClassroomSerializer
    queryset = Classroom.all()
    model = Classroom


class ParameterDataView(DataAccessView):
    serializer_class = ParameterDataSerializer
    queryset = ParameterData.all()
    model = ParameterData


class TimeSlotView(DataAccessView):
    serializer_class = TimeSlotSerializer
    queryset = TimeSlot.all()
    model = TimeSlot


class UserGroupClassParameterView(DataAccessView):
    serializer_class = UserGroupClassParameterSerializer
    queryset = UserGroupClassParameter.all()
    model = UserGroupClassParameter


class UserTimeParameterView(DataAccessView):
    serializer_class = UserTimeParameterSerializer
    queryset = UserTimeParameter.all()
    model = UserTimeParameter


class CourseView(DataAccessView):
    serializer_class = CourseSerializer
    queryset = Course.all()
    model = Course


class TeachesView(DataAccessView):
    serializer_class = TeachesSerializer
    queryset = Teaches.all()
    model = Teaches


class ScheduleView(DataAccessView):
    serializer_class = ScheduleSerializer
    queryset = Schedule.all()
    model = Schedule


class ScheduledCourseView(DataAccessView):
    serializer_class = ScheduledCourseSerializer
    queryset = ScheduledCourse.all()
    model = ScheduledCourse


class CourseTimeParameterView(DataAccessView):
    serializer_class = CourseTimeParameterSerializer
    queryset = CourseTimeParameter.all()
    model = CourseTimeParameter


class ClassroomParameterView(DataAccessView):
    serializer_class = ClassroomParameterSerializer
    queryset = ClassroomParameter.all()
    model = ClassroomParameter


class SemesterParameterView(DataAccessView):
    serializer_class = SemesterParameterSerializer
    queryset = SemesterParameter.all()
    model = SemesterParameter
