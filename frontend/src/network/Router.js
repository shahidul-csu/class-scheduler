const SWITCH = Object.freeze({
    BASE: "http://localhost:3000",
    API: "api"
})

const ROUTER = {
    admin: `${SWITCH.BASE}/admin/`,
    // login: `${SWITCH.BASE}/login/`,
    // sign_up: `${SWITCH.BASE}/sign_up/`,
    api: {
        users: `${SWITCH.BASE}/${SWITCH.API}/user/`,
        classrooms: `${SWITCH.BASE}/${SWITCH.API}/classroom/`,
        courses: `${SWITCH.BASE}/${SWITCH.API}/course/`
    }
}

export default ROUTER