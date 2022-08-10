import {getAdmin} from "/src/script/repository/session-storage.js";
import {
    getAllEmployees,
    registerUser,
    deleteEmployee,
    updateProfile,
    getUserByUserId
} from "/src/script/repository/api-helper.js";

getAdmin().then(async user => {
    await renderTableEmployee();
})

async function renderTableEmployee() {
    const {data: {employees}} = await getAllEmployees();
    const tbody = document.querySelector("#employees-table");
    tbody.innerHTML = "";
    employees.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.full_name}</td>
            <td>${user.gender}</td>
            <td>${user.phone}</td>
            <td>${user.birthdate}</td>
            <td><div>
                    <div class="btn btn-warning btn-edit-user"  data-bs-toggle="modal"
                    data-bs-target="#modal-edit-user" data-user-id="${user.id}">Update</div>
                    <div class="btn btn-danger btn-delete-employee" data-user-id="${user.id}">Delete</div>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    })

    renderDeleteBtn()
    renderBtnEditUser()
}

document.querySelector('#btn-submit-add-user').addEventListener('click', async function (e) {
    const employeeId = document.querySelector('#input-employee-id').value;
    const fullName = document.querySelector('#input-full-name').value;
    const password = document.querySelector('#input-password').value;
    const phone = document.querySelector('#input-phone').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const birthdate = document.querySelector('#input-birthdate').value;

    try {
        await registerUser(employeeId, password, fullName, birthdate, phone, gender);
        document.querySelector('#close-modal-add-user').click()
        await renderTableEmployee();
        alert("User registered");
    } catch (e) {
        alert(e)
    }
})

function renderDeleteBtn() {
    document.querySelectorAll('.btn-delete-employee').forEach(btn => {
        btn.addEventListener('click', async function (e) {
            const id = e.target.dataset.userId;
            console.log(id)

            if (confirm(`Are you sure to delete user with id ${id}`)) {
                try {
                    await deleteEmployee(id)
                    alert("User deleted");
                    await renderTableEmployee();
                } catch (e) {
                    alert(e)
                }
            }
        })
    })
}

function renderBtnEditUser() {
    document.querySelectorAll('.btn-edit-user').forEach(btn => {
        btn.addEventListener('click', async function (e) {
            const id = e.target.dataset.userId;
            console.log(id)
            const employee = await getUserByUserId(id);
            document.querySelector('#edit-input-employee-id').value = employee.id;
            document.querySelector('#edit-input-full-name').value = employee.full_name;
            document.querySelector('#edit-input-password').value = employee.password;
            document.querySelector('#edit-input-phone').value = employee.phone;
            document.querySelector('#edit-input-birthdate').value = employee.birthdate;

            if (employee.gender === 'Male') {
                document.querySelector("#edit-input-gender-male").checked = true
            }

            if (employee.gender === 'Female') {
                document.querySelector("#edit-input-gender-female").checked = true
            }
        })
    })
}

document.querySelector('#btn-submit-edit-user').addEventListener('click', async e => {
    const employeeId = document.querySelector('#edit-input-employee-id').value;
    const fullName = document.querySelector('#edit-input-full-name').value;
    const phone = document.querySelector('#edit-input-phone').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const birthdate = document.querySelector('#edit-input-birthdate').value;

    try {
        await updateProfile(employeeId, fullName , phone, gender , birthdate)
        alert('Successfully updated')
        await renderTableEmployee();
        document.querySelector('#close-modal-edit-user').click()
    }catch (e) {
        alert(e)
    }
})


