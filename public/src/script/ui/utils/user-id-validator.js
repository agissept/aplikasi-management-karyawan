document.querySelector('#user-id').addEventListener('keypress', (event) => {
    ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()
})
