import {getTimeOffByUserId, getUserByUserId, insertPaidLeave} from "../repository/api-helper.js";

const filters = {
    date: '',
    policy: '',
    status: ''
}

window.onload = async () => {
    const timeOff = await getTimeOff()
    const paidLeaves = timeOff.filter(timeOff => timeOff.policy === 'Cuti')
    const dinas = timeOff.filter(timeOff => timeOff.policy === 'Dinas')
    const lembur = timeOff.filter(timeOff => timeOff.policy === 'Lembur')
    const sick = timeOff.filter(timeOff => timeOff.policy === 'Sakit')

    renderTable(timeOff)

    document.querySelector('#rest_paid_leaves').innerHTML = 12 - paidLeaves.length
    document.querySelector('#taken_paid_leaves').innerHTML = paidLeaves.length
    document.querySelector('#amount-dinas').innerHTML = dinas.length
    document.querySelector('#amount-lembur').innerHTML = lembur.length
    document.querySelector('#amount-sick').innerHTML = sick.length
}

async function getUser() {
    const userId = sessionStorage.getItem("userId")
    if (userId === null) {
        window.location.href = "../pages/index.html"
    }
    return await getUserByUserId(userId)
}

async function renderTable(paidLeaves) {
    const container = document.querySelector('#paid-leaves-table')
    container.innerHTML = ""
    paidLeaves.forEach(paidLeave => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${paidLeave.created_at}</td>
            <td>${paidLeave.policy}</td>
            <td>${paidLeave.date}</td>
            <td>approved</td>
        `
        container.appendChild(row)
    })
}

async function getTimeOff() {
    const user = await getUser()
    const takenPaidLeaves = await getTimeOffByUserId(user.id, filters)
    return takenPaidLeaves.data.time_off
}

function isPaidLeavePayloadAreValid(startDate, endDate, reason) {
    if (reason === '' || startDate === '' || endDate === '') {
        alert('Please fill all the fields')
        return false
    }

    if (startDate > endDate) {
        alert('Start date must be less than end date')
        return false
    }

    return true
}

document.querySelector('#btn-submit').addEventListener('click', async (event) => {
    event.preventDefault()
    const user = await getUser()

    const startDate = document.querySelector('#start-date').value
    const endDate = document.querySelector('#end-date').value
    const reason = document.querySelector('#reason').value
    const userId = user.id
    const policy = document.querySelector('#policy').value


    if (!isPaidLeavePayloadAreValid(startDate, endDate, reason, userId)) {
        return false
    }
    console.log(startDate, endDate, reason, userId, policy)
    try {
        await insertPaidLeave(userId, startDate, endDate, reason, policy)
        const paidLeaves = await getTimeOff()
        renderTable(paidLeaves)
    } catch (e) {
        alert(e)
    }
})

document.getElementById('policy-filter').addEventListener('change', async () => {
    const policy = document.getElementById('policy-filter').value
    if (policy === "All") {
        filters.policy = ""
    } else {
        filters.policy = policy
    }

    const timeOff = await getTimeOff()

    renderTable(timeOff)
})

// document.getElementById('status-filter').addEventListener('change', async () => {
// })

document.getElementById('date-filter').addEventListener('change', async () => {
    filters.date = document.getElementById('date-filter').value
    const timeOff = await getTimeOff()

    renderTable(timeOff)
})
