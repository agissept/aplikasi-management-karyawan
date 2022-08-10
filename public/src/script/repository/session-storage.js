import {getUserByUserId} from "./api-helper.js";

async function getUser() {
    const userId = sessionStorage.getItem("userId")
    if (userId === null) {
        window.location.href = "/"
    }
    return await getUserByUserId(userId)
}

async function getAdmin() {
    const userId = sessionStorage.getItem("userId")
    const user = await getUserByUserId(userId)
    if (userId === null || user.role !== "admin") {
        window.location.href = "/"
    }
    return user
}


export {
    getUser,
    getAdmin
}
