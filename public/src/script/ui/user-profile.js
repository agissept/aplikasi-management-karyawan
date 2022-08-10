import {updateProfile} from '/src/script/repository/api-helper.js'
import {getUser} from "/src/script/repository/session-storage.js";




async function renderUserProfile() {
    const user = await getUser()
    document.getElementById("user_id").value = user.id
    document.getElementById("input_full_name").value = user.full_name
    document.getElementById("input_phone").value = user.phone

    if (user.gender === 'Male') {
        document.getElementById("input_gender_male").checked = true
    }

    if (user.gender === 'Female') {
        document.getElementById("input_gender_female").checked = true
    }

    document.getElementById('input_birthdate').value = user.birthdate

    if (user.profile_picture !== null) {
        document.getElementById('user_profile_picture').src = `/storage/${user.profile_picture}`
    }

}

renderUserProfile()

document.getElementById("btn-update-profile").addEventListener("click", async function (e) {
    e.preventDefault()
    const user = await getUser()

    const fullName = document.getElementById("input_full_name").value
    const phone = document.getElementById("input_phone").value
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const birthdate = document.getElementById("input_birthdate").value
    const profilePicture = document.querySelector('#input_profile_picture').files[0]

    try {
        await updateProfile(user.id, fullName, phone, gender, birthdate, profilePicture)
        alert("Profile updated")
    } catch (e) {
        alert(e)
    }

})




