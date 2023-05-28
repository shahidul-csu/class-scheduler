import psycopg
import random as rd
from param_entities import Instructor, Course
from parameters import TimeParameter, UserGroupClassParameter, ClassroomParameter
from base_entities import TimeSlot, WeekDay, TimeBlock, Time, Classroom, TimeParameterType

CLASSROOMS = []
COURSES = []
INSTRUCTORS = []
NUM_OF_INSTRUCTORS = 0

#Stuff
# TimeBlock
START_TIME = 8
END_TIME = 20
DURATION = 2

TIME_SLOTS = [
    TimeSlot(wd, t) for wd in WeekDay.get_work_days() for t in TimeBlock.get_time_blocks(Time(START_TIME), Time(END_TIME), Time(DURATION))
]


def getClassRoom(class_capacity):
    for i in CLASSROOMS:
        if(Classroom.get_capacity(i) >= class_capacity):
            return Classroom.get_classroom_id(i)


def timeConverter(old_time):

    if(old_time == "12:00AM"):
        return "0:00"
    elif(old_time == "12:00PM"):
        return "12:00"

    time_status = old_time[-2:]

    old_time = old_time.split(':')

    if(time_status == "AM"):
        temp = int(old_time[0])
        return(str(temp) + ":00")
    else:
        temp = int(old_time[0])
        temp = temp + 12
        return(str(temp) + ":00")

def getWeekDayTuple(course_id):

    cur.execute(f"SELECT * FROM course_time_parameter WHERE course_id_id={course_id}")
    result = cur.fetchall()
    time_slot = 0
    for i in result:
        time_slot = i[3]
    
    cur.execute(f"SELECT * FROM time_slot WHERE time_slot_id={time_slot}")
    result = cur.fetchall()
    weekday_id = 0
    for i in result:
        day_time_id = i[1]
        weekday_id = i[2]

    cur.execute(f"(SELECT * FROM week_day WHERE week_day_id={weekday_id})")
    result = cur.fetchall()
    day1 = ""
    for i in result:
        day1 = i[1]

    if(day1 == "Tuesday"):
        d1 = WeekDay.TUESDAY
        d2 = WeekDay.THURSDAY
    else:
        d1 = WeekDay.MONDAY
        d2 = WeekDay.WEDNESDAY

    returnTuple = (d1, d2)
    return returnTuple

def getTimeSlot(instructor_id):
    returnArray = []
    cur.execute(f"SELECT * FROM user_time_parameter WHERE user_id_id={instructor_id}")
    result = cur.fetchall()
    for i in result:
        parameter_id_id = i[1]
        time_slot_id_id = i[2]

        cur.execute(f"SELECT * FROM time_slot WHERE time_slot_id={time_slot_id_id}")
        result = cur.fetchall()
        for i in result:
            day_time = i[1]
            week_day = i[2]
        
            cur.execute(f"SELECT time FROM day_time WHERE day_time_id={day_time}")
            result = cur.fetchall()
            time = result[0]

            cur.execute(f"SELECT week_day FROM week_day WHERE week_day_id={week_day}")
            result = cur.fetchall()
            day = result[0]

            # WeekDay
            match day[0]:
                case "Monday":
                    WeekDay_day = WeekDay.MONDAY
                case "Tuesday":
                    WeekDay_day = WeekDay.TUESDAY
                case "Wednesday":
                    WeekDay_day = WeekDay.WEDNESDAY
                case "Thursday":
                    WeekDay_day = WeekDay.THURSDAY
                case "Friday":
                    WeekDay_day = WeekDay.FRIDAY
                case "Saturday":
                    WeekDay_day = WeekDay.SATURDAY
                case "Sunday":
                    WeekDay_day = WeekDay.SUNDAY


            # TimeBlock
            time = time[0]
            sep_time = time.split('-')

            start_time = sep_time[0]

            end_time = sep_time[1]

            start_time = timeConverter(start_time)
            start_time = start_time.split(':')
            start_time = int(start_time[0])

            end_time = timeConverter(end_time)
            end_time = end_time.split(':')
            end_time = int(end_time[0])

            tb = TimeBlock(Time(start_time), Time(end_time))

            temp = TimeSlot(WeekDay_day, tb)
            TIME_SLOTS.append(temp)
            return temp







# Connect to Database
with psycopg.connect(user="ffesmtozmpyghm",
                     password="dc203ed02f12dcc3b402201415eba2ee53a891196a69de65d6494c304b27cffa",
                     host="localhost",
                     port="5442",
                     dbname="MainSchedular_DB") as conn:

    # Get them Instructors into the algo
    with conn.cursor() as cur:

        cur.execute("SELECT * FROM auth_user")

        result = cur.fetchall()

        for i in result:
            instruct_id = i[0]
            username = i[4]
            first_name = i[5]
            last_name = i[6]
            is_superuser = i[3]

            if (is_superuser == 0):
                NUM_OF_INSTRUCTORS += 1
                INSTRUCTORS.append(Instructor([TimeParameter(TimeParameterType.INSTRUCTOR_TIME_PARAMETER, getTimeSlot(instruct_id), False, 2)], 
                                              f"{instruct_id}",
                                              f"{username}",
                                              f"{first_name}",
                                              f"{last_name}"))




    # Classroom Table
    with conn.cursor() as cur:
        cur.execute("SELECT classroom_name, capacity FROM classroom")

        result = cur.fetchall()

        for i in result:
            room = i[0]
            cap = i[1]
            CLASSROOMS.append(Classroom(f"{room}", cap))

    # Course Table
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM course")

        result = cur.fetchall()
        
        for i in result:
            classroom_parameter = 0

            course_id = i[0]
            course_name = i[1]
            course_units = i[2]
            course_number_per_week = i[3]
            course_sync_time = i[4]
            course_capacity = i[5]
            course_section = i[6]

            #full_name = (f"{course_name}" + f"-{course_section}") TODO this needs to be implimented
            full_name = ("CST499")

            # Course take {
            rand_instructor = rd.randrange(1, NUM_OF_INSTRUCTORS, 1)
            COURSES.append(Course([ClassroomParameter(getClassRoom(course_capacity), False, 3),
                                   ClassroomParameter(getClassRoom(course_capacity), False, 2),
                                   ClassroomParameter(getClassRoom(course_capacity), False, 1)],
                                  f"{full_name}",
                                  [INSTRUCTORS[rand_instructor]],
                                  units=course_units,
                                  number_per_week=course_number_per_week,
                                  capacity=course_capacity,
                                  sync_time=True,
                                  week_day_set_pool=[getWeekDayTuple(course_id)]
                                  ))
