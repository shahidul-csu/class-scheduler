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
    TimeSlot(wd, t) for wd in WeekDay.get_work_days() for t in TimeBlock.get_time_blocks(Time(START_TIME), Time(END_TIME), Time(DURATION))
]
print(TIME_SLOTS)

CLASSROOMS = [
    Classroom(f"BIT-{i}", rd.choice(CLASSROOM_CAPACITES)) for i in CLASSROOM_NUMBERS
]

#print(CLASSROOMS)

def get_random_UserParameter():
    is_req = rd.choice((True, False))
    return rd.choice((
        TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, rd.choice(TIME_SLOTS), is_req,
                      rd.randint(MIN_SCORE, MAX_SCORE) if not is_req else None),
        UserGroupClassParameter(is_req, rd.randint(MIN_SCORE, MAX_SCORE) if not is_req else None)
    ))


def get_random_CourseParameter():
    is_req = rd.choice((True, False))
    return rd.choice((
        TimeParameter(TimeParameterType.COURSE_TIME_PARAMETER, rd.choice(TIME_SLOTS), is_req,
                      rd.randint(MIN_SCORE, MAX_SCORE) if not is_req else None),
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
           units=rd.randint(MIN_COURSE_UNITS, MAX_COURSE_UNITS),
           number_per_week=rd.randint(MIN_COURSE_PER_WEEK, MAX_COURSE_PER_WEEK),
           capacity=rd.choice(COURSE_CAPACITIES))
    for course_id in COURSE_IDS
]


print(COURSES[0])

CLASSROOMS_PREDETERMINED = {
    104: Classroom(f"BIT-{104}", 40),
    105: Classroom(f"BIT-{105}", 40),
    110: Classroom(f"BIT-{110}", 40),
    117: Classroom(f"BIT-{117}", 40),
    118: Classroom(f"BIT-{118}", 40)
}

INSTRUCTORS_PREDETERMINED = [
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               0,
               f"testUser{0}",
               f"testName{0}",
               f"testLastName{0}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               1,
               f"testUser{1}",
               f"testName{1}",
               f"testLastName{1}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               2,
               f"testUser{2}",
               f"testName{2}",
               f"testLastName{2}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               3,
               f"testUser{3}",
               f"testName{3}",
               f"testLastName{3}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               4,
               f"testUser{4}",
               f"testName{4}",
               f"testLastName{4}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               5,
               f"testUser{5}",
               f"testName{5}",
               f"testLastName{5}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               6,
               f"testUser{6}",
               f"testName{6}",
               f"testLastName{6}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               7,
               f"testUser{7}",
               f"testName{7}",
               f"testLastName{7}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               8,
               f"testUser{8}",
               f"testName{8}",
               f"testLastName{8}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               9,
               f"testUser{9}",
               f"testName{9}",
               f"testLastName{9}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               10,
               f"testUser{10}",
               f"testName{10}",
               f"testLastName{10}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               11,
               f"testUser{11}",
               f"testName{11}",
               f"testLastName{11}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               12,
               f"testUser{12}",
               f"testName{12}",
               f"testLastName{12}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               13,
               f"testUser{13}",
               f"testName{13}",
               f"testLastName{13}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               14,
               f"testUser{14}",
               f"testName{14}",
               f"testLastName{14}"),
    Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, TIME_SLOTS[2], False, 2)],
               15,
               f"testUser{15}",
               f"testName{15}",
               f"testLastName{15}")
]

COURSES_PREDETERMINED = [
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[104], False, 3),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[110], False, 2)],
           f"CST-{205}",
           [INSTRUCTORS_PREDETERMINED[0]],
           units=4,
           number_per_week=3,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[110], False, 3)],
           f"CST-{236}",
           [INSTRUCTORS_PREDETERMINED[1]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[110], False, 3),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[104], False, 2)],
           f"CST-{237}",
           [INSTRUCTORS_PREDETERMINED[0]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[104], False, 3)],
           f"CST-{300}-02",
           [INSTRUCTORS_PREDETERMINED[2]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[104], False, 3),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[110], False, 2)],
           f"CST-{302}",
           [INSTRUCTORS_PREDETERMINED[3], INSTRUCTORS_PREDETERMINED[0]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[110], False, 3),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[104], False, 2)],
           f"CST-{311}-02",
           [INSTRUCTORS_PREDETERMINED[4]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[104], False, 3)],
           f"CST-{336}-01",
           [INSTRUCTORS_PREDETERMINED[2]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[104], False, 3)],
           f"CST-{345}",
           [INSTRUCTORS_PREDETERMINED[5]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[104], False, 3),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[110], False, 2)],
           f"CST-{363}-02",
           [INSTRUCTORS_PREDETERMINED[9]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[110], False, 3)],
           f"CST-{370}-02",
           [INSTRUCTORS_PREDETERMINED[5]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[110], False, 3)],
           f"CST-{383}-02",
           [INSTRUCTORS_PREDETERMINED[10]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[104], False, 3),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[110], False, 2)],
           f"CST-{438}-02",
           [INSTRUCTORS_PREDETERMINED[11]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([],
           f"CST-{498}-02",
           [INSTRUCTORS_PREDETERMINED[2], INSTRUCTORS_PREDETERMINED[9]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[118], False, 3),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[117], False, 2),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[105], False, 1)],
           f"CST-{201}-01",
           [INSTRUCTORS_PREDETERMINED[13]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[118], False, 3),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[117], False, 2),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[105], False, 1)],
           f"CST-{202}-01",
           [INSTRUCTORS_PREDETERMINED[14]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[118], False, 3),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[117], False, 2),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[105], False, 1)],
           f"CST-{226}-01",
           [INSTRUCTORS_PREDETERMINED[13]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[118], False, 3),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[117], False, 2),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[105], False, 1)],
           f"CST-{227}-01",
           [INSTRUCTORS_PREDETERMINED[1]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[105], False, 3)],
           f"CST-{230}-01",
           [INSTRUCTORS_PREDETERMINED[3]],
           units=4,
           number_per_week=2,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[117], False, 3),
            ClassroomParameter(CLASSROOMS_PREDETERMINED[105], False, 2)],
           f"CST-{231}-01",
           [INSTRUCTORS_PREDETERMINED[4]],
           units=4,
           number_per_week=3,
           capacity=20),
    Course([ClassroomParameter(CLASSROOMS_PREDETERMINED[118], True)],
           f"CST-{231}-01",
           [INSTRUCTORS_PREDETERMINED[7]],
           units=4,
           number_per_week=2,
           capacity=20),
]
