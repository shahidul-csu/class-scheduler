from error import ParameterError
from base_entities import Classroom, TimeSlot, Semester, TimeParameterType


class Parameter:
    def __init__(self, requirement: bool, score: int = None):
        if not requirement and score is None:
            raise ParameterError("score is None on preference")
        self._requirement = requirement
        self._score = score

    def is_requirement(self):
        return self._requirement

    def get_score(self):
        return self._score

    def __hash__(self):
        return hash((self._requirement, self._score))

    # noinspection PyProtectedMember
    def __eq__(self, other):
        return self._requirement == other._requirement \
               and \
               self._score == other._score

    def __str__(self):
        return f"{{{'required' if self._requirement else 'preference'}, {self._score}}}"

    def __repr__(self):
        return self.__str__()


class TimeParameter(Parameter):
    def __init__(self, tpt: TimeParameterType, time_slot: TimeSlot, requirement: bool, score: int = None):
        super().__init__(requirement, score)
        self.__time_slot = time_slot
        self.__tpt = tpt

    def get_time_slot(self):
        return self.__time_slot

    def get_time_parameter_type(self):
        return self.__tpt

    def __hash__(self):
        return hash((self.__time_slot, self._requirement, self._score))

    def __eq__(self, other):
        return super(self).__eq__(other) \
               and \
               self.__time_slot == other.__time_slot

    def __str__(self):
        return f"{{{self.__time_slot}, {'required' if self._requirement else 'preference'}, {self._score}}}"


class ClassroomParameter(Parameter):
    def __init__(self, classroom: Classroom, requirement: bool, score: int = None):
        super().__init__(requirement, score)
        self.__classroom = classroom

    def get_classroom(self):
        return self.__classroom

    def __hash__(self):
        return hash((self.__classroom, self._requirement, self._score))

    def __eq__(self, other):
        return super(self).__eq__(other) \
               and \
               self.__classroom == other.__classroom

    def __str__(self):
        return f"{{{self.__classroom}, {'required' if self._requirement else 'preference'}, {self._score}}}"


class SemesterParameter(Parameter):
    def __init__(self, semester: Semester, requirement: bool, score: int = None):
        super().__init__(requirement, score)
        self.__semester = semester

    def get_semester(self):
        return self.__semester

    def __hash__(self):
        return hash((self.__semester, self._requirement, self._score))

    def __eq__(self, other):
        return super(self).__eq__(other) \
               and \
               self.__semester == other.__semester

    def __str__(self):
        return f"{{{self.__semester}, {'required' if self._requirement else 'preference'}, {self._score}}}"


class UserGroupClassParameter(Parameter):
    def __init__(self, requirement: bool, score: int = None):
        super().__init__(requirement, score)


def main(*args, **kwargs):
    print(Parameter(False, 0))


if __name__ == '__main__':
    main()
