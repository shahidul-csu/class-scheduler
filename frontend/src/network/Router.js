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
        userTimeParam: `${SWITCH.BASE}/${SWITCH.API}/user_time_parameter/`,
        getAvaliabilityData: `${SWITCH.BASE}/${SWITCH.API}/get_avaliability_for_semester`,
        semester: `${SWITCH.BASE}/${SWITCH.API}/semester/`,
    }
}

export default ROUTER