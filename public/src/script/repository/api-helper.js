const baseURL = 'http://localhost:8000';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0aW12YmNsbnpsd3V2endrd3BvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1MzQ2ODUxNCwiZXhwIjoxOTY5MDQ0NTE0fQ.jTCaXX7HLNPs6yfIjX2r3WwQh3kqlvmo9y9oALQdptE',
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0aW12YmNsbnpsd3V2endrd3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM0Njg1MTQsImV4cCI6MTk2OTA0NDUxNH0.A_CJTQ9zXQVjOrtXudEhHWmuQy88hxATEhYWE6L1YcY'
}

async function select(table, parameter) {
    const request = await fetch(`${baseURL}/${table}${parameter}`, {headers});

    return request.json();
}

async function insert(tableName, data) {
    const request = await fetch(`${baseURL}/${tableName}`, {
        method: 'POST',
        body: data,
        headers
    })

    return request.status === 201;
}


async function registerUser(username, password, fullName) {
    const formData = new FormData();
    formData.append("id", username);
    formData.append("password", password);
    formData.append("full_name", fullName);

    const response = await fetch(`${baseURL}/employee`, {
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
    const response = await fetch(`${baseURL}/employee/${userId}`)
    return await response.json()
}

async function insertPaidLeave(userId, startDate, endDate, reason) {
    const formData = new FormData();
    formData.append("reason", reason);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);

    const response = await fetch(`${baseURL}/employee/${userId}/paidleaves`, {
        method: 'POST',
        body: formData
    })
    const json = await response.json()
    if(response.status !== 201) {
        throw new Error(`Insert Paid Leave Failed : ${json.message}`)
    }
    return json
}

async function getPaidLeavesByUserId(userId) {
    const response = await fetch(`${baseURL}/employee/${userId}/paidleaves`)
    const json = await response.json()

    if(response.status !== 200) {
        throw new Error(`Get Paid Leaves Failed : ${json.message}`)
    }
    return json
}

async function submitAttendance(userId) {
    const response = await fetch(`${baseURL}/employee/${userId}/attendances`, {
        method: 'POST',
    })
    const json = await response.json()
    if(response.status !== 201) {
        throw new Error(`Submit Attendance Failed : ${json.message}`)
    }
}

async function getAttendancesByUserId(userId) {
    const response = await fetch(`${baseURL}/employee/${userId}/attendances`)
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

    const response = await fetch(`${baseURL}/login`, {
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
    getPaidLeavesByUserId,
    submitAttendance,
    getAttendancesByUserId,
    authenticate
};
