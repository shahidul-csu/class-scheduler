from django.shortcuts import render

# Create your views here.
from .models import *
from django.db.models import Count, F, Value
from .serializers import *
from .view_manager.view_utils import *
from .view_manager.data_access_view import *
from django.http import HttpResponse
from rest_framework.response import Response
from django.db.models.query import Prefetch, prefetch_related_objects
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from django.db.utils import IntegrityError
from django.core.exceptions import FieldError
from django.contrib.auth import authenticate, login  # used for the login view
from rest_framework.authtoken.models import Token
import datetime
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from django.core import serializers as djangoSerializers


@api_view(["POST"])
def signUpView(request):
    try:
        body = get_body(request)
        User.objects.create_user(**body)
        status = 200
    except IntegrityError as e:
        body = {"error": str(e)}
        status = 400
    return get_response(body, status=status)


@api_view(["GET"])
def logout(request):
    try:

        # # Token.objects.get(**{k: v for k, v in request.GET.items()}).delete()
        # # #this had errors when we had multiple tokens in the db

        # deletes the token given to the user on login
        Token.objects.get(user_id=request.session['userId']).delete()
        deleteAllsessionVariables(request)

        res = get_response({"status": "User logout successful"}, status=200)
    except (TypeError, ValueError, Token.DoesNotExist, FieldError) as e:
        res = get_response({"error": str(e)}, status=400)
    return res


@api_view(["POST"])
def login(request):
    user = ""

    Email = request.data.get('email')  # requset. data is a dictionary
    password = request.data.get('password')  # works for both react and postman

    #     Email = request.POST.get('email') # works for only postman but not for react
    #     password = request.POST.get('password')

    try:
        user = User.objects.get(email=Email)
    except:
        return Response({'status': 'FAILED', 'msg': 'User is not valid'})

    passwordMatch = check_password(password, user.password)

    if passwordMatch:

        token = Token.objects.get_or_create(user=user)
        token = token[0].key  # gets the token
        request.session['userId'] = user.id  # sets session varaiable
        # returns logged in usr obj is jason
        usrObj = UserSerializer(instance=user).data
        user.last_login = datetime.datetime.now()  # update last_login field
        user.save()  # update user in db
        # return login token
        return Response({'Login_token': token, 'usrOb': usrObj, 'status': 'SUCCESS', 'LoginId': user.id})
    else:
        return Response({'status': 'FAILED', 'msg': 'Please enter valid Username or Password.'})


def deleteAllsessionVariables(request):
    if 'userId' in request.session:  # safety check
        del request.session['userId']  # delete session var


@api_view(["GET"])
def getAvaliabilityEntryPerSemester(request, semesterId, id):
    res = {"status": True, "data": ""}

    # semester_id is just the name of the field that holds
    # a relation to the semester table
    # semester_id_id is specifying the id of the relational table
    # F is used to rename a field
    if id:
        userTimeAvalibilityForSemester = UserTimeParameter.objects.select_related(
            'parameter_id').select_related('time_slot_id').filter(
            parameter_id__semester_id_id=semesterId).filter(user_id_id=id).filter(

            parameter_id__requirement=True).values('parameter_id', 'time_slot_id',
                                                   approved=F(
                                                       'parameter_id__approved'),
                                                   requirement=F(
                                                       'parameter_id__requirement'),
                                                   week_day_id=F(
                                                       'time_slot_id__week_day_id'),
                                                   day_time_id=F(
                                                       'time_slot_id__day_time_id'),
                                                   )
        return Response({'status': 'SUCCESS', 'data': userTimeAvalibilityForSemester})

    else:
        return Response({'status': 'user not Specified!', 'data': []})


