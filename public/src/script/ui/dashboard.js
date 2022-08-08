import {getPaidLeavesByUserId, getUserByUserId} from "../repository/api-helper.js";

window.onload = async () => {
    const user = await getUser()

    const paidLeaves = await getPaidLeaves(user.id)
    renderTable(paidLeaves)

    document.querySelector('#rest_paid_leaves').innerHTML = 12 - paidLeaves.length
    document.querySelector('#taken_paid_leaves').innerHTML = paidLeaves.length
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
    console.log(paidLeaves)
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

async function getPaidLeaves(userId) {
    const takenPaidLeaves = await getPaidLeavesByUserId(userId)
    return takenPaidLeaves.data.paid_leaves
}
