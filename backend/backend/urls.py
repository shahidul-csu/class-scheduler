"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from ClassSchedulerBackend.views import *
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', login, name="login"),
    path('sign_up/', signUpView, name="sign_up"),
    path('logout/', logout, name="logout"),
    path('api/', include([
        path('user/', UserView.as_view(), name='user'),
        path('day_time/', DayTimeView.as_view(), name='day_time'),
        path('week_day/', WeekDayView.as_view(), name='week_day'),
        path('semester/', SemesterView.as_view(), name='semester'),
        path('classroom/', ClassroomView.as_view(), name='classroom'),
        path('parameter_data/', ParameterDataView.as_view(), name='parameter_data'),
        path('time_slot/', TimeSlotView.as_view(), name='time_slot'),
        path('user_group_class_parameter/', UserGroupClassParameterView.as_view(),
             name='user_group_class_parameter'),
        path('user_time_parameter/', UserTimeParameterView.as_view(),
             name='user_time_parameter'),
        path('course/', CourseView.as_view(), name='course'),
        path('teaches/', TeachesView.as_view(), name='teaches'),
        path('schedule/', ScheduleView.as_view(), name='schedule'),
        path('scheduled_course/', ScheduledCourseView.as_view(),
             name='scheduled_course'),
        path('course_time_parameter/', CourseTimeParameterView.as_view(),
             name='course_time_parameter'),
        path('classroom_parameter/', ClassroomParameterView.as_view(),
             name='classroom_parameter'),
        path('semester_parameter/', SemesterParameterView.as_view(),
             name='semester_parameter'),
        path('get_avaliability_for_semester/<int:semesterId>/<int:userId>/', getAvaliabilityEntryPerSemester,
             name='get_avaliability_for_semester'),
    ]))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