@api_view(["GET"])
def getCourseAvaliabilityEntryPerSemester(request, semesterId, id):
    res = {"status": True, "data": ""}

    # semester_id is just the name of the field that holds
    # a relation to the semester table
    # semester_id_id is specifying the id of the relational table
    # F is used to rename a field
    if id:
        userTimeAvalibilityForSemester = CourseTimeParameter.objects.select_related(
            'parameter_id').select_related('time_slot_id').filter(
            parameter_id__semester_id_id=semesterId).filter(course_id_id=id).filter(

            parameter_id__requirement=True).values('parameter_id', 'time_slot_id',
                                                   approved=F(
                                                       'parameter_id__approved'),
                                                   requirement=F(
                                                       'parameter_id__requirement'),
                                                   week_day_id=F(
                                                       'time_slot_id__week_day_id'),
                                                   day_time_id=F(
                                                       'time_slot_id__day_time_id'),
                                                   )
        return Response({'status': 'SUCCESS', 'data': userTimeAvalibilityForSemester})

    else:
        return Response({'status': 'user not Specified!', 'data': []})


@api_view(["GET"])
def getCoursePreferenceEntryPerSemester(request, semesterId, id):
    res = {"status": True, "data": ""}

    # semester_id is just the name of the field that holds
    # a relation to the semester table
    # semester_id_id is specifying the id of the relational table
    # F is used to rename a field
    if id:
        userTimeAvalibilityForSemester = CourseTimeParameter.objects.select_related(
            'parameter_id').select_related('time_slot_id').filter(
            parameter_id__semester_id_id=semesterId).filter(course_id_id=id).filter(

            parameter_id__requirement=False).values('parameter_id', 'time_slot_id', score=F('parameter_id__score'),
                                                    approved=F(
                                                        'parameter_id__approved'),
                                                    requirement=F(
                                                        'parameter_id__requirement'),
                                                    week_day_id=F(
                                                        'time_slot_id__week_day_id'),
                                                    day_time_id=F(
                                                        'time_slot_id__day_time_id'),
                                                    )
        return Response({'status': 'SUCCESS', 'data': userTimeAvalibilityForSemester})

    else:
        return Response({'status': 'user not Specified!', 'data': []})


@api_view(["GET"])
def getCoursePreferenceParameterIds(request, semesterId, id):
    if semesterId:
        mediumScoreParameterId = CourseTimeParameter.objects.select_related('parameter_id').filter(parameter_id__semester_id_id=semesterId).filter(
            course_id_id=id).filter(parameter_id__requirement=False).filter(parameter_id__score=3).values('parameter_id').distinct()
        highScoreParameterId = CourseTimeParameter.objects.select_related('parameter_id').filter(parameter_id__semester_id_id=semesterId).filter(
            course_id_id=id).filter(parameter_id__requirement=False).filter(parameter_id__score=5).values('parameter_id').distinct()
        lowScoreParameterId = CourseTimeParameter.objects.select_related('parameter_id').filter(parameter_id__semester_id_id=semesterId).filter(
            course_id_id=id).filter(parameter_id__requirement=False).filter(parameter_id__score=1).values('parameter_id').distinct()
        return Response({'status': 'SUCCESS', 'low': lowScoreParameterId, 'medium': mediumScoreParameterId, 'high': highScoreParameterId})
    else:
        return Response({'status': 'semester or user not specified', 'data': []})


@api_view(["GET"])
def getPreferenceParameterIds(request, semesterId, id):
    if semesterId:
        mediumScoreParameterId = UserTimeParameter.objects.select_related('parameter_id').filter(parameter_id__semester_id_id=semesterId).filter(
            user_id_id=id).filter(parameter_id__requirement=False).filter(parameter_id__score=3).values('parameter_id').distinct()
        highScoreParameterId = UserTimeParameter.objects.select_related('parameter_id').filter(parameter_id__semester_id_id=semesterId).filter(
            user_id_id=id).filter(parameter_id__requirement=False).filter(parameter_id__score=5).values('parameter_id').distinct()
        lowScoreParameterId = UserTimeParameter.objects.select_related('parameter_id').filter(parameter_id__semester_id_id=semesterId).filter(
            user_id_id=id).filter(parameter_id__requirement=False).filter(parameter_id__score=1).values('parameter_id').distinct()
        return Response({'status': 'SUCCESS', 'low': lowScoreParameterId, 'medium': mediumScoreParameterId, 'high': highScoreParameterId})
    else:
        return Response({'status': 'semester or user not specified', 'data': []})


