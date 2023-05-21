import copy
import random as rd
import warnings
from dataclasses import dataclass
from typing import List, Dict
from tabulate import tabulate

from error import GenerationError, ParameterError, CrossoverError
from parameters import TimeParameter, ClassroomParameter, UserGroupClassParameter
from base_entities import Classroom, WeekDay, TimeBlock, Time, TimeSlot, Semester
from param_entities import Course, Instructor
from test_data import TIME_SLOTS, CLASSROOMS
from test_data import INSTRUCTORS_PREDETERMINED as INSTRUCTORS
from test_data import COURSES_PREDETERMINED as COURSES


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

    """
    Prefer schedules with more slots used
    """

    def get_fitness(self):
        time_pref = filter(lambda p: not p.is_requirement(), self.__course.get_params_of_type(TimeParameter))
        user_group_class_parameters = self.__course.get_params_of_type(UserGroupClassParameter)
        classroom_pref = filter(lambda p: not p.is_requirement(), self.__course.get_params_of_type(ClassroomParameter))
        return sum([
            tp.get_score() if tp.get_time_slot() == self.__time_slot else 0
            for tp in time_pref
        ]) + sum([
            cp.get_score() if cp.get_classroom() == self.__classroom else 0
            for cp in classroom_pref
        ])

    def __repr__(self):
        return f"({self.__course.get_course_id() if not self.__course is None else None}, {self.__course.get_instructors()}, {self.__classroom})"


class Schedule:
    WEEK_DAYS = {
        wd: i for i, wd in enumerate(WeekDay.get_work_days())
    }
    TIME_BLOCKS = {
        tb: i for i, tb in enumerate(TimeBlock.get_time_blocks(Time(8), Time(20), Time(2)))
    }

    @staticmethod
    def get_from_int(data_dict: dict, index: int):
        k, v = list(data_dict.items())[index]
        return k

    def __init__(self, scheduled_courses: List[ScheduledCourse], fitness_score: int = None):
        self.__scheduled_courses = scheduled_courses
        self.__fitness_score = fitness_score
        self.__matrix = None

    def add_scheduled_course(self, scheduled_courses: List[ScheduledCourse]) -> bool:
        self.__scheduled_courses.extend(scheduled_courses)
        is_valid = self.validate()
        if not is_valid:
            self.__scheduled_courses = self.__scheduled_courses[:-len(scheduled_courses)]
        return is_valid

    def set_scheduled_courses(self, scheduled_courses: List[ScheduledCourse]):
        self.__scheduled_courses = scheduled_courses

    def get_scheduled_courses(self) -> List[ScheduledCourse]:
        return self.__scheduled_courses

    def get_fitness_score(self):
        return self.__fitness_score

    def get_matrix(self):
        return self.__matrix

    def get_matrix_repr(self, generate_new: bool = False):
        if not generate_new and self.__matrix is not None:
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
        def validate_instructor() -> bool:
            return len(set(tsa[sc.get_time_slot()][Instructor]) & set(sc.get_course().get_instructors())) == 0

        def validate_classroom() -> bool:
            return sc.get_classroom() not in tsa[sc.get_time_slot()][Classroom]

        tsa: Dict[TimeSlot, Dict] = {
            ts: {
                Instructor: [],
                Classroom: []
            } for ts in TIME_SLOTS
        }

        for sc in self.__scheduled_courses:
            if validate_instructor() and validate_classroom():
                tsa[sc.get_time_slot()][Instructor].extend(sc.get_course().get_instructors())
                tsa[sc.get_time_slot()][Classroom].append(sc.get_classroom())
            else:
                return False
        return True

    def get_fitness(self):
        return sum([sc.get_fitness() for sc in self.__scheduled_courses])

    def __iter__(self):
        for row in self.__matrix:
            for sc_list in row:
                yield sc_list

    def __str__(self):
        self.__matrix = self.get_matrix_repr()
        #return "TEMP"
        return tabulate(
            [["time\\day"] + [wd for wd in Schedule.WEEK_DAYS.keys()]] +
            [
                [str(Schedule.get_from_int(Schedule.TIME_BLOCKS, i))] +
                list(map(lambda el: el.__repr__() if isinstance(el, ScheduledCourse) else str(el), row))
                for i, row in enumerate(self.__matrix)
            ]
        )


