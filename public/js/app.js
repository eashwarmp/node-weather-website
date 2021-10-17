console.log('Client Side JavaScript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()
        messageOne.textContent = 'Loading..........'
        messageTwo.textContent = ''
        const location = search.value
        console.log(location)
        fetch('/weather?address=' + location).then((response) => {
    response.json().then((data)=> {
        if(data.error) {
            messageOne.textContent = ''
            messageTwo.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})