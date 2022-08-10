import {getAdmin} from "/src/script/repository/session-storage.js";
import {getAllTimeOff, updateTimeOffStatus} from "/src/script/repository/api-helper.js";

getAdmin().then(async () => {
    await renderTableTimeOff();
})

async function renderTableTimeOff() {
    const {data: {time_off}} = await getAllTimeOff();
    const tbody = document.querySelector("#time-off-table");

    tbody.innerHTML = "";
    time_off.forEach(timeOff => {
        let attachmentContent = timeOff.attachment
        if (attachmentContent && attachmentContent.length > 5) {
            attachmentContent = attachmentContent.substring(0, 15) + '...';
        }
        let attachmentElement = attachmentContent ? `<a href="/storage/${timeOff.attachment}" target="_blank">${attachmentContent}</a>` : '-';

        const btnAction = timeOff.status === "Pending" ? `<div>
                    <div class="btn btn-success btn-accept-time-off" data-time-off-id="${timeOff.id}">Accept</div>
                    <div class="btn btn-danger btn-reject-time-off" data-time-off-id="${timeOff.id}">Reject</div>
                </div>` : '-'

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${timeOff.full_name}</td>
            <td>${timeOff.policy}</td>
            <td>${timeOff.date}</td>
            <td>${timeOff.status}</td>
            <td>${timeOff.reason}</td>
            <td>${attachmentElement}</td>
            <td>${timeOff.created_at}</td>
            <td>${btnAction}</td>
        `;
        tbody.appendChild(tr);
    })

    renderBtn()
}

function renderBtn() {
    document.querySelectorAll('.btn-accept-time-off').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const timeOffId = e.target.getAttribute('data-time-off-id');
            try {
                await updateTimeOffStatus(timeOffId, "Accepted");
                await renderTableTimeOff();
                alert("Time off has been accepted");
            } catch (e) {
                alert(e.message);
            }

        })
    })

    document.querySelectorAll('.btn-reject-time-off').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const timeOffId = e.target.getAttribute('data-time-off-id');
            try {
                await updateTimeOffStatus(timeOffId, "Rejected");
                await renderTableTimeOff();
                alert("Time off has been rejected");
            } catch (e) {
                alert(e.message);
            }

        })
    })
}
