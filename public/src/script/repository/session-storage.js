import {getUserByUserId} from "./api-helper";

async function getUser() {
    const userId = sessionStorage.getItem("userId")
    if (userId === null) {
        window.location.href = "/"
    }
    return await getUserByUserId(userId)
}


export {
    getUser
}
