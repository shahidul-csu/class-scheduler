from enum import Enum
from datetime import time


class Time(time):
    def __new__(cls, hour: int, minute: int = 0, seconds: int = 0):
        return super().__new__(cls, hour, minute, seconds)

    def __add__(self, other):
        tot_sec = self.second + other.second
        tot_min = self.minute + other.minute + tot_sec // 60
        tot_hour = self.hour + other.hour + tot_min // 60
        return Time(tot_hour % 24, tot_min % 60, tot_sec % 60)


class TimeBlock:
    @staticmethod
    def get_time_blocks(start: Time, end: Time, duration: Time):
        while start < end:
            curr = start
            start += duration
            yield TimeBlock(curr, curr + duration)

    def __init__(self, start: Time, end: Time):
        self.__start = start
        self.__end = end

    def get_start(self):
        return self.__start

    def get_end(self):
        return self.__end

    def __eq__(self, other):
        return self.__start == other.__start and self.__end == other.__end

    def __hash__(self):
        return hash((self.__start, self.__end))

    def __str__(self):
        return f"{self.__start.hour} - {self.__end.hour}"

    def __repr__(self):
        return self.__str__()


class TimeParameterType(Enum):
    INSTRUCTOR_TIME_PARAMETER = "ITP"
    COURSE_TIME_PARAMETER = "CTP"


class WeekDay(Enum):
    MONDAY = "monday"
    TUESDAY = "tuesday"
    WEDNESDAY = "wednesday"
    THURSDAY = "thursday"
    FRIDAY = "friday"
    SATURDAY = "saturday"
    SUNDAY = "sunday"

    @staticmethod
    def from_str(text):
        return next((day for day in WeekDay if day.value == text), "not found")


class TimeSlot:
    def __init__(self, week_day: WeekDay, time_block: TimeBlock):
        self.__week_day = week_day
        self.__time_block = time_block

    def get_week_day(self):
        return self.__week_day

    def get_time_block(self):
        return self.__time_block

    def __hash__(self):
        return hash((self.__time_block, self.__time_block))

    def __eq__(self, other):
        return self.__week_day == other.__week_day \
               and \
               self.__time_block == other.__time_block

    def __str__(self):
        return f"{self.__week_day} : {self.__time_block}"

    def __repr__(self):
        return self.__str__()


class Semester(Enum):
    FALL = "fall"
    WINTER = "winter"
    SPRING = "spring"
    SUMMER = "summer"

    @staticmethod
    def from_str(text):
        return next((sem for sem in Semester if sem.value == text), "not found")


class Classroom:
    def __init__(self, classroom_id: str, capacity: int):
        self.__classroom_id = classroom_id
        self.__capacity = capacity

    def get_classroom_id(self):
        return self.__classroom_id

    def get_capacity(self):
        return self.__capacity

    def __hash__(self):
        return hash(self.__classroom_id)

    def __eq__(self, other):
        return self.__classroom_id == other.__classroom_id

    def __str__(self):
        return f"({self.__classroom_id}, {self.__capacity})"

    def __repr__(self):
        return self.__str__()
