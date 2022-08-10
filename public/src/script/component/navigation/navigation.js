const baseUrl = 'src/script/component/navigation';
fetch(`${baseUrl}/navigation.html`).then(response => response.text()).then(html => {
    document.getElementById('navigation').innerHTML = html;


    document.querySelector('#logout').addEventListener('click', function (e) {
        e.preventDefault()
        sessionStorage.removeItem('userId')
        window.location.href = '/'
    })
})


