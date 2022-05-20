from django.contrib import admin
from .models import *

admin.site.register(DayTime)
admin.site.register(WeekDay)
admin.site.register(Classroom)
admin.site.register(Course)
admin.site.register(Semester)
admin.site.register(ParameterData)
admin.site.register(TimeSlot)
admin.site.register(UserGroupClassParameter)
admin.site.register(UserTimeParameter)
admin.site.register(Teaches)
admin.site.register(Schedule)
admin.site.register(ScheduledCourse)
admin.site.register(CourseTimeParameter)
admin.site.register(ClassroomParameter)
admin.site.register(SemesterParameter)