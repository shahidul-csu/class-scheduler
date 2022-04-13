import copy
import random as rd
from typing import List, Callable, Dict
from tabulate import tabulate

from error import GenerationError
from parameters import TimeParameter, ClassroomParameter
from base_entities import Classroom, WeekDay, TimeBlock, Time, TimeSlot, Semester
from param_entities import Course, Instructor
from test_data import TIME_SLOTS, CLASSROOMS, INSTRUCTORS, COURSES


class ScheduledCourse:
    def __init__(
            self,
            course: Course,
            time_slot: TimeSlot,
            semester: Semester,
            classroom: Classroom,
    ):
        self.__course = course
        self.__time_slot = time_slot
        self.__semester = semester
        self.__classroom = classroom

    def get_course(self):
        return self.__course

    def get_time_slot(self):
        return self.__time_slot

    def get_semester(self):
        return self.__semester

    def get_classroom(self):
        return self.__classroom

    def __repr__(self):
        return f"({self.__course.get_course_id() if not self.__course is None else None}, {self.__course.get_instructors()}, {self.__classroom})"


class Schedule:
    WEEK_DAYS = {
        wd.value: i for i, wd in enumerate(WeekDay)
    }
    TIME_BLOCKS = {
        tb: i for i, tb in enumerate(TimeBlock.get_time_blocks(Time(8), Time(20), Time(2)))
    }

    @staticmethod
    def get_from_int(data_dict: dict, index: int):
        k, v = list(data_dict.items())[index]
        return k

    def __init__(self, scheduled_courses: list[ScheduledCourse], fitness_score: int = None):
        self.__scheduled_courses = scheduled_courses
        self.__fitness_score = fitness_score
        self.__matrix = self.get_matrix_repr(True)

    def get_scheduled_courses(self):
        return self.__scheduled_courses

    def get_fitness_score(self):
        return self.__fitness_score

    def get_matrix(self):
        return self.__matrix

    def get_matrix_repr(self, generate_new: bool = False):
        if not generate_new:
            return self.__matrix
        else:
            v: List[ScheduledCourse] = []
            matrix = [
                [copy.deepcopy(v) for _ in Schedule.WEEK_DAYS]
                for _ in Schedule.TIME_BLOCKS
            ]
            for sc in self.__scheduled_courses:
                wd, tb = sc.get_time_slot().get_week_day(), sc.get_time_slot().get_time_block()
                matrix[Schedule.TIME_BLOCKS[tb]][Schedule.WEEK_DAYS[wd]].append(sc)
            return matrix

    def validate(self) -> bool:
        def validate_instructor(local_sc: ScheduledCourse) -> bool:
            return len(set(tsa[local_sc.get_time_slot()][Instructor]) & set(local_sc.get_course().get_instructors())) == 0

        def validate_classroom(local_sc: ScheduledCourse) -> bool:
            return local_sc.get_classroom() not in tsa[local_sc.get_time_slot()][Classroom]

        tsa: Dict[TimeSlot, Dict] = {
            ts: {
                Instructor: [],
                Classroom: []
            } for ts in TIME_SLOTS
        }

        for sc in self.__scheduled_courses:
            if validate_instructor(sc) and validate_classroom(sc):
                tsa[sc.get_time_slot()][Instructor].extend(sc.get_course().get_instructors())
                tsa[sc.get_time_slot()][Classroom].append(sc.get_classroom())
            else:
                return False
        return True

    def __iter__(self):
        for row in self.__matrix:
            for sc_list in row:
                yield sc_list

    def __str__(self):
        return tabulate(
            [["time\\day"] + [wd for wd in Schedule.WEEK_DAYS.keys()]] +
            [
                [Schedule.get_from_int(Schedule.TIME_BLOCKS, i)] +
                list(map(lambda el: el.__repr__() if isinstance(el, ScheduledCourse) else str(el), row))
                for i, row in enumerate(self.__matrix)
            ]
        )


class GeneticAlgorithm:
    SCHEDULE_GENERATION_TRIES = 10000
    GENERATION_LIMIT = 1000
    LOW_THRESHOLD_FITNESS = 10
    HIGH_THRESHOLD_FITNESS = 20
    INITIAL_POPULATION_SIZE = 10
    LOW_FITNESS_DROP_PERCENTAGE = 0.7
    HIGH_FITNESS_DROP_PERCENTAGE = 0.1

    def __init__(self, courses: list[Course], classrooms: list[Classroom], semester: Semester):
        self.__courses = courses
        self.__classrooms = classrooms
        self.__semester = semester
        self.__population = None

    def schedule_course(self, course):
        time_pool = list(map(lambda p: p.get_time_slot(), filter(lambda p: p.is_requirement(), course.get_params_of_type(TimeParameter))))
        classroom_pool = list(map(lambda p: p.get_classroom(), course.get_params_of_type(ClassroomParameter)))
        return ScheduledCourse(
            course,
            rd.choice(TIME_SLOTS if len(time_pool) == 0 else time_pool),
            self.__semester,
            rd.choice(CLASSROOMS if len(classroom_pool) == 0 else classroom_pool)
        )

    def create_random_schedule(self, schedule_generation_tries: int):
        for _ in range(schedule_generation_tries):
            s = Schedule([
                self.schedule_course(course) for course in self.__courses
            ])
            if s.validate():
                return s
        raise GenerationError("Requirements are too tight")

    def run(
            self,
            *,
            initial_population_size: int = INITIAL_POPULATION_SIZE,
            schedule_generation_tries: int = SCHEDULE_GENERATION_TRIES,
            generation_limit: int = GENERATION_LIMIT,
            low_threshold_fitness: int = LOW_THRESHOLD_FITNESS,
            high_threshold_fitness: int = HIGH_THRESHOLD_FITNESS,
            low_score_drop_percentage: float = LOW_FITNESS_DROP_PERCENTAGE,
            high_score_drop_percentage: float = HIGH_FITNESS_DROP_PERCENTAGE
    ):
        self.__population = [
            self.create_random_schedule(schedule_generation_tries)
            for _ in range(initial_population_size)
        ]

        return self.__population
    # 1    generate initial population
    # 2          verify no conflicts ? continue : regenerate
    # 3    evaluate fitness
    # 4          drop low fitness schedules
    # 5    randomize crossover (mutations number)
    # 6          perform mutations
    # 7    repeat 3-6 some number of times

    def __str__(self):
        return "Courses:      {courses}\n" \
               "Classrooms: \n{classrooms}\n" \
               "Population:   {population}\n" \
            .format(
                courses=self.__courses,
                classrooms="\n".join(map(str, self.__classrooms)),
                population=self.__population
            )


def main(*args, **kwargs):
    # s = Schedule([
    #     ScheduledCourse(
    #         rd.choice(COURSES),
    #         [rd.choice(INSTRUCTORS) for _ in range(rd.randint(1, 4))],
    #         rd.choice(TIME_SLOTS),
    #         Semester.SPRING,
    #         rd.choice(CLASSROOMS))
    #     for _ in range(20)
    # ], 0)
    # print(s)
    ga = GeneticAlgorithm(COURSES, CLASSROOMS, Semester.SPRING)
    print(ga.run())


if __name__ == '__main__':
    main()
