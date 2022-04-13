import copy
from functools import reduce
from parameters import Parameter, TimeParameter, ClassroomParameter


class ParameterizedEntity:
    def __init__(self, parameters: list[Parameter]):
        self._parameters = parameters

    def get_parameters(self):
        return self._parameters

    def __str__(self):
        return str(reduce(lambda k, v: f"{k}\n{v}", self.__dict__.items()))

    def __repr__(self):
        return self.__str__()


class Instructor(ParameterizedEntity):
    def __init__(self, parameters: list[Parameter], user_id: int, username: str, first_name: str, last_name: str):
        super().__init__(parameters)
        self.__user_id = user_id
        self.__username = username
        self.__first_name = first_name
        self.__last_name = last_name

    def get_user_id(self):
        return self.__user_id

    def get_username(self):
        return self.__username

    def get_first_name(self):
        return self.__first_name

    def get_last_name(self):
        return self.__last_name

    def __hash__(self):
        return hash(self.__user_id)

    def __eq__(self, other):
        return self.__user_id == other.__user_id

    def __str__(self):
        return f"({self.__first_name} {self.__last_name})"


class Course(ParameterizedEntity):
    def __init__(
            self,
            parameters: list[Parameter],
            course_id: str,
            instructors: list[Instructor],
            units: int,
            number_per_week: int,
            capacity: int,
            sync_time: bool = True
    ):
        super().__init__(parameters)
        self.__course_id = course_id
        self.__instructors = instructors
        self.__units = units
        self.__number_per_week = number_per_week
        self.__capacity = capacity
        self.__sync_time = sync_time

    def get_course_id(self):
        return self.__course_id

    def get_instructors(self):
        return self.__instructors

    def get_units(self):
        return self.__units

    def get_number_per_week(self):
        return self.__number_per_week

    def get_capacity(self):
        return self.__capacity

    def get_sync_time(self):
        return self.__sync_time

    def get_params_of_type(self, param_type):
        if param_type == TimeParameter:
            accum = list(filter(lambda p: isinstance(p, param_type), self._parameters))
            for inst in self.__instructors:
                accum.extend(filter(lambda p: isinstance(p, param_type), inst.get_parameters()))
            return accum
        return list(filter(lambda p: isinstance(p, param_type), self._parameters))

    def __hash__(self):
        return hash(self.__course_id)

    def __eq__(self, other):
        return self.__course_id == other.__course_id

    def __str__(self):
        return f"{self.__course_id}: \n" \
               f"   Parameters: {self._parameters},\n" \
               f"   Instructors: {self.__instructors},\n" \
               f"   Units: {self.__units},\n" \
               f"   Number/week: {self.__number_per_week},\n" \
               f"   Capacity: {self.__capacity},\n" \
               f"   Sync time: {self.__sync_time}"

    def __repr__(self):
        return "\n" + self.__str__() + "\n"
