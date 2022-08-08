const baseUrl = 'src/script/component/navigation';
fetch(`${baseUrl}/navigation.html`).then(response => response.text()).then(html => {
    document.getElementById('navigation').innerHTML = html;
    document.head.innerHTML += `<link rel="stylesheet" href="${baseUrl}/navigation.css">`
})
