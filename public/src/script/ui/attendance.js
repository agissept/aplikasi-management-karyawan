import {
    getUserByUserId,
    submitAttendance,
    getAttendancesByUserId
} from "../repository/api-helper.js";

window.onload = async () => {
    const user = await getUser()
    document.querySelector('p span#name').innerHTML = user.full_name
    document.querySelector('p span#id').innerHTML = user.id

}

document.querySelector('#submit-attendance-btn').addEventListener('click', async function (event) {
    event.preventDefault()
    const user = await getUser()

    try {
        await submitAttendance(user.id)
    }catch (e) {
        alert(e.message)
    }

    await getAttendances()
})


async function getUser() {
    const userId = sessionStorage.getItem("userId")
    if (userId === null) {
        window.location.href = "/"
    }
    return await getUserByUserId(userId)
}


async function getAttendances() {
    const attendances = (await getAttendancesByUserId(sessionStorage.getItem("userId"))).data.attendances

    const container = document.querySelector('#list-attendances')
    let attendanceElements = ''
    attendances.forEach(attendance => {
        attendanceElements += `
            <li>${attendance.created_at}</li>
        `
    })
    container.innerHTML = attendanceElements
}

getAttendances()
