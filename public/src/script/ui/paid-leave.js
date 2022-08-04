import {getPaidLeavesByUserId, getUserByUserId, insertPaidLeave} from "../repository/api-helper.js";

var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["NL"] = document.getElementById("NL").value;
    formData["Nik"] = document.getElementById("Nik").value;
    formData["cuti"] = document.getElementById("cuti").value;
    formData["tgl1"] = document.getElementById("tgl1").value;
    formData["tgl2"] = document.getElementById("tgl2").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.NL;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.Nik;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.cuti;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.tgl1;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.tgl2;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button class="btn-edit href="#" onClick="onEdit(this)"><image src="../images/edit.png"></image></button>
                       <button class="btn-hapus href="#" onClick="onDelete(this)"><image src="../images/hapus.png"></image></button>`;
}

function resetForm() {
    document.getElementById("NL").value = "";
    document.getElementById("Nik").value = "";
    document.getElementById("cuti").value = "";
    document.getElementById("tgl1").value = "";
    document.getElementById("tgl2").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("NL").value = selectedRow.cells[0].innerHTML;
    document.getElementById("Nik").value = selectedRow.cells[1].innerHTML;
    document.getElementById("cuti").value = selectedRow.cells[2].innerHTML;
    document.getElementById("tgl1").value = selectedRow.cells[3].innerHTML;
    document.getElementById("tgl2").value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.NL;
    selectedRow.cells[1].innerHTML = formData.Nik;
    selectedRow.cells[2].innerHTML = formData.cuti;
    selectedRow.cells[3].innerHTML = formData.tgl1;
    selectedRow.cells[4].innerHTML = formData.tgl2;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("NL").value == "") {
        isValid = false;
        document.getElementById("NlValError").classList.remove("hide");
    } else if (document.getElementById("Nik").value == "") {
        isValid = false;
        document.getElementById("NikValError").classList.remove("hide");
    } else if (document.getElementById("tgl1").value == "") {
        isValid = false;
        document.getElementById("tglValError").classList.remove("hide");
    } else if (document.getElementById("tgl2").value == "") {
        isValid = false;
        document.getElementById("tglValError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("NlValError").classList.contains("hide"))
            document.getElementById("NlValError").classList.add("hide");
        else if (!document.getElementById("NikValError").classList.contains("hide"))
            document.getElementById("NikValError").classList.add("hide");
        else if (!document.getElementById("tglValError").classList.contains("hide"))
            document.getElementById("tglValError").classList.add("hide");
    }
    return isValid;
}


async function getUser() {
    const userId = sessionStorage.getItem("userId")
    if (userId === null) {
        window.location.href = "../../../index.html"
    }
    const user = await getUserByUserId(userId)

    document.querySelector('#full-name').value = user.full_name
    document.querySelector('#user-id').value = user.id
}

getUser()

document.querySelector('#btn-submit').addEventListener('click', async (event) => {
    event.preventDefault()

    const startDate = document.querySelector('#start-date').value
    const endDate = document.querySelector('#end-date').value
    const reason = document.querySelector('#reason').value
    const userId = document.querySelector('#user-id').value

    if(!isPaidLeavePayloadAreValid(startDate, endDate, reason, userId)){
        return false
    }

    try {
        await insertPaidLeave(userId, startDate, endDate, reason)
        await getPaidLeaves()
    } catch (e) {
        alert(e)
    }
})

async function getPaidLeaves() {
    const userId = sessionStorage.getItem("userId")
    const paidLeaves = (await getPaidLeavesByUserId(userId)).data.paid_leaves
    const table = document.querySelector('#paid-leave-table tbody')
    table.innerHTML = ''
    for (let paidLeave of paidLeaves) {
        const row = table.insertRow()
        row.insertCell().innerHTML = paidLeave.full_name
        row.insertCell().innerHTML = paidLeave.user_id
        row.insertCell().innerHTML = paidLeave.reason
        row.insertCell().innerHTML = paidLeave.date

    }
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

getPaidLeaves()
