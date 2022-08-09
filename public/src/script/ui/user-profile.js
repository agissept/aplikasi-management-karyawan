import {getUserProfileById, updateProfile} from '/src/script/repository/api-helper.js'

const userId = sessionStorage.getItem("userId")
if (userId === null) {
    window.location.href = "/"
}

async function renderUserProfile() {
    const {data} = await getUserProfileById(userId)

    document.getElementById("user_id").value = data.user.id
    document.getElementById("input_full_name").value = data.user.full_name
    document.getElementById("input_phone").value = data.user.phone

    if (data.user.gender === 'Male') {
        document.getElementById("input_gender_male").checked = true
    }

    if (data.user.gender === 'Female') {
        document.getElementById("input_gender_female").checked = true
    }

    document.getElementById('input_birthdate').value = data.user.birthdate

    if (data.user.profile_picture !== null) {
        document.getElementById('user_profile_picture').src = `/storage/${data.user.profile_picture}`
    }

}

renderUserProfile()

document.getElementById("btn-update-profile").addEventListener("click", async function (e) {
    e.preventDefault()

    const fullName = document.getElementById("input_full_name").value
    const phone = document.getElementById("input_phone").value
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const birthdate = document.getElementById("input_birthdate").value
    const profilePicture = document.querySelector('#input_profile_picture').files[0]

    try {
        await updateProfile(userId, fullName, phone, gender, birthdate, profilePicture)
        alert("Profile updated")
    } catch (e) {
        alert(e)
    }

})




