async function registerUser(username, password, fullName) {
    const formData = new FormData();
    formData.append("id", username);
    formData.append("password", password);
    formData.append("full_name", fullName);

    const response = await fetch(`/employee`, {
        method: 'POST',
        body: formData
    })

    const json = await response.json()

    if (response.status !== 201) {
        throw new Error(`Register User Failed : ${json.message}`)
    }

    return json

}

async function getUserByUserId(userId) {
    const response = await fetch(`/employee/${userId}`)
    return await response.json()
}

async function insertPaidLeave(userId, startDate, endDate, reason, policy) {
    const formData = new FormData();
    formData.append("reason", reason);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("policy", policy);

    const response = await fetch(`/employee/${userId}/timeoff`, {
        method: 'POST',
        body: formData
    })
    const json = await response.json()
    if(response.status !== 201) {
        throw new Error(`Insert Paid Leave Failed : ${json.message}`)
    }
    return json
}

async function getTimeOffByUserId(userId) {
    const response = await fetch(`/employee/${userId}/timeoff`)
    const json = await response.json()

    if(response.status !== 200) {
        throw new Error(`Get Paid Leaves Failed : ${json.message}`)
    }
    return json
}

async function submitAttendance(userId) {
    const response = await fetch(`/employee/${userId}/attendances`, {
        method: 'POST',
    })
    const json = await response.json()
    if(response.status !== 201) {
        throw new Error(`Submit Attendance Failed : ${json.message}`)
    }
}

async function getAttendancesByUserId(userId) {
    const response = await fetch(`/employee/${userId}/attendances`)
    const json = await response.json()

    if(response.status !== 200) {
        throw new Error(`Get Attendances Failed : ${json.message}`)
    }
    return json
}

async function authenticate(username, password) {
    const formData = new FormData();
    formData.append("id", username);
    formData.append("password", password);

    const response = await fetch(`/login`, {
        method: 'POST',
        body: formData
    })

    const json = await response.json()
    if(response.status !== 200) {
        throw new Error(`Login Failed : ${json.message}`)
    }
    return json
}

export {
    getUserByUserId,
    registerUser,
    insertPaidLeave,
    getTimeOffByUserId,
    submitAttendance,
    getAttendancesByUserId,
    authenticate
};
