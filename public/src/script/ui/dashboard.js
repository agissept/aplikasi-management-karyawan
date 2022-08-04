import {getPaidLeavesByUserId, getUserByUserId} from "../repository/api-helper.js";

window.onload = async () => {
    const user = await getUser()

    const takenPaidLeaves = (await getPaidLeavesByUserId(user.id)).data.paid_leaves

    document.querySelector('#rest_paid_leaves').innerHTML = 12 - takenPaidLeaves.length
    document.querySelector('#taken_paid_leaves').innerHTML = takenPaidLeaves.length
}

async function getUser() {
    const userId = sessionStorage.getItem("userId")
    if (userId === null) {
        window.location.href = "../pages/index.html"
    }
    return await getUserByUserId(userId)
}
