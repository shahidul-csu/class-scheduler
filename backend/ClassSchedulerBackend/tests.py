from django.test import TestCase
from django.urls import reverse
from .models import *
from .tests_manager.data_access_view_tests import *


class LoginViewTest(TestCase):
    credentials = {
        'username': 'admin',
        'password': 'admin'
    }
    user = User.objects.get(username=credentials["username"])

    def test_login(self):
        response = self.client.post(reverse('login'), data=LoginViewTest.credentials, follow=True)
        self.assertTrue("token" in decode_content(response.content))
        self.assertTrue(LoginViewTest.user.is_authenticated)
        self.assertEqual(response.status_code, 200)


class UserViewTest(TestCase, DAVTestTemplate):
    add_data = {
        "username": "AutoTestUserUsername",
        "password": "ThePasswordOfUserThatIsUserForTests"
    }
    delete_data = {
        "username": "AutoTestUserUsername"
    }
    url_name = "user"
    field_compare = "username"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        DAVTestTemplate.setUpTestData(cls)

    def test_get_user(self):
        super()._test_get(self)

    def test_add_user(self):
        super()._test_add(self)

    def test_update_user(self):
        super()._test_update(self)

    def test_delete_user(self):
        super()._test_delete(self)


class DayTimeViewTest(TestCase, DAVTestTemplate):
    add_data = {
        "time": "TestDayTime",
    }
    delete_data = add_data
    url_name = "day_time"
    field_compare = "time"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class WeekDayViewTest(TestCase, DAVTestTemplate):
    add_data = {
        "week_day": "TestWeekDay",
    }
    delete_data = add_data
    url_name = "week_day"
    field_compare = "week_day"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class ClassroomViewTest(TestCase, DAVTestTemplate):
    add_data = {
        "capacity": 5,
    }
    delete_data = add_data
    url_name = "classroom"
    field_compare = "capacity"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class SemesterViewTest(TestCase, DAVTestTemplate):
    add_data = {
        "year": 2020,
        "name": "TestName",
        "duration": 32
    }
    delete_data = add_data
    url_name = "semester"
    field_compare = "year"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class ParameterDataViewTest(TestCase, DAVTestTemplate):
    add_data = {
        "approved": True,
        "requirement": False,
        "score": 5
    }
    delete_data = add_data
    url_name = "parameter_data"
    field_compare = "approved"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class UserGroupClassParameterViewTest(TestCase, DAVTestTemplate):
    add_data = {}
    delete_data = add_data
    url_name = "user_group_class_parameter"
    field_compare = "user_id"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        UserGroupClassParameterViewTest.add_data["user_id"] = User.objects.create(
            username="TestUsername",
            password="TestPassword"
        ).pk
        UserGroupClassParameterViewTest.add_data["parameter_id"] = ParameterData.objects.create(score=3).pk
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class UserTimeParameterViewTest(TestCase, DAVTestTemplate):
    add_data = {}
    delete_data = add_data
    url_name = "user_time_parameter"
    field_compare = "user_id"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        UserTimeParameterViewTest.add_data["user_id"] = User.objects.create(
            username="TestUsername",
            password="TestPassword"
        ).pk
        UserTimeParameterViewTest.add_data["parameter_id"] = ParameterData.objects.create(score=3).pk
        UserTimeParameterViewTest.add_data["time_slot_id"] = TimeSlot.objects.create(
            week_day_id=WeekDay.objects.create(week_day="TestWeekday"),
            day_time_id=DayTime.objects.create(time="TestTime")
        ).pk
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class CourseViewTest(TestCase, DAVTestTemplate):
    add_data = {
        "name": "TestName",
        "units": 3,
        "number_per_week": 2,
        "capacity": 100
    }
    delete_data = add_data
    url_name = "course"
    field_compare = "name"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class TeachesViewTest(TestCase, DAVTestTemplate):
    add_data = {}
    delete_data = add_data
    url_name = "teaches"
    field_compare = "user_id"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        TeachesViewTest.add_data["user_id"] = User.objects.create(
            username="TestUsername",
            password="TestPassword"
        ).pk
        TeachesViewTest.add_data["course_id"] = Course.objects.create(
            name="TestName",
            units=3,
            number_per_week=2
        ).pk
        TeachesViewTest.add_data["semester_id"] = Semester.objects.create(
            year=2020,
            name="TestName",
            duration_weeks=16
        ).pk
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class ScheduleViewTest(TestCase, DAVTestTemplate):
    add_data = {
        "fitness_score": 10
    }
    delete_data = add_data
    url_name = "schedule"
    field_compare = "fitness_score"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class ScheduledCourseViewTest(TestCase, DAVTestTemplate):
    add_data = {}
    delete_data = add_data
    url_name = "scheduled_course"
    field_compare = "scheduled_course"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        ScheduledCourseViewTest.add_data["schedule_id"] = Schedule.objects.create(fitness_score=10).pk
        ScheduledCourseViewTest.add_data["user_id"] = User.objects.create(
            username="TestUsername",
            password="TestPassword"
        ).pk
        ScheduledCourseViewTest.add_data["course_id"] = Course.objects.create(
            name="TestName",
            units=3,
            number_per_week=2,
            capacity=100
        ).pk
        ScheduledCourseViewTest.add_data["time_slot_id"] = TimeSlot.objects.create(
            week_day_id=WeekDay.objects.create(week_day="TestWeekday"),
            day_time_id=DayTime.objects.create(time="TestTime")
        ).pk
        ScheduledCourseViewTest.add_data["semester_id"] = Semester.objects.create(
            year=2020,
            name="TestName",
            duration_weeks=16
        ).pk
        ScheduledCourseViewTest.add_data["classroom_id"] = Schedule.objects.create(capacity=100).pk
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class CourseTimeParameterViewTest(TestCase, DAVTestTemplate):
    add_data = {}
    delete_data = add_data
    url_name = "course_time_parameter"
    field_compare = "parameter_id"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        CourseTimeParameterViewTest.add_data["parameter_id"] = ParameterData.objects.create(score=5).pk
        CourseTimeParameterViewTest.add_data["course_id"] = Course.objects.create(
            name="TestName",
            units=3,
            number_per_week=2,
            capacity=100
        ).pk
        CourseTimeParameterViewTest.add_data["time_slot_id"] = TimeSlot.objects.create(
            week_day_id=WeekDay.objects.create(week_day="TestWeekday"),
            day_time_id=DayTime.objects.create(time="TestTime")
        ).pk
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class ClassroomParameterViewTest(TestCase, DAVTestTemplate):
    add_data = {}
    delete_data = add_data
    url_name = "classroom_parameter"
    field_compare = "parameter_id"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        ClassroomParameterViewTest.add_data["parameter_id"] = ParameterData.objects.create(score=5).pk
        ClassroomParameterViewTest.add_data["course_id"] = Course.objects.create(
            name="TestName",
            units=3,
            number_per_week=2,
            capacity=100
        ).pk
        ClassroomParameterViewTest.add_data["classroom_id"] = Classroom.objects.create(capacity=50).pk
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)


class SemesterParameterViewTest(TestCase, DAVTestTemplate):
    add_data = {}
    delete_data = add_data
    url_name = "semester_parameter"
    field_compare = "parameter_id"
    client_class = DAVTestTemplate.client_class

    @classmethod
    def setUpTestData(cls):
        SemesterParameterViewTest.add_data["parameter_id"] = ParameterData.objects.create(score=5).pk
        SemesterParameterViewTest.add_data["course_id"] = Course.objects.create(
            name="TestName",
            units=3,
            number_per_week=2,
            capacity=100
        ).pk
        SemesterParameterViewTest.add_data["semester_id"] = Semester.objects.create(
            year=2020,
            name="TestName",
            duration_weeks=16
        ).pk
        DAVTestTemplate.setUpTestData(cls)

    def test_get_event(self):
        super()._test_get(self)

    def test_add_event(self):
        super()._test_add(self)

    def test_update_event(self):
        super()._test_update(self)

    def test_delete_event(self):
        super()._test_delete(self)