class GeneticAlgorithm:
    @dataclass
    class Settings:
        COURSE_TIME_SLOT_ALLOCATION_TRIES: int = 100
        SCHEDULE_COURSE_TRIES: int = 100000
        SCHEDULE_GENERATION_TRIES: int = 10000
        GENERATION_LIMIT: int = 1000
        LOW_THRESHOLD_FITNESS: int = 10
        HIGH_THRESHOLD_FITNESS: int = 20
        INITIAL_POPULATION_SIZE: int = 10
        LOW_FITNESS_DROP_PERCENTAGE: float = 0.7
        HIGH_FITNESS_DROP_PERCENTAGE: float = 0.1
        REQUIREMENT_OVERLAP_ACCEPTANCE_THRESHOLD: float = 0.5
        CROSSOVER_RATE: float = 0.2
        MUTATION_RATE: float = 0.3

    def __init__(self, courses: List[Course], classrooms: List[Classroom], semester: Semester):
        self.__courses = courses
        self.__classrooms = classrooms
        self.__semester = semester
        self.__population = None
        self.__settings = None
        self.__course_pools = None

    def get_max_req_value(self):
        return len(Schedule.TIME_BLOCKS) * len(Schedule.WEEK_DAYS) + len(self.__classrooms)

    def get_num_mutations(self, schedule: Schedule):
        return int(len(schedule.get_scheduled_courses())*self.__settings.MUTATION_RATE)

    def get_num_crossover(self):
        return int(len(self.__population)*self.__settings.CROSSOVER_RATE)

    def remove_contradictions(self, cctp: list) -> list:
        def is_full_overlap(overlap_type):
            overlap = set(pools[overlap_type]) & set(inner_pools[overlap_type])
            return (len(pools[overlap_type]) == len(overlap) and
                    len(inner_pools[overlap_type]) == len(overlap) and
                    len(overlap) > self.get_max_req_value() * self.__settings.REQUIREMENT_OVERLAP_ACCEPTANCE_THRESHOLD)

        def remove_overlap(overlap_type):
            overlap = set(pools[overlap_type]) & set(inner_pools[overlap_type])
            if len(overlap) > 0:
                max_course = max((course, inner_course), key=lambda c: c.get_requirements_value(self.get_max_req_value()))
                cctp[cctp.index(max_course)] = set(cctp[cctp.index(max_course)][1][overlap_type]) ^ set(overlap)

        for i, (course, pools) in enumerate(cctp):
            k = i + 1
            while k < len(cctp):
                inner_course, inner_pools = cctp[k]
                full_time_slot_overlap, full_classroom_overlap = is_full_overlap(TimeSlot), is_full_overlap(Classroom)
                if full_time_slot_overlap and full_classroom_overlap:
                    raise ParameterError(f"Contradicting requirements: {inner_pools}\nAND\n{pools}")
                elif full_time_slot_overlap and not full_classroom_overlap:
                    remove_overlap(Classroom)
                elif not full_time_slot_overlap and full_classroom_overlap:
                    remove_overlap(TimeSlot)
                k += 1
        return cctp

    def allocate_time(self, course: Course, time_pool: List[TimeSlot]):
        ts_wdr_pool = set()
        for _ in range(self.__settings.COURSE_TIME_SLOT_ALLOCATION_TRIES):
            time_slot = rd.choice(time_pool)
            for wdr in course.get_week_day_set_pool():
                if time_slot.get_week_day() in wdr:
                    ts_wdr_pool.add((time_slot, wdr))
            if len(ts_wdr_pool) > 0:
                break
        return rd.choice(list(ts_wdr_pool))

    def schedule_course(self, course, pools):
        time_slot, week_day_set = self.allocate_time(course, TIME_SLOTS if len(pools[TimeSlot]) == 0 else pools[TimeSlot])
        classroom = rd.choice(CLASSROOMS if len(pools[Classroom]) == 0 else pools[Classroom])
        temp_ts = copy.deepcopy(time_slot)
        sc_list = [ScheduledCourse(course, copy.deepcopy(temp_ts), self.__semester, classroom)]
        for _ in range(course.get_number_per_week() - 1):
            temp_ts.set_week_day(WeekDay.get_next(temp_ts.get_week_day(), week_day_set))
            sc_list.append(ScheduledCourse(course, copy.deepcopy(temp_ts), self.__semester, classroom))
        return sc_list

    def create_random_schedule(self):
        self.__course_pools = dict(sorted(
            self.remove_contradictions([(course, {
                TimeSlot: course.get_time_pool(),
                Classroom: course.get_classroom_pool()
            }) for course in self.__courses]),
            key=lambda el: el[0].get_requirements_value(self.get_max_req_value())
        ))
        for _ in range(self.__settings.SCHEDULE_GENERATION_TRIES):
            s = Schedule([])
            regenerate = False
            for course, pools in self.__course_pools.items():
                for t in range(self.__settings.SCHEDULE_COURSE_TRIES + 1):
                    if s.add_scheduled_course(self.schedule_course(course, pools)):
                        regenerate = False
                        break
                    if t == self.__settings.SCHEDULE_COURSE_TRIES:
                        warnings.warn("SCHEDULE_COURSE_TRIES exceeded")
                        regenerate = True
            if s.validate() and not regenerate:
                return s
        raise GenerationError("Requirements are too tight")

    def crossover(self):
        schedule1, schedule2 = rd.sample(self.__population, 2)
        old_scheduled_courses1 = copy.deepcopy(schedule1.get_scheduled_courses())
        old_scheduled_courses2 = copy.deepcopy(schedule2.get_scheduled_courses())
        for _ in range(self.get_num_crossover()):
            sc1 = rd.choice(schedule1.get_scheduled_courses())
            sc2 = next((sc for sc in schedule2.get_scheduled_courses() if sc.get_course().get_course_id() == sc1.get_course().get_course_id()), None)
            if sc2 is None:
                raise CrossoverError("Inconsistent schedules")
            for t in range(self.__settings.SCHEDULE_COURSE_TRIES + 1):
                schedule1.get_scheduled_courses().remove(sc1)
                schedule2.get_scheduled_courses().remove(sc2)
                if schedule1.add_scheduled_course(sc2) and schedule1.add_scheduled_course(sc1):
                    break
                if t == self.__settings.SCHEDULE_COURSE_TRIES:
                    warnings.warn("SCHEDULE_COURSE_TRIES exceeded in mutation")
                    schedule1.set_scheduled_courses(old_scheduled_courses1)
                    schedule2.set_scheduled_courses(old_scheduled_courses2)
        """
        swap the some same courses from 2 different schedules allow for changes in time, classroom or one of them or none
        allow for only classroom swap
        allow for only time swap
        """

    def mutate(self, schedule: Schedule):
        old_scheduled_courses = copy.deepcopy(schedule.get_scheduled_courses())
        for _ in range(self.get_num_mutations(schedule)):
            sc = rd.choice(schedule.get_scheduled_courses())
            schedule.get_scheduled_courses().remove(sc)
            for t in range(self.__settings.SCHEDULE_COURSE_TRIES + 1):
                if schedule.add_scheduled_course(self.schedule_course(sc.get_course(), self.__course_pools[sc.get_course()])):
                    break
                if t == self.__settings.SCHEDULE_COURSE_TRIES:
                    warnings.warn("SCHEDULE_COURSE_TRIES exceeded in mutation")
                    schedule.set_scheduled_courses(old_scheduled_courses)
        """
        scheduled course swap
        scheduled course rearrange
        time swap some courses in a single schedule
        time rearrange course placement
        classroom swap some courses in a single schedule
        classroom rearrange course placement
        """

    def run(self, settings: Settings = Settings()):
        self.__settings = settings
        self.__population = [
            self.create_random_schedule()
            for _ in range(self.__settings.INITIAL_POPULATION_SIZE)
        ]

        for pop in self.__population:
            print(pop.get_fitness())

        for p in self.__population:
            print(p)

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
