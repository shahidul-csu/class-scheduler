from django.shortcuts import render

# Create your views here.
from .serializers import *
from django.db.utils import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from .view_manager.data_access_view import *

from .algorithm.algorithm import main


@csrf_exempt
def signUpView(request):
    try:
        body = get_body(request)
        User.objects.create_user(**body)
        status = 200
    except IntegrityError as e:
        body = {"error": str(e)}
        status = 400
    return get_response(body, status=status)


def generateSchedule(request):
    return get_response(main(), status=200)
    # return get_response({
    #     "schedules": [
    #              json.loads(
    #                  json.dumps(s, default=lambda o: getattr(o, '__dict__', str(o)))
    #              ) for s in main()
    #          ]
    #     }, status=200)


class UserView(DataAccessView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    model = User


class DayTimeView(DataAccessView):
    serializer_class = DayTimeSerializer
    queryset = DayTime.objects.all()
    model = DayTime


class WeekDayView(DataAccessView):
    serializer_class = WeekDaySerializer
    queryset = WeekDay.objects.all()
    model = WeekDay


class SemesterView(DataAccessView):
    serializer_class = SemesterSerializer
    queryset = Semester.objects.all()
    model = Semester


class ClassroomView(DataAccessView):
    serializer_class = ClassroomSerializer
    queryset = Classroom.objects.all()
    model = Classroom


class ParameterDataView(DataAccessView):
    serializer_class = ParameterDataSerializer
    queryset = ParameterData.objects.all()
    model = ParameterData


class TimeSlotView(DataAccessView):
    serializer_class = TimeSlotSerializer
    queryset = TimeSlot.objects.all()
    model = TimeSlot


class UserGroupClassParameterView(DataAccessView):
    serializer_class = UserGroupClassParameterSerializer
    queryset = UserGroupClassParameter.objects.all()
    model = UserGroupClassParameter


class UserTimeParameterView(DataAccessView):
    serializer_class = UserTimeParameterSerializer
    queryset = UserTimeParameter.objects.all()
    model = UserTimeParameter


class CourseView(DataAccessView):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    model = Course


class TeachesView(DataAccessView):
    serializer_class = TeachesSerializer
    queryset = Teaches.objects.all()
    model = Teaches


class ScheduleView(DataAccessView):
    serializer_class = ScheduleSerializer
    queryset = Schedule.objects.all()
    model = Schedule


class ScheduledCourseView(DataAccessView):
    serializer_class = ScheduledCourseSerializer
    queryset = ScheduledCourse.objects.all()
    model = ScheduledCourse


class CourseTimeParameterView(DataAccessView):
    serializer_class = CourseTimeParameterSerializer
    queryset = CourseTimeParameter.objects.all()
    model = CourseTimeParameter


class ClassroomParameterView(DataAccessView):
    serializer_class = ClassroomParameterSerializer
    queryset = ClassroomParameter.objects.all()
    model = ClassroomParameter


class SemesterParameterView(DataAccessView):
    serializer_class = SemesterParameterSerializer
    queryset = SemesterParameter.objects.all()
    model = SemesterParameter