@api_view(["GET"])
def getPreferenceEntriesPerSemester(request, semesterId, id):
    if id:
        userTimePreferenceEntries = UserTimeParameter.objects.select_related('parameter_id').select_related('time_slot_id').filter(
            parameter_id__semester_id_id=semesterId).filter(user_id_id=id).filter(parameter_id__requirement=False).values('parameter_id', 'time_slot_id', score=F('parameter_id__score'),
                                                                                                                          approved=F(
                'parameter_id__approved'),
            requirement=F(
                'parameter_id__requirement'),
            week_day_id=F(
                'time_slot_id__week_day_id'),
            day_time_id=F(
                'time_slot_id__day_time_id'))
        return Response({'status': 'SUCCESS', 'data': userTimePreferenceEntries})
    else:
        return Response({'status': 'user not Specified!', 'data': []})


# This function is used to get only the number of days per week that the user has selected and if check if group class was selected
@api_view(["GET"])
def getUserPreferenceOptionEntries(request, semesterId, id):
    if id:
        # these two will have different parameter ids variables
        userGroupTimeParameter = UserGroupClassParameter.objects.select_related('parameter_id').filter(
            parameter_id__semester_id_id=semesterId).filter(user_id_id=id).values('parameter_id', 'user_id', score=F('parameter_id__score'))
        userNumDays = TeachingParameter.objects.select_related('parameter_id').filter(
            parameter_id__semester_id_id=semesterId).filter(user_id_id=id).values('id', 'parameter_id', 'user_id', 'num_teaching_days')
        return Response({'status': 'SUCCESS', 'group': userGroupTimeParameter, 'teaching': userNumDays})
    else:
        return Response({'status': 'user not Specified!', 'data': []})


@api_view(["GET"])
def getCourseParameterId(request, semesterId, courseId):
    if courseId:
        courseParameterId = CourseTimeParameter.objects.select_related('parameter_id').filter(
            course_id_id=courseId).filter(parameter_id__semester_id_id=semesterId).values('parameter_id').distinct()
        return Response({'status': 'SUCCESS', 'data': courseParameterId})
    else:
        return Response({'status': 'course not Specified!', 'data': []})


# this function is only used to get instructors that have entries on that semester
@api_view(["GET"])
def getInstructorListPerSemester(request, semesterId):
    if semesterId:
        # get instructor ids per semester
        userIdsPerSemester = UserTimeParameter.objects.select_related('parameter_id').filter(
            parameter_id__semester_id_id=semesterId).values_list('user_id_id', flat=True)
        # get instructor names using the ids
        userData = User.objects.filter(id__in=userIdsPerSemester).values(
            'id', 'first_name', 'last_name')

        return Response({'data': userData})
    else:
        return Response({'status': 'semester not Specified!', 'data': []})


@api_view(["GET"])  # this function is only used to get all instructors
def getInstructorList(request):
    userData = User.objects.filter(is_superuser=False).values(
        'id', 'first_name', 'last_name')
    return Response({'data': userData})


@api_view(["GET"])
def getCourseListPerSemester(request, semesterId):
    if semesterId:
        # get instructor ids per semester
        courseIdsPerSemester = CourseTimeParameter.objects.select_related('parameter_id').filter(
            parameter_id__semester_id_id=semesterId).values_list('course_id_id', flat=True)
        # get instructor names using the ids
        courseData = Course.objects.filter(id__in=courseIdsPerSemester).values(
            'course_id', 'name')

        return Response({'data': courseData})
    else:
        return Response({'status': 'semester not Specified!', 'data': []})


@api_view(["GET"])
def getParameterData(request, parameterId):
    if parameterId:
        parameterData = ParameterData.objects.filter(parameter_id=parameterId).values(
            'parameter_id', 'approved', 'requirement', 'score', 'semester_id_id')
        return Response({'status': 'SUCCESS', 'data': parameterData})
    else:
        return Response({'status': 'parameter not Specified!', 'data': []})


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


class TeachingParameterView(DataAccessView):
    serializer_class = TeachingParameterSerializer
    queryset = TeachingParameter.objects.all()
    model = TeachingParameter
