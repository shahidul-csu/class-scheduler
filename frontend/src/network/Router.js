const SWITCH = Object.freeze({
    BASE: "http://localhost:8000",
    API: "api"
})

const ROUTER = {
    admin: `${SWITCH.BASE}/admin/`,
    login: `${SWITCH.BASE}/login/`,
    sign_up: `${SWITCH.BASE}/sign_up/`,
    api: {
        users: `${SWITCH.BASE}/${SWITCH.API}/user/`,
        classrooms: `${SWITCH.BASE}/${SWITCH.API}/classroom/`,
        courses: `${SWITCH.BASE}/${SWITCH.API}/course/`,
        parameterData: `${SWITCH.BASE}/${SWITCH.API}/parameter_data/`,
        timeSlot: `${SWITCH.BASE}/${SWITCH.API}/time_slot/`,
        userTeachingParam: `${SWITCH.BASE}/${SWITCH.API}/teaching_parameter/`,
        userTimeParam: `${SWITCH.BASE}/${SWITCH.API}/user_time_parameter/`,
        getAvaliabilityData: `${SWITCH.BASE}/${SWITCH.API}/get_avaliability_for_semester`,
        getPreferenceData: `${SWITCH.BASE}/${SWITCH.API}/get_preference_for_semester`,
        semester: `${SWITCH.BASE}/${SWITCH.API}/semester/`,
        getInstructorListPerSemester: `${SWITCH.BASE}/${SWITCH.API}/get_instructor_list_per_semester`,
        getParameterData: `${SWITCH.BASE}/${SWITCH.API}/get_parameter_data`,
        getUserPreferenceOptionEntries: `${SWITCH.BASE}/${SWITCH.API}/get_user_preference_option_entries`,
        userBackToBack: `${SWITCH.BASE}/${SWITCH.API}/user_back_to_back_parameter/`,
        getPreferenceParameterIds: `${SWITCH.BASE}/${SWITCH.API}/get_preference_parameter_ids`,
    }
}

export default ROUTER