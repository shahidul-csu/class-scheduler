import random as rd
from param_entities import Instructor, Course
from parameters import TimeParameter, UserGroupClassParameter, ClassroomParameter
from base_entities import TimeSlot, WeekDay, TimeBlock, Time, Classroom, TimeParameterType

# TimeBlock
START_TIME = 8
END_TIME = 20
DURATION = 2

# Classroom
CLASSROOM_NUMBERS = range(100, 116)
CLASSROOM_CAPACITES = [20, 30, 35, 38, 40]

# Parameter
MAX_SCORE = 6
MIN_SCORE = 1
MIN_PARAMETERS = 0
MAX_PARAMETERS = 3

# Instructor
NUM_OF_INSTRUCTORS = 10

# Course
COURSE_IDS = range(100, 500, 20)
MAX_INST_PER_COURSE = 2
MIN_INST_PER_COURSE = 1
MAX_COURSE_UNITS = 4
MIN_COURSE_UNITS = 1
MAX_COURSE_PER_WEEK = 3
MIN_COURSE_PER_WEEK = 1
COURSE_CAPACITIES = [20, 30]

TIME_SLOTS = [
    TimeSlot(wd.value, t) for wd in WeekDay for t in TimeBlock.get_time_blocks(Time(START_TIME), Time(END_TIME), Time(DURATION))
]

CLASSROOMS = [
    Classroom(f"BIT-{i}", rd.choice(CLASSROOM_CAPACITES)) for i in CLASSROOM_NUMBERS
]


def get_random_UserParameter():
    is_req = rd.choice((True, False))
    return rd.choice((
        TimeParameter(TimeParameterType.COURSE_TIME_PARAMETER, rd.choice(TIME_SLOTS), is_req, rd.randint(MIN_SCORE, MAX_SCORE) if not is_req else None),
        UserGroupClassParameter(is_req, rd.randint(MIN_SCORE, MAX_SCORE) if not is_req else None)
    ))


def get_random_CourseParameter():
    is_req = rd.choice((True, False))
    return rd.choice((
        TimeParameter(TimeParameterType.COURSE_TIME_PARAMETER, rd.choice(TIME_SLOTS), is_req, rd.randint(MIN_SCORE, MAX_SCORE) if not is_req else None),
        ClassroomParameter(rd.choice(CLASSROOMS), is_req, rd.randint(MIN_SCORE, MAX_SCORE) if not is_req else None)
    ))


INSTRUCTORS = [
    Instructor([get_random_UserParameter() for _ in range(rd.randint(MIN_PARAMETERS, MAX_PARAMETERS))],
               i,
               f"testUser{i}",
               f"testName{i}",
               f"testLastName{i}")
    for i in range(NUM_OF_INSTRUCTORS)
]

COURSES = [
    Course([get_random_CourseParameter() for _ in range(rd.randint(MIN_PARAMETERS, MAX_PARAMETERS))],
           f"CST-{course_id}",
           rd.sample(INSTRUCTORS, rd.randint(MIN_INST_PER_COURSE, MAX_INST_PER_COURSE)),
           rd.randint(MIN_COURSE_UNITS, MAX_COURSE_UNITS),
           rd.randint(MIN_COURSE_PER_WEEK, MAX_COURSE_PER_WEEK),
           rd.choice(COURSE_CAPACITIES))
    for course_id in COURSE_IDS
]
